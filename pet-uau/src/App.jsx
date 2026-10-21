import React, { useState, useMemo } from 'react'
import {
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  Heart,
  Scissors,
  ShoppingBag,
  Pill,
  Bone,
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

const WHATSAPP_NUMBER = '551122806929'
const WHATSAPP_DISPLAY = '(11) 2280-6929'
const INSTAGRAM_URL = 'https://www.instagram.com/petuauoficial/'
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Rua+Piraquara+36+Jardim+Nordeste+Sao+Paulo'

function getWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

const MARQUEE_ITEMS = [
  { text: 'BANHO & TOSA', color: 'text-[#F9D957]' },
  { text: 'RAÇÕES & PETISCOS', color: 'text-[#64BDD1]' },
  { text: 'PERFUMARIA PET', color: 'text-[#F9D957]' },
  { text: 'FARMÁCIA', color: 'text-[#64BDD1]' },
  { text: 'ACESSÓRIOS', color: 'text-[#F9D957]' },
]

const SERVICES_BENTO = [
  {
    id: 'banho',
    span: 'lg:col-span-7',
    badge: 'CARINHO & CAPRICHO!',
    badgeBg: 'bg-[#64BDD1]',
    hoverBg: 'hover:bg-[#F9D957]',
    defaultBg: 'bg-[#FFFDF5]',
    accentPill: 'bg-[#64BDD1]',
    icon: Scissors,
    title: 'banho & tosa',
    subtitle:
      'Banho quentinho com produtos de qualidade, secagem cuidadosa, tosa higiênica, tosa na máquina ou tesoura e aquele cheirinho que todo tutor ama.',
    highlights: [
      'Banho & Secagem Cuidadosa',
      'Tosa Higiênica e Completa',
      'Corte de Unhas & Limpeza de Ouvidos',
    ],
    ctaLabel: 'Agendar Banho e Tosa',
    whatsappText:
      'Olá Pet Uau! Vim pelo site e gostaria de agendar um horário de Banho e Tosa.',
    petImage:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=80',
    petAlt: 'Cachorro feliz após banho e tosa'
  },
  {
    id: 'racoes',
    span: 'lg:col-span-5',
    badge: 'NUTRIÇÃO & SABOR',
    badgeBg: 'bg-[#F9D957]',
    hoverBg: 'hover:bg-[#64BDD1]',
    defaultBg: 'bg-[#FFFDF5]',
    accentPill: 'bg-[#F9D957]',
    icon: Bone,
    title: 'rações & petiscos',
    subtitle:
      'Variedade de rações para cães e gatos de todos os portes e idades, além de sachês, bifinhos, ossinhos e petiscos irresistíveis.',
    highlights: [
      'Rações Secas & Úmidas',
      'Petiscos, Bifinhos & Sachês',
      'Opções Filhotes, Adultos e Sênior',
    ],
    ctaLabel: 'Consultar Rações no WhatsApp',
    whatsappText:
      'Olá Pet Uau! Vim pelo site e quero consultar opções de ração e petiscos.',
    petImage:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
    petAlt: 'Cachorrinho esperando petisco'
  },
  {
    id: 'perfumaria',
    span: 'lg:col-span-5',
    badge: 'ESTILO & CHEIRINHO!',
    badgeBg: 'bg-[#F9D957]',
    hoverBg: 'hover:bg-[#64BDD1]',
    defaultBg: 'bg-[#FFFDF5]',
    accentPill: 'bg-[#F9D957]',
    icon: ShoppingBag,
    title: 'perfumaria & acessórios',
    subtitle:
      'Colônias deliciosas, shampoos, hidratantes, coleiras, guias, peitorais, caminhas, comedouros, brinquedos e roupinhas cheias de personalidade.',
    highlights: [
      'Colônias & Linha de Higiene',
      'Coleiras, Guias e Caminhas',
      'Brinquedos & Acessórios',
    ],
    ctaLabel: 'Ver Perfumaria e Acessórios',
    whatsappText:
      'Olá Pet Uau! Vim pelo site e gostaria de ver opções de perfumaria e acessórios.',
    petImage:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    petAlt: 'Gatinho estiloso'
  },
  {
    id: 'farmacia',
    span: 'lg:col-span-7',
    badge: 'PROTEÇÃO EM DIA!',
    badgeBg: 'bg-[#64BDD1]',
    hoverBg: 'hover:bg-[#F9D957]',
    defaultBg: 'bg-[#FFFDF5]',
    accentPill: 'bg-[#64BDD1]',
    icon: Pill,
    title: 'farmácia pet',
    subtitle:
      'Antipulgas e carrapatos, vermífugos, vitaminas, suplementos e produtos de cuidado essencial para manter seu melhor amigo sempre protegido.',
    highlights: [
      'Antipulgas & Carrapatos',
      'Vermífugos & Vitaminas',
      'Higiene Bucal e Auricular',
    ],
    ctaLabel: 'Pedir Item da Farmácia',
    whatsappText:
      'Olá Pet Uau! Vim pelo site e preciso de um produto da farmácia pet.',
    petImage:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=80',
    petAlt: 'Cães saudáveis e protegidos'
  }
]

const STORE_HIGHLIGHTS = [
  {
    id: 'banho-tosa',
    tag: 'Destaque #1',
    title: 'estética banho & tosa!',
    desc: 'Seu pet tratado com paciência, produtos cheirosos, secagem na temperatura certa e acabamento caprichado com lacinho ou gravatinha.',
    stat: 'Com Hora Marcada',
    bg: 'bg-[#F9D957]',
    img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'racoes-petiscos',
    tag: 'Destaque #2',
    title: 'ração, sachês & petiscos!',
    desc: 'Trabalhamos com as marcas que seu cão ou gato mais gosta. Não sabe qual escolher? Nossa equipe ajuda a indicar a ideal para a idade e porte dele!',
    stat: 'Nutrição Completa',
    bg: 'bg-[#64BDD1]',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'perfumaria-acessorios',
    tag: 'Destaque #3',
    title: 'perfumaria, farmácia & mimos!',
    desc: 'De antipulgas e vermífugos até colônias irresistíveis, brinquedos resistentes, guias e caminhas fofinhas na nossa loja no Jardim Nordeste.',
    stat: 'Loja Completa',
    bg: 'bg-[#F9D957]',
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80'
  }
]

const CLUB_PLANS = [
  {
    name: 'pacote quinzenal!',
    frequency: '2 banhos por mês',
    color: 'bg-[#FFFDF5]',
    badge: 'SEMPRE CHEIROSO',
    badgeBg: 'bg-[#64BDD1]',
    perks: [
      '2 Banhos Caprichados no mês',
      'Corte de Unhas + Limpeza de Ouvidos',
      'Finalização com Perfume & Lacinho/Bandana',
      'Horários fixos garantidos na agenda'
    ]
  },
  {
    name: 'pacote semanal uau!',
    frequency: '4 banhos por mês (1 por semana)',
    color: 'bg-[#F9D957]',
    featured: true,
    badge: 'O MAIS ESCOLHIDO ★',
    badgeBg: 'bg-[#64BDD1]',
    perks: [
      '4 Banhos Completos no mês',
      '1 Tosa Higiênica inclusa no pacote',
      'Hidratação especial para pelagem macia',
      'Corte de Unhas, Limpeza de Ouvidos & Perfume'
    ]
  },
  {
    name: 'combo banho & tosa!',
    frequency: 'Estética completa sob medida',
    color: 'bg-[#FFFDF5]',
    badge: 'VISUAL RENOVADO',
    badgeBg: 'bg-[#F9D957]',
    perks: [
      'Banho Completo + Desembolo cuidadoso',
      'Tosa na Máquina ou na Tesoura',
      'Tosa Higiênica + Acabamento de patinhas',
      'Perfumaria Pet Uau! de longa duração'
    ]
  }
]

const TESTIMONIALS = [
  {
    id: 1,
    petName: 'Paçoca',
    petBreed: 'Cachorro • Cliente de Banho e Tosa',
    tutorName: 'Cliente Jardim Nordeste',
    quote: 'Levo meu doguinho toda semana e ele volta sempre super cheiroso, com o pelo macio e gravatinha linda. Atendimento nota mil da equipe!',
    tag: 'Banho & Tosa',
    bubbleBg: 'bg-[#FFFDF5]',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    petName: 'Mingau',
    petBreed: 'Gato • Ração e Farmácia',
    tutorName: 'Tutora do Bairro',
    quote: 'Encontro tudo o que preciso na Rua Piraquara! Ração, sachê, antipulgas e acessórios com ótimo atendimento e muita simpatia.',
    tag: 'Rações & Farmácia',
    bubbleBg: 'bg-[#F9D957]',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    petName: 'Mel',
    petBreed: 'Shih-tzu • Banho & Tosa',
    tutorName: 'Cliente Fiel Pet Uau!',
    quote: 'A tosa da Mel fica impecável! Dá pra ver o cuidado e o carinho que eles têm com os bichinhos desde a hora que a gente chega na loja.',
    tag: 'Tosa Caprichada',
    bubbleBg: 'bg-[#FFFDF5]',
    avatar: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80'
  }
]

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Interactive Calculator State
  const [petType, setPetType] = useState('dog') // 'dog' | 'cat'
  const [petSize, setPetSize] = useState('medio') // 'pequeno' | 'medio' | 'grande'
  const [coatType, setCoatType] = useState('medio') // 'curto' | 'medio' | 'longo'
  const [selectedAddons, setSelectedAddons] = useState(['higienica'])

  // Active highlight tab
  const [activeZone, setActiveZone] = useState('banho-tosa')

  const ADDONS = [
    { id: 'higienica', label: 'Tosa Higiênica', minutes: 20 },
    { id: 'hidratacao', label: 'Hidratação nos Pelos', minutes: 15 },
    { id: 'tosa', label: 'Tosa Geral (Máquina/Tesoura)', minutes: 35 },
    { id: 'unhas', label: 'Corte de Unhas + Ouvidos', minutes: 10 },
  ]

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

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

    let totalMinutes =
      baseMinutesMap[petType][petSize] + coatMinutesMap[coatType]

    selectedAddons.forEach((addonId) => {
      const found = ADDONS.find((a) => a.id === addonId)
      if (found) {
        totalMinutes += found.minutes
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
    const addonsNames = ADDONS.filter((a) => selectedAddons.includes(a.id)).map(
      (a) => a.label
    )

    const whatsappMessage = `Olá Pet Uau! Simulei na Calculadora do site:\n• Pet: ${petLabel}\n• Porte: ${sizeLabel}\n• Pelagem: ${coatLabel}${
      addonsNames.length ? `\n• Adicionais: ${addonsNames.join(', ')}` : ''
    }\n• Tempo estimado: ~${totalMinutes} min\nGostaria de consultar valores e horários disponíveis!`

    return {
      totalMinutes,
      petLabel,
      sizeLabel,
      coatLabel,
      addonsNames,
      whatsappMessage
    }
  }, [petType, petSize, coatType, selectedAddons])

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
              { href: '#calculadora', label: 'calculadora' },
              { href: '#espaco', label: 'nossa loja' },
              { href: '#clube', label: 'pacotes de banho' },
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
            <a
              href={getWhatsAppUrl(
                'Olá Pet Uau! Vim pelo site e quero agendar um Banho!'
              )}
              target="_blank"
              rel="noreferrer"
              className="bg-[#64BDD1] text-[#080808] font-brand font-extrabold text-sm sm:text-base px-4 sm:px-6 py-2.5 rounded-full border-[2.5px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#080808] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Agendar Banho!</span>
            </a>

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
                { href: '#espaco', label: '🏪 nossa loja' },
                { href: '#clube', label: '✨ pacotes de banho' },
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
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#080808 2px, transparent 2px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna Esquerda */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Badge estilo Sticker */}
            <div className="inline-flex items-center gap-2.5 bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-4 py-2 shadow-[4px_4px_0px_0px_#080808] -rotate-1 hover:rotate-0 transition-transform mb-6">
              <span className="text-lg">🐾</span>
              <span className="font-brand font-extrabold text-sm sm:text-base tracking-tight">
                O petshop mais feliz do Jardim Nordeste
              </span>
              <span className="bg-[#64BDD1] border-2 border-[#080808] rounded-full px-2.5 py-0.5 text-xs font-black">
                Rua Piraquara, 36
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

            {/* Subtítulo Curto com o que oferecem de verdade */}
            <p className="text-lg sm:text-xl font-semibold text-[#080808]/90 max-w-xl leading-relaxed mb-8">
              <strong className="font-extrabold">Banho e Tosa</strong> cheio de carinho, <strong className="font-extrabold">Rações e Petiscos</strong>, <strong className="font-extrabold">Perfumaria</strong>, <strong className="font-extrabold">Farmácia</strong> e <strong className="font-extrabold">Acessórios</strong> para o seu pet sair abanando o rabo!
            </p>

            {/* Dois Botões de Ação */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href={getWhatsAppUrl(
                  'Olá Pet Uau! Vim pelo site e gostaria de agendar um horário ou tirar uma dúvida!'
                )}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto justify-center bg-[#64BDD1] text-[#080808] font-brand font-black text-lg px-7 py-4 rounded-full border-[3px] border-[#080808] shadow-[6px_6px_0px_0px_#080808] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#080808] transition-all flex items-center gap-3"
              >
                <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
                <span>chamar no whatsapp!</span>
                <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
              </a>

              <a
                href="#servicos"
                className="w-full sm:w-auto justify-center bg-[#FFFDF5] text-[#080808] font-brand font-extrabold text-lg px-7 py-4 rounded-full border-[3px] border-[#080808] shadow-[6px_6px_0px_0px_#080808] hover:bg-[#080808] hover:text-[#F9D957] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#080808] transition-all flex items-center gap-2"
              >
                <span>conhecer serviços</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </a>
            </div>

            {/* Mini Pílulas dos Pilares da Bio */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl">
              {[
                { icon: Scissors, value: 'Banho & Tosa', label: 'Estética com carinho' },
                { icon: Bone, value: 'Rações & Mimos', label: 'As melhores marcas' },
                { icon: Pill, value: 'Farmácia & +', label: 'Perfumaria e acessórios' },
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
            <div className="absolute -top-4 left-2 sm:left-6 z-30 animate-float-slow">
              <div className="bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-3.5 py-1.5 shadow-[4px_4px_0px_0px_#080808] flex items-center gap-1.5 rotate-[-8deg]">
                <Droplets className="w-4 h-4 text-[#64BDD1]" strokeWidth={2.5} />
                <span className="font-brand font-black text-xs uppercase">Cheirinho Uau!</span>
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

            <div className="w-7 h-7 rounded-full bg-[#64BDD1] border-[3px] border-[#080808] shadow-[2px_2px_0px_0px_#080808] absolute top-1/2 -left-2 z-30 animate-float-reverse" />
            <div className="w-4 h-4 rounded-full bg-[#FFFDF5] border-[2.5px] border-[#080808] absolute top-[44%] left-4 z-30" />

            {/* Duas Cápsulas Verticais Gigantes */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 items-center w-full max-w-md mx-auto">
              {/* Cápsula 1: Cachorro Feliz */}
              <div className="relative group -mt-8">
                <div className="relative h-[340px] sm:h-[400px] w-full rounded-full bg-[#64BDD1] border-[4px] border-[#080808] shadow-[8px_8px_0px_0px_#080808] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5">
                  <div className="absolute -bottom-8 inset-x-0 h-44 bg-[#F9D957] border-t-[4px] border-[#080808] rounded-t-full" />

                  <img
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=85"
                    alt="Cachorro feliz na cápsula Pet Uau"
                    className="relative z-10 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute bottom-5 inset-x-4 z-20 bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full py-1.5 px-3 text-center shadow-[3px_3px_0px_0px_#080808]">
                    <span className="font-brand font-black text-xs sm:text-sm lowercase">
                      🐶 banho & tosa!
                    </span>
                  </div>
                </div>
              </div>

              {/* Cápsula 2: Gato Feliz */}
              <div className="relative group mt-10">
                <div className="absolute -top-6 -right-3 z-30 bg-[#FFFDF5] border-[3px] border-[#080808] w-14 h-14 rounded-full shadow-[4px_4px_0px_0px_#080808] flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform">
                  <PawPrint className="w-7 h-7 text-[#080808]" strokeWidth={2.5} />
                </div>

                <div className="relative h-[340px] sm:h-[400px] w-full rounded-full bg-[#64BDD1] border-[4px] border-[#080808] shadow-[8px_8px_0px_0px_#080808] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5">
                  <div className="absolute top-5 right-5 w-16 h-16 rounded-full bg-[#F9D957] border-[3px] border-[#080808]" />

                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=85"
                    alt="Gatinho fofo na cápsula Pet Uau"
                    className="relative z-10 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute bottom-5 inset-x-4 z-20 bg-[#F9D957] border-[2.5px] border-[#080808] rounded-full py-1.5 px-3 text-center shadow-[3px_3px_0px_0px_#080808]">
                    <span className="font-brand font-black text-xs sm:text-sm lowercase">
                      🐱 rações & mimos!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Flutuante da Logo Original */}
            <div className="absolute -bottom-4 right-4 sm:right-10 z-30 bg-[#FFFDF5] border-[3px] border-[#080808] rounded-full px-4 py-2 shadow-[4px_4px_0px_0px_#080808] flex items-center gap-2.5 rotate-[-2deg]">
              <img
                src="./logo-original.png"
                alt="Logo Oficial pet uau!"
                className="w-8 h-8 rounded-full border-2 border-[#080808] object-cover"
              />
              <span className="font-brand font-black text-xs sm:text-sm lowercase">
                @petuauoficial
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#64BDD1] border-[2.5px] border-[#080808] rounded-full px-4 py-1.5 shadow-[3px_3px_0px_0px_#080808] mb-4">
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                <span className="font-brand font-extrabold text-sm uppercase tracking-wide">
                  Banho e Tosa • Rações • Perfumaria • Farmácia • Acessórios
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
              Passe o mouse nos cards! Tudo o que o seu cão ou gato precisa na nossa loja na <strong className="font-extrabold">Rua Piraquara, 36</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
            {SERVICES_BENTO.map((service) => {
              const IconComponent = service.icon
              return (
                <article
                  key={service.id}
                  className={`${service.span} group relative ${service.defaultBg} ${service.hoverBg} border-[3px] border-[#080808] rounded-[36px] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#080808] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_0px_#080808] transition-all duration-200 flex flex-col justify-between overflow-hidden`}
                >
                  <div>
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                      <div className="sm:col-span-7">
                        <h3 className="font-brand font-black lowercase text-2xl sm:text-3xl mb-3 flex items-baseline gap-1">
                          <span>{service.title}</span>
                          <span className="uau-bang text-[#080808]">!</span>
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-[#080808]/85 leading-relaxed mb-5">
                          {service.subtitle}
                        </p>

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

                  <div className="pt-5 mt-4 border-t-[2.5px] border-[#080808]/20 group-hover:border-[#080808] flex items-center justify-between gap-4">
                    <span className="font-brand font-black text-sm sm:text-base">
                      📍 Jardim Nordeste • {WHATSAPP_DISPLAY}
                    </span>
                    <a
                      href={getWhatsAppUrl(service.whatsappText)}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#080808] text-[#FFFDF5] group-hover:bg-[#FFFDF5] group-hover:text-[#080808] font-brand font-extrabold text-sm px-5 py-2.5 rounded-full border-[2.5px] border-[#080808] shadow-[3px_3px_0px_0px_#080808] transition-all flex items-center gap-2"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                    </a>
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
        <PopSparkle className="w-12 h-12 absolute top-10 right-10 hidden lg:block" fill="#F9D957" />
        <PopSparkle className="w-9 h-9 absolute bottom-12 left-10 hidden lg:block" fill="#FFFDF5" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-4 py-1.5 shadow-[4px_4px_0px_0px_#080808] mb-4">
              <Clock className="w-4 h-4" strokeWidth={2.5} />
              <span className="font-brand font-extrabold text-sm uppercase">
                Simulador de Tempo de Banho & Tosa
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
              Escolha se é cachorro ou gato, o porte e o tipo de pelo para ver na hora o tempo estimado e reservar direto no nosso WhatsApp!
            </p>
          </div>

          <div className="bg-[#FFFDF5] border-[3.5px] border-[#080808] rounded-[40px] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#080808] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-7">
              {/* Passo 1: Cachorro ou Gato */}
              <div>
                <label className="block font-brand font-black lowercase text-xl mb-3">
                  1. quem vem tomar banho hoje?
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
                      <div className="text-xs font-bold text-[#080808]/75">Banho & Tosa Caprichado</div>
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
                      <div className="text-xs font-bold text-[#080808]/75">Cuidado Calmo & Delicado</div>
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
                    { id: 'longo', title: 'Longo / Cacheado', desc: 'Desembolo cuidadoso' },
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

              {/* Passo 4: Serviços Adicionais */}
              <div>
                <label className="block font-brand font-black lowercase text-xl mb-3">
                  4. quer incluir mais algum cuidado?
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
                          +{addon.minutes} min
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Coluna de Resultado Instantâneo (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#F9D957] border-[3.5px] border-[#080808] rounded-[36px] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#080808] relative">
                <div className="inline-flex items-center gap-2 bg-[#FFFDF5] border-[2.5px] border-[#080808] rounded-full px-3.5 py-1 text-xs font-brand font-black uppercase mb-5 shadow-[2px_2px_0px_0px_#080808]">
                  <Sparkles className="w-3.5 h-3.5 text-[#080808]" strokeWidth={2.5} />
                  <span>Estimativa na Hora</span>
                </div>

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
                          banho {calculation.petLabel} uau!
                        </div>
                        <div className="text-xs font-bold text-[#080808]/75">
                          {calculation.sizeLabel} • {calculation.coatLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#64BDD1]/35 border-2 border-[#080808] rounded-2xl p-3.5 text-center">
                    <span className="text-xs font-black uppercase block text-[#080808]/75">
                      Tempo Estimado de Cuidado
                    </span>
                    <span className="font-brand font-black text-3xl sm:text-4xl text-[#080808]">
                      ~{calculation.totalMinutes} min
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-xs sm:text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                    <span>Shampoo, Condicionador & Perfume Pet Uau!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                    <span>Lacinho, Bandana ou Gravatinha no capricho</span>
                  </div>
                  {calculation.addonsNames.length > 0 && (
                    <div className="flex items-start gap-2 text-[#080808]">
                      <Gift className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>
                        Inclusos: <strong>{calculation.addonsNames.join(', ')}</strong>
                      </span>
                    </div>
                  )}
                </div>

                <a
                  href={getWhatsAppUrl(calculation.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#64BDD1] text-[#080808] font-brand font-black text-lg py-4 px-6 rounded-full border-[3px] border-[#080808] shadow-[5px_5px_0px_0px_#080808] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#080808] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                  <span>reservar pacote no whatsapp!</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. NOSSA LOJA & PACOTES DE BANHO
      ====================================================================== */}
      <section
        id="espaco"
        className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFDF5] border-b-[3px] border-[#080808]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#F9D957] border-[2.5px] border-[#080808] rounded-full px-4 py-1 font-brand font-black text-xs uppercase shadow-[3px_3px_0px_0px_#080808] mb-3">
                <MapPin className="w-4 h-4" strokeWidth={2.5} /> Rua Piraquara, Nº 36 • Jardim Nordeste
              </span>
              <h2 className="font-brand font-black lowercase text-4xl sm:text-5xl">
                tudo para o seu pet na{' '}
                <span className="bg-[#64BDD1] px-4 py-0.5 rounded-full border-[3px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] inline-flex items-baseline">
                  pet uau
                  <span className="uau-bang ml-0.5">!</span>
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {STORE_HIGHLIGHTS.map((z) => (
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

          {STORE_HIGHLIGHTS.filter((z) => z.id === activeZone).map((zone) => (
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
                  <a
                    href={getWhatsAppUrl(
                      `Olá Pet Uau! Quero saber mais sobre ${zone.title}`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#080808] text-[#FFFDF5] font-brand font-extrabold text-sm px-6 py-3 rounded-full border-2 border-[#080808] hover:bg-[#FFFDF5] hover:text-[#080808] transition-colors"
                  >
                    falar no whatsapp!
                  </a>
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

          {/* Subseção: Pacotes de Banho Mensais */}
          <div id="clube" className="mt-24 pt-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 bg-[#64BDD1] border-[2.5px] border-[#080808] rounded-full px-4 py-1 font-brand font-black text-xs uppercase shadow-[3px_3px_0px_0px_#080808] mb-3">
                <Flame className="w-4 h-4" strokeWidth={2.5} /> Pacotes de Banho & Tosa
              </span>
              <h2 className="font-brand font-black lowercase text-4xl sm:text-5xl">
                pet cheiroso o mês inteiro na{' '}
                <span className="bg-[#F9D957] px-4 py-0.5 rounded-full border-[3px] border-[#080808] shadow-[4px_4px_0px_0px_#080808] inline-flex items-baseline">
                  pet uau
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
                    <p className="text-xs font-extrabold text-[#080808]/75 mb-6 pb-5 border-b-2 border-[#080808]/20">
                      {plan.frequency}
                    </p>

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

                  <a
                    href={getWhatsAppUrl(
                      `Olá Pet Uau! Gostaria de consultar valores do ${plan.name} (${plan.frequency}).`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-3.5 px-6 rounded-full border-[2.5px] border-[#080808] font-brand font-black text-base text-center shadow-[4px_4px_0px_0px_#080808] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#080808] transition-all block ${
                      plan.featured
                        ? 'bg-[#64BDD1] text-[#080808]'
                        : 'bg-[#F9D957] text-[#080808]'
                    }`}
                  >
                    consultar {plan.name}
                  </a>
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
                Carinho que conquista o bairro
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="flex flex-col justify-between group">
                <div
                  className={`relative ${item.bubbleBg} border-[3px] border-[#080808] rounded-[36px] p-7 shadow-[6px_6px_0px_0px_#080808] group-hover:-translate-y-1 transition-transform mb-7`}
                >
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

                  <p className="text-base font-bold text-[#080808] leading-relaxed mb-2">
                    “{item.quote}”
                  </p>

                  <div
                    className={`w-6 h-6 ${item.bubbleBg} border-r-[3px] border-b-[3px] border-[#080808] rotate-45 absolute -bottom-[14px] left-10`}
                  />
                </div>

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
                      {item.tutorName}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b-2 border-[#F9D957]/25">
            {/* Coluna 1: Marca & Bio (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-block bg-[#F9D957] border-[3px] border-[#FFFDF5] rounded-full px-5 py-2.5 shadow-[5px_5px_0px_0px_#64BDD1]">
                <PetUauLogo size="md" />
              </div>

              <p className="text-[#FFFDF5]/90 font-semibold text-base leading-relaxed">
                Banho e Tosa • Rações • Perfumaria • Farmácia • Acessórios. Cuidado com muito carinho na Rua Piraquara, 36 — Jardim Nordeste!
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={getWhatsAppUrl(
                    'Olá Pet Uau! Vim pelo site e gostaria de falar com vocês.'
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#64BDD1] text-[#080808] font-brand font-black text-sm px-5 py-3 rounded-full border-2 border-[#FFFDF5] shadow-[4px_4px_0px_0px_#F9D957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#F9D957] transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
                  <span>WhatsApp {WHATSAPP_DISPLAY}</span>
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#64BDD1] text-[#080808] font-brand font-black text-sm px-5 py-3 rounded-full border-2 border-[#FFFDF5] shadow-[4px_4px_0px_0px_#F9D957] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#F9D957] transition-all flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" strokeWidth={2.5} />
                  <span>@petuauoficial</span>
                </a>
              </div>
            </div>

            {/* Coluna 2: O que você encontra aqui (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2 font-brand font-black lowercase text-2xl text-[#F9D957]">
                <Phone className="w-6 h-6 text-[#64BDD1]" strokeWidth={2.5} />
                <span>atendimento & loja!</span>
              </div>

              <div className="bg-[#FFFDF5]/5 border-2 border-[#F9D957]/40 rounded-3xl p-5 space-y-3 text-sm">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#F9D957]/20">
                  <span className="font-bold text-[#FFFDF5]">Telefone / WhatsApp</span>
                  <a
                    href={getWhatsAppUrl('Olá Pet Uau!')}
                    target="_blank"
                    rel="noreferrer"
                    className="font-brand font-black text-[#F9D957] hover:underline"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </div>
                <div className="flex items-center justify-between pb-2.5 border-b border-[#F9D957]/20">
                  <span className="font-bold text-[#FFFDF5]">Instagram</span>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="font-brand font-black text-[#64BDD1] hover:underline"
                  >
                    @petuauoficial
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#FFFDF5]">Bairro</span>
                  <span className="font-brand font-black text-[#F9D957]">
                    Jardim Nordeste • SP
                  </span>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-extrabold text-[#64BDD1]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#64BDD1] animate-ping" />
                  <span>Chame no WhatsApp para agendar Banho e Tosa!</span>
                </div>
              </div>
            </div>

            {/* Coluna 3: Mapa Estilizado Neo-Brutalista (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2 font-brand font-black lowercase text-2xl text-[#F9D957]">
                <MapPin className="w-6 h-6 text-[#64BDD1]" strokeWidth={2.5} />
                <span>onde estamos!</span>
              </div>

              <div className="relative bg-[#FFFDF5] text-[#080808] border-[3px] border-[#F9D957] rounded-3xl p-4 shadow-[5px_5px_0px_0px_#64BDD1] overflow-hidden">
                <div className="relative h-36 rounded-2xl bg-[#F9D957]/40 border-2 border-[#080808] overflow-hidden mb-3 flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/2 h-5 bg-[#FFFDF5] border-y-2 border-[#080808] -rotate-6" />
                  <div className="absolute inset-y-0 left-1/3 w-5 bg-[#FFFDF5] border-x-2 border-[#080808] rotate-12" />
                  <div className="absolute top-3 right-3 bg-[#64BDD1] border-2 border-[#080808] rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase">
                    Jardim Nordeste
                  </div>

                  <div className="relative z-10 bg-[#64BDD1] border-[2.5px] border-[#080808] rounded-full px-3.5 py-1.5 shadow-[3px_3px_0px_0px_#080808] flex items-center gap-1.5 animate-bounce">
                    <PawPrint className="w-4 h-4 text-[#080808]" strokeWidth={2.5} />
                    <span className="font-brand font-black text-xs lowercase">
                      rua piraquara, 36
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-brand font-black text-sm">
                      Rua Piraquara, Nº 36 — Jardim Nordeste
                    </div>
                    <div className="text-xs font-bold text-[#080808]/70">
                      São Paulo • SP • Loja: 2280-6929
                    </div>
                  </div>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#64BDD1] border-2 border-[#080808] rounded-full p-2.5 shadow-[2px_2px_0px_0px_#080808] hover:bg-[#F9D957] transition-colors"
                    title="Abrir Rua Piraquara, 36 no Google Maps"
                  >
                    <Navigation className="w-4 h-4 text-[#080808]" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#F9D957]/80">
            <div>
              © {new Date().getFullYear()} pet uau! (@petuauoficial) • Rua Piraquara, Nº 36 — Jardim Nordeste • WhatsApp: {WHATSAPP_DISPLAY}
            </div>
            <div className="flex items-center gap-4">
              <a href="#topo" className="hover:text-[#64BDD1] underline">
                voltar ao topo ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
