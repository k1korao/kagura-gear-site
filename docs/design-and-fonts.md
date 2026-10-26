# KIKORA design and font sources

The homepage is a brand story. Product explorers live at /explore/glass, /explore/keycaps and /explore/metal. Glass has Core, Artist and Cover series. Cover-series artwork is one collection, not the overall site identity. Concept imagery does not establish final manufacturing specifications or announced collaborations.

## Typography

Display type: Oxanium, unmodified variable font from the official Google Fonts repository. Copyright 2019 The Oxanium Project Authors. Licensed under the SIL Open Font License 1.1. The font is self-hosted at public/fonts/Oxanium-Variable.ttf and its complete copyright notice and license are retained at public/fonts/Oxanium-OFL.txt. The license permits use and embedding subject to its conditions; the font is not copyright-free. Do not sell the font on its own or remove its accompanying license.

Source: https://github.com/google/fonts/tree/main/ofl/oxanium
License: https://github.com/google/fonts/blob/main/ofl/oxanium/OFL.txt

The current KIKORA wordmark is the supplied A variant from `logo矢量图.zip`, including its kunai and chain. Its original vector paths are extracted from the PDF-compatible RGB Illustrator master and used in `KaguraWordmark.tsx`. The black/white foreground adapts to the surface; the original lime and pink offsets are retained. Do not substitute the B variant without the owner’s request. No WALLHACK logo or font file is included.

## Interaction reference

The public WALLHACK explorer was inspected for its behavior: https://wallhack.com/
Public reference resources: wh-explorer.js, wh-bundle-3d.js and wh-explorer.css, loaded by that page.

Our implementation is original React and Three.js code. It uses generated geometry, original studio textures, local concept artwork, and a white continuous plane. It implements camera travel to selected pads, neighbour picking, a restrained drag peek, and reduced-motion support. No WALLHACK product model, image, shader source or frontend bundle is redistributed.

## Adding products

Category routing is defined in src/app/explore/[category]/page.tsx. Glass collection metadata and cover editions live in ShrineExperience.tsx. Confirm actual specifications before changing the development status or introducing checkout. The three studio models in GlassExplorer.tsx are concept geometry, not production CAD.

## Artist collectibles and localized copy — October 2026

The homepage now tells a three-chapter story: independent creators, art taking physical form, and collecting as part of everyday life. Wraith/Reyna artwork and printed keycaps anchor the hero collage. Creator collaboration and future editions are explicitly in development; no invented partners, editions sold, edition sizes or production specifications are presented as established facts.

English and Japanese have individually authored copy dictionaries. The site defaults to English; saved Chinese or unsupported language preferences fall back to English. A one-year `kagura-language` preference cookie controls server-rendered copy, document language, page metadata and customer welcome emails. Switching reloads the same URL, preserving collection hashes and the selected cover's `art` query. Browser auto-translation is discouraged with `translate="no"` and Google notranslate metadata. This is editorial localization, not a claim of human native-language sign-off.

Legacy demo cloth-pad product and collection URLs redirect into current collection pages. Their unconfirmed prices and Shopify placeholder instructions are no longer part of the visitor journey. Shipping and returns pages reflect the current prelaunch status.

## Current brand identity — 26 October 2026

The owner-supplied identity uses graffiti lettering, sharp cuts and displaced colour edges. Screen colours from `KIKORA logo_COLOR.jpg`: lime `#b4f528`, purple `#521be6`, pink `#f52882` and black. The website uses black and paper-white base surfaces, lime on dark surfaces, purple for readable links and controls on light surfaces, and pink for small offset details. Product artwork and glass/metal material colours remain independent of the UI palette.

The A wordmark with kunai and chain is used in navigation, footer, hero, product previews and social preview. `public/brand/kikora-wordmark-light.svg` is the original black A01 artwork and `kikora-wordmark-dark.svg` is white A02. Both are tightly bounded, transparent, original vector paths. The C single-letter mark is reserved for small icons and decorative emblems; it does not replace the complete website wordmark. New browser, Apple and social icons use `kikora-graffiti-*` filenames for cache separation. Older identity assets remain only for compatibility with existing references.

The homepage retains its English/Japanese story, glass-finish switch, interactive keycaps, artwork carousel, collection routes and prelaunch status. Reduced-motion alternatives are retained. Current previews are design studies and do not establish final product artwork or released collaborations.

Cover edition display names are separately authored in English and Japanese and are shared by selectors, card labels, accessibility labels and detail panels. English lettering inside the artwork remains part of the artwork; the stable `art` identifiers and chosen cover survive a locale change.
