<?php

/**
 * Copy this file to contact-config.php in the site root (next to index.html), not inside lib/.
 * The contact handler is public/lib/contact.php — it loads ../contact-config.php.
 * Do not commit contact-config.php (it holds secrets) — it is gitignored.
 *
 * Outgoing mail: set the `smtp` block using the same details as an email client.
 * xneelo typically uses smtp.yourdomain, port 465, SSL/TLS, and your full mailbox address as the username.
 *
 * @see https://xneelo.co.za/help-centre/email/ssl/
 * @see https://xneelo.co.za/help-centre/email/email-settings/
 */
if (!defined('MOSS_CONTACT_CONFIG_LOAD')) {
    header('HTTP/1.0 403 Forbidden');
    exit('Forbidden');
}

return [
    /** Inbox that receives enquiry notifications */
    'mail_to' => 'info@mosslabs.co.za',
    /** Must match an existing mailbox (used in From: and SMTP envelope) */
    'mail_from' => 'noreply@mosslabs.co.za',
    'mail_from_name' => 'Moss Labs',
    /** Send a short plain-text confirmation to the visitor */
    'send_visitor_auto_reply' => true,

    /**
     * SMTP (recommended on xneelo). If host/username/password are set, lib/contact.php uses SMTP instead of PHP mail().
     * Replace smtp.example.co.za with smtp.your-domain (or the server hostname from your control panel if required).
     */
    'smtp' => [
        'host' => 'smtp.mosslabs.co.za',
        'port' => 465,
        'encryption' => 'ssl', // ssl (SMTPS, e.g. 465) | tls (STARTTLS, e.g. 587)
        'username' => 'noreply@mosslabs.co.za',
        'password' => 'YOUR_MAILBOX_PASSWORD',
        'timeout' => 30,
        // If the server uses a certificate name that does not match `host`, you can try:
        // 'verify_peer' => false,
        // 'verify_peer_name' => false,
    ],
];
