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

The contact form calls `/.netlify/functions/contact`. With plain `npm run dev`, that endpoint is not available unless you proxy it. Use **Netlify CLI** for a full stack local run:

```bash
npm i -g netlify-cli
netlify dev
```

Copy `.env.example` to `.env` for optional `VITE_CONTACT_FUNCTION_URL` overrides.

## Netlify deployment

1. Connect the repo in Netlify; the included `netlify.toml` runs `npm run build` and publishes `dist`.
2. Set environment variables (Site settings → Environment variables):
   - `RESEND_API_KEY` — from [Resend](https://resend.com)
   - `RESEND_FROM` — verified sender, e.g. `Moss Labs <hello@mosslabs.co.za>`
   - `CONTACT_INTERNAL_EMAIL` — optional; team inbox for a copy of each inquiry (and `replyTo` on the client confirmation)

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — ESLint
