/* Dados da SUP Brasil (edite aqui).
   Confirmados em 25/11/2026: telefones, endereço e Instagram @supbrasil2020 (os dois últimos no HTML).
   ATENÇÃO: preços, medidas e linhas abaixo são exemplos do protótipo, ainda não confirmados. */
window.SUP = {
  contatos: [ { nome:'Osmar', zap:'5511954334404', tel:'(11) 95433-4404' },
              { nome:'Otávio', zap:'5511921868337', tel:'(11) 92186-8337' } ],
  kitExtra: 700, // exemplo: remo + leash
  pranchas: [
    { id:'mandala', nome:'Mandala', ref:'SB-MDL', linhas:['madeira','represa'], preco:4200,
      texto:'Madeira clara aparente, mandala em traço escuro no deck e no fundo, antiderrapante em três partes mais o tail pad.',
      medidas:{'Comprimento':'10\'6"','Largura':'32"','Espessura':'4.5"','Volume':'185 L','Peso suportado':'até 120 kg','Quilhas':'2+1'},
      detalhe:{img:'detalhe-quilha-mandala.jpg',alt:'Fundo de prancha SUP Brasil com mandala, quilha central e duas laterais montadas',legenda:'Montagem 2+1 em um shape da oficina com mandala e ondas no fundo.'} },
    { id:'leao', nome:'Leão', ref:'SB-LEO', linhas:['madeira'], preco:4500,
      texto:'Madeira escura de veio marcado, leão pintado no deck e no fundo, antiderrapante preto.',
      medidas:{'Comprimento':'10\'6"','Largura':'32"','Espessura':'4.5"','Volume':'185 L','Peso suportado':'até 120 kg','Quilhas':'2+1'},
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
document.addEventListener('click', e => {
  const a = e.target.closest('[data-zap]');
  if(a){ e.preventDefault(); SUP.chamar(a.dataset.zap); }
});
