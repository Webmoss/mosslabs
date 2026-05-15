import { Resend } from 'resend';
import { buildClientConfirmationEmail, buildInternalNotificationEmail } from './lib/contactEmails.mjs';

const MAX = { name: 120, email: 254, company: 200, service_interest: 80, message: 8000, budget: 80 };

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

function trim(str, max) {
  const s = typeof str === 'string' ? str.trim() : '';
  if (s.length > max) return s.slice(0, max);
  return s;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*' }, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, message: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const internalTo = process.env.CONTACT_INTERNAL_EMAIL;

  if (!apiKey || !from) {
    console.error('Missing RESEND_API_KEY or RESEND_FROM');
    return json(500, { ok: false, message: 'Email is not configured on the server.' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { ok: false, message: 'Invalid JSON body.' });
  }

  if (body._honeypot) {
    return json(200, { ok: true });
  }

  const name = trim(body.name, MAX.name);
  const email = trim(body.email, MAX.email).toLowerCase();
  const company = trim(body.company, MAX.company);
  const service_interest = trim(body.service_interest, MAX.service_interest);
  const message = trim(body.message, MAX.message);
  const budget = trim(body.budget, MAX.budget);

  if (!name || !email || !message) {
    return json(400, { ok: false, message: 'Name, email, and message are required.' });
  }
  if (!isValidEmail(email)) {
    return json(400, { ok: false, message: 'Please enter a valid email address.' });
  }

  const resend = new Resend(apiKey);

  const clientMail = buildClientConfirmationEmail({
    name,
    email,
    company,
    service_interest,
    message,
    budget,
  });

  const sendClient = await resend.emails.send({
    from,
    to: email,
    replyTo: internalTo || undefined,
    subject: clientMail.subject,
    html: clientMail.html,
    text: clientMail.text,
  });

  if (sendClient.error) {
    console.error('Resend client mail error:', sendClient.error);
    return json(502, { ok: false, message: 'Could not send confirmation email.' });
  }

  if (internalTo) {
    const internal = buildInternalNotificationEmail({
      name,
      email,
      company,
      service_interest,
      message,
      budget,
    });
    const sendInternal = await resend.emails.send({
      from,
      to: internalTo,
      replyTo: email,
      subject: internal.subject,
      html: internal.html,
      text: internal.text,
    });
    if (sendInternal.error) {
      console.error('Resend internal mail error:', sendInternal.error);
    }
  }

  return json(200, { ok: true });
};
