import React, { useState, useMemo } from 'react'
import {
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  Heart,
  Stethoscope,
  Scissors,
  Truck,
  Smile,
  Star,
  MapPin,
  Phone,
  Instagram,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  PawPrint,
  Droplets,
  Music,
  Camera,
  Gift,
  Menu,
  X,
  Navigation,
  BadgeCheck,
  Flame
} from 'lucide-react'
import {
  PetUauLogo,
  MinimalDogIcon,
  MinimalCatIcon,
  PopSparkle
} from './components/BrandIcons'

const MARQUEE_ITEMS = [
  { text: 'BANHO & TOSA', color: 'text-[#F9D957]' },
  { text: 'VETERINÁRIO', color: 'text-[#64BDD1]' },
  { text: 'DAYCARE', color: 'text-[#F9D957]' },
  { text: 'BOUTIQUE PET', color: 'text-[#64BDD1]' },
  { text: 'ESTÉTICA ANIMAL', color: 'text-[#F9D957]' },
  { text: 'TÁXI PET SEGURO', color: 'text-[#64BDD1]' },
]

const SERVICES_BENTO = [
  {
    id: 'banho',
    span: 'lg:col-span-7',
    badge: 'MAIS PEDIDO!',
    badgeBg: 'bg-[#64BDD1]',
    hoverBg: 'hover:bg-[#F9D957]',
    defaultBg: 'bg-[#FFFDF5]',
    accentPill: 'bg-[#64BDD1]',
    icon: Scissors,
    title: 'banho & tosa relaxante',
    subtitle: 'Spa completo com água morna ozonizada, cromoterapia, toalhas aquecidas e zero gaiolas de espera.',
    highlights: ['Shampoo Vegano Hipoalergênico', 'Secagem Silenciosa', 'Bandana Exclusiva Pet Uau!'],
    priceHint: 'A partir de R$ 65',
    duration: '45–90 min',
    petImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=80',
    petAlt: 'Golden Retriever sorrindo após banho'
  },
  {
    id: 'vet',
    span: 'lg:col-span-5',
    badge: 'CLÍNICA FEAR-FREE',
    badgeBg: 'bg-[#F9D957]',
    hoverBg: 'hover:bg-[#64BDD1]',
    defaultBg: 'bg-[#FFFDF5]',
    accentPill: 'bg-[#F9D957]',
    icon: Stethoscope,
    title: 'consultório vet',
    subtitle: 'Consultas sem pressa, vacinas importadas, check-up preventivo e salas separadas para cães e gatos.',
    highlights: ['Consultório Cat-Friendly', 'Vacinas Importadas V10/V5', 'Prontuário Digital no App'],
    priceHint: 'Consulta + Check-up',
    duration: 'Atendimento humanizado',
    petImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    petAlt: 'Gato curioso sendo examinado com carinho'
  },
  {
    id: 'daycare',
    span: 'lg:col-span-5',
    badge: 'ENERGIA BOA!',
    badgeBg: 'bg-[#F9D957]',
    hoverBg: 'hover:bg-[#64BDD1]',
    defaultBg: 'bg-[#FFFDF5]',
    accentPill: 'bg-[#F9D957]',
    icon: Smile,
    title: 'creche & diversão (daycare)',
    subtitle: 'Pátio gramado, enriquecimento ambiental, festinhas temáticas, hora da soneca com música clássica e fotos no WhatsApp.',
    highlights: ['Câmeras Ao Vivo', 'Monitores Comportamentais', 'Boletim Diário do Tutor'],
    priceHint: 'Diária ou Passaporte',
    duration: '07h30 às 19h30',
    petImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
    petAlt: 'Dois cães brincando felizes'
  },
  {
    id: 'delivery',
    span: 'lg:col-span-7',
    badge: 'ENTREGA EM 45 MIN!',
    badgeBg: 'bg-[#64BDD1]',
    hoverBg: 'hover:bg-[#F9D957]',
    defaultBg: 'bg-[#FFFDF5]',
    accentPill: 'bg-[#64BDD1]',
    icon: Truck,
    title: 'delivery express de ração & mimos',
    subtitle: 'Acabou o sachê ou o antipulgas? Pediu pelo WhatsApp, chegou voando na sua porta com um biscoito artesanal de brinde!',
    highlights: ['Rações Super Premium & Naturais', 'Farmácia Vet Completa', 'Frete Grátis no Bairro'],
    priceHint: 'Entrega Flash 45min',
    duration: 'Seg a Sáb • 8h às 20h',
    petImage: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=700&q=80',
    petAlt: 'Cachorrinho fofo esperando petisco'
  }
]

const ESPACO_ZONES = [
  {
    id: 'visor',
    tag: '100% Transparente',
    title: 'vitrine panorâmica uau!',
    desc: 'Aqui não tem porta fechada! Nosso centro de estética tem parede de vidro do chão ao teto e câmeras HD para você assistir ao banho tomando um café.',
    stat: 'Zero Gaiolas',
    bg: 'bg-[#F9D957]',
    img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat',
    tag: 'Exclusivo Felinos',
    title: 'suíte cat-friendly com feromônios',
    desc: 'Gatos odeiam barulho de secador alto e latidos. Criamos uma ala 100% isolada acusticamente com difusor Feliway, prateleiras verticais e veterinários especialistas em felinos.',
    stat: 'Silêncio 35dB',
    bg: 'bg-[#64BDD1]',
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jardim',
    tag: 'Ar Livre & Solzinho',
    title: 'arena recreativa & splash pad',
    desc: 'Piso drenante antiderrapante, brinquedos cognitivos, chafariz refrescante para os dias quentes e separação rigorosa por porte e energia.',
    stat: '320m² de Diversão',
    bg: 'bg-[#F9D957]',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80'
  }
]

const CLUB_PLANS = [
  {
    name: 'clube cheiroso!',
    frequency: '2 banhos por mês (Quinzenal)',
    price: 'R$ 139',
    period: '/mês',
    color: 'bg-[#FFFDF5]',
    badge: 'IDEAL PARA PELO CURTO',
    badgeBg: 'bg-[#64BDD1]',
    perks: [
      '2 Banhos Relaxantes com Ozônio',
      '1 Tosa Higiênica + Corte de Unhas/mês',
      '10% OFF em toda a Boutique & Rações',
      '1 Dia de Daycare Grátis no aniversário'
    ]
  },
  {
    name: 'clube super uau!',
    frequency: '4 banhos por mês (Semanal)',
    price: 'R$ 239',
    period: '/mês',
    color: 'bg-[#F9D957]',
    featured: true,
    badge: 'CAMPEÃO DE ASSINATURAS ★',
    badgeBg: 'bg-[#64BDD1]',
    perks: [
      '4 Banhos Relaxantes + Escovação de Dentes',
      'Hidratação Profunda de Aveia & Mel inclusa',
      '1 Consulta Veterinária Preventiva/semestre',
      'Táxi Pet com 50% OFF + Mimos surpresa todo mês'
    ]
  },
  {
    name: 'clube vip vet & spa!',
    frequency: 'Cuidado integral + Daycare',
    price: 'R$ 389',
    period: '/mês',
    color: 'bg-[#FFFDF5]',
    badge: 'TUDO INCLUSO',
    badgeBg: 'bg-[#F9D957]',
    perks: [
      '4 Banhos + 1 Tosa na Tesoura ou Máquina',
      '4 Diárias de Creche (Daycare) por mês',
      'Consultas Vet Ilimitadas em horário comercial',
      'Delivery Express Grátis ilimitado'
    ]
  }
]

const TESTIMONIALS = [
  {
    id: 1,
    petName: 'Paçoca',
    petBreed: 'Vira-lata Caramelo • 3 anos',
    tutorName: 'Mariana Costa',
    quote: 'O Paçoca tremia só de passar na calçada de outros petshops. Na pet uau! ele entra puxando a guia pra ganhar biscoito e sai cheirando a talco de bebê feliz da vida!',
    tag: 'Banho & Tosa Semanal',
    bubbleBg: 'bg-[#FFFDF5]',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    petName: 'Mingau & Bento',
    petBreed: 'Gatos SRD • 2 e 5 anos',
    tutorName: 'Lucas Andrade',
    quote: 'A sala exclusiva de gatos é surreal! Levei o Mingau pra vacinar e fazer banho a seco e ele literalmente ronronou no colo da Dra. Bia. Atendimento nota mil!',
    tag: 'Consultório Cat-Friendly',
    bubbleBg: 'bg-[#F9D957]',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    petName: 'Margot',
    petBreed: 'Bulldog Francês • 4 anos',
    tutorName: 'Fernanda Ribeiro',
    quote: 'A calculadora do site acertou em cheio o tempo do banho! Recebi foto dela de roupão amarelo no WhatsApp e quando busquei já estava pronta e super calma.',
    tag: 'Clube Super Uau!',
    bubbleBg: 'bg-[#FFFDF5]',
    avatar: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80'
  }
]

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Interactive Calculator State
  const [petType, setPetType] = useState('dog') // 'dog' | 'cat'
  const [petSize, setPetSize] = useState('medio') // 'pequeno' | 'medio' | 'grande'
  const [coatType, setCoatType] = useState('medio') // 'curto' | 'medio' | 'longo'
  const [selectedAddons, setSelectedAddons] = useState(['hidratacao'])

  // Interactive Espaço Uau tab
  const [activeZone, setActiveZone] = useState('visor')

  // Interactive Booking Modal state
  const [bookingModal, setBookingModal] = useState({
    open: false,
    presetSummary: '',
    petName: '',
    tutorPhone: '',
    preferredTime: 'Hoje à tarde (14h–17h)',
    submitted: false
  })

  const ADDONS = [
    { id: 'hidratacao', label: 'Hidratação de Aveia', minutes: 15, price: 25 },
    { id: 'higienica', label: 'Tosa Higiênica', minutes: 20, price: 30 },
    { id: 'unhas', label: 'Unhas + Limpeza Ouvidos', minutes: 10, price: 18 },
    { id: 'taxipet', label: 'Táxi Pet Uau!', minutes: 0, price: 22 }
  ]

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Real-time Bath Estimate Calculation
  const calculation = useMemo(() => {
    const baseMinutesMap = {
      dog: { pequeno: 40, medio: 55, grande: 75 },
      cat: { pequeno: 35, medio: 45, grande: 60 }
    }
    const coatMinutesMap = {
      curto: 0,
      medio: 15,
      longo: 30
    }
    const basePriceMap = {
      dog: { pequeno: 65, medio: 85, grande: 115 },
      cat: { pequeno: 75, medio: 90, grande: 110 }
    }
    const coatPriceMap = {
      curto: 0,
      medio: 15,
      longo: 30
    }

    let totalMinutes =
      baseMinutesMap[petType][petSize] + coatMinutesMap[coatType]
    let totalPrice = basePriceMap[petType][petSize] + coatPriceMap[coatType]

    selectedAddons.forEach((addonId) => {
      const found = ADDONS.find((a) => a.id === addonId)
      if (found) {
        totalMinutes += found.minutes
        totalPrice += found.price
      }
    })

    const sizeLabel = {
      pequeno: 'Pequeno (até 10kg)',
      medio: 'Médio (10 a 25kg)',
      grande: 'Grande (+25kg)'
    }[petSize]

    const coatLabel = {
      curto: 'Pelo Curto',
      medio: 'Pelo Médio / Duplo',
      longo: 'Pelo Longo / Cacheado'
    }[coatType]

    const petLabel = petType === 'dog' ? 'Cachorro' : 'Gato'

    return {
      totalMinutes,
      totalPrice,
      petLabel,
      sizeLabel,
      coatLabel,
      addonsNames: ADDONS.filter((a) => selectedAddons.includes(a.id)).map(
        (a) => a.label
      )
    }
  }, [petType, petSize, coatType, selectedAddons])

  const openBookingWithContext = (summaryText) => {
    setBookingModal({
      open: true,
      presetSummary: summaryText,
      petName: '',
      tutorPhone: '',
      preferredTime: 'Hoje à tarde (14h–17h)',
      submitted: false
    })
  }

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#080808] relative">
      {/* =====================================================================
          1. NAVBAR FLUTUANTE EM PÍLULA
      ====================================================================== */}
      <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6">
        <nav
          aria-label="Navegação Principal"
          className="max-w-6xl mx-auto bg-[#FFFDF5]/95 backdrop-blur-md border-[2.5px] border-[#080808] rounded-full px-4 sm:px-7 py-2.5 shadow-[5px_5px_0px_0px_#080808] flex items-center justify-between transition-all"
        >
          {/* Logo à esquerda */}
          <a
            href="#topo"
            className="focus:outline-none flex items-center gap-3"
            title="pet uau! — Início"
          >
            <PetUauLogo size="sm" />
          </a>

          {/* Links no centro */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 font-brand font-bold text-base lowercase">
            {[
              { href: '#servicos', label: 'serviços' },
              { href: '#calculadora', label: 'calculadora uau!' },
              { href: '#espaco', label: 'espaço uau' },
              { href: '#clube', label: 'clube de assinatura' },
              { href: '#avaliacoes', label: 'avaliações' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full border-2 border-transparent hover:border-[#080808] hover:bg-[#F9D957] transition-all duration-150"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Botão CTA à direita */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                openBookingWithContext(
                  'Agendamento Rápido de Banho & Spa Pet Uau!'
                )
              }
              className="bg-[#64BDD1] text-[#080808] font-brand font-extrabold text-sm sm:text-base px-4 sm:px-6 py-2.5 rounded-full border-[2.5px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#080808] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Agendar Banho!</span>
            </button>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu"
              className="md:hidden p-2.5 rounded-full bg-[#F9D957] border-[2.5px] border-[#080808] shadow-[3px_3px_0px_0px_#080808]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={2.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </nav>

        {/* Menu Mobile em Cápsula */}
        {mobileMenuOpen && (
          <div className="md:hidden max-w-md mx-auto mt-3 bg-[#FFFDF5] border-[3px] border-[#080808] rounded-[32px] p-5 shadow-[6px_6px_0px_0px_#080808]">
            <div className="flex flex-col gap-2 font-brand font-extrabold text-lg lowercase">
              {[
                { href: '#servicos', label: '🐾 serviços' },
                { href: '#calculadora', label: '🛁 calculadora de banho' },
                { href: '#espaco', label: '✨ espaço uau' },
                { href: '#clube', label: '👑 clube de assinatura' },
                { href: '#avaliacoes', label: '💬 avaliações' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-full border-2 border-[#080808] bg-[#F9D957]/40 hover:bg-[#F9D957] transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          2. HERO SECTION IMPACTANTE (Fundo Amarelo #F9D957)
      ====================================================================== */}
      <section
        id="topo"
        className="relative bg-[#F9D957] pt-32 pb-20 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 border-b-[3px] border-[#080808] overflow-hidden"
      >
        {/* Padrão sutil Pop-Art no fundo */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#080808 2px, transparent 2px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna Esquerda: Copywriting & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Badge estilo Sticker */}
            <div className="inline-flex items-center gap-2.5 bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-4 py-2 shadow-[4px_4px_0px_0px_#080808] -rotate-1 hover:rotate-0 transition-transform mb-6">
              <span className="text-lg">🐾</span>
              <span className="font-brand font-extrabold text-sm sm:text-base tracking-tight">
                O petshop mais feliz do bairro
              </span>
              <span className="bg-[#64BDD1] border-2 border-[#080808] rounded-full px-2 py-0.5 text-xs font-black uppercase">
                4.9 ★ Google
              </span>
            </div>

            {/* Título Gigante Lowercase com Ponto de Exclamação Inclinado */}
            <h1 className="font-brand font-black lowercase text-5xl sm:text-6xl xl:text-7xl leading-[0.98] tracking-tight text-[#080808] mb-6">
              cuidado que dá gosto de dizer{' '}
              <span className="inline-flex items-baseline bg-[#64BDD1] px-5 py-1 rounded-full border-[3px] border-[#080808] shadow-[5px_5px_0px_0px_#080808] rotate-[-1.5deg] hover:rotate-1 transition-transform">
                uau
                <span className="uau-bang ml-0.5 text-[#080808]">!</span>
              </span>
            </h1>

            {/* Subtítulo Curto */}
            <p className="text-lg sm:text-xl font-semibold text-[#080808]/90 max-w-xl leading-relaxed mb-8">
              Banho & spa sem gaiolas, clínica veterinária <strong className="font-extrabold underline decoration-[3px] decoration-[#64BDD1] underline-offset-4">fear-free</strong> e creche divertida onde seu melhor amigo abana o rabo desde a calçada!
            </p>

            {/* Dois Botões de Ação (CTA Principal WhatsApp + Secundário Serviços) */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() =>
                  openBookingWithContext(
                    'Quero agendar pelo WhatsApp um horário Uau!'
                  )
                }
                className="w-full sm:w-auto justify-center bg-[#64BDD1] text-[#080808] font-brand font-black text-lg px-7 py-4 rounded-full border-[3px] border-[#080808] shadow-[6px_6px_0px_0px_#080808] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#080808] transition-all flex items-center gap-3"
              >
                <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
                <span>agendar no whatsapp!</span>
                <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
              </button>

              <a
                href="#servicos"
                className="w-full sm:w-auto justify-center bg-[#FFFDF5] text-[#080808] font-brand font-extrabold text-lg px-7 py-4 rounded-full border-[3px] border-[#080808] shadow-[6px_6px_0px_0px_#080808] hover:bg-[#080808] hover:text-[#F9D957] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#080808] transition-all flex items-center gap-2"
              >
                <span>conhecer serviços</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </a>
            </div>

            {/* Mini Pílulas de Destaque Rápido */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl">
              {[
                { icon: ShieldCheck, value: '100% Visível', label: 'Banho sem segredos' },
                { icon: Heart, value: '+4.800 Pets', label: 'Atendidos com amor' },
                { icon: Clock, value: 'Hora Marcada', label: 'Zero espera em gaiola' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-2xl p-3 shadow-[3px_3px_0px_0px_#080808] flex flex-col"
                >
                  <div className="flex items-center gap-1.5 font-brand font-black text-sm sm:text-base">
                    <stat.icon className="w-4 h-4 text-[#080808] shrink-0" strokeWidth={2.5} />
                    <span>{stat.value}</span>
                  </div>
                  <span className="text-xs font-bold text-[#080808]/75 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Duas Cápsulas Verticais Gigantes inspiradas no Ícone da Logo */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[450px] sm:min-h-[510px]">
            {/* Elementos Gráficos Flutuantes (Estrelas, Patinhas, Bolhas em traço preto) */}
            <div className="absolute -top-4 left-2 sm:left-6 z-30 animate-float-slow">
              <div className="bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-3.5 py-1.5 shadow-[4px_4px_0px_0px_#080808] flex items-center gap-1.5 rotate-[-8deg]">
                <Droplets className="w-4 h-4 text-[#64BDD1]" strokeWidth={2.5} />
                <span className="font-brand font-black text-xs uppercase">Água Ozonizada!</span>
              </div>
            </div>

            <PopSparkle
              className="w-11 h-11 absolute top-4 right-4 sm:right-6 z-30 animate-float-reverse"
              fill="#FFFDF5"
            />
            <PopSparkle
              className="w-8 h-8 absolute bottom-10 left-2 z-30 animate-float-slow"
              fill="#64BDD1"
            />

            {/* Bolhas em traço preto */}
            <div className="w-7 h-7 rounded-full bg-[#64BDD1] border-[3px] border-[#080808] shadow-[2px_2px_0px_0px_#080808] absolute top-1/2 -left-2 z-30 animate-float-reverse" />
            <div className="w-4 h-4 rounded-full bg-[#FFFDF5] border-[2.5px] border-[#080808] absolute top-[44%] left-4 z-30" />

            {/* Duas Cápsulas Verticais Gigantes (Cachorro Feliz + Gato) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 items-center w-full max-w-md mx-auto">
              {/* Cápsula 1: Cachorro Feliz em Pílula Azul #64BDD1 */}
              <div className="relative group -mt-8">
                <div className="relative h-[340px] sm:h-[400px] w-full rounded-full bg-[#64BDD1] border-[4px] border-[#080808] shadow-[8px_8px_0px_0px_#080808] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5">
                  {/* Arco decorativo interno amarelo inspirado na logo */}
                  <div className="absolute -bottom-8 inset-x-0 h-44 bg-[#F9D957] border-t-[4px] border-[#080808] rounded-t-full" />

                  <img
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=85"
                    alt="Cachorro super feliz na cápsula Pet Uau"
                    className="relative z-10 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Tag interna inferior */}
                  <div className="absolute bottom-5 inset-x-4 z-20 bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full py-1.5 px-3 text-center shadow-[3px_3px_0px_0px_#080808]">
                    <span className="font-brand font-black text-xs sm:text-sm lowercase">
                      🐶 banho uau!
                    </span>
                  </div>
                </div>
              </div>

              {/* Cápsula 2: Gato Feliz em Pílula Azul #64BDD1 */}
              <div className="relative group mt-10">
                {/* Selo flutuante de patinha no topo da segunda cápsula */}
                <div className="absolute -top-6 -right-3 z-30 bg-[#FFFDF5] border-[3px] border-[#080808] w-14 h-14 rounded-full shadow-[4px_4px_0px_0px_#080808] flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform">
                  <PawPrint className="w-7 h-7 text-[#080808]" strokeWidth={2.5} />
                </div>

                <div className="relative h-[340px] sm:h-[400px] w-full rounded-full bg-[#64BDD1] border-[4px] border-[#080808] shadow-[8px_8px_0px_0px_#080808] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5">
                  {/* Detalhe circular amarelo no topo */}
                  <div className="absolute top-5 right-5 w-16 h-16 rounded-full bg-[#F9D957] border-[3px] border-[#080808]" />

                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=85"
                    alt="Gatinho fofo na cápsula Pet Uau"
                    className="relative z-10 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Tag interna inferior */}
                  <div className="absolute bottom-5 inset-x-4 z-20 bg-[#F9D957] border-[2.5px] border-[#080808] rounded-full py-1.5 px-3 text-center shadow-[3px_3px_0px_0px_#080808]">
                    <span className="font-brand font-black text-xs sm:text-sm lowercase">
                      🐱 clínica cat!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Flutuante da Logo Original embaixo das cápsulas */}
            <div className="absolute -bottom-4 right-4 sm:right-10 z-30 bg-[#FFFDF5] border-[3px] border-[#080808] rounded-full px-4 py-2 shadow-[4px_4px_0px_0px_#080808] flex items-center gap-2.5 rotate-[-2deg]">
              <img
                src="./logo-original.png"
                alt="Logo Oficial pet uau!"
                className="w-8 h-8 rounded-full border-2 border-[#080808] object-cover"
              />
              <span className="font-brand font-black text-xs sm:text-sm lowercase">
                estética & vet oficial!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FAIXA MARQUEE (Letreiro Infinito)
      ====================================================================== */}
      <div className="relative bg-[#080808] border-b-[3px] border-[#080808] py-4 overflow-hidden select-none">
        <div className="flex w-max animate-marquee items-center">
          {[...Array(4)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center">
              {MARQUEE_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <span
                    className={`font-brand font-black text-xl sm:text-2xl tracking-wider px-5 ${item.color}`}
                  >
                    {item.text}
                  </span>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#FFFDF5]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================================
          4. BENTO GRID DE SERVIÇOS ("o que fazemos de uau!")
      ====================================================================== */}
      <section
        id="servicos"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFDF5] border-b-[3px] border-[#080808]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#64BDD1] border-[2.5px] border-[#080808] rounded-full px-4 py-1.5 shadow-[3px_3px_0px_0px_#080808] mb-4">
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                <span className="font-brand font-extrabold text-sm uppercase tracking-wide">
                  Tudo num lugar só
                </span>
              </div>
              <h2 className="font-brand font-black lowercase text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                o que fazemos de{' '}
                <span className="bg-[#F9D957] px-4 py-0.5 rounded-full border-[3px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] inline-flex items-baseline">
                  uau
                  <span className="uau-bang ml-0.5">!</span>
                </span>
              </h2>
            </div>
            <p className="text-base sm:text-lg font-semibold text-[#080808]/80 max-w-md">
              Passe o mouse nos cards para sentir a energia! Cada serviço foi desenhado com protocolos <strong className="font-extrabold">zero estresse</strong>.
            </p>
          </div>

          {/* Bento Grid Assimétrico */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
            {SERVICES_BENTO.map((service) => {
              const IconComponent = service.icon
              return (
                <article
                  key={service.id}
                  className={`${service.span} group relative ${service.defaultBg} ${service.hoverBg} border-[3px] border-[#080808] rounded-[36px] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#080808] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_0px_#080808] transition-all duration-200 flex flex-col justify-between overflow-hidden`}
                >
                  <div>
                    {/* Topo do Card: Ícone + Badge + Preço/Tempo */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-[#FFFDF5] border-[3px] border-[#080808] shadow-[3px_3px_0px_0px_#080808] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <IconComponent className="w-7 h-7 text-[#080808]" strokeWidth={2.5} />
                        </div>
                        <span
                          className={`${service.badgeBg} group-hover:bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-3.5 py-1 font-brand font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#080808] transition-colors`}
                        >
                          {service.badge}
                        </span>
                      </div>

                      <div className="bg-[#FFFDF5] border-2 border-[#080808] rounded-full px-3.5 py-1 text-xs font-extrabold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    {/* Conteúdo Principal + Foto em Pílula */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                      <div className="sm:col-span-7">
                        <h3 className="font-brand font-black lowercase text-2xl sm:text-3xl mb-3 flex items-baseline gap-1">
                          <span>{service.title}</span>
                          <span className="uau-bang text-[#080808]">!</span>
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-[#080808]/85 leading-relaxed mb-5">
                          {service.subtitle}
                        </p>

                        {/* Lista de diferenciais em pílulas */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.highlights.map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 bg-[#FFFDF5] border-2 border-[#080808] rounded-full px-3 py-1 text-xs font-extrabold shadow-[2px_2px_0px_0px_#080808]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#080808]" strokeWidth={2.5} />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Moldura de Foto em Formato Pílula/Arco com Borda Preta */}
                      <div className="sm:col-span-5 flex justify-center">
                        <div
                          className={`w-44 h-56 sm:w-48 sm:h-60 rounded-full ${service.accentPill} group-hover:bg-[#FFFDF5] border-[3px] border-[#080808] shadow-[5px_5px_0px_0px_#080808] p-2 transition-colors overflow-hidden`}
                        >
                          <img
                            src={service.petImage}
                            alt={service.petAlt}
                            className="w-full h-full object-cover rounded-full border-2 border-[#080808] group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé do Card */}
                  <div className="pt-5 mt-4 border-t-[2.5px] border-[#080808]/20 group-hover:border-[#080808] flex items-center justify-between gap-4">
                    <span className="font-brand font-black text-base sm:text-lg">
                      {service.priceHint}
                    </span>
                    <button
                      onClick={() =>
                        openBookingWithContext(`Serviço: ${service.title} (${service.priceHint})`)
                      }
                      className="bg-[#080808] text-[#FFFDF5] group-hover:bg-[#FFFDF5] group-hover:text-[#080808] font-brand font-extrabold text-sm px-5 py-2.5 rounded-full border-[2.5px] border-[#080808] shadow-[3px_3px_0px_0px_#080808] transition-all flex items-center gap-2"
                    >
                      <span>quero agendar!</span>
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. SEÇÃO INTERATIVA "CALCULADORA DE BANHO RÁPIDO"
      ====================================================================== */}
      <section
        id="calculadora"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#64BDD1] border-b-[3px] border-[#080808] relative overflow-hidden"
      >
        {/* Estrelas Decorativas */}
        <PopSparkle className="w-12 h-12 absolute top-10 right-10 hidden lg:block" fill="#F9D957" />
        <PopSparkle className="w-9 h-9 absolute bottom-12 left-10 hidden lg:block" fill="#FFFDF5" />

        <div className="max-w-6xl mx-auto">
          {/* Título da Calculadora */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-4 py-1.5 shadow-[4px_4px_0px_0px_#080808] mb-4">
              <Clock className="w-4 h-4" strokeWidth={2.5} />
              <span className="font-brand font-extrabold text-sm uppercase">
                Simulador Instantâneo
              </span>
            </div>
            <h2 className="font-brand font-black lowercase text-4xl sm:text-5xl lg:text-6xl text-[#080808] mb-4">
              calculadora de banho{' '}
              <span className="bg-[#F9D957] px-4 py-0.5 rounded-full border-[3px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] inline-flex items-baseline">
                rápido
                <span className="uau-bang ml-0.5">!</span>
              </span>
            </h2>
            <p className="text-base sm:text-lg font-bold text-[#080808]/90">
              Selecione o perfil do seu pet e descubra na hora o tempo estimado de spa e o valor transparente do pacote!
            </p>
          </div>

          {/* Card Principal da Calculadora */}
          <div className="bg-[#FFFDF5] border-[3.5px] border-[#080808] rounded-[40px] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#080808] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Coluna de Controles (7 cols) */}
            <div className="lg:col-span-7 space-y-7">
              {/* Passo 1: Cachorro ou Gato */}
              <div>
                <label className="block font-brand font-black lowercase text-xl mb-3">
                  1. quem vai ganhar carinho hoje?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPetType('dog')}
                    className={`p-4 rounded-3xl border-[3px] border-[#080808] flex items-center gap-3.5 transition-all ${
                      petType === 'dog'
                        ? 'bg-[#F9D957] shadow-[5px_5px_0px_0px_#080808] -translate-y-0.5'
                        : 'bg-[#FFFDF5] shadow-[2px_2px_0px_0px_#080808] hover:bg-[#F9D957]/30'
                    }`}
                  >
                    <MinimalDogIcon className="w-12 h-12 shrink-0" fillAccent="#FFFDF5" />
                    <div className="text-left">
                      <div className="font-brand font-black text-lg lowercase">cachorro!</div>
                      <div className="text-xs font-bold text-[#080808]/75">Banho Ozônio + Massagem</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPetType('cat')}
                    className={`p-4 rounded-3xl border-[3px] border-[#080808] flex items-center gap-3.5 transition-all ${
                      petType === 'cat'
                        ? 'bg-[#64BDD1] shadow-[5px_5px_0px_0px_#080808] -translate-y-0.5'
                        : 'bg-[#FFFDF5] shadow-[2px_2px_0px_0px_#080808] hover:bg-[#64BDD1]/30'
                    }`}
                  >
                    <MinimalCatIcon className="w-12 h-12 shrink-0" fillAccent="#F9D957" />
                    <div className="text-left">
                      <div className="font-brand font-black text-lg lowercase">gato!</div>
                      <div className="text-xs font-bold text-[#080808]/75">Suíte Silenciosa Feliway</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Passo 2: Porte */}
              <div>
                <label className="block font-brand font-black lowercase text-xl mb-3">
                  2. qual é o porte?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'pequeno', title: 'Pequeno', sub: 'até 10kg' },
                    { id: 'medio', title: 'Médio', sub: '10 a 25kg' },
                    { id: 'grande', title: 'Grande', sub: 'acima de 25kg' },
                  ].map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setPetSize(size.id)}
                      className={`py-3.5 px-4 rounded-2xl border-[2.5px] border-[#080808] text-center transition-all ${
                        petSize === size.id
                          ? 'bg-[#F9D957] shadow-[4px_4px_0px_0px_#080808] font-black'
                          : 'bg-[#FFFDF5] hover:bg-[#F9D957]/25 font-bold'
                      }`}
                    >
                      <div className="font-brand text-base sm:text-lg">{size.title}</div>
                      <div className="text-xs text-[#080808]/75">{size.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Passo 3: Tipo de Pelo */}
              <div>
                <label className="block font-brand font-black lowercase text-xl mb-3">
                  3. como é o pelinho?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'curto', title: 'Pelo Curto', desc: 'Secagem rápida' },
                    { id: 'medio', title: 'Médio / Duplo', desc: 'Escovação extra' },
                    { id: 'longo', title: 'Longo / Cacheado', desc: 'Desembolo suave' },
                  ].map((coat) => (
                    <button
                      key={coat.id}
                      type="button"
                      onClick={() => setCoatType(coat.id)}
                      className={`py-3.5 px-4 rounded-2xl border-[2.5px] border-[#080808] text-left transition-all ${
                        coatType === coat.id
                          ? 'bg-[#64BDD1] shadow-[4px_4px_0px_0px_#080808]'
                          : 'bg-[#FFFDF5] hover:bg-[#64BDD1]/20'
                      }`}
                    >
                      <div className="font-brand font-black text-base">{coat.title}</div>
                      <div className="text-xs font-bold text-[#080808]/75">{coat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Passo 4: Mimos Extras Opcionais */}
              <div>
                <label className="block font-brand font-black lowercase text-xl mb-3">
                  4. quer adicionar algum mimo extra? (opcional)
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {ADDONS.map((addon) => {
                    const active = selectedAddons.includes(addon.id)
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`px-4 py-2 rounded-full border-[2.5px] border-[#080808] font-brand font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                          active
                            ? 'bg-[#F9D957] shadow-[3px_3px_0px_0px_#080808]'
                            : 'bg-[#FFFDF5] opacity-85 hover:opacity-100'
                        }`}
                      >
                        <span>{active ? '✓' : '+'}</span>
                        <span>{addon.label}</span>
                        <span className="bg-[#080808] text-[#FFFDF5] px-2 py-0.5 rounded-full text-[11px]">
                          +R$ {addon.price}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Coluna de Resultado Instantâneo em Cápsula/Ticket (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#F9D957] border-[3.5px] border-[#080808] rounded-[36px] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#080808] relative">
                {/* Selo no Topo */}
                <div className="inline-flex items-center gap-2 bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-3.5 py-1 text-xs font-brand font-black uppercase mb-5 shadow-[2px_2px_0px_0px_#080808]">
                  <Sparkles className="w-3.5 h-3.5 text-[#080808]" strokeWidth={2.5} />
                  <span>Seu Pacote Personalizado</span>
                </div>

                {/* Resumo da Seleção */}
                <div className="bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-3xl p-4 mb-5 shadow-[3px_3px_0px_0px_#080808]">
                  <div className="flex items-center justify-between border-b-2 border-dashed border-[#080808]/30 pb-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      {petType === 'dog' ? (
                        <MinimalDogIcon className="w-9 h-9" />
                      ) : (
                        <MinimalCatIcon className="w-9 h-9" />
                      )}
                      <div>
                        <div className="font-brand font-black text-base lowercase">
                          spa {calculation.petLabel} uau!
                        </div>
                        <div className="text-xs font-bold text-[#080808]/75">
                          {calculation.sizeLabel} • {calculation.coatLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tempo Estimado & Valor */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#64BDD1]/35 border-2 border-[#080808] rounded-2xl p-3">
                      <span className="text-[11px] font-black uppercase block text-[#080808]/75">
                        Tempo Estimado
                      </span>
                      <span className="font-brand font-black text-2xl sm:text-3xl text-[#080808]">
                        ~{calculation.totalMinutes} min
                      </span>
                    </div>

                    <div className="bg-[#F9D957]/60 border-2 border-[#080808] rounded-2xl p-3">
                      <span className="text-[11px] font-black uppercase block text-[#080808]/75">
                        Investimento
                      </span>
                      <span className="font-brand font-black text-2xl sm:text-3xl text-[#080808]">
                        R$ {calculation.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inclusos sempre */}
                <div className="space-y-2 mb-6 text-xs sm:text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                    <span>Água morna ozonizada + Shampoo Hipoalergênico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                    <span>Bandana ou lacinho colecionável + Foto no WhatsApp</span>
                  </div>
                  {calculation.addonsNames.length > 0 && (
                    <div className="flex items-start gap-2 text-[#080808]">
                      <Gift className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>
                        Extras: <strong>{calculation.addonsNames.join(', ')}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA Direto para Reservar */}
                <button
                  type="button"
                  onClick={() =>
                    openBookingWithContext(
                      `Pacote Calculadora: ${calculation.petLabel} | ${calculation.sizeLabel} | ${calculation.coatLabel} (~${calculation.totalMinutes} min • R$ ${calculation.totalPrice})`
                    )
                  }
                  className="w-full bg-[#64BDD1] text-[#080808] font-brand font-black text-lg py-4 px-6 rounded-full border-[3px] border-[#080808] shadow-[5px_5px_0px_0px_#080808] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#080808] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" strokeWidth={2.5} />
                  <span>reservar este pacote!</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. ESPAÇO UAU & CLUBE DE ASSINATURA (Navegação Completa)
      ====================================================================== */}
      <section
        id="espaco"
        className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFDF5] border-b-[3px] border-[#080808]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#F9D957] border-[2.5px] border-[#080808] rounded-full px-4 py-1 font-brand font-black text-xs uppercase shadow-[3px_3px_0px_0px_#080808] mb-3">
                <Camera className="w-4 h-4" strokeWidth={2.5} /> Tour Pelo Espaço Uau
              </span>
              <h2 className="font-brand font-black lowercase text-4xl sm:text-5xl">
                arquitetura pensada para{' '}
                <span className="bg-[#64BDD1] px-4 py-0.5 rounded-full border-[3px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] inline-flex items-baseline">
                  acalmar
                  <span className="uau-bang ml-0.5">!</span>
                </span>
              </h2>
            </div>

            {/* Botões Seletores do Tour */}
            <div className="flex flex-wrap gap-2">
              {ESPACO_ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActiveZone(z.id)}
                  className={`px-5 py-2.5 rounded-full border-[2.5px] border-[#080808] font-brand font-extrabold text-sm lowercase transition-all ${
                    activeZone === z.id
                      ? 'bg-[#080808] text-[#F9D957] shadow-[3px_3px_0px_0px_#64BDD1]'
                      : 'bg-[#FFFDF5] hover:bg-[#F9D957]/50 shadow-[3px_3px_0px_0px_#080808]'
                  }`}
                >
                  {z.title}
                </button>
              ))}
            </div>
          </div>

          {/* Card Ativo do Espaço Uau */}
          {ESPACO_ZONES.filter((z) => z.id === activeZone).map((zone) => (
            <div
              key={zone.id}
              className={`${zone.bg} border-[3.5px] border-[#080808] rounded-[40px] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#080808] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}
            >
              <div className="lg:col-span-6 space-y-5">
                <span className="inline-block bg-[#FFFDF5] border-2 border-[#080808] rounded-full px-4 py-1 font-brand font-black text-xs uppercase shadow-[2px_2px_0px_0px_#080808]">
                  {zone.tag}
                </span>
                <h3 className="font-brand font-black lowercase text-3xl sm:text-4xl">
                  {zone.title}
                </h3>
                <p className="text-base sm:text-lg font-semibold text-[#080808]/90 leading-relaxed">
                  {zone.desc}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-5 py-2.5 font-brand font-black text-base shadow-[3px_3px_0px_0px_#080808]">
                    ✨ {zone.stat}
                  </div>
                  <button
                    onClick={() =>
                      openBookingWithContext(`Visita guiada ao ${zone.title}`)
                    }
                    className="bg-[#080808] text-[#FFFDF5] font-brand font-extrabold text-sm px-6 py-3 rounded-full border-2 border-[#080808] hover:bg-[#FFFDF5] hover:text-[#080808] transition-colors"
                  >
                    agendar visita gratuita!
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-lg h-72 sm:h-80 rounded-[40px] bg-[#FFFDF5] border-[3.5px] border-[#080808] shadow-[6px_6px_0px_0px_#080808] p-3 overflow-hidden">
                  <img
                    src={zone.img}
                    alt={zone.title}
                    className="w-full h-full object-cover rounded-[28px] border-2 border-[#080808]"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Subseção: Clube de Assinatura Uau! */}
          <div id="clube" className="mt-24 pt-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 bg-[#64BDD1] border-[2.5px] border-[#080808] rounded-full px-4 py-1 font-brand font-black text-xs uppercase shadow-[3px_3px_0px_0px_#080808] mb-3">
                <Flame className="w-4 h-4" strokeWidth={2.5} /> Clube de Assinatura Pet Uau!
              </span>
              <h2 className="font-brand font-black lowercase text-4xl sm:text-5xl">
                pet cheiroso o mês inteiro por menos{' '}
                <span className="bg-[#F9D957] px-4 py-0.5 rounded-full border-[3px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] inline-flex items-baseline">
                  uau
                  <span className="uau-bang ml-0.5">!</span>
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
              {CLUB_PLANS.map((plan, idx) => (
                <div
                  key={idx}
                  className={`${plan.color} border-[3px] border-[#080808] rounded-[36px] p-7 shadow-[6px_6px_0px_0px_#080808] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#080808] transition-all flex flex-col justify-between ${
                    plan.featured ? 'lg:-translate-y-3' : ''
                  }`}
                >
                  <div>
                    <span
                      className={`inline-block ${plan.badgeBg} border-2 border-[#080808] rounded-full px-3.5 py-1 font-brand font-black text-xs uppercase shadow-[2px_2px_0px_0px_#080808] mb-4`}
                    >
                      {plan.badge}
                    </span>
                    <h3 className="font-brand font-black lowercase text-3xl mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs font-extrabold text-[#080808]/75 mb-5">
                      {plan.frequency}
                    </p>

                    <div className="flex items-baseline gap-1 mb-6 pb-5 border-b-2 border-[#080808]/20">
                      <span className="font-brand font-black text-4xl sm:text-5xl">
                        {plan.price}
                      </span>
                      <span className="font-bold text-sm">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.perks.map((perk, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2.5 text-sm font-bold"
                        >
                          <BadgeCheck
                            className="w-5 h-5 text-[#080808] shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() =>
                      openBookingWithContext(`Assinatura ${plan.name} (${plan.price}/mês)`)
                    }
                    className={`w-full py-3.5 px-6 rounded-full border-[2.5px] border-[#080808] font-brand font-black text-base shadow-[4px_4px_0px_0px_#080808] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#080808] transition-all ${
                      plan.featured
                        ? 'bg-[#64BDD1] text-[#080808]'
                        : 'bg-[#F9D957] text-[#080808]'
                    }`}
                  >
                    assinar {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. PROVA SOCIAL ("tutores que disseram uau!")
      ====================================================================== */}
      <section
        id="avaliacoes"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#F9D957] border-b-[3px] border-[#080808]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-4 py-1.5 shadow-[4px_4px_0px_0px_#080808] mb-4">
              <Heart className="w-4 h-4 fill-[#64BDD1]" strokeWidth={2.5} />
              <span className="font-brand font-extrabold text-sm uppercase">
                Aprovado por Cães, Gatos & Humanos
              </span>
            </div>
            <h2 className="font-brand font-black lowercase text-4xl sm:text-5xl lg:text-6xl">
              tutores que disseram{' '}
              <span className="bg-[#64BDD1] px-5 py-0.5 rounded-full border-[3px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] inline-flex items-baseline">
                uau
                <span className="uau-bang ml-0.5">!</span>
              </span>
            </h2>
          </div>

          {/* Grid de Balões de Fala */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="flex flex-col justify-between group">
                {/* Balão de Fala com Contorno Preto Grosso */}
                <div
                  className={`relative ${item.bubbleBg} border-[3px] border-[#080808] rounded-[36px] p-7 shadow-[6px_6px_0px_0px_#080808] group-hover:-translate-y-1 transition-transform mb-7`}
                >
                  {/* Topo: 5 Estrelas + Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className="w-5 h-5 fill-[#F9D957] text-[#080808]"
                          strokeWidth={2.5}
                        />
                      ))}
                    </div>
                    <span className="bg-[#64BDD1] border-2 border-[#080808] rounded-full px-3 py-0.5 text-xs font-brand font-extrabold">
                      {item.tag}
                    </span>
                  </div>

                  {/* Depoimento */}
                  <p className="text-base font-bold text-[#080808] leading-relaxed mb-2">
                    “{item.quote}”
                  </p>

                  {/* Rabicho do Balão de Fala */}
                  <div
                    className={`w-6 h-6 ${item.bubbleBg} border-r-[3px] border-b-[3px] border-[#080808] rotate-45 absolute -bottom-[14px] left-10`}
                  />
                </div>

                {/* Tutor + Foto do Pet em Moldura Circular Azul (#64BDD1) */}
                <div className="flex items-center gap-4 pl-3">
                  <div className="w-16 h-16 rounded-full bg-[#64BDD1] border-[3px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] p-1 shrink-0 overflow-hidden">
                    <img
                      src={item.avatar}
                      alt={item.petName}
                      className="w-full h-full object-cover rounded-full border border-[#080808]"
                    />
                  </div>
                  <div>
                    <div className="font-brand font-black text-lg text-[#080808]">
                      {item.petName}
                    </div>
                    <div className="text-xs font-extrabold text-[#080808]/80">
                      {item.petBreed}
                    </div>
                    <div className="text-xs font-bold text-[#080808]/70">
                      Tutor(a): {item.tutorName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. FOOTER DIVERTIDO (Fundo Preto #080808, Textos #F9D957, Botões #64BDD1)
      ====================================================================== */}
      <footer className="bg-[#080808] text-[#F9D957] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid Principal do Footer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b-2 border-[#F9D957]/25">
            {/* Coluna 1: Marca & Manifesto (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-block bg-[#F9D957] border-[3px] border-[#FFFDF5] rounded-full px-5 py-2.5 shadow-[5px_5px_0px_0px_#64BDD1]">
                <PetUauLogo size="md" />
              </div>

              <p className="text-[#FFFDF5]/90 font-semibold text-base leading-relaxed">
                O petshop e clínica veterinária onde estética, saúde e diversão se encontram com zero estresse e muito carinho!
              </p>

              {/* Botões Instagram & WhatsApp em Azul #64BDD1 */}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#64BDD1] text-[#080808] font-brand font-black text-sm px-5 py-3 rounded-full border-2 border-[#FFFDF5] shadow-[4px_4px_0px_0px_#F9D957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#F9D957] transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
                  <span>WhatsApp Direto</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#64BDD1] text-[#080808] font-brand font-black text-sm px-5 py-3 rounded-full border-2 border-[#FFFDF5] shadow-[4px_4px_0px_0px_#F9D957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#F9D957] transition-all flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" strokeWidth={2.5} />
                  <span>@petuau.oficial</span>
                </a>
              </div>
            </div>

            {/* Coluna 2: Horários de Funcionamento (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2 font-brand font-black lowercase text-2xl text-[#F9D957]">
                <Clock className="w-6 h-6 text-[#64BDD1]" strokeWidth={2.5} />
                <span>horários uau!</span>
              </div>

              <div className="bg-[#FFFDF5]/5 border-2 border-[#F9D957]/40 rounded-3xl p-5 space-y-3 text-sm">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#F9D957]/20">
                  <span className="font-bold text-[#FFFDF5]">Segunda a Sexta</span>
                  <span className="font-brand font-black text-[#F9D957]">07h30 às 20h00</span>
                </div>
                <div className="flex items-center justify-between pb-2.5 border-b border-[#F9D957]/20">
                  <span className="font-bold text-[#FFFDF5]">Sábados</span>
                  <span className="font-brand font-black text-[#F9D957]">08h00 às 18h00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#FFFDF5]">Domingos (Plantão Vet)</span>
                  <span className="font-brand font-black text-[#64BDD1]">09h00 às 15h00</span>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-extrabold text-[#64BDD1]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#64BDD1] animate-ping" />
                  <span>Estacionamento próprio para clientes na porta!</span>
                </div>
              </div>
            </div>

            {/* Coluna 3: Mapa Estilizado Neo-Brutalista (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2 font-brand font-black lowercase text-2xl text-[#F9D957]">
                <MapPin className="w-6 h-6 text-[#64BDD1]" strokeWidth={2.5} />
                <span>onde estamos!</span>
              </div>

              {/* Card de Mapa Estilizado Pop-Art */}
              <div className="relative bg-[#FFFDF5] text-[#080808] border-[3px] border-[#F9D957] rounded-3xl p-4 shadow-[5px_5px_0px_0px_#64BDD1] overflow-hidden">
                {/* Grade de ruas estilizada */}
                <div className="relative h-36 rounded-2xl bg-[#F9D957]/40 border-2 border-[#080808] overflow-hidden mb-3 flex items-center justify-center">
                  {/* Ruas desenhadas */}
                  <div className="absolute inset-x-0 top-1/2 h-5 bg-[#FFFDF5] border-y-2 border-[#080808] -rotate-6" />
                  <div className="absolute inset-y-0 left-1/3 w-5 bg-[#FFFDF5] border-x-2 border-[#080808] rotate-12" />
                  <div className="absolute top-3 right-3 bg-[#64BDD1] border-2 border-[#080808] rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase">
                    Próx. à Praça das Árvores
                  </div>

                  {/* Pin Central Pulsante */}
                  <div className="relative z-10 bg-[#64BDD1] border-[2.5px] border-[#080808] rounded-full px-3.5 py-1.5 shadow-[3px_3px_0px_0px_#080808] flex items-center gap-1.5 animate-bounce">
                    <PawPrint className="w-4 h-4 text-[#080808]" strokeWidth={2.5} />
                    <span className="font-brand font-black text-xs lowercase">pet uau! aqui</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-brand font-black text-sm">
                      Rua dos Girassóis, 420 — Jardim Uau
                    </div>
                    <div className="text-xs font-bold text-[#080808]/70">
                      São Paulo • SP • CEP 04567-000
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#64BDD1] border-2 border-[#080808] rounded-full p-2.5 shadow-[2px_2px_0px_0px_#080808] hover:bg-[#F9D957] transition-colors"
                    title="Abrir rota no Google Maps"
                  >
                    <Navigation className="w-4 h-4 text-[#080808]" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Barra Inferior do Footer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#F9D957]/80">
            <div>
              © {new Date().getFullYear()} pet uau! estética animal & clínica veterinária ltda. todos os latidos e ronronados reservados!
            </div>
            <div className="flex items-center gap-4">
              <a href="#topo" className="hover:text-[#64BDD1] underline">
                voltar ao topo ↑
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MODAL INTERATIVO DE AGENDAMENTO RÁPIDO (WHATSAPP / AGENDA UAU!)
      ====================================================================== */}
      {bookingModal.open && (
        <div
          className="fixed inset-0 z-50 bg-[#080808]/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#FFFDF5] border-[3.5px] border-[#080808] rounded-[36px] max-w-lg w-full p-6 sm:p-8 shadow-[10px_10px_0px_0px_#F9D957] relative">
            <button
              onClick={() => setBookingModal((prev) => ({ ...prev, open: false }))}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F9D957] border-[2.5px] border-[#080808] shadow-[2px_2px_0px_0px_#080808] flex items-center justify-center hover:bg-[#64BDD1] transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {!bookingModal.submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setBookingModal((prev) => ({ ...prev, submitted: true }))
                }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 bg-[#64BDD1] border-2 border-[#080808] rounded-full px-3.5 py-1 font-brand font-black text-xs uppercase">
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span>Reserva Expressa</span>
                </div>

                <h3 className="font-brand font-black lowercase text-3xl">
                  vamos agendar seu momento{' '}
                  <span className="bg-[#F9D957] px-3 rounded-full border-2 border-[#080808]">
                    uau!
                  </span>
                </h3>

                <div className="bg-[#F9D957]/40 border-2 border-[#080808] rounded-2xl p-3 text-xs font-extrabold">
                  🐾 Selecionado: {bookingModal.presetSummary}
                </div>

                <div>
                  <label className="block font-brand font-extrabold text-sm lowercase mb-1">
                    nome do seu pet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Paçoca, Mingau, Thor..."
                    value={bookingModal.petName}
                    onChange={(e) =>
                      setBookingModal((prev) => ({ ...prev, petName: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-2xl border-[2.5px] border-[#080808] bg-[#FFFDF5] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#64BDD1]"
                  />
                </div>

                <div>
                  <label className="block font-brand font-extrabold text-sm lowercase mb-1">
                    seu whatsapp com ddd *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={bookingModal.tutorPhone}
                    onChange={(e) =>
                      setBookingModal((prev) => ({
                        ...prev,
                        tutorPhone: e.target.value
                      }))
                    }
                    className="w-full px-4 py-3 rounded-2xl border-[2.5px] border-[#080808] bg-[#FFFDF5] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#64BDD1]"
                  />
                </div>

                <div>
                  <label className="block font-brand font-extrabold text-sm lowercase mb-1">
                    melhor período
                  </label>
                  <select
                    value={bookingModal.preferredTime}
                    onChange={(e) =>
                      setBookingModal((prev) => ({
                        ...prev,
                        preferredTime: e.target.value
                      }))
                    }
                    className="w-full px-4 py-3 rounded-2xl border-[2.5px] border-[#080808] bg-[#FFFDF5] font-bold text-sm focus:outline-none"
                  >
                    <option>Hoje à tarde (14h–17h)</option>
                    <option>Amanhã de manhã (08h–12h)</option>
                    <option>Amanhã à tarde (13h–18h)</option>
                    <option>Sábado Especial Uau!</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#64BDD1] text-[#080808] font-brand font-black text-lg py-3.5 rounded-full border-[3px] border-[#080808] shadow-[5px_5px_0px_0px_#080808] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#080808] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                  <span>confirmar horário uau!</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#64BDD1] border-[3px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-[#080808]" strokeWidth={2.5} />
                </div>
                <h4 className="font-brand font-black lowercase text-3xl">
                  oba, {bookingModal.petName || 'seu pet'} vai amar!
                </h4>
                <p className="text-sm font-bold text-[#080808]/80 max-w-sm mx-auto">
                  Recebemos seu pedido para <strong>{bookingModal.preferredTime}</strong>! Nossa recepção já está preparando o biscoito de boas-vindas.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                      `Olá pet uau! Quero confirmar o horário de ${bookingModal.petName}: ${bookingModal.presetSummary} (${bookingModal.preferredTime})`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#F9D957] border-[2.5px] border-[#080808] rounded-full px-6 py-3 font-brand font-black text-sm shadow-[4px_4px_0px_0px_#080808]"
                  >
                    abrir conversa no whatsapp 🐾
                  </a>
                  <button
                    onClick={() =>
                      setBookingModal((prev) => ({ ...prev, open: false }))
                    }
                    className="bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-5 py-3 font-brand font-extrabold text-sm"
                  >
                    voltar ao site
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
