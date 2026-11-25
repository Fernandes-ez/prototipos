/* Dados da SUP Brasil (edite aqui).
   ATENÇÃO: WhatsApp, preços, medidas e linhas abaixo ainda NÃO foram confirmados pelo cliente.
   Preços e medidas são exemplos do protótipo. */
window.SUP = {
  whatsapp: '', // 55 + DDD + número, só dígitos. Vazio: o WhatsApp abre pedindo para escolher o contato.
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
  zap(msg){ return 'https://wa.me/' + this.whatsapp + '?text=' + encodeURIComponent(msg); },
  brl(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
};
document.querySelectorAll('[data-zap]').forEach(a => { a.href = SUP.zap(a.dataset.zap); a.target = '_blank'; a.rel = 'noopener'; });
