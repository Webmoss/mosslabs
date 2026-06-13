<?php
/**
 * Moss Labs contact form handler for Apache + PHP (e.g. xneelo).
 * Lives in lib/; loads contact-config.php from the site root (parent directory).
 */
declare(strict_types=1);

require_once __DIR__ . '/moss-smtp.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}

function mime_encode_header(string $text): string
{
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($text, 'UTF-8', 'B', "\r\n");
    }

    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

header('Content-Type: application/json; charset=utf-8');

function json_out(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Send plain-text email: uses SMTP when `smtp` is set in config, otherwise PHP mail().
 *
 * @param list<string> $headerLines Must include From:; must not duplicate MIME headers (added for mail() only).
 */
function moss_send_message(array $config, string $envelopeFrom, string $to, string $subject, string $body, array $headerLines): ?string
{
    $smtp = $config['smtp'] ?? null;
    $useSmtp = is_array($smtp)
        && trim((string) ($smtp['host'] ?? '')) !== ''
        && trim((string) ($smtp['username'] ?? '')) !== ''
        && (string) ($smtp['password'] ?? '') !== '';

    if ($useSmtp) {
        return moss_smtp_send($smtp, $envelopeFrom, $to, $subject, $body, $headerLines);
    }

    $allHeaders = array_merge([
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ], $headerLines);

    $ok = @mail(
        $to,
        mime_encode_header($subject),
        $body,
        implode("\r\n", $allHeaders)
    );

    return $ok ? null : 'Could not send email. Add SMTP settings to contact-config.php (see contact-config.example.php) or enable PHP mail().';
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(405, ['ok' => false, 'message' => 'Method not allowed']);
}

$configPath = dirname(__DIR__) . '/contact-config.php';
if (!is_readable($configPath)) {
    json_out(503, [
        'ok' => false,
        'message' => 'Contact form is not configured. In the site root, copy contact-config.example.php to contact-config.php and set your xneelo mailbox addresses.',
    ]);
}

define('MOSS_CONTACT_CONFIG_LOAD', true);
/** @var array<string,mixed> $config */
$config = require $configPath;

$mailTo = trim((string) ($config['mail_to'] ?? ''));
$mailFrom = trim((string) ($config['mail_from'] ?? ''));
$mailFromName = trim((string) ($config['mail_from_name'] ?? 'Moss Labs'));
$sendVisitorReply = (bool) ($config['send_visitor_auto_reply'] ?? true);

if ($mailTo === '' || $mailFrom === '') {
    json_out(503, ['ok' => false, 'message' => 'Contact mail_to or mail_from is missing in contact-config.php.']);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: 'null', true);
if (!is_array($data)) {
    json_out(400, ['ok' => false, 'message' => 'Invalid JSON body.']);
}

if (!empty($data['_honeypot'])) {
    json_out(200, ['ok' => true]);
}

$max = [
    'name' => 120,
    'email' => 254,
    'company' => 200,
    'service_interest' => 80,
    'project_summary' => 2000,
    'timeline' => 120,
    'budget' => 80,
    'reference_links' => 1000,
    'message' => 8000,
];

$trim = static function (mixed $v, int $maxLen): string {
    $s = is_string($v) ? trim($v) : '';
    if (strlen($s) > $maxLen) {
        return substr($s, 0, $maxLen);
    }
    return $s;
};

$name = $trim($data['name'] ?? '', $max['name']);
$email = strtolower($trim($data['email'] ?? '', $max['email']));
$company = $trim($data['company'] ?? '', $max['company']);
$serviceInterest = $trim($data['service_interest'] ?? '', $max['service_interest']);
$projectSummary = $trim($data['project_summary'] ?? '', $max['project_summary']);
$timeline = $trim($data['timeline'] ?? '', $max['timeline']);
$budget = $trim($data['budget'] ?? '', $max['budget']);
$referenceLinks = $trim($data['reference_links'] ?? '', $max['reference_links']);
$message = $trim($data['message'] ?? '', $max['message']);

$flat = static function (string $s): string {
    return str_replace(["\r", "\n", '%0a', '%0d', '%0A', '%0D'], '', $s);
};

$name = $flat($name);
$email = $flat($email);

if ($name === '' || $email === '' || $message === '') {
    json_out(400, ['ok' => false, 'message' => 'Name, email, and message are required.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_out(400, ['ok' => false, 'message' => 'Please enter a valid email address.']);
}

$internalSubject = '[Contact] ' . $name;
$internalBody = "New enquiry from mosslabs.co.za contact form\n\n";
$internalBody .= "Name: {$name}\n";
$internalBody .= "Email: {$email}\n";
$internalBody .= 'Company: ' . ($company !== '' ? $company : '—') . "\n";
$internalBody .= 'Service interest: ' . ($serviceInterest !== '' ? $serviceInterest : '—') . "\n";
$internalBody .= 'Project summary: ' . ($projectSummary !== '' ? $projectSummary : '—') . "\n";
$internalBody .= 'Timeline: ' . ($timeline !== '' ? $timeline : '—') . "\n";
$internalBody .= 'Budget: ' . ($budget !== '' ? $budget : '—') . "\n";
$internalBody .= 'Reference links: ' . ($referenceLinks !== '' ? $referenceLinks : '—') . "\n\n";
$internalBody .= "Message:\n{$message}\n";

$fromHeader = $mailFromName !== ''
    ? sprintf('From: %s <%s>', mime_encode_header($mailFromName), $mailFrom)
    : 'From: ' . $mailFrom;

$headerLinesInternal = [
    $fromHeader,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
];

$errInternal = moss_send_message($config, $mailFrom, $mailTo, $internalSubject, $internalBody, $headerLinesInternal);
if ($errInternal !== null) {
    json_out(502, ['ok' => false, 'message' => $errInternal]);
}

if ($sendVisitorReply) {
    $visitorSubject = 'Thank you for contacting Moss Labs';
    $visitorBody = "Hi {$name},\n\n";
    $visitorBody .= "Thanks for reaching out — we've received your message and will reply within one business day.\n\n";
    $visitorBody .= "— The Moss Labs team\nhttps://mosslabs.co.za\n";

    $headerLinesVisitor = [
        $fromHeader,
        'Reply-To: ' . $mailTo,
        'X-Mailer: PHP/' . PHP_VERSION,
    ];

    moss_send_message($config, $mailFrom, $email, $visitorSubject, $visitorBody, $headerLinesVisitor);
}

json_out(200, ['ok' => true]);
