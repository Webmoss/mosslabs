function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** @param {{ name: string; email: string; company?: string; service_interest?: string; message: string; budget?: string; supportEmail?: string }} p */
export function buildClientConfirmationEmail(p) {
  const name = escapeHtml(p.name);
  const supportEmail = escapeHtml(p.supportEmail || 'our team');
  const subject = 'We received your message — Moss Labs';

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
        <table role="presentation" width="100%" style="max-width:560px;background:rgba(10,32,24,0.85);border:1px solid rgba(34,197,94,0.25);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#22C55E;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">Moss Labs</div>
              <h1 style="margin:12px 0 0 0;font-size:22px;line-height:1.25;color:#E2F2ED;font-weight:700;">Thanks for reaching out, ${name}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px 28px;font-size:15px;line-height:1.6;color:#94A3B8;">
              <p style="margin:0 0 16px 0;">We have your note and will reply within <strong style="color:#E2F2ED;">24 hours</strong> on business days.</p>
              <p style="margin:0 0 16px 0;">If your request is urgent, reply to this email${p.supportEmail ? ` or write us at <a href="mailto:${supportEmail}" style="color:#22C55E;">${supportEmail}</a>` : ''}.</p>
              <p style="margin:0;">— The Moss Labs team</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px 28px;">
              <div style="height:1px;background:rgba(34,197,94,0.15);"></div>
              <p style="margin:16px 0 0 0;font-size:12px;color:#64748B;">You are receiving this because someone submitted the contact form using this address.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Thanks for reaching out, ${p.name}

We received your message and will reply within 24 hours on business days.

If your request is urgent, email ${p.supportEmail || 'our team'}

— Moss Labs
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
