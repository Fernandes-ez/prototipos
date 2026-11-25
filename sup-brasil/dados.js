/* Dados da SUP Brasil (edite aqui).
   Telefones, endereço e Instagram: informados em 25/11/2026 (endereço e @ ficam no HTML).
   Modelo, preços, kit, sinal e Black Week: posts do Instagram @supbrasil2020.
   Linhas ('madeira', 'represa') ainda são exemplo, a confirmar. */
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
  pranchas: [
    { id:'mandala', nome:'Mandala', ref:'SB-MDL', linhas:['madeira','represa'],
      texto:'Visual de madeira clara, mandala em traço escuro no deck e no fundo, antiderrapante em três partes mais o tail pad.',
      detalhe:{img:'detalhe-quilha-mandala.jpg',alt:'Fundo de prancha SUP Brasil com mandala, quilha central e duas laterais montadas',legenda:'Três quilhas montadas em uma prancha da casa com mandala e ondas no fundo.'} },
    { id:'leao', nome:'Leão', ref:'SB-LEO', linhas:['madeira'],
      texto:'Visual de madeira escura de veio marcado, leão no deck e no fundo, antiderrapante preto.',
      detalhe:{img:'leao-caixas-quilha.jpg',alt:'Rabeta da prancha Leão com as três caixas de quilha',legenda:'As três caixas de quilha no fundo da Leão: uma central e duas laterais.'} }
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
