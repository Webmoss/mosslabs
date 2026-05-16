const defaultEndpoint = '/.netlify/functions/contact';

function resolveContactUrl() {
  // Production always uses same-origin Netlify Functions (never a dev-only override).
  if (import.meta.env.PROD) {
    return defaultEndpoint;
  }

  const override = import.meta.env.VITE_CONTACT_FUNCTION_URL;
  if (!override) return defaultEndpoint;

  // Vite on :5173 proxies /.netlify/functions → :8888; an absolute :8888 URL skips that proxy.
  if (typeof window !== 'undefined') {
    const port = window.location.port;
    if ((port === '5173' || port === '5174') && /localhost:8888/.test(override)) {
      return defaultEndpoint;
    }
  }

  return override;
}

/**
 * @param {Record<string, string>} payload
 * @returns {Promise<void>}
 */
export async function submitContactForm(payload) {
  const url = resolveContactUrl();

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    const devHint = import.meta.env.DEV
      ? ' Run `npm run dev:netlify` in another terminal (or use only `npm run dev:netlify` and open http://localhost:8888).'
      : '';
    throw new Error(`Could not reach the server.${devHint} Or use the email on this page.`);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = typeof data.message === 'string' ? data.message : 'Could not send your message.';
    throw new Error(message);
  }
}
