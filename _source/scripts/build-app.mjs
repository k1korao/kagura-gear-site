import { build } from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import postcss from 'postcss';
import postcssModules from 'postcss-modules';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'app/dist');
const assetsDir = path.resolve(root, '../assets');
await fs.mkdir(dist, {recursive:true});
await fs.mkdir(assetsDir, {recursive:true});
const moduleCSS = new Map();
const cssCache = new Map();
const cssPlugin = {
  name: 'kikora-stable-css-modules',
  setup(build) {
    build.onLoad({filter:/\.module\.css$/}, async ({path: cssPath}) => {
      if (cssCache.has(cssPath)) return cssCache.get(cssPath);
      let names = {};
      const input = await fs.readFile(cssPath,'utf8');
      const hash = createHash('sha256').update(path.relative(root,cssPath)).digest('hex').slice(0,7);
      const result = await postcss([postcssModules({
        generateScopedName: name => `k_${hash}_${name}`,
        getJSON: (_file,json) => {names=json;}
      }),autoprefixer]).process(input,{from:cssPath});
      moduleCSS.set(cssPath,result.css);
      const output = {contents:`export default ${JSON.stringify(names)}`, loader:'js'};
      cssCache.set(cssPath,output);
      return output;
    });
  }
};
const aliases = {
  '@': path.join(root,'app/src'),
  'next/link': path.join(root,'app/shims/link.tsx'),
  'next/image': path.join(root,'app/shims/image.tsx'),
  'next/navigation': path.join(root,'app/shims/navigation.ts'),
  'next/dynamic': path.join(root,'app/shims/dynamic.tsx')
};
const common = {
  absWorkingDir:root, bundle:true, jsx:'automatic', target:'es2020', alias:aliases,
  plugins:[cssPlugin], logOverride:{'direct-eval':'silent','empty-import-meta':'silent'},
  define:{'process.env.NODE_ENV':'"production"','process.env.NEXT_PUBLIC_SITE_URL':'"https://kikoragear.com"','process.env.NEXT_PUBLIC_SUPPORT_EMAIL':'"support@kikoragear.com"'},
  legalComments:'eof'
};
const client = await build({...common, entryPoints:['app/client.tsx'], outfile:path.join(assetsDir,'kikora-app.js'), platform:'browser', format:'iife', minify:true, metafile:true});
await build({...common, entryPoints:['app/server.tsx'], outfile:path.join(dist,'server.mjs'), platform:'node', format:'esm', packages:'external'});
await build({entryPoints:[path.join(root,'app/tailwind.config.ts')],outfile:path.join(dist,'tailwind-config.mjs'),platform:'node',format:'esm'});
const {default:twconfig} = await import(pathToFileURL(path.join(dist,'tailwind-config.mjs')).href);
twconfig.content=[path.join(root,'app/**/*.{tsx,ts}')];
const globalCSS = await postcss([tailwindcss(twconfig),autoprefixer]).process(await fs.readFile(path.join(root,'app/src/app/globals.css'),'utf8'),{from:path.join(root,'app/src/app/globals.css')});
const css = globalCSS.css + '\n' + [...moduleCSS.entries()].sort(([a],[b])=>a.localeCompare(b)).map(([,value])=>value).join('\n');
await fs.writeFile(path.join(assetsDir,'kikora-app.css'),css);
const {renderPage,pageRoutes} = await import(pathToFileURL(path.join(dist,'server.mjs')).href);
const manifest=JSON.parse(await fs.readFile(path.join(root,'app/asset-manifest.json'),'utf8'));
const assets=Object.fromEntries(Object.entries(manifest).map(([key,item])=>[key,item.token]));
const pages=[];
for(const locale of ['zh','en','ja']) for(const route of pageRoutes) pages.push(await renderPage(route,locale,assets));
await fs.writeFile(path.join(dist,'prerender.json'),JSON.stringify(pages,null,2));
await fs.writeFile(path.join(dist,'bundle-meta.json'),JSON.stringify(client.metafile,null,2));
console.log(`Built KIKORA Shopify client, ${moduleCSS.size} component styles, ${pages.length} prerendered pages.`);
