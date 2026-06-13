<?php

/**
 * Minimal SMTP client (AUTH LOGIN) for Moss Labs contact form.
 * Supports SMTPS (SSL, typically port 465) and STARTTLS (typically port 587).
 */
declare(strict_types=1);

/**
 * @param array{
 *   host:string,
 *   port?:int,
 *   encryption?:string,
 *   username:string,
 *   password:string,
 *   timeout?:int,
 *   verify_peer?:bool,
 *   verify_peer_name?:bool
 * } $smtp
 * @param list<string> $headerLines Header lines without trailing CRLF (must include From:)
 */
function moss_smtp_send(
    array $smtp,
    string $envelopeFrom,
    string $to,
    string $subject,
    string $body,
    array $headerLines,
): ?string {
    $host = trim((string) ($smtp['host'] ?? ''));
    $user = (string) ($smtp['username'] ?? '');
    $pass = (string) ($smtp['password'] ?? '');
    if ($host === '' || $user === '' || $pass === '') {
        return 'SMTP is missing host, username, or password.';
    }

    $encryption = strtolower(trim((string) ($smtp['encryption'] ?? 'ssl')));
    if (!in_array($encryption, ['ssl', 'tls', 'none'], true)) {
        $encryption = 'ssl';
    }

    $port = (int) ($smtp['port'] ?? ($encryption === 'ssl' ? 465 : 587));
    $timeout = (int) ($smtp['timeout'] ?? 30);
    $verifyPeer = (bool) ($smtp['verify_peer'] ?? true);
    $verifyPeerName = (bool) ($smtp['verify_peer_name'] ?? true);

    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer' => $verifyPeer,
            'verify_peer_name' => $verifyPeerName,
        ],
    ]);

    $remote = $encryption === 'ssl'
        ? 'ssl://' . $host . ':' . $port
        : 'tcp://' . $host . ':' . $port;

    $errno = 0;
    $errstr = '';
    $conn = @stream_socket_client(
        $remote,
        $errno,
        $errstr,
        $timeout,
        STREAM_CLIENT_CONNECT,
        $ctx
    );
    if ($conn === false) {
        return 'Could not connect to SMTP server: ' . ($errstr !== '' ? $errstr : 'unknown error') . " ($errno).";
    }

    stream_set_timeout($conn, $timeout);

    $err = moss_smtp_expect($conn, [220]);
    if ($err !== null) {
        fclose($conn);
        return $err;
    }

    $err = moss_smtp_write_expect($conn, 'EHLO mosslabs-contact', [250]);
    if ($err !== null) {
        fclose($conn);
        return $err;
    }

    if ($encryption === 'tls') {
        $err = moss_smtp_write_expect($conn, 'STARTTLS', [220]);
        if ($err !== null) {
            fclose($conn);
            return $err;
        }
        $cryptoOk = @stream_socket_enable_crypto($conn, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        if ($cryptoOk !== true) {
            fclose($conn);
            return 'SMTP STARTTLS negotiation failed.';
        }
        $err = moss_smtp_write_expect($conn, 'EHLO mosslabs-contact', [250]);
        if ($err !== null) {
            fclose($conn);
            return $err;
        }
    }

    $err = moss_smtp_write_expect($conn, 'AUTH LOGIN', [334]);
    if ($err !== null) {
        fclose($conn);
        return $err;
    }
    $err = moss_smtp_write_expect($conn, base64_encode($user), [334]);
    if ($err !== null) {
        fclose($conn);
        return $err;
    }
    $err = moss_smtp_write_expect($conn, base64_encode($pass), [235]);
    if ($err !== null) {
        fclose($conn);
        return 'SMTP authentication failed. Check username (full email) and password.';
    }

    $fromAddr = moss_smtp_extract_addr($envelopeFrom);
    if ($fromAddr === null) {
        fclose($conn);
        return 'Invalid envelope sender address.';
    }

    $err = moss_smtp_write_expect($conn, 'MAIL FROM:<' . $fromAddr . '>', [250]);
    if ($err !== null) {
        fclose($conn);
        return $err;
    }

    $toAddr = moss_smtp_extract_addr($to);
    if ($toAddr === null) {
        fclose($conn);
        return 'Invalid recipient address.';
    }

    $err = moss_smtp_write_expect($conn, 'RCPT TO:<' . $toAddr . '>', [250, 251]);
    if ($err !== null) {
        fclose($conn);
        return $err;
    }

    $err = moss_smtp_write_expect($conn, 'DATA', [354]);
    if ($err !== null) {
        fclose($conn);
        return $err;
    }

    $msgId = '<' . bin2hex(random_bytes(12)) . '@mosslabs-contact>';
    $date = gmdate('D, j M Y H:i:s') . ' +0000';

    $subjectLine = moss_smtp_mime_header($subject);

    $headersBlock = "Date: {$date}\r\n";
    $headersBlock .= 'Message-ID: ' . $msgId . "\r\n";
    $headersBlock .= 'To: ' . $to . "\r\n";
    $headersBlock .= 'Subject: ' . $subjectLine . "\r\n";
    foreach ($headerLines as $line) {
        $line = str_replace(["\r", "\n"], '', (string) $line);
        if ($line !== '') {
            $headersBlock .= $line . "\r\n";
        }
    }
    $headersBlock .= "MIME-Version: 1.0\r\n";
    $headersBlock .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headersBlock .= "Content-Transfer-Encoding: 8bit\r\n";

    $bodyNorm = str_replace(["\r\n", "\r"], "\n", $body);
    $bodyLines = explode("\n", $bodyNorm);
    $dotSafe = [];
    foreach ($bodyLines as $bl) {
        if (isset($bl[0]) && $bl[0] === '.') {
            $dotSafe[] = '.' . $bl;
        } else {
            $dotSafe[] = $bl;
        }
    }
    $bodyBlock = implode("\r\n", $dotSafe);

    $payload = $headersBlock . "\r\n" . $bodyBlock . "\r\n.\r\n";
    fwrite($conn, $payload);

    $err = moss_smtp_expect($conn, [250]);
    if ($err !== null) {
        fclose($conn);
        return $err;
    }

    fwrite($conn, "QUIT\r\n");
    fclose($conn);

    return null;
}

/** @return list<string> */
function moss_smtp_read($conn): array
{
    $lines = [];
    while (($line = fgets($conn, 8192)) !== false) {
        $lines[] = $line;
        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }

    return $lines;
}

/** @param list<int> $okCodes */
function moss_smtp_expect($conn, array $okCodes): ?string
{
    $lines = moss_smtp_read($conn);
    if ($lines === []) {
        return 'SMTP connection closed unexpectedly.';
    }
    $last = $lines[count($lines) - 1];
    $code = (int) substr($last, 0, 3);
    if (!in_array($code, $okCodes, true)) {
        $msg = trim(preg_replace('/\s+/', ' ', implode('', $lines)));

        return $msg !== '' ? $msg : 'Unexpected SMTP response code ' . $code;
    }

    return null;
}

/** @param list<int> $okCodes */
function moss_smtp_write_expect($conn, string $line, array $okCodes): ?string
{
    fwrite($conn, $line . "\r\n");

    return moss_smtp_expect($conn, $okCodes);
}

function moss_smtp_extract_addr(string $email): ?string
{
    $e = trim($email);
    if (preg_match('/<([^>]+)>/', $e, $m)) {
        $e = trim($m[1]);
    }
    if (!filter_var($e, FILTER_VALIDATE_EMAIL)) {
        return null;
    }

    return $e;
}

function moss_smtp_mime_header(string $text): string
{
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($text, 'UTF-8', 'B', "\r\n");
    }

    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}
