/* Dados da SUP Brasil (edite aqui).
   Telefones, endereço e Instagram: informados em 25/11/2026 (endereço e @ ficam no HTML).
   Modelo, preços, kit, sinal e Black Week: posts do Instagram @supbrasil2020.
   Os shapes marcados com 'exemplo' no seletor NÃO são reais: confirmar ou remover. */
window.SUP = {
  contatos: [ { nome:'Osmar', zap:'5511954334404', tel:'(11) 95433-4404' },
              { nome:'Otávio', zap:'5511921868337', tel:'(11) 92186-8337' } ],
  modelo: {
    medidas: {'Modelo':'SUP 10\'0 (iniciantes)','Comprimento':'10\'0"','Largura':'33"','Espessura':'4"','Peso suportado':'até 120 kg',
              'Material':'bloco de EPS T4','Revestimento':'fibra de vidro 330 g + resina epóxi UV','Quilhas':'triquilhas'},
    aVista: 2400, cartao: 2700, parcelas: 6, sinal: 500,
    kit: ['Remo de alumínio preto','Triquilhas','Leash','Deck','Protetor de borda','Personalização com 2 artes à sua escolha']
  },
  // A faixa some sozinha depois da data 'ate' (AAAA-MM-DD). Para tirar antes, use uma data passada.
  promo: { ate:'2026-11-30', texto:'Black Week: R$ 200 de desconto em qualquer modelo de prancha, ou parcele em até 6x sem juros.' },
  // artes fotografadas. 'fotos': [arquivo, largura, altura, rótulo]
  pranchas: [
    { id:'tartaruga', nome:'Tartaruga', texto:'Tartaruga no bico, faixas azuis e traço preto sobre visual de madeira.', video:true,
      fotos:[['tartaruga-poster',360,640,'bico']] },
    { id:'mandala', nome:'Mandala', texto:'Mandala em traço escuro correndo pelo deck e pelo fundo.',
      fotos:[['mandala-frente',231,812,'frente'],['mandala-verso',236,812,'verso']] },
    { id:'leao', nome:'Leão', texto:'Leão pintado dos dois lados, sobre veio de madeira escura.',
      fotos:[['leao-frente',236,825,'frente'],['leao-verso',236,825,'verso']] },
    { id:'dragao', nome:'Dragão', texto:'Dragão e rosas em tom queimado, do bico à rabeta.', fotos:[['arte-dragao',244,406,'fundo']] },
    { id:'tribal', nome:'Tribal', texto:'Geometria em preto cobrindo a prancha inteira.', fotos:[['arte-tribal',244,406,'fundo']] },
    { id:'tartaruga-preta', nome:'Preta e branca', texto:'Deck preto e branco com tartaruga no bico.', fotos:[['arte-tartaruga-preta',244,406,'deck']] }
  ],
  // abre a escolha entre os dois contatos, com a mensagem pronta
  chamar(msg){
    let d = document.getElementById('contatos');
    if(!d){ d = document.createElement('dialog'); d.id = 'contatos'; d.setAttribute('aria-label','Escolha com quem falar'); document.body.append(d); }
    d.innerHTML = '<h2>Falar com quem?</h2>' + this.contatos.map(c =>
      `<a class="btn" target="_blank" rel="noopener" href="https://wa.me/${c.zap}?text=${encodeURIComponent(msg)}">${c.nome}, ${c.tel}</a>`).join('')
      + '<form method="dialog"><button class="btn claro">Fechar</button></form>';
    d.querySelectorAll('a').forEach(a => a.addEventListener('click', () => d.close()));
    d.showModal();
  },
  brl(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
};
// faixa da promoção, logo abaixo do cabeçalho
if(new Date() <= new Date(SUP.promo.ate + 'T23:59:59-03:00')){
  document.querySelector('header').insertAdjacentHTML('afterend',
    `<p class="promo">${SUP.promo.texto} <a href="#" data-zap="Oi! Quero aproveitar a Black Week da SUP Brasil.">Aproveitar no WhatsApp</a></p>`);
}
document.addEventListener('click', e => {
  const a = e.target.closest('[data-zap]');
  if(a){ e.preventDefault(); SUP.chamar(a.dataset.zap); }
});

document.body.insertAdjacentHTML('beforeend',
  '<a class="barra" href="#" data-zap="Oi! Vim pelo site e quero tirar uma dúvida sobre as pranchas.">Tirar dúvida no WhatsApp</a>');
addEventListener('DOMContentLoaded', () => {
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  const o = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.remove('longe'); o.unobserve(e.target); } }));
  document.querySelectorAll('.desliza').forEach(el => { if(el.getBoundingClientRect().top > innerHeight){ el.classList.add('longe'); o.observe(el); } });
}
// vídeo mudo: respeita "reduzir movimento" e tem botão de pausa
document.querySelectorAll('video[data-loop]').forEach(v => {
  const b = v.parentElement.querySelector('button');
  const rotulo = () => b.textContent = v.paused ? 'Tocar vídeo' : 'Pausar vídeo';
  v.addEventListener('play', rotulo); v.addEventListener('pause', rotulo);
  b.addEventListener('click', () => v.paused ? v.play() : v.pause());
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(()=>{});
  rotulo();
});
});
