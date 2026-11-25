/* SUP Brasil: FONTE ÚNICA de dados. Edite só aqui.
   Origem: posts do Instagram @supbrasil2020, telefones e endereço (25/11/2026) e os 4 modelos
   (medidas, litros, pesos e preços) informados por Fernandes em 25/11/2026.

   PENDÊNCIAS INTERNAS (não aparecem no site; campo null usa um texto neutro):
   - prazo, garantia, reparo, frete: confirmar com a SUP Brasil.
   - depoimentos: o bloco só aparece quando houver depoimento real autorizado.
   - promo.ate é suposição. Confirmar data final e se os preços já incluem os R$ 200.
   - kit e sinal vieram do post do 10'0; confirmar se valem para os 4 modelos.
   - artes sem 'fotos' (Onda Azul, Flor de Lótus) e a foto do Compacto: enviar fotos reais. */
window.SUP = {
  contato: { nome:'Osmar', zap:'5511954334404', tel:'(11) 95433-4404' },     // atendimento principal (1 clique)
  contato2:{ nome:'Otávio', zap:'5511921868337', tel:'(11) 92186-8337' },    // aparece só no rodapé
  endereco:'R. São Donaciano, 234a, Cidade Patriarca, São Paulo, SP, 03553-090',
  instagram:'supbrasil2020',
  prova:'Mais de 800 pranchas vendidas',
  construcao:{ bloco:'EPS T4', fibra:'330 g', resina:'Epóxi UV' },
  sinal:500, parcelas:6,
  // perfil: usado nos filtros ('leve', 'familia', 'travessia'). foto: usada quando a arte não tem foto própria.
  shapes:[
    { id:'compacto', nome:'Compacto 9\'6"', medida:'9\'6" × 31" × 4,25"', litros:155, pesoMax:85, aVista:2250, cartao:2520,
      perfil:'leve', quilhas:'Quilhas 2+1', uso:'Para pessoas mais leves, jovens ou marolinha.',
      artes:['onda-azul','flor-de-lotus'], foto:{arquivo:'bico-mar-verde-500', alt:'Bico de prancha sobre mar verde'} },
    { id:'classico', nome:'Clássico 10\'0"', medida:'10\'0" × 33" × 4"', litros:180, pesoMax:120, aVista:2400, cartao:2700,
      perfil:'familia', quilhas:'Quilhas 2+1', uso:'O carro-chefe: iniciantes e uso geral em represa ou mar calmo.',
      artes:['mandala','leao'] },
    { id:'grande', nome:'Grande Porte 10\'8"', medida:'10\'8" × 34" × 5"', litros:225, pesoMax:150, aVista:2650, cartao:2970,
      perfil:'familia', quilhas:'Quilhas 2+1', uso:'Para quem pesa mais de 110 kg ou leva criança ou pet no bico.',
      artes:['tartaruga','tribal-madeira'] },
    { id:'travessia', nome:'Travessia 11\'0"', medida:'11\'0" × 31" × 4,75"', litros:205, pesoMax:115, aVista:2750, cartao:3090,
      perfil:'travessia', quilhas:'Quilha única', uso:'Touring: bico deslocado para deslizar em represa, rio e remadas longas.',
      artes:['laranja-represa','madeira-classica'] }
  ],
  perfis:{ todos:'Todos', familia:'Iniciante & Família', travessia:'Travessia', leve:'Leve & Agilidade' },
  // a quilha entra conforme o modelo (campo 'quilhas')
  kit:['Prancha com 2 artes à sua escolha','Remo de alumínio preto','Leash','Deck antiderrapante','Protetor de borda'],
  // a faixa some depois da data 'ate' (AAAA-MM-DD). A data final é uma suposição: confirmar.
  promo:{ ate:'2026-11-30', faixa:'Black Week: R$ 200 de desconto na prancha', nota:'O desconto de R$ 200 da Black Week é confirmado no WhatsApp antes do sinal.' },
  prazo:null,      // texto do prazo de produção e retirada
  garantia:null,   // tempo e cobertura da garantia
  reparo:null,     // como funciona o reparo
  frete:null,      // faixa de valores por região
  depoimentos:[],  // {texto:'', nome:'', cidade:''} com autorização do cliente
  // 'fotos': [arquivo .webp, largura, altura, rótulo]. Sem 'fotos' = arte sob encomenda.
  artes:{
    'onda-azul':{ nome:'Onda Azul' },
    'flor-de-lotus':{ nome:'Flor de Lótus' },
    mandala:{ nome:'Mandala', texto:'Traço escuro pelo deck e pelo fundo.', fotos:[['mandala-frente',400,1440,'frente'],['mandala-verso',400,1440,'verso']] },
    leao:{ nome:'Leão', texto:'Pintado dos dois lados, sobre madeira escura.', fotos:[['leao-frente',400,1440,'frente'],['leao-verso',400,1440,'verso']] },
    tartaruga:{ nome:'Tartaruga', texto:'Tartaruga e grafismos em azul sobre madeira.', fotos:[['tartaruga-azul-frente',400,1440,'frente'],['tartaruga-azul-verso',400,1440,'verso']] },
    'tribal-madeira':{ nome:'Tribal Madeira', texto:'Grafismo tribal fechado sobre madeira.', fotos:[['tribal-madeira',101,383,'fundo']] },
    'laranja-represa':{ nome:'Laranja Represa', texto:'Laranja aberto, visível de longe na água.', paisagem:true, fotos:[['laranja-represa-500',500,666,'bico na água']] },
    'madeira-classica':{ nome:'Madeira Clássica', texto:'Veio de madeira e borda escura.', fotos:[['madeira-classica',72,255,'prancha']] }
  },
  // artes que já saíram da casa e podem ser pedidas em qualquer modelo
  galeria:[
    { id:'tartaruga-tribal', nome:'Tartaruga tribal', video:true, fotos:[['tartaruga-bico',166,575,'frente']] },
    { id:'fogo', nome:'Céu em fogo', fotos:[['fogo-frente',400,1440,'frente'],['fogo-verso',400,1440,'verso']] },
    { id:'guerreira', nome:'Guerreira', fotos:[['guerreira-frente',400,1440,'frente'],['guerreira-verso',400,1440,'verso']] },
    { id:'mandala-azul', nome:'Mandala azul', fotos:[['mandala-azul-frente',400,1440,'frente'],['mandala-azul-verso',400,1440,'verso']] },
    { id:'hibisco', nome:'Hibisco', fotos:[['hibisco-frente',400,1440,'frente'],['hibisco-verso',400,1440,'verso']] }
  ],

  shape(id){ return this.shapes.find(x=>x.id===id); },
  // imagem de uma arte dentro de um modelo (usada na loja e no catálogo)
  midia(sh, idArte, base){
    const a=this.artes[idArte];
    if(!a.fotos) return `<div class="midia cheia"><img src="${base}${sh.foto.arquivo}.webp" width="500" height="889" loading="lazy" alt="Foto ilustrativa: ${sh.foto.alt}"><p class="selo">Arte sob encomenda. Peça foto ou simulação no WhatsApp.</p></div>`;
    return `<div class="midia${a.paisagem?' cheia':''}">`+a.fotos.map(([f,w,h,r])=>`<img src="${base}${f}.webp" width="${w}" height="${h}" loading="lazy" style="max-height:${Math.round(h*1.4)}px" alt="${a.nome}, ${r}">`).join('')+'</div>';
  },
  // escolha de arte em botões
  opcoesArte(sh, nomeCampo){
    return `<fieldset class="chips"><legend>Arte</legend>${sh.artes.map((id,i)=>`<label><input type="radio" name="${nomeCampo}" value="${id}"${i?'':' checked'}><span>${this.artes[id].nome}</span></label>`).join('')}</fieldset>`;
  },
  // filtros por perfil: mostra só os [data-perfil] escolhidos
  filtros(barra, lista){
    barra.innerHTML=Object.entries(this.perfis).map(([k,t])=>`<button type="button" data-f="${k}" aria-pressed="${k==='todos'}">${t}</button>`).join('');
    barra.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; this.filtrar(barra,lista,b.dataset.f); });
  },
  filtrar(barra, lista, f){
    barra.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===f));
    lista.querySelectorAll('[data-perfil]').forEach(el=>el.hidden=f!=='todos'&&el.dataset.perfil!==f);
  },

  brl(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:v%1?2:0}); },
  link(msg){ return `https://wa.me/${this.contato.zap}?text=${encodeURIComponent(msg)}`; },
  promoAtiva(){ return new Date() <= new Date(this.promo.ate+'T23:59:59-03:00'); },
  minimo(){ return this.shapes.reduce((a,b)=>a.aVista<b.aVista?a:b); }
};

/* Único ponto de medição. Pronto para GA4 (gtag ou dataLayer) e Meta Pixel (fbq).
   Não envie dados pessoais (peso, CEP, texto da mensagem). */
window.trackEvent = function(nome, dados={}){
  if(window.gtag) window.gtag('event', nome, dados);
  else (window.dataLayer = window.dataLayer || []).push({event:nome, ...dados});
  if(window.fbq) window.fbq('trackCustom', nome, dados);
};

// roda no <head>: decide a faixa antes da primeira pintura, sem pulo de layout
if(!SUP.promoAtiva()) document.documentElement.classList.add('sem-promo');

document.addEventListener('click', e => {
  const a = e.target.closest('a[data-zap]');
  if(!a) return;
  a.href = SUP.link(a.dataset.zap); a.target = '_blank'; a.rel = 'noopener';
  trackEvent('whatsapp_click', {origem:a.dataset.origem || a.closest('section[id]')?.id || 'pagina'});
});

addEventListener('DOMContentLoaded', () => {
  const S=SUP, c=S.construcao, min=S.minimo();
  const textos = {
    prova:S.prova, faixa:S.promo.faixa, notaPromo:S.promo.nota, endereco:S.endereco,
    bloco:c.bloco, fibra:c.fibra, resina:c.resina,
    resumo:`${S.shapes.length} modelos, do ${S.shapes[0].nome} ao ${S.shapes.at(-1).nome}, com a sua arte. Direto da fábrica.`,
    aPartir:S.brl(min.aVista), sinal:S.brl(S.sinal), tel1:`${S.contato.nome}: ${S.contato.tel}`, tel2:`${S.contato2.nome}: ${S.contato2.tel}`
  };
  document.querySelectorAll('[data-t]').forEach(el => el.textContent = textos[el.dataset.t]);
  // respostas ainda não preenchidas mantêm o texto neutro do HTML
  document.querySelectorAll('[data-campo]').forEach(el => { if(S[el.dataset.campo]) el.textContent = S[el.dataset.campo]; });
  const urls = { maps:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(S.endereco), insta:'https://www.instagram.com/'+S.instagram,
                 tel1:'tel:+'+S.contato.zap, tel2:'tel:+'+S.contato2.zap };
  document.querySelectorAll('[data-url]').forEach(el => el.href = urls[el.dataset.url]);

  document.body.insertAdjacentHTML('beforeend',
    '<a class="barra fora" href="#contato" data-origem="barra" data-zap="Oi! Vim pelo site e quero tirar uma dúvida sobre as pranchas.">Tirar dúvida no WhatsApp</a>');
  document.querySelectorAll('a[data-zap]').forEach(a => { a.href = S.link(a.dataset.zap); a.target='_blank'; a.rel='noopener'; });

  // a barra do rodapé só aparece depois que a primeira dobra sai da tela
  const barra = document.querySelector('.barra'), topo = document.querySelector('[data-hero]');
  if(topo && 'IntersectionObserver' in window)
    new IntersectionObserver(([e]) => barra.classList.toggle('fora', e.isIntersecting || e.boundingClientRect.top > 0)).observe(topo);
  else barra.classList.remove('fora');

  // vídeo mudo: respeita "reduzir movimento" e tem botão de pausa
  document.querySelectorAll('video[data-loop]').forEach(v => {
    const bt = v.parentElement.querySelector('button');
    const rotulo = () => bt.textContent = v.paused ? 'Tocar vídeo' : 'Pausar vídeo';
    v.addEventListener('play', rotulo); v.addEventListener('pause', rotulo);
    bt.addEventListener('click', () => v.paused ? v.play() : v.pause());
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(()=>{});
    rotulo();
  });
});
