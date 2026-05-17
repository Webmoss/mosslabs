function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function unescapeHtml(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

/** @param {{ name: string; email: string; company?: string; service_interest?: string; message: string; budget?: string; supportEmail?: string }} p */
export function buildClientConfirmationEmail(p) {
  const name = escapeHtml(p.name);
  const supportEmail = escapeHtml(p.supportEmail || '');
  const subject = 'Thank you for contacting Moss Labs';

  const summaryRows = [
    p.company?.trim() && ['Company', escapeHtml(p.company.trim())],
    p.service_interest?.trim() && ['Service interest', escapeHtml(p.service_interest.trim())],
    p.budget?.trim() && ['Budget range', escapeHtml(p.budget.trim())],
    p.message?.trim() && ['Your message', escapeHtml(p.message.trim())],
  ].filter(Boolean);

  const summaryHtml = summaryRows.length
    ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0 0 0;border:1px solid rgba(34,197,94,0.2);border-radius:12px;overflow:hidden;">
${summaryRows
  .map(
    ([label, value], i) => `<tr>
  <td colspan="2" style="padding:${i === 0 ? '14px' : '10px'} 16px 6px 16px;font-size:11px;font-family:ui-monospace,monospace;text-transform:uppercase;letter-spacing:0.12em;color:#22C55E;">${label}</td>
</tr>
<tr>
  <td colspan="2" style="padding:0 16px ${i === summaryRows.length - 1 ? '14px' : '10px'} 16px;font-size:14px;line-height:1.55;color:#E2F2ED;white-space:pre-wrap;">${value}</td>
</tr>`
  )
  .join('')}
</table>`
    : '';

  const contactLine = p.supportEmail
    ? `If anything is time-sensitive, reply to this email or contact us at <a href="mailto:${supportEmail}" style="color:#22C55E;text-decoration:none;">${supportEmail}</a>.`
    : 'If anything is time-sensitive, reply directly to this email and we will prioritise your request.';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${subject}</title>
</head>
<body style="margin:0;background:#030F0A;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#E2F2ED;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#030F0A;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background:rgba(10,32,24,0.9);border:1px solid rgba(34,197,94,0.25);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 12px 32px;">
              <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#22C55E;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">Moss Labs</div>
              <h1 style="margin:14px 0 0 0;font-size:24px;line-height:1.3;color:#E2F2ED;font-weight:700;">Thank you, ${name}</h1>
              <p style="margin:12px 0 0 0;font-size:15px;line-height:1.6;color:#94A3B8;">Your enquiry has been received successfully.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 8px 32px;font-size:15px;line-height:1.65;color:#94A3B8;">
              <p style="margin:0 0 16px 0;">We appreciate you taking the time to reach out. At Moss Labs we partner with businesses to design, build, and grow their digital presence — from websites and ecommerce to SEO, hosting, and custom software.</p>
              <p style="margin:0 0 16px 0;">A member of our team will review your submission and respond within <strong style="color:#E2F2ED;">one business day</strong> (Monday–Friday). If your project has a deadline, please mention it when we follow up so we can align on timing from the start.</p>
            </td>
          </tr>
          ${
            summaryRows.length
              ? `<tr>
            <td style="padding:0 32px 8px 32px;">
              <p style="margin:0;font-size:13px;font-family:ui-monospace,monospace;text-transform:uppercase;letter-spacing:0.14em;color:#22C55E;">Summary of your enquiry</p>
              ${summaryHtml}
            </td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding:16px 32px 8px 32px;font-size:15px;line-height:1.65;color:#94A3B8;">
              <p style="margin:0 0 16px 0;font-size:13px;font-family:ui-monospace,monospace;text-transform:uppercase;letter-spacing:0.14em;color:#22C55E;">What happens next</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:0 0 12px 0;vertical-align:top;width:28px;font-size:15px;color:#22C55E;font-weight:700;">1.</td>
                  <td style="padding:0 0 12px 0;font-size:15px;line-height:1.55;color:#94A3B8;">We review your goals, scope, and any context you shared.</td>
                </tr>
                <tr>
                  <td style="padding:0 0 12px 0;vertical-align:top;width:28px;font-size:15px;color:#22C55E;font-weight:700;">2.</td>
                  <td style="padding:0 0 12px 0;font-size:15px;line-height:1.55;color:#94A3B8;">We reply with thoughtful next steps — questions, a call, or a tailored proposal where appropriate.</td>
                </tr>
                <tr>
                  <td style="padding:0;vertical-align:top;width:28px;font-size:15px;color:#22C55E;font-weight:700;">3.</td>
                  <td style="padding:0;font-size:15px;line-height:1.55;color:#94A3B8;">If we are a good fit, we outline timelines, deliverables, and investment so you can decide with clarity.</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px 32px;font-size:15px;line-height:1.65;color:#94A3B8;">
              <p style="margin:0 0 20px 0;">${contactLine}</p>
              <p style="margin:0 0 4px 0;color:#E2F2ED;font-weight:600;">Warm regards,</p>
              <p style="margin:0;color:#94A3B8;">The Moss Labs team<br />
              <a href="https://mosslabs.co.za" style="color:#22C55E;text-decoration:none;">mosslabs.co.za</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px 32px;">
              <div style="height:1px;background:rgba(34,197,94,0.15);"></div>
              <p style="margin:16px 0 0 0;font-size:12px;line-height:1.5;color:#64748B;">You received this email because a contact form was submitted using ${escapeHtml(p.email)}. If you did not make this request, you can safely ignore this message.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const summaryText = summaryRows.length
    ? `\n\n--- Your enquiry ---\n${summaryRows.map(([label, value]) => `${label}: ${unescapeHtml(value)}`).join('\n')}\n`
    : '';

  const text = `Thank you, ${p.name}

Your enquiry has been received successfully.

We appreciate you taking the time to reach out. At Moss Labs we partner with businesses to design, build, and grow their digital presence — from websites and ecommerce to SEO, hosting, and custom software.

A member of our team will review your submission and respond within one business day (Monday–Friday). If your project has a deadline, mention it when we follow up so we can align on timing from the start.
${summaryText}
What happens next:
1. We review your goals, scope, and any context you shared.
2. We reply with thoughtful next steps — questions, a call, or a tailored proposal where appropriate.
3. If we are a good fit, we outline timelines, deliverables, and investment so you can decide with clarity.

${p.supportEmail ? `If anything is time-sensitive, reply to this email or contact us at ${p.supportEmail}.` : 'If anything is time-sensitive, reply directly to this email.'}

Warm regards,
The Moss Labs team
https://mosslabs.co.za

---
You received this email because a contact form was submitted using ${p.email}. If you did not make this request, you can safely ignore this message.
`;

  return { subject, html, text };
}

/** @param {{ name: string; email: string; company?: string; service_interest?: string; message: string; budget?: string }} p */
export function buildInternalNotificationEmail(p) {
  const subject = `[Contact] ${p.name}`;
  const rows = [
    ['Name', p.name],
    ['Email', p.email],
    ['Company', p.company || '—'],
    ['Service', p.service_interest || '—'],
    ['Budget', p.budget || '—'],
    ['Message', p.message],
  ];
  const html = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#0f172a;">
<h2 style="margin:0 0 12px;">New contact inquiry</h2>
<table style="border-collapse:collapse;width:100%;max-width:560px;">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;width:120px;vertical-align:top;">${escapeHtml(
        k
      )}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;white-space:pre-wrap;">${escapeHtml(
        v
      )}</td></tr>`
  )
  .join('')}
</table></body></html>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n\n');
  return { subject, html, text };
}
