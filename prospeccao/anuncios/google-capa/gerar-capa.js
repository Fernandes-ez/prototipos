// Capa do Perfil da Empresa no Google (16:9), no visual do site ezf.tech.
// Uso: node prospeccao/anuncios/google-capa/gerar-capa.js   (precisa do pacote playwright)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
// Imagens embutidas (data URI): o navegador bloqueia file:// quando o HTML vem de setContent.
const A = (f) => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'assets', f)).toString('base64');

const html = `<!doctype html><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#1B1026;--line:#3A2A4E;--line-strong:#4A3862;--text:#fff;--muted:#B9ABCB;--lilac:#B98BE0;--amber:#F2B233}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1920px;height:1080px;position:relative;overflow:hidden;background:var(--bg);color:var(--text);font-family:'Geist',sans-serif}
.glow{position:absolute;right:-200px;top:-260px;width:1100px;height:1100px;border-radius:50%;background:radial-gradient(closest-side,rgba(138,18,180,.28),rgba(138,18,180,0))}
.logo{position:absolute;left:120px;top:96px;height:58px}
.label{position:absolute;left:120px;top:262px;display:flex;align-items:center;gap:18px;font-family:'Geist Mono',monospace;font-size:24px;color:var(--lilac)}
.label i{display:block;width:44px;height:2px;background:var(--lilac)}
h1{position:absolute;left:120px;top:318px;width:800px;font-weight:600;font-size:66px;line-height:1.06;letter-spacing:-0.037em}
h1 em{font-style:normal;color:var(--lilac)}
.sub{position:absolute;left:120px;top:650px;width:700px;font-size:27px;line-height:1.5;color:var(--muted)}
.chips{position:absolute;left:120px;top:810px;display:flex;gap:14px;font-family:'Geist Mono',monospace;font-size:22px}
.chips span{padding:12px 22px;border:1px solid var(--line-strong);border-radius:8px;color:#D8CCE6}
.dash{position:absolute;left:1000px;top:220px;width:1040px;overflow:hidden;background:#1E1B24;border:1px solid var(--line-strong);border-radius:14px}
.dash img{display:block;width:100%}
.chat{position:absolute;left:1370px;top:560px;width:470px;overflow:hidden;border:1px solid #5A4676;border-radius:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.65)}
.chat img{display:block;width:100%}
.cap{position:absolute;left:1000px;top:964px;font-family:'Geist Mono',monospace;font-size:20px;color:var(--muted)}
</style>
<body>
<div class="glow"></div>
<img class="logo" src="${A('ezf-logo-dark.png')}" alt="">
<div class="label"><i></i>Enzo · desenvolvedor · São Paulo</div>
<h1>Sites, atendimento automático no WhatsApp e sistemas para <em>a sua empresa.</em></h1>
<p class="sub">Eu desenho, programo e mantenho. Você fala direto comigo, do orçamento à entrega.</p>
<div class="chips"><span>Sites</span><span>Automação</span><span>Sistemas</span></div>
<div class="dash"><img src="${A('puka-dashboard.png')}" alt=""></div>
<div class="chat"><img src="${A('puka-conversa.png')}" alt=""></div>
<div class="cap">Puka: CRM com atendimento por IA no WhatsApp</div>
</body>`;

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await pg.setContent(html, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(600);
  await pg.screenshot({ path: path.join(__dirname, 'capa-google-1920x1080.png') });
  await b.close();
  console.log('ok');
})();
