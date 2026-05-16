# Moss Labs

Marketing site built with React and Vite.

## Local development

1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Open **http://localhost:5173** in Chrome or Safari (use `http`, not `https`)

`npm run dev` should open your system browser automatically. If the address bar shows **about:blank**, you are in Cursor’s built-in preview—not the dev server. Paste `http://localhost:5173` into a normal browser tab instead.

If iTerm says **Port 5173 is already in use**, either open that URL in your browser (the server is already running) or run:

```bash
npm run dev:clean
```

That stops anything on ports 5173/5174 and starts Vite again.

### Contact form (needs Netlify Functions + Resend)

1. Copy `.env.example` to `.env` and set `RESEND_API_KEY`, `RESEND_FROM`, `PUBLIC_CONTACT_EMAIL`, `VITE_PUBLIC_CONTACT_EMAIL`, and optionally `CONTACT_INTERNAL_EMAIL`.
2. Install Netlify CLI: `npm i -g netlify-cli`
3. Run the full stack (site + contact API):

```bash
npm run dev:netlify
```

Open the URL Netlify prints (usually **http://localhost:8888**). The contact form will work there.

**Do not** set `VITE_CONTACT_FUNCTION_URL=http://localhost:8888/...` unless you know you need it. A relative path is used by default.

**Split setup (optional):** Terminal 1: `npm run dev:netlify` · Terminal 2: `npm run dev` (Vite proxies `/.netlify/functions` to port 8888).

## Netlify deployment

1. Connect the repo in Netlify; the included `netlify.toml` runs `npm run build` and publishes `dist`.
2. Set environment variables (Site settings → Environment variables):
   - `RESEND_API_KEY` — from [Resend](https://resend.com) (keep secret)
   - `RESEND_FROM` — verified sender, e.g. `Moss Labs <info@yourdomain.com>`
   - `VITE_PUBLIC_CONTACT_EMAIL` — shown on the site, e.g. `info@yourdomain.com`
   - `PUBLIC_CONTACT_EMAIL` — same address; used in confirmation emails
   - `CONTACT_INTERNAL_EMAIL` — optional inbox for inquiry copies (can match the address above)

   Mark only `RESEND_API_KEY` as secret. The repo configures `SECRETS_SCAN_OMIT_KEYS` for sender/inbox vars when they appear in public UI or email templates.

   **Contact form on Netlify:** Do **not** set `VITE_CONTACT_FUNCTION_URL` in Netlify (it is dev-only and will break production if it points at `localhost`). After changing env vars, trigger a **new deploy** so the site rebuilds. Ensure `RESEND_API_KEY` and `RESEND_FROM` apply to **Functions** (not only Builds) in Netlify → Environment variables → scopes.

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — ESLint
