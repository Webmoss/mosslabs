# Moss Labs

Marketing site built with React and Vite, deployed as static files on **xneelo** (or any Apache host with PHP for the contact form).

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

### Contact form (PHP + SMTP on the server)

The UI posts JSON to **`src/config/site.js`** → `CONTACT_FORM_ENDPOINT` (default **`/lib/contact.php`**).

On the server, **`contact-config.php`** defines **`mail_to`**, **`mail_from`**, and an **`smtp`** block. When **`smtp.host`**, **`smtp.username`**, and **`smtp.password`** are set, mail is sent over **SMTP (AUTH LOGIN)**; otherwise PHP **`mail()`** is used as a fallback.

Typical **xneelo** outgoing settings ([SSL/TLS for email](https://xneelo.co.za/help-centre/email/ssl/), [email settings](https://xneelo.co.za/help-centre/email/email-settings/)):

- **Server:** `smtp.yourdomain.co.za` (or the hostname shown in your control panel if the domain form does not work)
- **Port:** `465` with **`encryption`:** **`ssl`**
- **Username:** full mailbox address (e.g. `noreply@mosslabs.co.za`)
- **Password:** that mailbox’s password

Copy **`public/contact-config.example.php`** to **`contact-config.php`** in the **site root** (next to `index.html`), fill in **`smtp`**, and deploy **`lib/contact.php`** + **`lib/moss-smtp.php`**.

**Local Vite (`npm run dev`):** there is no PHP by default. To test end-to-end: `npm run build`, add **`dist/contact-config.php`** at the site root (next to **`dist/index.html`**), run `php -S 127.0.0.1:8080 -t dist`, temporarily set **`CONTACT_FORM_ENDPOINT`** in **`src/config/site.js`** to `http://127.0.0.1:8080/lib/contact.php`, restart Vite, then submit. Revert the URL before deploying.

## SEO / prerendering

`npm run build` is a three-step pipeline: it builds the client bundle, builds a
server bundle (`src/entry-server.jsx`), then runs **`scripts/prerender.js`** to
write fully-rendered static HTML for each route (home + every published
`/blog/<slug>`). This means crawlers and social scrapers get real markup instead
of an empty SPA shell. The prerender also regenerates **`dist/sitemap.xml`**.

- Per-route `<title>`/meta/canonical/Open Graph are managed by
  **`src/components/Seo.jsx`** (react-helmet-async) and baked into the static HTML.
- Blog posts (`src/data/blogPosts.js`) render as crawlable pages at
  **`/blog/<slug>`**; the markdown renderer is code-split so it never ships in the
  home-page bundle.
- The social share image is self-hosted at **`/og-image.jpg`** (1200×630).
- Project images ship as **WebP** with JPG fallback (`<picture>`).

## xneelo deployment

1. **Build:** `npm run build`
2. Upload the contents of **`dist/`** into your domain’s web root (e.g. `public_html`), including **`.htaccess`**, the prerendered **`blog/`** pages, **`lib/contact.php`**, **`lib/moss-smtp.php`**, and **`contact-config.example.php`**.
3. In File Manager, copy **`contact-config.example.php`** → **`contact-config.php`**. Set **`mail_to`**, **`mail_from`**, **`mail_from_name`**, and the **`smtp`** block (host, port, encryption, username, password) using your xneelo mailbox details.
4. Ensure **PHP** is enabled for the domain. **`contact-config.php`** must sit in the **site root** (same level as **`index.html`**); **`lib/contact.php`** loads it from there.
5. If sending fails, verify SMTP host/port/SSL in the [xneelo email help centre](https://xneelo.co.za/help-centre/email/email-settings/) and that **`smtp.username`** is the **full email address**.

**Routing:** `.htaccess` first serves prerendered pages at clean, extensionless URLs (`/blog/<slug>` → `/blog/<slug>.html`, no trailing-slash redirect), then falls back to `index.html` for any other unknown path so client-side routes still resolve. Real files (JS/CSS/images, **`lib/contact.php`**, etc.) are served normally.

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build (client + SSR bundle + static prerender)
- `npm run build:client` — client bundle only (skips prerender)
- `npm run prerender` — run the prerender step against existing build output
- `npm run preview` — preview the production build (no PHP unless you proxy or change `CONTACT_FORM_ENDPOINT` in `src/config/site.js`)
- `npm run lint` — ESLint
