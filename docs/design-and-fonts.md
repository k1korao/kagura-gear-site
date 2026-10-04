# KAGURA design and font sources

The homepage is a brand story. Product explorers live at /explore/glass, /explore/keycaps and /explore/metal. Glass has Core, Artist and Cover series. Cover-series artwork is one collection, not the overall site identity. Concept imagery does not establish final manufacturing specifications or announced collaborations.

## Typography

Display type: Oxanium, unmodified variable font from the official Google Fonts repository. Copyright 2019 The Oxanium Project Authors. Licensed under the SIL Open Font License 1.1. The font is self-hosted at public/fonts/Oxanium-Variable.ttf and its complete copyright notice and license are retained at public/fonts/Oxanium-OFL.txt. The license permits use and embedding subject to its conditions; the font is not copyright-free. Do not sell the font on its own or remove its accompanying license.

Source: https://github.com/google/fonts/tree/main/ofl/oxanium
License: https://github.com/google/fonts/blob/main/ofl/oxanium/OFL.txt

The KAGURA wordmark is an original vector drawing, implemented in KaguraWordmark.tsx. No WALLHACK logo or font file is included.

## Interaction reference

The public WALLHACK explorer was inspected for its behavior: https://wallhack.com/
Public reference resources: wh-explorer.js, wh-bundle-3d.js and wh-explorer.css, loaded by that page.

Our implementation is original React and Three.js code. It uses generated geometry, original studio textures, local concept artwork, and a white continuous plane. It implements camera travel to selected pads, neighbour picking, a restrained drag peek, and reduced-motion support. No WALLHACK product model, image, shader source or frontend bundle is redistributed.

## Adding products

Category routing is defined in src/app/explore/[category]/page.tsx. Glass collection metadata and cover editions live in ShrineExperience.tsx. Confirm actual specifications before changing the development status or introducing checkout. The three studio models in GlassExplorer.tsx are concept geometry, not production CAD.

## Artist collectibles and localized copy — October 2026

The homepage now tells a three-chapter story: independent creators, art taking physical form, and collecting as part of everyday life. Wraith/Reyna artwork and printed keycaps anchor the hero collage. Creator collaboration and future editions are explicitly in development; no invented partners, editions sold, edition sizes or production specifications are presented as established facts.

Chinese, English and Japanese have individually authored copy dictionaries. The site defaults to Chinese. A one-year `kagura-language` preference cookie controls server-rendered copy, document language, page metadata and customer welcome emails. Switching reloads the same URL, preserving collection hashes and the selected cover's `art` query. Browser auto-translation is discouraged with `translate="no"` and Google notranslate metadata. This is editorial localization, not a claim of human native-language sign-off.

Legacy demo cloth-pad product and collection URLs redirect into current collection pages. Their unconfirmed prices and Shopify placeholder instructions are no longer part of the visitor journey. Shipping and returns pages reflect the current prelaunch status.

## Open Interval symbol

`public/brand/kagura-symbol.svg` and `KaguraSymbol.tsx` contain an original, non-letter spatial emblem. Two suspended folds leave a central opening, suggesting a frame, an entrance or a display plane without assigning a single literal meaning. Two tonal faces create restrained 2.5D depth. Its silhouette also works in a single ink. This replaces the Refracted Orbit proposal following the owner's request for a simpler symbol and more interpretive space.

The component inherits currentColor and uses face opacity, so the same geometry works on light and dark backgrounds. It needs no masks, filters, gradients or unique IDs. Desktop navigation combines the emblem with the existing custom KAGURA wordmark. Mobile navigation uses the emblem alone. The hero stamp, footer, browser and touch icons share the same identity. It is not traced from WALLHACK or another peripheral brand. No trademark clearance is implied.

Cover edition display names are separately authored in Chinese, English and Japanese and are shared by selectors, card labels, accessibility labels and detail panels. English lettering inside the artwork remains part of the artwork; the stable `art` identifiers and chosen cover survive a locale change.
