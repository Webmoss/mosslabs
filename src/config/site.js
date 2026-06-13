/**
 * Public site configuration — edit here (no .env).
 * For local contact-form testing, temporarily set CONTACT_FORM_ENDPOINT to your PHP server, e.g.
 * 'http://127.0.0.1:8080/lib/contact.php' while running `php -S 127.0.0.1:8080 -t dist` after `npm run build`.
 */

/** Canonical production origin (no trailing slash). Used for SEO meta + sitemaps. */
export const SITE_URL = 'https://mosslabs.co.za';

/** Default social-share image (self-hosted, 1200x630). */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Shown in the UI and in contact-form error hints */
export const CONTACT_EMAIL = 'info@mosslabs.co.za';

/** POST URL for the PHP handler (see public/lib/contact.php). */
export const CONTACT_FORM_ENDPOINT = '/lib/contact.php';
