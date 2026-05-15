const defaultEndpoint = '/.netlify/functions/contact';

/**
 * @param {Record<string, string>} payload
 * @returns {Promise<void>}
 */
export async function submitContactForm(payload) {
  // Use relative URL in dev/production unless you override for a special setup.
  const url = import.meta.env.VITE_CONTACT_FUNCTION_URL || defaultEndpoint;

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    const devHint = import.meta.env.DEV
      ? ' Start the API with: npm run dev:netlify (then use the URL it prints, usually http://localhost:8888).'
      : '';
    throw new Error(`Could not reach the server.${devHint} Or email info@mosslabs.co.za directly.`);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = typeof data.message === 'string' ? data.message : 'Could not send your message.';
    throw new Error(message);
  }
}
