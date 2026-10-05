import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(await fs.readFile(path.join(root,'app/asset-manifest.json'),'utf8'));
const assets=Object.fromEntries(Object.entries(manifest).map(([src,item])=>[src,`/assets/${item.file}`]));
const types={'.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.ttf':'font/ttf','.json':'application/json'};
http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost:3116');
    let asset=url.pathname.startsWith('/assets/')?url.pathname.slice('/assets/'.length):manifest[url.pathname]?.file;
    if(asset){
      asset=path.basename(asset);
      const data=await fs.readFile(path.join(root,'theme/assets',asset));
      res.writeHead(200,{'Content-Type':types[path.extname(asset)]||'application/octet-stream','Access-Control-Allow-Origin':'*'});res.end(data);return;
    }
    const pages=JSON.parse(await fs.readFile(path.join(root,'app/dist/prerender.json'),'utf8'));
    const page=pages.find(item=>item.shopifyPath===url.pathname&&item.locale==='zh')||pages.find(item=>item.path==='/'&&item.locale==='zh');
    let html=page.html;
    for(const[src,item]of Object.entries(manifest))html=html.replaceAll(item.token,assets[src]);
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.end(`<!doctype html><html lang="zh-CN"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.title}</title><link rel="stylesheet" href="/assets/kikora-app.css"></head><body><div id="kikora-root">${html}</div><script>window.KIKORA_ASSETS=${JSON.stringify(assets)};window.KIKORA_PAGE=${JSON.stringify({route:page.path,locale:'zh',prerendered:true})};</script><script src="/assets/kikora-app.js" defer></script></body></html>`);
  }catch(error){res.writeHead(500);res.end(String(error));}
}).listen(3116,'127.0.0.1',()=>console.log('KIKORA Shopify browser QA: http://127.0.0.1:3116'));
