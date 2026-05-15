const defaultEndpoint = '/.netlify/functions/contact';

/**
 * @param {Record<string, string>} payload
 * @returns {Promise<void>}
 */
export async function submitContactForm(payload) {
  const url = import.meta.env.VITE_CONTACT_FUNCTION_URL || defaultEndpoint;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = typeof data.message === 'string' ? data.message : 'Could not send your message.';
    throw new Error(message);
  }
}
