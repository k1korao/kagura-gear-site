# KIKORA Shopify theme

This branch contains the native Shopify theme for KIKORA, adapted from the existing KIKORA Next.js website. Connect Shopify to **shopify-theme**, not main.

The standard theme folders at repository root are the deployable theme. The original Next.js website and its Vercel deployment remain on main; this branch does not change main.

## Rebuild

Editable React components, the exact three-language copy, CSS, image sources, the asset manifest, and build scripts are preserved in `_source/`. Shopify ignores this folder via `.shopifyignore`.

```sh
cd _source
npm ci
npm run build
```

The build updates the theme assets and Liquid prerender snippets at repository root, and writes the theme ZIP and legacy URL redirects CSV to `_source/dist/`. Commit both source changes and the rebuilt theme files to this branch. Shopify can then sync the branch.

The theme preserves the original cover gallery sliding interaction, Artist front/back base controls, Core interaction, brand narrative, and Chinese/English/Japanese copy. There are 14 real routes, represented by the homepage and Shopify Pages. Contact and newsletter requests use the existing Vercel sender API with an explicit origin allowlist; no email API secret belongs in this repository.

## Required Shopify Pages

`glass`, `glass-core`, `glass-artist`, `glass-covers`, `keycaps`, `metal`, `about`, `faq`, `contact`, `shipping-policy`, `return-policy`, `privacy-policy`, and `terms-of-service`. Pages use the default page template; the existing contact template is also supported. Unknown pages retain their original title and content.

Product and cart templates are informative placeholders for the current design-study website. They do not invent stock, prices, or launch a checkout.

The source snapshot was prepared locally in `work/kikora-shopify-theme`; the original website remains available in the main branch history. Oxanium's license is included in `_source/public/fonts/Oxanium-OFL.txt` and `assets/kikora-font-license.js`.
