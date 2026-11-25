/* SUP Brasil: FONTE ÚNICA de dados. Edite só aqui.
   Origem: posts do Instagram @supbrasil2020 e telefones/endereço informados em 25/11/2026.
   Campo null = dado que ainda falta. O site mostra um marcador [ASSIM] no lugar. */
window.SUP = {
  contato: { nome:'Osmar', zap:'5511954334404', tel:'(11) 95433-4404' },     // atendimento principal (1 clique)
  contato2:{ nome:'Otávio', zap:'5511921868337', tel:'(11) 92186-8337' },    // aparece só no rodapé
  endereco:'R. São Donaciano, 234a, Cidade Patriarca, São Paulo, SP, 03553-090',
  instagram:'supbrasil2020',
  prova:'Mais de 800 pranchas vendidas',
  // único shape confirmado
  modelo:{ nome:"SUP 10'0", medida:'10\'0" × 33" × 4"', largura:'33"', pesoMax:120, bloco:'EPS T4', fibra:'330 g', resina:'Epóxi UV' },
  preco:{ aVista:2400, cartao:2700, parcelas:6, sinal:500 },
  kit:['Prancha com 2 artes à sua escolha','Remo de alumínio preto','Triquilhas','Leash','Deck antiderrapante','Protetor de borda'],
  // a faixa some depois da data 'ate' (AAAA-MM-DD). A data final é uma suposição: confirmar.
  promo:{ ate:'2026-11-30', faixa:'Black Week: R$ 200 de desconto na prancha', nota:'O desconto de R$ 200 da Black Week é confirmado no WhatsApp antes do sinal.' },
  prazo:null,      // ex.: texto do prazo de produção e retirada
  garantia:null,   // ex.: tempo e cobertura da garantia
  reparo:null,     // ex.: como funciona o reparo
  frete:null,      // ex.: faixa de valores por região
  depoimentos:[null,null,null],   // {texto:'', nome:'', cidade:''} com autorização do cliente
  pranchas: [
    { id:'tartaruga', nome:'Tartaruga', texto:'Tartaruga no bico, faixas azuis e traço preto sobre visual de madeira.', video:true,
      fotos:[['tartaruga-bico',166,575,'bico']] },
    { id:'mandala', nome:'Mandala', texto:'Mandala em traço escuro correndo pelo deck e pelo fundo.',
      fotos:[['mandala-frente',400,1440,'frente'],['mandala-verso',400,1440,'verso']] },
    { id:'leao', nome:'Leão', texto:'Leão pintado dos dois lados, sobre veio de madeira escura.',
      fotos:[['leao-frente',400,1440,'frente'],['leao-verso',400,1440,'verso']] },
    { id:'fogo', nome:'Céu em fogo', texto:'Rosto entre nuvens, em laranja e azul.',
      fotos:[['fogo-frente',400,1440,'frente'],['fogo-verso',400,1440,'verso']] },
    { id:'guerreira', nome:'Guerreira', texto:'Retrato em preto e branco com faixa vermelha.',
      fotos:[['guerreira-frente',400,1440,'frente'],['guerreira-verso',400,1440,'verso']] },
    { id:'tartaruga-azul', nome:'Tartaruga azul', texto:'Tartaruga e grafismos em azul sobre visual de madeira.',
      fotos:[['tartaruga-azul-frente',400,1440,'frente'],['tartaruga-azul-verso',400,1440,'verso']] },
    { id:'mandala-azul', nome:'Mandala azul', texto:'Mandalas azuis e bordas turquesa sobre visual de madeira clara.',
      fotos:[['mandala-azul-frente',400,1440,'frente'],['mandala-azul-verso',400,1440,'verso']] },
    { id:'hibisco', nome:'Hibisco', texto:'Flores brancas num degradê do rosa ao azul.',
      fotos:[['hibisco-frente',400,1440,'frente'],['hibisco-verso',400,1440,'verso']] }
  ],
  brl(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:v%1?2:0}); },
  link(msg){ return `https://wa.me/${this.contato.zap}?text=${encodeURIComponent(msg)}`; },
  promoAtiva(){ return new Date() <= new Date(this.promo.ate+'T23:59:59-03:00'); },
  ou(valor,marca){ return valor || `<mark class="pendente">[${marca}]</mark>`; }
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
  const S=SUP, m=S.modelo, p=S.preco, b=v=>S.brl(v);
  const textos = {
    prova:S.prova, faixa:S.promo.faixa, notaPromo:S.promo.nota, endereco:S.endereco,
    modelo:m.nome, medida:m.medida, bloco:m.bloco, fibra:m.fibra, resina:m.resina, peso:`${m.pesoMax} kg`,
    resumo:`Prancha ${m.nome}, ${m.largura} de largura, para quem está começando. Kit completo, direto da fábrica.`,
    aVista:b(p.aVista), parcelado:`ou até ${p.parcelas}x de ${b(p.cartao/p.parcelas)} no cartão (${b(p.cartao)} no total)`,
    sinal:b(p.sinal), tel1:`${S.contato.nome}: ${S.contato.tel}`, tel2:`${S.contato2.nome}: ${S.contato2.tel}`
  };
  document.querySelectorAll('[data-t]').forEach(el => el.textContent = textos[el.dataset.t]);
  document.querySelectorAll('[data-pendente]').forEach(el => { const [campo,marca]=el.dataset.pendente.split('|'); el.innerHTML = S.ou(S[campo], marca); });
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
