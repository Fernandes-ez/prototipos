// Gera as artes dos anúncios (1080x1350) no padrão visual ezf.tech.
// Uso: node prospeccao/anuncios/gerar-anuncios.js   (precisa do pacote playwright)
const { chromium } = require('playwright');
const path = require('path');

const WHATS = 'WhatsApp +55 11 99108-4238';
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;

const BASE = `
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:'Unbounded',sans-serif}
.mono{font-family:'JetBrains Mono',monospace}
.abs{position:absolute}
.label{position:absolute;left:80px;top:140px;display:flex;align-items:center;gap:20px;font-family:'JetBrains Mono',monospace;font-size:24px}
.label i{display:block;width:48px;height:2px}
.logo{position:absolute;left:80px;top:1218px;font-size:44px;font-weight:600;letter-spacing:-0.02em}
.logo b{font-weight:600}
.handle{position:absolute;right:80px;top:1250px;font-family:'JetBrains Mono',monospace;font-size:22px}
`;

const DARK = `
body{background:#1c1026;color:#efe9f7}
.label{color:#b78be0}.label i{background:#b78be0}
h1{position:absolute;left:80px;top:215px;font-weight:400;font-size:76px;line-height:1.05;letter-spacing:-0.035em;width:830px}
h1 em{font-style:normal;color:#b78be0}
h1 span{color:#efe9f7}
.btn{position:absolute;left:80px;display:flex;align-items:center;gap:14px;height:95px;padding:0 44px;background:#f2b134;color:#1c1026;font-weight:500;font-size:31px;letter-spacing:-0.01em}
.contact{position:absolute;left:80px;font-family:'JetBrains Mono',monospace;font-size:24px;line-height:38px;color:#b9a9cc}
.logo{color:#efe9f7}.logo u{text-decoration:none;color:#8a14b8}.logo s{text-decoration:none;color:#b78be0}
.handle{color:#b9a9cc}
.tl{position:absolute;left:0;top:1129px;width:580px;height:3px;background:#a572d4}
.dot{position:absolute;left:580px;top:1110px;width:40px;height:40px;border-radius:50%;background:#f2b134}
.tag{position:absolute;left:640px;top:1115px;font-family:'JetBrains Mono',monospace;font-size:24px;color:#f2b134}
.list{position:absolute;left:80px;font-family:'JetBrains Mono',monospace;font-size:27px;line-height:50px;color:#d9ccea}
.list b{color:#f2b134;font-weight:500}
`;
const BRACE = `<svg class="abs" style="left:0;top:0" width="1080" height="1350"><path d="M908 100 Q995 100 995 190 L995 520 Q995 604 1080 604 Q995 604 995 690 L995 1020 Q995 1110 908 1110" fill="none" stroke="#6e4f93" stroke-width="4"/></svg>`;

const LIGHT = `
body{background:#ece8f4;color:#1c1026}
.label{color:#8a14b8}.label i{background:#8a14b8}
h1{position:absolute;left:80px;top:205px;font-weight:500;font-size:56px;line-height:1.08;letter-spacing:-0.04em;width:930px}
h1 em{font-style:normal;color:#8a14b8}
.logo{color:#1c1026}.logo u{text-decoration:none;color:#b78be0}.logo s{text-decoration:none;color:#b78be0}
.handle{color:#6a5a7e}
.arch{position:absolute;left:80px;top:410px;width:560px;height:780px;border-radius:280px 280px 0 0;background:#b78be0;overflow:hidden}
.win{position:absolute;left:70px;top:150px;width:620px;height:700px;background:#ece8f4;border-radius:12px}
.bar{height:48px;border-bottom:1px solid #d6cfe3;display:flex;align-items:center;gap:8px;padding:0 20px;font-family:'JetBrains Mono',monospace;font-size:19px;color:#6a5a7e}
.bar i{display:block;width:11px;height:11px;border-radius:50%;background:#cfc7dc}
.bar span{margin-left:22px}
.hero{position:absolute;left:20px;top:68px;width:520px;height:247px;background:#1c1026;overflow:hidden}
.hero h2{position:absolute;left:30px;top:34px;font-size:38px;font-weight:500;letter-spacing:-0.035em;color:#efe9f7;line-height:1.05;width:380px}
.hero p{position:absolute;left:30px;top:128px;font-family:'JetBrains Mono',monospace;font-size:17px;color:#b78be0}
.hero b{position:absolute;left:30px;top:172px;background:#efe9f7;color:#1c1026;font-weight:500;font-size:17px;padding:11px 18px;letter-spacing:-0.02em}
.hero .sun{position:absolute;right:-70px;bottom:-80px;width:220px;height:220px;border-radius:50%;background:#f2b134}
.cards{position:absolute;left:20px;top:335px;display:flex;gap:10px;width:640px}
.card{width:186px;height:118px;background:#e0d9ea;padding:18px 16px}
.card i{display:block;height:8px;background:#9d94ab;margin-bottom:10px;width:94px}
.card u{display:block;height:14px;background:#8a14b8;width:56px;text-decoration:none}
.row{position:absolute;left:20px;top:473px;width:640px;display:flex;gap:20px}
.in{width:360px;height:34px;border:1.5px solid #bdb3cc;margin-bottom:11px;font-family:'JetBrains Mono',monospace;font-size:16px;color:#8b7ea0;padding:6px 12px}
.blk{width:100px;height:79px;background:#1c1026}
.ln{position:absolute;height:2px;background:#1c1026}
.pt{position:absolute;width:12px;height:12px;border-radius:50%;background:#1c1026}
.pt.y{width:22px;height:22px;background:#f2b134;border:2px solid #1c1026}
.cl{position:absolute;left:700px;font-family:'JetBrains Mono',monospace;font-size:24px;color:#1c1026}
.chip{position:absolute;left:700px;top:1112px;font-family:'JetBrains Mono',monospace;font-size:22px;line-height:30px;color:#1c1026;background:#f2b134;padding:10px 18px}
`;

const darkPage = ({ label, h1, btn, contact, tag, list }) => `<!doctype html><meta charset="utf-8">${FONTS}<style>${BASE}${DARK}</style><body>
${BRACE}
<div class="label"><i></i>${label}</div>
<h1>${h1}</h1>
<div class="btn" style="top:535px">${btn} <span style="font-weight:400">→</span></div>
${list ? `<div class="list" style="top:700px">${list.map(t => `<div><b>→</b> ${t}</div>`).join('')}</div>` : ''}
<div class="contact" style="top:${list ? 930 : 710}px">${contact.join('<br>')}</div>
<div class="tl"></div><div class="dot"></div><div class="tag">${tag}</div>
<div class="logo"><s>{</s>ezf.<u>tech</u><s>}</s></div><div class="handle">@ezf.tech</div></body>`;

const lightPage = ({ label, h1, url, heroTitle, heroSub, heroBtn, rowText, callouts, chip }) => `<!doctype html><meta charset="utf-8">${FONTS}<style>${BASE}${LIGHT}</style><body>
<div class="label"><i></i>${label}</div>
<h1>${h1}</h1>
<div class="arch"><div class="win">
  <div class="bar"><i></i><i></i><i></i><span>${url}</span></div>
  <div class="hero"><h2>${heroTitle}</h2><p>${heroSub}</p><b>${heroBtn} →</b><div class="sun"></div></div>
  <div class="cards"><div class="card"><i></i><u></u></div><div class="card"><i></i><u></u></div><div class="card"><i></i><u></u></div></div>
  <div class="row"><div><div class="in">${rowText[0]}</div><div class="in">${rowText[1]}</div></div><div class="blk"></div></div>
</div></div>
${callouts.map(c => `<div class="ln" style="left:${c.x}px;top:${c.y}px;width:${680 - c.x}px"></div><div class="pt y" style="left:${c.x - 11}px;top:${c.y - 10}px"></div><div class="pt" style="left:674px;top:${c.y - 5}px"></div><div class="cl" style="top:${c.y - 17}px">${c.t}</div>`).join('')}
${chip ? `<div class="chip">${chip}</div>` : ''}
<div class="logo"><s>{</s>ezf.<u>tech</u><s>}</s></div><div class="handle">@ezf.tech</div></body>`;

const pecas = [
  ['anuncio-1-biosite', darkPage({
    label: 'Biosite', h1: 'Sua bio do<br>Instagram pode<br><em>{</em><span>atender</span><em>}</em> por você.',
    btn: 'Ver exemplo', contact: [WHATS, 'demo.ezf-tech.com'], tag: 'a partir de R$ 250' })],
  ['anuncio-2-google', lightPage({
    label: 'Google Meu Negócio', h1: 'Seu negócio é <span style="color:#8a14b8">{</span>achado<span style="color:#8a14b8">}</span><br>quando o cliente busca?',
    url: 'seu negócio no mapa', heroTitle: 'Seu<br>Negócio', heroSub: 'categoria · horário · endereço', heroBtn: 'Ligar',
    rowText: ['link do site', 'descrição'],
    callouts: [{ x: 585, y: 827, t: 'categorias certas' }, { x: 460, y: 954, t: 'fotos organizadas' }, { x: 350, y: 1073, t: 'link para o site' }] })],
  ['anuncio-3-prompts', lightPage({
    label: 'Guia de prompts', h1: 'Posts prontos<br>com <span style="color:#8a14b8">{</span>um prompt<span style="color:#8a14b8">}</span>.',
    url: 'seu assistente de IA', heroTitle: 'Legenda da<br>promoção', heroSub: 'no seu jeito de falar', heroBtn: 'Gerar',
    rowText: ['cole o prompt aqui', 'ajuste e poste'],
    callouts: [{ x: 585, y: 827, t: 'prompt pronto' }, { x: 460, y: 954, t: 'opções de legenda' }, { x: 350, y: 1073, t: 'você ajusta e posta' }] })],
  ['anuncio-4-pacote', darkPage({
    label: 'Kit presença digital', h1: 'Sua presença<br>digital <em>{</em><span>pronta</span><em>}</em><br>em um dia.',
    btn: 'Chamar no WhatsApp', contact: [WHATS, 'demo.ezf-tech.com'], tag: 'sem mensalidade',
    list: ['página para a bio', 'Google Meu Negócio ajustado', 'guia de prompts de IA'] })],
];

const em = t => `<span style="color:#8a14b8">{</span>${t}<span style="color:#8a14b8">}</span>`;
const pecasSite = [
  ['site-1-pagina', darkPage({ label: 'Página', h1: 'Sua empresa<br>em <em>{</em><span>uma página</span><em>}</em><br>só.',
    btn: 'Quero a Página', contact: [WHATS, 'ezf-tech.com'], tag: 'a partir de R$ 790',
    list: ['seus serviços, fotos e mapa', 'botão de WhatsApp', 'domínio no seu nome'] })],
  ['site-2-site', lightPage({ label: 'Site', h1: 'Sua empresa encontrada<br>' + em('fora do Instagram') + '.',
    url: 'seunegocio.com.br', heroTitle: 'Sua<br>Empresa', heroSub: 'início · coleções · contato', heroBtn: 'WhatsApp',
    rowText: ['mapa e horário', 'contato'], chip: 'a partir de R$ 1.490',
    callouts: [{ x: 585, y: 827, t: 'WhatsApp em cada item' }, { x: 460, y: 954, t: 'até 20 destaques' }, { x: 350, y: 1073, t: 'contato e mapa' }] })],
  ['site-3-catalogo', darkPage({ label: 'Catálogo', h1: 'Muito produto,<br>você <em>{</em><span>atualiza</span><em>}</em><br>sozinho.',
    btn: 'Quero o Catálogo', contact: [WHATS, 'ezf-tech.com'], tag: 'a partir de R$ 2.490',
    list: ['itens ilimitados, com filtros', 'painel no celular', 'página própria para cada item'] })],
  ['site-4-automacao-simples', lightPage({ label: 'Automação simples', h1: 'Tire uma tarefa repetida<br>do seu ' + em('dia') + '.',
    url: 'lembrete automático', heroTitle: 'Lembrete<br>do horário', heroSub: 'enviado pelo WhatsApp', heroBtn: 'Enviar',
    rowText: ['nome do cliente', 'data e horário'], chip: 'a partir de R$ 690',
    callouts: [{ x: 585, y: 827, t: 'aviso no WhatsApp' }, { x: 460, y: 954, t: 'formulário na planilha' }, { x: 350, y: 1073, t: 'sem ninguém digitar' }] })],
  ['site-5-automacao-completa', darkPage({ label: 'Automação completa', h1: 'Vários sistemas<br><em>{</em><span>conversando</span><em>}</em><br>entre si.',
    btn: 'Conversar sobre o meu caso', contact: [WHATS, 'ezf-tech.com'], tag: 'a partir de R$ 1.690',
    list: ['três ou mais integrações', 'levantamento do processo antes', 'entrega por etapas'] })],
  ['site-6-atendimento-ia', darkPage({ label: 'Atendimento com IA no WhatsApp', h1: 'Nenhum cliente<br><em>{</em><span>esperando</span><em>}</em><br>resposta.',
    btn: 'Testar 14 dias grátis', contact: [WHATS, 'ezf-tech.com'], tag: 'R$ 197/mês',
    list: ['IA com as regras do seu negócio', 'passa para a pessoa certa', 'painel com leads e histórico'] })],
  ['site-7-agendamento', lightPage({ label: 'Agendamento online', h1: 'Seu cliente marca<br>horário ' + em('sozinho') + '.',
    url: 'agende seu horário', heroTitle: 'Escolha<br>seu horário', heroSub: 'serviço · dia · horário', heroBtn: 'Agendar',
    rowText: ['seu nome', 'seu WhatsApp'], chip: 'R$ 99/mês<br>sem implantação',
    callouts: [{ x: 585, y: 827, t: 'a cara da sua marca' }, { x: 460, y: 954, t: 'agenda do dia' }, { x: 350, y: 1073, t: 'confirma no WhatsApp' }] })],
  ['site-8-sistema', darkPage({ label: 'Sistema sob medida', h1: 'Sua operação<br>fora da<br><em>{</em><span>planilha</span><em>}</em>.',
    btn: 'Conversar sobre o meu sistema', contact: [WHATS, 'ezf-tech.com'], tag: 'a partir de R$ 3.900',
    list: ['levantamento antes do orçamento', 'painel, cadastros e relatórios', 'entrega por etapas'] })],
];

(async () => {
  const fs = require('fs');
  fs.mkdirSync(path.join(__dirname, 'site'), { recursive: true });
  const b = await chromium.launch();
  const grupos = [['', pecas], ['site/', pecasSite]];
  for (const [pasta, lista] of grupos) {
    for (const [nome, html] of lista) {
      const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
      await pg.setContent(html, { waitUntil: 'networkidle' });
      await pg.evaluate(() => document.fonts.ready);
      await pg.waitForTimeout(400);
      await pg.screenshot({ path: path.join(__dirname, pasta, pasta ? nome.replace(/^site-/, '') : nome) + '.png' });
      await pg.close();
      console.log('ok', pasta + nome);
    }
  }
  await b.close();
})();
