/* ============================================================
   PRODUTOS DA CAROL IANES  (edite este arquivo)
   ------------------------------------------------------------
   Cada peça tem: nome, marca, categoria, preco, tamanhos, cores,
   fotos, novo (true/false) e descricao.

   FOTOS
   - Caminho relativo a esta pasta, por exemplo 'assets/fotos/minha-peca-1.jpg'.
   - A 1ª foto é a capa. A 2ª aparece ao passar o mouse e na galeria.
   - Use 'placeholder' onde ainda não existir foto real.
     Isso mostra o aviso "[foto real do Instagram]".
   - Fotos em pé (3:4), de 800 a 1200 px de largura, em .jpg ou .webp.

   TAMANHOS
   - Roupas: 'PP','P','M','G','GG'. Calçados: '34' a '40'. Peça única: 'Único'.

   MARCA
   - Deixe '' quando não quiser mostrar marca.

   ATENÇÃO
   - Preços, marcas e descrições abaixo são EXEMPLOS para o protótipo.
     A Carol confirma tudo antes de publicar.
   ============================================================ */

window.CATEGORIAS = ['Vestidos', 'Blusas', 'Calças e saias', 'Conjuntos', 'Calçados', 'Bolsas e acessórios'];

// Tamanhos mostrados nos filtros
window.TAMANHOS_ROUPA = ['PP', 'P', 'M', 'G', 'GG'];
window.TAMANHOS_CALCADO = ['34', '35', '36', '37', '38', '39', '40'];

// Cores: nome → hex (bolinhas de cor)
window.CORES = {
  'Jeans médio': '#4D6F9C',
  'Jeans claro': '#8FAFD0',
  'Branco': '#F7F7F4',
  'Off white': '#EFE9DD',
  'Rosê': '#E4BFB0',
  'Nude': '#D8B8A0',
  'Cortiça': '#B48F63',
  'Vermelho': '#A91D2A',
  'Preto': '#1B1F23'
};

window.PRODUTOS = [
  {
    id: 'calca-wide-leg-jeans',
    nome: 'Calça wide leg jeans',
    marca: '',
    categoria: 'Calças e saias',
    preco: 259.90,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
    cores: ['Jeans médio'],
    fotos: ['assets/fotos/jeans-wide-leg-1.jpg', 'assets/fotos/jeans-wide-leg-2.jpg'],
    novo: true,
    descricao: 'Calça jeans de perna larga e cintura alta, com recortes na frente.'
  },
  {
    id: 'camiseta-branca-basica',
    nome: 'Camiseta branca básica',
    marca: '',
    categoria: 'Blusas',
    preco: 79.90,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
    cores: ['Branco', 'Off white'],
    fotos: ['assets/fotos/camiseta-branca-1.jpg', 'assets/fotos/camiseta-branca-2.jpg'],
    novo: true,
    descricao: 'Camiseta de gola redonda e manga curta, para usar com tudo.'
  },
  {
    id: 'short-cargo-jeans',
    nome: 'Short cargo jeans',
    marca: '',
    categoria: 'Calças e saias',
    preco: 189.90,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
    cores: ['Jeans médio'],
    fotos: ['assets/fotos/short-cargo-1.jpg', 'assets/fotos/short-cargo-2.jpg'],
    novo: true,
    descricao: 'Short de cintura alta com bolsos laterais e barra dobrada.'
  },
  {
    id: 'vestido-midi-jeans-babados',
    nome: 'Vestido midi jeans com babados',
    marca: '',
    categoria: 'Vestidos',
    preco: 299.90,
    tamanhos: ['P', 'M', 'G', 'GG'],
    cores: ['Jeans claro'],
    fotos: ['assets/fotos/vestido-jeans-1.jpg', 'assets/fotos/vestido-jeans-2.jpg'],
    novo: true,
    descricao: 'Vestido longo de alças com babado no decote e saia em camadas.'
  },
  {
    id: 'calca-pantalona-rose',
    nome: 'Calça pantalona rosê',
    marca: '',
    categoria: 'Calças e saias',
    preco: 249.90,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
    cores: ['Rosê', 'Off white'],
    fotos: ['assets/fotos/calca-rose-1.jpg', 'assets/fotos/calca-rose-2.jpg'],
    novo: true,
    descricao: 'Pantalona de alfaiataria, cintura alta e bolsos laterais.'
  },
  {
    id: 'camisa-branca-botoes',
    nome: 'Camisa branca de botões',
    marca: '',
    categoria: 'Blusas',
    preco: 189.90,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
    cores: ['Branco'],
    fotos: ['assets/fotos/camisa-branca-1.jpg'],
    novo: true,
    descricao: 'Camisa de manga longa e gola clássica.'
  },
  {
    id: 'sandalia-plataforma-cortica',
    nome: 'Sandália plataforma de cortiça',
    marca: 'Arezzo',   // exemplo
    categoria: 'Calçados',
    preco: 329.90,
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
    cores: ['Cortiça'],
    fotos: ['assets/fotos/sandalia-cortica-1.jpg'],
    novo: true,
    descricao: 'Plataforma de cortiça com tiras no peito do pé.'
  },
  {
    id: 'conjunto-camiseta-short',
    nome: 'Conjunto camiseta e short cargo',
    marca: '',
    categoria: 'Conjuntos',
    preco: 269.90,
    tamanhos: ['PP', 'P', 'M', 'G', 'GG'],
    cores: ['Jeans médio'],
    fotos: ['assets/fotos/conjunto-camiseta-short-1.jpg'],
    novo: true,
    descricao: 'Camiseta branca de manga dobrada com short cargo jeans.'
  },
  {
    id: 'bolsa-de-mao-vermelha',
    nome: 'Bolsa de mão vermelha',
    marca: '',
    categoria: 'Bolsas e acessórios',
    preco: 399.90,
    tamanhos: ['Único'],
    cores: ['Vermelho'],
    fotos: ['placeholder'],
    novo: false,
    descricao: 'Bolsa pequena de alça de mão. [preencher descrição]'
  },
  {
    id: 'pulseiras-acrilico',
    nome: 'Pulseiras de acrílico',
    marca: '',
    categoria: 'Bolsas e acessórios',
    preco: 69.90,
    tamanhos: ['Único'],
    cores: ['Vermelho', 'Preto'],
    fotos: ['placeholder'],
    novo: false,
    descricao: 'Pulseiras largas para misturar. [preencher descrição]'
  },
  {
    id: 'sapatilha-bico-fino-nude',
    nome: 'Sapatilha bico fino nude',
    marca: 'Ana Capri',   // exemplo
    categoria: 'Calçados',
    preco: 289.90,
    tamanhos: ['34', '35', '36', '37', '38', '39', '40'],
    cores: ['Nude', 'Preto'],
    fotos: ['placeholder'],
    novo: false,
    descricao: 'Sapatilha de bico fino. [preencher descrição]'
  },
  {
    id: 'bolsa-preta-estruturada',
    nome: 'Bolsa preta estruturada',
    marca: '',
    categoria: 'Bolsas e acessórios',
    preco: 459.90,
    tamanhos: ['Único'],
    cores: ['Preto'],
    fotos: ['placeholder'],
    novo: false,
    descricao: 'Bolsa preta com duas alças. [preencher descrição]'
  }
];
