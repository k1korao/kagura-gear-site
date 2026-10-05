import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const theme = path.resolve(project, '..');
const publicDir = path.join(project, 'public');
const outputDir = path.join(project, 'dist');
const zipFile = path.join(outputDir, 'kikora-shopify-theme.zip');
const manifest = JSON.parse(await fs.readFile(path.join(project, 'app/asset-manifest.json'), 'utf8'));
const rendered = JSON.parse(await fs.readFile(path.join(project, 'app/dist/prerender.json'), 'utf8'));

const routeMap = {
  '/': '/',
  '/explore/glass': '/pages/glass',
  '/explore/glass/core': '/pages/glass-core',
  '/explore/glass/artist': '/pages/glass-artist',
  '/explore/glass/covers': '/pages/glass-covers',
  '/explore/keycaps': '/pages/keycaps',
  '/explore/metal': '/pages/metal',
  '/about': '/pages/about',
  '/faq': '/pages/faq',
  '/contact': '/pages/contact',
  '/shipping-policy': '/pages/shipping-policy',
  '/return-policy': '/pages/return-policy',
  '/privacy-policy': '/pages/privacy-policy',
  '/terms-of-service': '/pages/terms-of-service',
};
const descriptions = {
  zh: 'KIKORA（Kikora Gear）以游戏、动漫与独立艺术为灵感，探索玻璃鼠标垫、键帽及未来的金属客制化。浏览基础、画师与专辑封面系列的设计概念，了解品牌故事与共创计划。',
  en: 'Meet KIKORA (Kikora Gear): glass mousepads, keycaps and future metal customs inspired by games, anime and independent art. Explore the Core, Artist and Cover design studies, and the story behind the brand.',
  ja: 'ゲームやアニメ、独立した作家の表現から生まれるKIKORA。ガラスマウスパッドとキーキャップのデザイン、今後のメタルカスタム構想、ブランドの物語をご紹介します。',
};

await Promise.all(['assets', 'snippets', 'sections', 'layout', 'templates', 'config', 'locales'].map(dir => fs.mkdir(path.join(theme, dir), { recursive: true })));
await fs.mkdir(outputDir, { recursive: true });
for (const item of await fs.readdir(path.join(theme, 'snippets'))) {
  if (item.startsWith('kikora-render-')) await fs.unlink(path.join(theme, 'snippets', item));
}

const assets = Object.entries(manifest).filter(([original]) => !/\.(json|txt)$/i.test(original));
for (const [original, asset] of assets) {
  await fs.copyFile(path.join(publicDir, original.slice(1)), path.join(theme, 'assets', asset.file));
}

const liquidString = value => `'${String(value).replaceAll("'", '’').replaceAll('\n', ' ')}'`;
const assetTag = asset => `{{ '${asset.file}' | asset_url }}`;
const routeKey = route => route === '/' ? 'home' : route.replace(/^\/pages\//, '').replace(/[^a-z0-9-]/gi, '-');
const localeSetup = `{%- liquid\n  assign active_locale = locale | default: settings.default_language | default: 'zh'\n  if active_locale == 'auto'\n    assign active_locale = request.locale.iso_code | slice: 0, 2\n  endif\n  unless active_locale == 'en' or active_locale == 'ja'\n    assign active_locale = 'zh'\n  endunless\n-%}`;

function replaceAssets(html) {
  let result = html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  for (const [original, asset] of assets) {
    result = result.replaceAll(asset.token, assetTag(asset));
    result = result.replaceAll(`https://kikoragear.com${original}`, assetTag(asset));
    result = result.replaceAll(`"${original}"`, `"${assetTag(asset)}"`);
    result = result.replaceAll(`url(${original})`, `url(${assetTag(asset)})`);
  }
  for (const [oldRoute, newRoute] of Object.entries(routeMap).sort((a, b) => b[0].length - a[0].length)) {
    if (oldRoute === '/') continue;
    result = result.replaceAll(`href="${oldRoute}"`, `href="${newRoute}"`);
    result = result.replaceAll(`href="${oldRoute}?`, `href="${newRoute}?`);
    result = result.replaceAll(`href="${oldRoute}#`, `href="${newRoute}#`);
  }
  if (/__KIKORA_ASSET_\d+__/.test(result)) throw new Error('Unresolved asset token in prerender HTML');
  return result;
}

// Keep individual Liquid snippets small while splitting only between complete tags.
function splitMarkup(markup, maximumBytes = 32000) {
  const pieces = markup.match(/[^>]*>/g) ?? [markup];
  const consumed = pieces.join('').length;
  if (consumed < markup.length) pieces.push(markup.slice(consumed));
  const chunks = [];
  let chunk = '';
  for (const piece of pieces) {
    if (chunk && Buffer.byteLength(chunk + piece) > maximumBytes) { chunks.push(chunk); chunk = ''; }
    chunk += piece;
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

const records = [];
for (const row of rendered) {
  if (!row || !['zh', 'en', 'ja'].includes(row.locale) || !routeMap[row.path] || typeof row.html !== 'string') throw new Error(`Invalid prerender record: ${JSON.stringify({ path: row?.path, locale: row?.locale })}`);
  const shopifyPath = row.shopifyPath || routeMap[row.path];
  if (shopifyPath !== routeMap[row.path]) throw new Error(`Unexpected Shopify route ${shopifyPath} for ${row.path}`);
  const prefix = `kikora-render-${routeKey(shopifyPath)}-${row.locale}`;
  const chunks = splitMarkup(replaceAssets(row.html));
  const names = [];
  for (let i = 0; i < chunks.length; i++) {
    const name = `${prefix}-${i + 1}`;
    await fs.writeFile(path.join(theme, 'snippets', `${name}.liquid`), chunks[i]);
    names.push(name);
  }
  records.push({ ...row, shopifyPath, names });
}
for (const route of Object.keys(routeMap)) for (const locale of ['zh', 'en', 'ja']) {
  if (records.filter(row => row.path === route && row.locale === locale).length !== 1) throw new Error(`Expected exactly one ${locale} render of ${route}`);
}

const assetMap = `<script>window.KIKORA_ASSETS={\n${assets.map(([original, asset]) => `  ${JSON.stringify(original)}: {{ '${asset.file}' | asset_url | json }}`).join(',\n')}\n};</script>\n`;
await fs.writeFile(path.join(theme, 'snippets/kikora-assets.liquid'), assetMap);

let shell = `${localeSetup}\n{%- assign active_route = route -%}\n{%- if request.page_type == 'page' -%}{%- assign active_route = page.handle | prepend: '/pages/' -%}{%- endif -%}\n{%- case active_route -%}\n`;
for (const [original, shopifyPath] of Object.entries(routeMap)) {
  shell += `{%- when ${liquidString(shopifyPath)}${original !== shopifyPath ? `, ${liquidString(original)}` : ''} -%}\n`;
  shell += `<div id="kikora-root" data-route="${original}" data-locale="{{ active_locale }}">\n{%- case active_locale -%}\n`;
  for (const locale of ['zh', 'en', 'ja']) {
    const row = records.find(row => row.path === original && row.locale === locale);
    shell += `{%- when '${locale}' -%}\n${row.names.map(name => `{% render '${name}' %}`).join('')}\n`;
  }
  shell += `{%- endcase -%}\n</div>\n<script>window.KIKORA_PAGE={route:${JSON.stringify(original)},locale:{{ active_locale | json }},prerendered:true};</script>\n`;
}
shell += `{%- else -%}\n<main class="kikora-native">{% render 'kikora-native-header' %}<h1>{{ page.title | escape }}</h1><div class="kikora-native-content">{{ page.content }}</div>{% render 'kikora-native-footer' %}</main>\n{%- endcase -%}\n`;
await fs.writeFile(path.join(theme, 'snippets/kikora-page-content.liquid'), shell);

let seo = `${localeSetup}\n{%- liquid\n  assign active_route = request.path\n  if request.page_type == 'index'\n    assign active_route = '/'\n  elsif request.page_type == 'page'\n    assign active_route = page.handle | prepend: '/pages/'\n  endif\n  assign kikora_title = page_title | default: 'KIKORA — Collect Your World'\n  assign kikora_description = page_description\n  assign kikora_image = 'kikora-brand-kikora-search-cover.webp' | asset_url\n-%}\n`;
seo += `{%- if kikora_description == blank -%}{%- case active_locale -%}\n`;
for (const [locale, description] of Object.entries(descriptions)) seo += `{%- when '${locale}' -%}{%- assign kikora_description = ${liquidString(description)} -%}\n`;
seo += `{%- endcase -%}{%- endif -%}\n{%- case active_route -%}\n`;
for (const [original, shopifyPath] of Object.entries(routeMap)) {
  seo += `{%- when ${liquidString(shopifyPath)} -%}{%- case active_locale -%}\n`;
  for (const locale of ['zh', 'en', 'ja']) {
    const row = records.find(row => row.path === original && row.locale === locale);
    const brandedTitle = row.title ? (/kikora/i.test(row.title) ? row.title : `${row.title} | KIKORA`) : 'KIKORA — Collect Your World';
    seo += `{%- when '${locale}' -%}{%- assign kikora_title = ${liquidString(brandedTitle)} -%}\n`;
  }
  seo += `{%- endcase -%}\n`;
}
seo += `{%- endcase -%}\n{%- liquid\n  assign kikora_logo = 'kikora-brand-kikora-symbol.png' | asset_url\n  assign image_start = kikora_image | slice: 0, 2\n  assign logo_start = kikora_logo | slice: 0, 2\n  if image_start == '//'\n    assign kikora_image = kikora_image | prepend: 'https:'\n  endif\n  if logo_start == '//'\n    assign kikora_logo = kikora_logo | prepend: 'https:'\n  endif\n-%}\n<title>{{ kikora_title | escape }}</title>\n<meta name="description" content="{{ kikora_description | escape }}">\n<link rel="canonical" href="{{ canonical_url }}">\n{%- if request.page_type == '404' or request.page_type == 'cart' or request.page_type == 'search' or request.page_type == 'password' -%}<meta name="robots" content="noindex,follow">{%- else -%}<meta name="robots" content="index,follow,max-image-preview:large">{%- endif -%}\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="KIKORA">\n<meta property="og:title" content="{{ kikora_title | escape }}">\n<meta property="og:description" content="{{ kikora_description | escape }}">\n<meta property="og:url" content="{{ canonical_url }}">\n<meta property="og:image" content="{{ kikora_image }}">\n<meta property="og:image:width" content="1536">\n<meta property="og:image:height" content="1024">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="{{ kikora_title | escape }}">\n<meta name="twitter:description" content="{{ kikora_description | escape }}">\n<meta name="twitter:image" content="{{ kikora_image }}">\n`;
seo += `<script type="application/ld+json">{ "@context":"https://schema.org", "@graph":[{ "@type":"Organization", "@id":{{ shop.url | append: '/#organization' | json }}, "name":"KIKORA", "alternateName":"Kikora Gear", "url":{{ shop.url | json }}, "logo":{{ kikora_logo | json }}, "email":"support@kikoragear.com" },{ "@type":"WebSite", "@id":{{ shop.url | append: '/#website' | json }}, "name":"KIKORA", "alternateName":["Kikora Gear","kikoragear.com"], "url":{{ shop.url | json }}, "inLanguage":["zh-CN","en","ja"] },{ "@type":"WebPage", "url":{{ canonical_url | json }}, "name":{{ kikora_title | json }}, "description":{{ kikora_description | json }}, "isPartOf":{"@id":{{ shop.url | append: '/#website' | json }}} }] }</script>\n`;
await fs.writeFile(path.join(theme, 'snippets/kikora-seo.liquid'), seo);

let css = await fs.readFile(path.join(theme, 'assets/kikora-app.css'), 'utf8');
for (const [original, asset] of assets) css = css.replaceAll(asset.token, asset.file).replaceAll(original, asset.file);
if (/__KIKORA_ASSET_\d+__/.test(css)) throw new Error('Unresolved CSS asset token');
await fs.writeFile(path.join(theme, 'assets/kikora-app.css'), css);
await fs.access(path.join(theme, 'assets/kikora-app.js'));

// URL redirects are a separate Shopify import; uploading a theme never creates Pages.
const redirects = Object.entries(routeMap).filter(([from, to]) => from !== to).map(([from, to]) => `${from},${to}`);
redirects.push('/shrine,/', '/collections/deskmats,/pages/glass', '/collections/keycaps,/pages/keycaps', '/collections/accessories,/pages/metal');
for (const slug of ['kagura-control-pad', 'sakura-speed-pad', 'shrine-desk-mat']) redirects.push(`/products/${slug},/pages/glass`);
await fs.writeFile(path.join(outputDir, 'kikora-shopify-redirects.csv'), `Redirect from,Redirect to\n${redirects.join('\n')}\n`);
await fs.copyFile(path.join(publicDir, 'fonts/Oxanium-OFL.txt'), path.join(outputDir, 'KIKORA-Oxanium-OFL.txt'));
const fontLicense = await fs.readFile(path.join(publicDir, 'fonts/Oxanium-OFL.txt'), 'utf8');
await fs.writeFile(path.join(theme, 'assets/kikora-font-license.js'), `/*\n${fontLicense.replaceAll('*/', '* /')}\n*/\n`);

const archiveArgs = ['-q', '-r', zipFile, 'assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates', '-x', '*.DS_Store'];
await fs.rm(zipFile, { force: true });
const zip = spawnSync('/usr/bin/zip', archiveArgs, { cwd: theme, encoding: 'utf8' });
if (zip.status !== 0) throw new Error(`zip failed: ${zip.stderr}`);
const zipSize = (await fs.stat(zipFile)).size;
if (zipSize >= 50 * 1024 * 1024) throw new Error(`Theme ZIP exceeds Shopify's upload limit: ${zipSize}`);
console.log(JSON.stringify({ zipFile, bytes: zipSize, routes: Object.keys(routeMap).length, localizedRenders: records.length, assets: assets.length }, null, 2));
