/** Same-origin Netlify Function — works on Netlify and via Vite proxy in local dev. */
const CONTACT_ENDPOINT = '/.netlify/functions/contact';

/**
 * @param {Record<string, string>} payload
 * @returns {Promise<void>}
 */
export async function submitContactForm(payload) {
  let res;
  try {
    res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    const devHint = import.meta.env.DEV
      ? ' Run `npm run dev:netlify` (http://localhost:8888) or `npm run dev` with `npm run dev:netlify` in another terminal.'
      : '';
    throw new Error(`Could not reach the server.${devHint} Or use the email on this page.`);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = typeof data.message === 'string' ? data.message : 'Could not send your message.';
    throw new Error(message);
  }
}
