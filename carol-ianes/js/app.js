/* ============================================================
   CAROL IANES MODA FEMININA · app
   Rotas por hash: #/ · #/catalogo · #/produto/ID · #/sacola
   Todos os caminhos são relativos (o site fica em /prototipos/carol-ianes/).
   ============================================================ */
(function () {
'use strict';

/* ---------- CONFIGURAÇÃO DA LOJA (edite aqui) ---------- */
var CONFIG = {
  whatsapp: '5517991357694',
  whatsappExibicao: '(17) 99135-7694',
  instagram: 'carolianesmodafeminina',
  endereco: 'Rua Capitão João Gomide, 155 - Vila Aurora, São José do Rio Preto/SP, CEP 15014-320',
  // TROCAR: link direto das avaliações do Google (Maps > loja > Avaliações > Compartilhar)
  googleAvaliacoes: 'https://www.google.com/maps/search/?api=1&query=Carol+Ianes+Moda+Feminina+S%C3%A3o+Jos%C3%A9+do+Rio+Preto',
  horario: 'Fecha às 19h. [preencher abertura e dias]'
};

// Formas de receber. "msg" é o texto que entra na mensagem do WhatsApp.
var RECEBER = [
  { id: 'loja',   label: 'Retirar na loja',          detalhe: 'Rua Capitão João Gomide, 155, Vila Aurora', msg: 'retirada na loja' },
  { id: 'casa',   label: 'Receber em casa (Rio Preto)', detalhe: 'Combinamos endereço e entrega pelo WhatsApp', msg: 'em casa (Rio Preto)' },
  { id: 'envio',  label: 'Enviar para outra cidade', detalhe: 'Enviamos para todo o Brasil', msg: 'envio para outra cidade' },
  { id: 'malinha', label: 'Quero na malinha',        detalhe: 'Malinha delivery personalizada', msg: 'na malinha' }
];

/* ---------- Utilidades ---------- */
var PRODUTOS = window.PRODUTOS, CATEGORIAS = window.CATEGORIAS, CORES = window.CORES;
var $ = function (s, el) { return (el || document).querySelector(s); };
var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
var brl = function (n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };
var norm = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
var wa = function (t) { return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(t); };
var byId = function (id) { return PRODUTOS.filter(function (p) { return p.id === id; })[0]; };
var receber = function (id) { return RECEBER.filter(function (r) { return r.id === id; })[0] || RECEBER[1]; };
var store = {
  get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
PRODUTOS.forEach(function (p) { p.cores = p.cores || []; });

var CROWN = '<svg class="crown" viewBox="0 0 32 26" aria-hidden="true"><path d="M3 22 5.5 8l6.5 6.5L16 4l4 10.5L26.5 8 29 22Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
var WA_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.4A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.2 15l-.3-.18-3.1.82.83-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8zm-3.3 4.1c-.2 0-.5.07-.76.35-.26.28-1 .98-1 2.4s1.03 2.78 1.17 2.97c.15.2 2 3.2 4.95 4.37 2.45.97 2.95.78 3.48.73.53-.05 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.57-.35-.3-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.2.3-.77.95-.94 1.15-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57z"/></svg>';

function mediaHTML(src, alt, eager) {
  if (src === 'placeholder') return '<div class="ph" role="img" aria-label="' + esc(alt) + ' (foto ainda não enviada)"><span>[foto real do Instagram]</span></div>';
  return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" ' + (eager ? '' : 'loading="lazy" ') + 'decoding="async">';
}
function marcaTxt(p) { return p.marca ? ' (' + p.marca + ')' : ''; }

/* ---------- Card de produto ---------- */
function card(p, big) {
  var f2 = p.fotos[1];
  return '<a href="#/produto/' + p.id + '" class="card' + (big ? ' card-big' : '') + '">' +
    '<div class="card-media">' +
      '<div class="m m1">' + mediaHTML(p.fotos[0], p.nome, false) + '</div>' +
      (f2 ? '<div class="m m2">' + mediaHTML(f2, p.nome + ', foto 2', false) + '</div>' : '') +
      (p.novo ? '<span class="tag-novo">Novo</span>' : '') +
    '</div>' +
    '<h3>' + esc(p.nome) + '</h3>' +
    (p.marca ? '<p class="marca">' + esc(p.marca) + '</p>' : '') +
    '<p class="preco">' + brl(p.preco) + '</p>' +
    '<div class="cores" aria-label="Cores: ' + esc(p.cores.join(', ')) + '">' + p.cores.map(function (c) { return '<i class="dot" style="background:' + (CORES[c] || '#ccc') + '"></i>'; }).join('') + '</div>' +
  '</a>';
}

/* ============================================================
   HOME
   ============================================================ */
function coverDe(cat) {
  var l = PRODUTOS.filter(function (p) { return p.categoria === cat; });
  var real = l.filter(function (p) { return p.fotos[0] !== 'placeholder'; })[0];
  return real ? real.fotos[0] : 'placeholder';
}
function renderHome() {
  var novos = PRODUTOS.filter(function (p) { return p.novo; }).slice(0, 8);
  var mapaSrc = 'https://www.google.com/maps?q=' + encodeURIComponent(CONFIG.endereco) + '&output=embed';

  $('#conteudo').innerHTML =
  /* abertura */
  '<section class="hero"><div class="hero-in">' +
    '<div class="hero-text">' +
      '<h1 class="lockup" aria-label="Carol Ianes Moda Feminina">' +
        '<span class="lk-top" style="display:flex"><i></i>' + CROWN + '<i></i></span>' +
        '<span class="lk-name" style="display:block">Carol Ianes</span>' +
        '<span class="lk-sub" style="display:block">Moda feminina</span>' +
      '</h1>' +
      '<p class="hero-lead">A moda é para todas! Escolha a peça por tamanho e cor e peça pelo WhatsApp. Enviamos para todo o Brasil.</p>' +
      '<div class="hero-cta"><a class="btn btn-light" href="#/novidades">Ver novidades</a><a class="btn btn-ghost" href="#/malinha">Malinha delivery</a></div>' +
    '</div>' +
    '<figure class="hero-photo filete" style="margin-bottom:0"><img src="assets/fotos/jeans-wide-leg-1.jpg" alt="Look com calça jeans wide leg, camiseta branca e sandália de cortiça, encostada em uma parede de concreto" width="588" height="818" decoding="async"></figure>' +
  '</div></section>' +

  /* faixa */
  '<div class="strip"><div class="strip-in"><span>Enviamos para todo o Brasil</span>' + CROWN + '<span>Malinha delivery</span>' + CROWN + '<span>Compre pelo WhatsApp</span></div></div>' +

  /* novidades */
  '<section class="sec" id="novidades"><div class="wrap">' +
    '<div class="sec-head"><h2 class="h-display">Novidades</h2><a class="link" href="#/catalogo">Ver todas as peças</a></div>' +
    '<div class="nov-grid">' +
      novos.map(function (p, i) { return card(p, i === 0); }).join('') +
      '<a class="nov-more" href="#/catalogo">Ver o catálogo completo<span>Abrir catálogo</span></a>' +
    '</div>' +
  '</div></section>' +

  /* categorias */
  '<section class="sec" style="padding-top:0"><div class="wrap">' +
    '<div class="div-crown" aria-hidden="true"><i></i>' + CROWN + '<i></i></div>' +
    '<div class="sec-head" style="margin-top:56px"><h2 class="h-display">Escolha por <em>categoria</em></h2></div>' +
    '<div class="cats">' +
      '<ul class="catlist">' + CATEGORIAS.map(function (c) {
        var n = PRODUTOS.filter(function (p) { return p.categoria === c; }).length;
        return '<li><a href="#/catalogo?cat=' + encodeURIComponent(c) + '" data-cover="' + esc(coverDe(c)) + '">' + c + '<small>' + n + (n === 1 ? ' peça' : ' peças') + '</small></a></li>';
      }).join('') + '</ul>' +
      '<div class="cat-photo filete" aria-hidden="true" id="cat-photo">' + CATEGORIAS.map(function (c, i) {
        return '<div class="layer' + (i === 0 ? ' on' : '') + '" data-for="' + esc(coverDe(c)) + '">' + mediaHTML(coverDe(c), '', false) + '</div>';
      }).join('') + '</div>' +
    '</div>' +
  '</div></section>' +

  /* malinha */
  '<section class="sec malinha" id="malinha"><div class="wrap mal-in">' +
    '<div class="mal-photo filete"><img src="assets/fotos/calca-rose-1.jpg" alt="Look com camisa branca e calça pantalona rosê na loja, ao lado de uma arara e de sandálias" loading="lazy" decoding="async"></div>' +
    '<div>' +
      '<h2 class="h-display">Malinha delivery <em>personalizada</em></h2>' +
      '<ol class="passos">' +
        '<li><span class="n" aria-hidden="true">1</span><b>Você escolhe as peças</b><span>Separe no site ou conte pelo WhatsApp o que está procurando.</span></li>' +
        '<li><span class="n" aria-hidden="true">2</span><b>A malinha vai até você</b><span>A Carol monta a malinha e leva até o endereço combinado.</span></li>' +
        '<li><span class="n" aria-hidden="true">3</span><b>Prova em casa e fica com o que gostar</b><span>O que não servir volta com a gente.</span></li>' +
      '</ol>' +
      '<p class="placeholder-note">Texto de exemplo. A Carol confirma como a malinha funciona.</p>' +
      '<div style="margin-top:28px"><a class="btn btn-ink" target="_blank" rel="noopener" href="' + wa('Oi, Carol! Quero pedir uma malinha delivery personalizada. Pode me explicar como funciona?') + '">Pedir minha malinha</a></div>' +
    '</div>' +
  '</div></section>' +

  /* a Carol */
  '<section class="sec" id="carol"><div class="wrap carol-in">' +
    '<div class="carol-text">' +
      '<h2 class="h-display">A moda é para todas!</h2>' +
      '<p class="lead" style="margin-top:24px">Multimarcas, com curadoria de looks e calçados. Ana Capri e Arezzo estão entre as marcas do perfil.</p>' +
      '<p class="lead fill">[Texto da Carol: quem ela é e como escolhe cada peça. A dona escreve.]</p>' +
      '<p style="margin-top:24px"><a class="link" href="https://instagram.com/' + CONFIG.instagram + '" target="_blank" rel="noopener">Ver o perfil @' + CONFIG.instagram + ' (cerca de 10,8 mil seguidores)</a></p>' +
    '</div>' +
    '<div class="carol-photo filete"><div class="ph" role="img" aria-label="Espaço para a foto da Carol"><span>[foto da Carol]</span></div></div>' +
  '</div></section>' +

  /* Google */
  '<section class="google"><div class="wrap google-in">' +
    '<span class="nota" aria-label="Nota 5,0">5,0</span>' +
    '<p><b>58 avaliações no Google</b></p>' +
    '<a class="btn" href="' + CONFIG.googleAvaliacoes + '" target="_blank" rel="noopener">Ler as avaliações</a>' +
  '</div></section>' +

  /* loja */
  '<section class="sec" id="loja"><div class="wrap loja-in">' +
    '<div>' +
      '<h2 class="h-display">Venha conhecer a <em>loja</em></h2>' +
      '<address>Rua Capitão João Gomide, 155<br>Vila Aurora, São José do Rio Preto/SP<br>CEP 15014-320</address>' +
      '<p style="margin-top:14px">' + esc(CONFIG.horario) + '</p>' +
      '<div class="loja-actions"><a class="btn btn-ink" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(CONFIG.endereco) + '">Como chegar</a>' +
      '<a class="btn" target="_blank" rel="noopener" href="' + wa('Oi, Carol! Vi o site e queria falar com você.') + '">Chamar no WhatsApp</a></div>' +
    '</div>' +
    '<div class="map filete"><iframe title="Mapa da loja Carol Ianes Moda Feminina" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + mapaSrc + '"></iframe></div>' +
  '</div></section>';

  // foto da categoria troca ao passar o mouse
  var layers = $$('#cat-photo .layer');
  $$('.catlist a').forEach(function (a) {
    var go = function () {
      var cv = a.getAttribute('data-cover');
      var idx = $$('.catlist a').indexOf(a);
      layers.forEach(function (l, i) { l.classList.toggle('on', i === idx); });
    };
    a.addEventListener('mouseenter', go); a.addEventListener('focus', go);
  });
}

/* ============================================================
   CATÁLOGO
   ============================================================ */
var F = { cat: '', tam: '', cor: '', q: '' };
function filtrar() {
  return PRODUTOS.filter(function (p) {
    return (!F.cat || p.categoria === F.cat) &&
      (!F.tam || p.tamanhos.indexOf(F.tam) > -1) &&
      (!F.cor || p.cores.indexOf(F.cor) > -1) &&
      (!F.q || norm(p.nome + ' ' + p.marca + ' ' + p.categoria + ' ' + p.cores.join(' ')).indexOf(norm(F.q)) > -1);
  });
}
function syncHash() {
  var u = new URLSearchParams();
  Object.keys(F).forEach(function (k) { if (F[k]) u.set(k, F[k]); });
  var s = u.toString();
  history.replaceState(null, '', '#/catalogo' + (s ? '?' + s : ''));
}
function renderCatalog(params) {
  F = { cat: params.get('cat') || '', tam: params.get('tam') || '', cor: params.get('cor') || '', q: params.get('q') || '' };
  $('#conteudo').innerHTML =
  '<section class="cat-page"><div class="wrap">' +
    '<div class="cat-top"><h1 class="h-display">Catálogo</h1><p class="muted" id="cat-count" aria-live="polite"></p></div>' +
    '<div class="cat-layout">' +
      '<div>' +
        '<div class="filtros-open"><button class="btn" id="open-filtros" aria-controls="filtros" aria-expanded="false">Filtros <span id="nfiltros"></span></button></div>' +
        '<form id="cat-search" role="search" style="margin-top:12px"><label class="sr" for="cq">Buscar pelo nome da peça</label>' +
        '<input id="cq" type="search" class="field" placeholder="Buscar pelo nome da peça" autocomplete="off" value="' + esc(F.q) + '"></form>' +
        '<div id="grid" style="margin-top:26px"></div>' +
      '</div>' +
    '</div>' +
  '</div></section>';

  // gaveta/lateral de filtros (um elemento só; vira gaveta no mobile)
  var aside = document.createElement('aside');
  aside.className = 'filtros'; aside.id = 'filtros'; aside.setAttribute('aria-label', 'Filtros');
  aside.innerHTML =
    '<div class="filtros-head"><h2>Filtros</h2><button class="btn-close" id="close-filtros">Fechar</button></div>' +
    '<div class="filtros-body" id="filtros-body"></div>' +
    '<div class="filtros-foot"><button class="btn btn-ink btn-block" id="apply-filtros">Ver peças</button></div>';
  $('.cat-layout').insertBefore(aside, $('.cat-layout').firstChild);

  $('#cat-search').addEventListener('submit', function (e) { e.preventDefault(); });
  $('#cq').addEventListener('input', function (e) { F.q = e.target.value; syncHash(); catParts(); });
  $('#open-filtros').addEventListener('click', openFiltros);
  $('#close-filtros').addEventListener('click', closeFiltros);
  $('#apply-filtros').addEventListener('click', closeFiltros);
  catParts();
}
function openFiltros() {
  $('#filtros').classList.add('open'); $('#open-filtros').setAttribute('aria-expanded', 'true');
  $('#filtros').setAttribute('role', 'dialog'); $('#filtros').setAttribute('aria-modal', 'true');
  $('#close-filtros').focus();
}
function closeFiltros() {
  var f = $('#filtros'); if (!f) return;
  f.classList.remove('open'); f.removeAttribute('role'); f.removeAttribute('aria-modal');
  var o = $('#open-filtros'); if (o) { o.setAttribute('aria-expanded', 'false'); if (matchMedia('(max-width:1023px)').matches) o.focus(); }
}
function catParts() {
  var cores = []; PRODUTOS.forEach(function (p) { p.cores.forEach(function (c) { if (cores.indexOf(c) < 0) cores.push(c); }); });
  var chip = function (act, v, label, on) { return '<button class="chip" data-act="' + act + '" data-v="' + esc(v) + '" aria-pressed="' + on + '">' + label + '</button>'; };
  var n = (F.cat ? 1 : 0) + (F.tam ? 1 : 0) + (F.cor ? 1 : 0);
  $('#filtros-body').innerHTML =
    '<div class="f-group"><h3>Categoria</h3><div class="f-list">' +
      '<button data-act="f-cat" data-v="" aria-pressed="' + !F.cat + '">Todas</button>' +
      CATEGORIAS.map(function (c) { return '<button data-act="f-cat" data-v="' + esc(c) + '" aria-pressed="' + (F.cat === c) + '">' + c + '</button>'; }).join('') +
    '</div></div>' +
    '<div class="f-group"><h3>Tamanho</h3><h4>Roupas</h4><div class="f-chips">' +
      window.TAMANHOS_ROUPA.map(function (t) { return chip('f-tam', t, t, F.tam === t); }).join('') +
    '</div><h4>Calçados</h4><div class="f-chips">' +
      window.TAMANHOS_CALCADO.map(function (t) { return chip('f-tam', t, t, F.tam === t); }).join('') +
    '</div></div>' +
    '<div class="f-group"><h3>Cor</h3><div class="f-cores">' +
      cores.map(function (c) { return '<button class="swatch" data-act="f-cor" data-v="' + esc(c) + '" aria-pressed="' + (F.cor === c) + '" aria-label="' + c + '" title="' + c + '" style="background:' + CORES[c] + '"></button>'; }).join('') +
    '</div></div>' +
    ((n || F.q) ? '<button class="link-btn" data-act="f-clear">Limpar filtros</button>' : '');
  $('#nfiltros').textContent = n ? '(' + n + ')' : '';
  var lista = filtrar();
  $('#cat-count').textContent = lista.length + (lista.length === 1 ? ' peça' : ' peças');
  $('#apply-filtros').textContent = 'Ver ' + lista.length + (lista.length === 1 ? ' peça' : ' peças');
  $('#grid').innerHTML = lista.length
    ? '<div class="grid">' + lista.map(function (p) { return card(p, false); }).join('') + '</div>'
    : '<div class="vazio"><p class="h-display">Essa a gente não achou aqui</p>' +
      '<p style="margin:14px auto 0;max-width:28rem">Pode ser que tenha chegado agora. Pergunte para a Carol.</p>' +
      '<div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
      '<a class="btn btn-ink" target="_blank" rel="noopener" href="' + wa('Oi, Carol! Procurei no site' + (F.q ? ' por "' + F.q + '"' : '') + (F.tam ? ' no tamanho ' + F.tam : '') + (F.cor ? ' na cor ' + F.cor : '') + ' e não achei. Vocês têm?') + '">Perguntar no WhatsApp</a>' +
      '<button class="btn" data-act="f-clear">Limpar filtros</button></div></div>';
}

/* ============================================================
   PÁGINA DA PEÇA
   ============================================================ */
var SEL = null;
function msgProduto(p) {
  return 'Oi, Carol! Vi no site e tenho interesse na peça ' + p.nome + marcaTxt(p) + ', tamanho ' + (SEL.tam || '[escolher]') + ', cor ' + SEL.cor + '. Forma de receber ' + receber(SEL.rec).msg + '. Ainda tem disponível?';
}
function renderProduct(id, keep) {
  var p = byId(id);
  if (!p) {
    $('#conteudo').innerHTML = '<div class="wrap empty"><h1 class="h-display">Peça não encontrada</h1><a class="btn btn-ink" href="#/catalogo">Voltar ao catálogo</a></div>';
    return;
  }
  if (!SEL || SEL.id !== id) SEL = { id: id, tam: p.tamanhos.length === 1 ? p.tamanhos[0] : '', cor: p.cores[0], rec: 'casa', foto: 0 };
  var y = window.scrollY;
  var msg = msgProduto(p);
  var rel = PRODUTOS.filter(function (x) { return x.id !== p.id && x.categoria === p.categoria; })
    .concat(PRODUTOS.filter(function (x) { return x.id !== p.id && x.categoria !== p.categoria && x.fotos[0] !== 'placeholder'; })).slice(0, 4);
  document.title = p.nome + ' · Carol Ianes Moda Feminina';
  document.body.classList.add('has-bar');
  var principal = p.fotos[SEL.foto] || p.fotos[0];

  $('#conteudo').innerHTML =
  '<section class="prod"><div class="wrap">' +
    '<nav class="crumbs" aria-label="Você está em"><a href="#/catalogo">Catálogo</a> / <a href="#/catalogo?cat=' + encodeURIComponent(p.categoria) + '">' + p.categoria + '</a></nav>' +
    '<div class="prod-grid">' +
      '<div class="gal">' +
        '<div class="gal-main filete">' + mediaHTML(principal, p.nome + ', foto ' + (SEL.foto + 1), true) + (p.novo ? '<span class="tag-novo">Novo</span>' : '') + '</div>' +
        (p.fotos.length > 1 ? '<div class="gal-thumbs">' + p.fotos.map(function (f, i) {
          return '<button data-act="foto" data-v="' + i + '" aria-label="Ver foto ' + (i + 1) + '" aria-pressed="' + (SEL.foto === i) + '">' + mediaHTML(f, p.nome + ', miniatura ' + (i + 1), false) + '</button>';
        }).join('') + '</div>' : '') +
      '</div>' +
      '<div class="prod-info">' +
        '<h1>' + esc(p.nome) + '</h1>' +
        (p.marca ? '<p class="prod-marca">' + esc(p.marca) + '</p>' : '') +
        '<p class="prod-preco"><b>' + brl(p.preco) + '</b><span class="muted small">preço de exemplo</span></p>' +
        '<p style="margin-top:14px;max-width:32rem">' + esc(p.descricao) + '</p>' +
        '<div class="opt"><h2>Cor <small>' + esc(SEL.cor) + '</small></h2><div class="row" role="group" aria-label="Cor">' +
          p.cores.map(function (c) { return '<button class="swatch" data-act="cor" data-v="' + esc(c) + '" aria-pressed="' + (SEL.cor === c) + '" aria-label="' + c + '" title="' + c + '" style="background:' + (CORES[c] || '#ccc') + '"></button>'; }).join('') +
        '</div></div>' +
        '<div class="opt" id="tam-box"><h2>Tamanho</h2><div class="row" role="group" aria-label="Tamanho">' +
          p.tamanhos.map(function (t) { return '<button class="chip" data-act="tam" data-v="' + t + '" aria-pressed="' + (SEL.tam === t) + '">' + t + '</button>'; }).join('') +
        '</div><p class="err" id="tam-erro" role="alert" hidden>Escolha um tamanho para continuar.</p></div>' +
        '<div class="opt"><h2>Como você quer receber</h2><div class="receber" role="group" aria-label="Forma de receber">' +
          RECEBER.map(function (r) { return '<button data-act="rec" data-v="' + r.id + '" aria-pressed="' + (SEL.rec === r.id) + '"><span class="rad"></span><span><b>' + r.label + '</b><small>' + r.detalhe + '</small></span></button>'; }).join('') +
        '</div></div>' +
        '<div class="prod-actions">' +
          '<a class="btn btn-ink" data-act="pedir" target="_blank" rel="noopener" href="' + wa(msg) + '" style="flex:1 1 260px">' + WA_ICON + ' Pedir pelo WhatsApp</a>' +
          '<button class="btn" data-act="add-bag">Adicionar à sacola</button>' +
        '</div>' +
        '<div class="lg-hide" style="margin-top:22px"><button class="btn btn-block" data-act="add-bag">Adicionar à sacola</button></div>' +
        '<div class="prev"><h2>Mensagem que vai para o WhatsApp</h2><p id="msg-prev">' + esc(msg) + '</p></div>' +
        '<p class="muted small" style="margin-top:18px">Preço e marca de exemplo para o protótipo.</p>' +
      '</div>' +
    '</div>' +
    (rel.length ? '<div class="rel"><div class="sec-head"><h2 class="h-display" style="font-size:clamp(2rem,4vw,3.2rem)">Veja também</h2></div><div class="grid">' + rel.map(function (r) { return card(r, false); }).join('') + '</div></div>' : '') +
  '</div></section>' +
  '<div class="pbar"><div class="pv"><b>' + brl(p.preco) + '</b><span>' + (SEL.tam ? SEL.tam + ' · ' : '') + esc(SEL.cor) + '</span></div>' +
  '<a class="btn btn-ink" data-act="pedir" target="_blank" rel="noopener" href="' + wa(msg) + '">' + WA_ICON + ' Pedir pelo WhatsApp</a></div>';
  if (keep) window.scrollTo(0, y);
}

/* ============================================================
   SACOLA
   ============================================================ */
var BAG = store.get('ci-bag', []);
var BAGINFO = store.get('ci-baginfo', { rec: 'casa', malinha: false, nome: '' });
function saveBag() { store.set('ci-bag', BAG); store.set('ci-baginfo', BAGINFO); updateBadge(); }
function bagKey(i) { return i.id + '|' + i.tam + '|' + i.cor; }
function bagQty() { return BAG.reduce(function (s, i) { return s + i.qtd; }, 0); }
function updateBadge() { $('#bagcount').textContent = bagQty(); }
function addToBag(id, tam, cor) {
  var k = id + '|' + tam + '|' + cor;
  var ex = BAG.filter(function (i) { return bagKey(i) === k; })[0];
  if (ex) ex.qtd++; else BAG.push({ id: id, tam: tam, cor: cor, qtd: 1 });
  saveBag();
}
function msgSacola() {
  var linhas = BAG.map(function (i, n) {
    var p = byId(i.id);
    return (n + 1) + ') ' + p.nome + marcaTxt(p) + ', tamanho ' + i.tam + ', cor ' + i.cor + ', ' + i.qtd + ' un.';
  });
  return 'Oi, Carol! Montei minha sacola no site:\n\n' + linhas.join('\n') + '\n\nForma de receber ' + receber(BAGINFO.rec).msg + '.' +
    (BAGINFO.malinha ? '\nQuero receber essas peças na malinha.' : '') +
    (BAGINFO.nome ? '\nMeu nome é ' + BAGINFO.nome + '.' : '') +
    '\nPode confirmar se estão disponíveis?';
}
function renderBag() {
  document.title = 'Sacola · Carol Ianes Moda Feminina';
  if (!BAG.length) {
    $('#conteudo').innerHTML = '<div class="wrap empty"><h1 class="h-display">Sua sacola está vazia</h1><p class="lead" style="margin-bottom:28px">Junte as peças de que gostou e envie tudo para a Carol numa mensagem só.</p><a class="btn btn-ink" href="#/catalogo">Ver o catálogo</a></div>';
    return;
  }
  var total = BAG.reduce(function (s, i) { return s + byId(i.id).preco * i.qtd; }, 0);
  $('#conteudo').innerHTML =
  '<section class="bag"><div class="wrap">' +
    '<h1 class="h-display">Sua sacola</h1>' +
    '<div class="bag-grid">' +
      '<ul class="bag-list">' + BAG.map(function (i) {
        var p = byId(i.id), k = esc(bagKey(i));
        return '<li class="bag-item"><a class="thumb" href="#/produto/' + p.id + '" aria-label="' + esc(p.nome) + '">' + mediaHTML(p.fotos[0], p.nome, false) + '</a>' +
          '<div><h3><a href="#/produto/' + p.id + '" style="text-decoration:none">' + esc(p.nome) + '</a></h3>' +
          '<p class="meta">' + (p.marca ? esc(p.marca) + ' · ' : '') + esc(i.cor) + ' · tamanho ' + esc(i.tam) + '</p>' +
          '<p style="font-weight:600;margin-top:4px">' + brl(p.preco) + '</p>' +
          '<div class="bag-ctl"><div class="qty"><button data-act="bag-dec" data-k="' + k + '" aria-label="Diminuir quantidade">−</button><span aria-live="polite">' + i.qtd + '</span><button data-act="bag-inc" data-k="' + k + '" aria-label="Aumentar quantidade">+</button></div>' +
          '<button class="link-btn" data-act="bag-del" data-k="' + k + '">Remover</button></div></div></li>';
      }).join('') + '</ul>' +
      '<div class="bag-side">' +
        '<div class="opt" style="margin-top:0"><h2>Como você quer receber</h2><div class="receber" role="group" aria-label="Forma de receber">' +
          RECEBER.filter(function (r) { return r.id !== 'malinha'; }).map(function (r) { return '<button data-act="bag-rec" data-v="' + r.id + '" aria-pressed="' + (BAGINFO.rec === r.id) + '"><span class="rad"></span><span><b>' + r.label + '</b><small>' + r.detalhe + '</small></span></button>'; }).join('') +
        '</div></div>' +
        '<label class="chk"><input type="checkbox" id="bag-malinha"' + (BAGINFO.malinha ? ' checked' : '') + '><span>Quero receber essas peças na malinha</span></label>' +
        '<label style="display:block;margin-top:18px;font-weight:500">Seu nome (opcional)<input id="bag-nome" class="field" style="margin-top:6px" type="text" autocomplete="given-name" value="' + esc(BAGINFO.nome) + '"></label>' +
        '<div class="bag-tot"><span>' + bagQty() + (bagQty() > 1 ? ' peças' : ' peça') + '</span><span><b>' + brl(total) + '</b><br><small class="muted">estimado, valores de exemplo</small></span></div>' +
        '<a id="bag-send" class="btn btn-ink btn-block" style="margin-top:20px" target="_blank" rel="noopener" href="' + wa(msgSacola()) + '">' + WA_ICON + ' Enviar sacola pelo WhatsApp</a>' +
        '<p class="small muted" style="margin-top:12px">Nada é cobrado aqui. A Carol confirma disponibilidade, valor e entrega pelo WhatsApp.</p>' +
        '<div class="prev"><h2>Mensagem que vai para o WhatsApp</h2><p id="bag-prev">' + esc(msgSacola()) + '</p></div>' +
      '</div>' +
    '</div>' +
  '</div></section>';
  var refresh = function () { $('#bag-send').href = wa(msgSacola()); $('#bag-prev').textContent = msgSacola(); };
  $('#bag-nome').addEventListener('input', function (e) { BAGINFO.nome = e.target.value.trim(); saveBag(); refresh(); });
  $('#bag-malinha').addEventListener('change', function (e) { BAGINFO.malinha = e.target.checked; saveBag(); refresh(); });
}

/* ============================================================
   EVENTOS
   ============================================================ */
var toastT;
function toast(html) {
  var t = $('#toast'); t.innerHTML = html; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 3200);
}
function needSize() {
  var box = $('#tam-box'); $('#tam-erro').hidden = false;
  box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
  box.scrollIntoView({ block: 'center' });
}
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-act]');
  if (!t) return;
  var a = t.getAttribute('data-act'), v = t.getAttribute('data-v');
  switch (a) {
    case 'f-cat': F.cat = v; syncHash(); catParts(); break;
    case 'f-tam': F.tam = F.tam === v ? '' : v; syncHash(); catParts(); break;
    case 'f-cor': F.cor = F.cor === v ? '' : v; syncHash(); catParts(); break;
    case 'f-clear': F = { cat: '', tam: '', cor: '', q: '' }; $('#cq').value = ''; syncHash(); catParts(); break;
    case 'tam': SEL.tam = v; renderProduct(SEL.id, true); break;
    case 'cor': SEL.cor = v; renderProduct(SEL.id, true); break;
    case 'rec': SEL.rec = v; renderProduct(SEL.id, true); break;
    case 'foto': SEL.foto = +v; renderProduct(SEL.id, true); break;
    case 'pedir': if (!SEL.tam) { e.preventDefault(); needSize(); } break;
    case 'add-bag':
      if (!SEL.tam) { needSize(); break; }
      addToBag(SEL.id, SEL.tam, SEL.cor);
      toast('Peça na sacola <a href="#/sacola">Ver sacola</a>');
      break;
    case 'bag-inc': { var i1 = BAG.filter(function (x) { return bagKey(x) === t.getAttribute('data-k'); })[0]; if (i1) { i1.qtd++; saveBag(); renderBag(); } break; }
    case 'bag-dec': { var i2 = BAG.filter(function (x) { return bagKey(x) === t.getAttribute('data-k'); })[0]; if (i2) { i2.qtd = Math.max(1, i2.qtd - 1); saveBag(); renderBag(); } break; }
    case 'bag-del': BAG = BAG.filter(function (x) { return bagKey(x) !== t.getAttribute('data-k'); }); saveBag(); renderBag(); break;
    case 'bag-rec': BAGINFO.rec = v; saveBag(); { var y = window.scrollY; renderBag(); window.scrollTo(0, y); } break;
  }
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeFiltros(); closeMenu(); } });

// menu mobile
var menuBtn = $('#menu-btn'), nav = $('#nav');
function closeMenu() { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
menuBtn.addEventListener('click', function () { var o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });

// botão flutuante do WhatsApp só aparece depois de rolar
var fab = $('#wa-fab');
fab.href = wa('Oi, Carol! Estou no site e queria ajuda para escolher uma peça.');
$('#f-wa').href = wa('Oi, Carol! Vim pelo site.');
var onScroll = function () { fab.classList.toggle('show', window.scrollY > 480); };
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ============================================================
   ROTAS
   ============================================================ */
function route() {
  var h = location.hash.slice(1) || '/';
  var parts = h.split('?'), path = parts[0], params = new URLSearchParams(parts[1] || '');
  document.body.classList.remove('has-bar');
  document.title = 'Carol Ianes Moda Feminina · São José do Rio Preto';
  closeMenu();
  var m;
  if (path === '/' || path === '/novidades' || path === '/malinha' || path === '/carol' || path === '/loja') {
    renderHome();
    var sec = path.slice(1);
    if (sec) requestAnimationFrame(function () { var el = document.getElementById(sec); if (el) el.scrollIntoView(); });
    else window.scrollTo(0, 0);
  } else if (path === '/catalogo') {
    document.title = 'Catálogo · Carol Ianes Moda Feminina'; renderCatalog(params); window.scrollTo(0, 0);
  } else if ((m = path.match(/^\/produto\/(.+)$/))) {
    renderProduct(decodeURIComponent(m[1])); window.scrollTo(0, 0);
  } else if (path === '/sacola') {
    renderBag(); window.scrollTo(0, 0);
  } else { location.hash = '#/'; return; }
}
window.addEventListener('hashchange', route);
updateBadge();
route();
})();
