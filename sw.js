// Top Shrinks offline cache. Build 9da3fd8d
const CACHE='topshrinks-9da3fd8d';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-512-maskable.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res&&res.ok&&new URL(r.url).origin===self.location.origin){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;})
 .catch(()=>r.mode==='navigate'?caches.match('./index.html'):new Response('',{status:504}))));});
