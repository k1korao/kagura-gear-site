# KIKORA

KIKORA is a brand showcase for glass mousepads, metal keycaps and independent design studies. The site presents concepts and accepts contact and collaboration enquiries. It does not accept orders, take payments or redeem promotional codes.

## Stack and development

Next.js App Router, TypeScript, Tailwind CSS and React. Deploy the frontend and server routes on Vercel.

```sh
npm install
npm run dev
npm run lint
npm run build
node --test tests/newsletter.test.mjs
```

The default development address is `http://localhost:3000`.

## Current pages and interactions

- `/` and `/shrine`: brand story, original logo keycaps, local lettering interaction and black/white glass preview.
- `/explore/glass` and its collection pages: glass design studies.
- `/explore/keycaps` and its collection pages: keycap concepts.
- `/about`, `/faq` and `/contact`: brand information and enquiries.
- Shipping, returns, privacy and terms pages describe the current showcase stage.
- Legacy shop and product routes redirect to the relevant showcase pages.
- English and Japanese copy, keyboard controls and reduced-motion support remain available.

The logo keyboard is a local visual interaction. It does not submit text or contact an external service. Product images are concepts, and do not establish stock, final specifications, prices or release dates.

## Contact and email updates

The public inbox is `support@kikoragear.com`. Contact links and the form's email-app fallback use this address.

`POST /api/contact` sends enquiries through Resend. `POST /api/newsletter` sends a welcome email and a separate internal notification. Configure these server-side variables in Vercel, using a sender domain verified in Resend:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL` (defaults to the public support inbox)
- `NEWSLETTER_FROM_EMAIL` (falls back to `CONTACT_FROM_EMAIL`)

Never commit credentials. `.env.example` contains public defaults and empty placeholders for server credentials and sender addresses. Missing email configuration returns a clear unavailable response and an email-app fallback. Do not test the live forms with invented addresses.

Newsletter notifications go to the three team inboxes listed in `src/app/api/newsletter/route.ts`. This feature does not store a subscriber database, deduplicate signups, schedule campaigns or manage an unsubscribe list. The existing reply-to-unsubscribe contact option remains available. The newsletter tests mock all provider calls and send no email.

Mail APIs allow the current `kikoragear.com` and `www.kikoragear.com` origins, plus same-origin requests for previews and local development. Origin checks are not authentication for non-browser clients.

## Vercel deployment and domain connection

Import the GitHub repository into Vercel and use the default Next.js build configuration (`npm run build`). The production source of truth is the commit shown by the Vercel production deployment; a local working branch is not necessarily deployed.

`NEXT_PUBLIC_SITE_URL` defaults to `https://kikoragear.com`. It sets canonical links, social metadata, robots and sitemap URLs. `NEXT_PUBLIC_SUPPORT_EMAIL` defaults to `support@kikoragear.com`.

Add the root and `www` hostnames in Vercel Settings > Domains. Copy the exact DNS records shown there into the domain's active DNS provider. Website hosting, domain registration/DNS and mailbox delivery are separate services. Preserve existing mail-related MX, SPF, DKIM and DMARC records when changing website DNS. No commerce platform is required to run this showcase.

After deploying, check the homepage, collection pages, contact page, both languages, `robots.txt` and `sitemap.xml`. Verify email delivery only with an authorized real test address.

## Search and assets

Search metadata and structured data are generated from the site configuration. The supplied KIKORA logo, emblem and keycap glyph assets remain unchanged. Asset and design notes are in `docs/`.
