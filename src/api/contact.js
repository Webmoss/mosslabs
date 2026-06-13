import { CONTACT_EMAIL, CONTACT_FORM_ENDPOINT } from '@/config/site';

/**
 * @param {Record<string, string>} payload
 * @returns {Promise<void>}
 */
export async function submitContactForm(payload) {
  let res;
  try {
    res = await fetch(CONTACT_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    const devHint = import.meta.env.DEV
      ? ` Run \`npm run build\` and \`php -S 127.0.0.1:8080 -t dist\`, set CONTACT_FORM_ENDPOINT in src/config/site.js to http://127.0.0.1:8080/lib/contact.php, restart Vite, and try again. Or email ${CONTACT_EMAIL}.`
      : '';
    throw new Error(`Could not reach the server.${devHint}`);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = typeof data.message === 'string' ? data.message : 'Could not send your message.';
    throw new Error(message);
  }
}
