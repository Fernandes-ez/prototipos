import React from 'react'

/**
 * Vetor fiel ao ícone oficial da logo "pet uau!":
 * Cápsula vertical com fundo azul (#64BDD1), cachorro amarelo (#F9D957) e gatinho azul (#64BDD1)
 * em espaço negativo com traço preto espesso (#080808) + tipografia lowercase com '!' inclinado.
 */
export function PetUauLogo({ size = 'md', showText = true, className = '' }) {
  const sizes = {
    sm: { pillW: 36, pillH: 52, petText: 'text-sm', uauText: 'text-2xl' },
    md: { pillW: 44, pillH: 64, petText: 'text-base', uauText: 'text-3xl' },
    lg: { pillW: 58, pillH: 84, petText: 'text-xl', uauText: 'text-4xl' },
  }[size] || { pillW: 44, pillH: 64, petText: 'text-base', uauText: 'text-3xl' }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
      {/* Cápsula Oficial SVG */}
      <svg
        width={sizes.pillW}
        height={sizes.pillH}
        viewBox="0 0 100 146"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:-rotate-3"
      >
        {/* Fundo da cápsula em Azul #64BDD1 */}
        <rect
          x="6"
          y="6"
          width="88"
          height="134"
          rx="44"
          fill="#64BDD1"
          stroke="#080808"
          strokeWidth="7"
        />

        {/* Corpo do Cachorro em Amarelo #F9D957 abraçando o Gato em espaço negativo */}
        <path
          d="M6 68 C16 48, 36 44, 52 46 C60 47, 67 52, 74 54 C73 65, 65 73, 54 75 C42 78, 37 89, 39 101 C41 114, 54 122, 68 120 C79 118, 88 110, 93 98 C91 122, 73 140, 50 140 C25 140, 6 120, 6 96 Z"
          fill="#F9D957"
          stroke="#080808"
          strokeWidth="6.5"
          strokeLinejoin="round"
        />

        {/* Orelha caída do cachorro */}
        <path
          d="M10 64 C20 56, 30 62, 31 78 C21 76, 14 71, 10 64 Z"
          fill="#F9D957"
          stroke="#080808"
          strokeWidth="6.5"
          strokeLinejoin="round"
        />

        {/* Silhueta do Gatinho em Azul #64BDD1 encaixado na curva */}
        <path
          d="M55 83 C60 82, 66 78, 72 72 C76 78, 81 79, 86 78 C91 92, 84 109, 70 113 C55 117, 44 107, 45 93 C46 86, 50 84, 55 83 Z"
          fill="#64BDD1"
          stroke="#080808"
          strokeWidth="6.5"
          strokeLinejoin="round"
        />

        {/* Detalhe curvo interno do gatinho */}
        <path
          d="M53 94 C52 101, 57 106, 63 106"
          stroke="#080808"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Contorno externo reforçado da pílula */}
        <rect
          x="6"
          y="6"
          width="88"
          height="134"
          rx="44"
          stroke="#080808"
          strokeWidth="7"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none font-brand tracking-tight text-[#080808]">
          <span className={`${sizes.petText} font-extrabold lowercase -mb-1.5 pl-0.5`}>
            pet
          </span>
          <span className={`${sizes.uauText} font-black lowercase flex items-baseline`}>
            uau
            <span
              className="inline-block ml-0.5 text-[#080808] transform rotate-[10deg] origin-bottom transition-transform duration-300 group-hover:rotate-[18deg] group-hover:scale-110"
              aria-hidden="true"
            >
              !
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

/**
 * Ícone minimalista de Cachorro em linha preta contínua inspirado no traço da logo
 */
export function MinimalDogIcon({ className = 'w-8 h-8', fillAccent = '#F9D957' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill={fillAccent} stroke="#080808" strokeWidth="3.5" />
      <path
        d="M18 35 C20 24, 30 21, 39 23 C43 24, 47 27, 50 28 C49 34, 44 39, 37 39 C34 39, 31 42, 31 47"
        stroke="#080808"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 31 C25 27, 29 31, 29 40 C23 39, 19 36, 19 31 Z"
        fill="#64BDD1"
        stroke="#080808"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="28" r="2.2" fill="#080808" />
    </svg>
  )
}

/**
 * Ícone minimalista de Gato em linha preta contínua inspirado no traço da logo
 */
export function MinimalCatIcon({ className = 'w-8 h-8', fillAccent = '#64BDD1' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill={fillAccent} stroke="#080808" strokeWidth="3.5" />
      <path
        d="M20 42 C19 31, 22 23, 24 19 L30 25 C33 24, 36 24, 39 25 L45 19 C47 23, 49 31, 47 42 C44 48, 23 48, 20 42 Z"
        fill="#FFFDF5"
        stroke="#080808"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M27 36 C28 39, 31 40, 34 40"
        stroke="#080808"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="28" cy="31" r="2" fill="#080808" />
      <circle cx="39" cy="31" r="2" fill="#080808" />
    </svg>
  )
}

/**
 * Estrela Pop-Art de 4 pontas com contorno preto grosso
 */
export function PopSparkle({ className = 'w-8 h-8', fill = '#F9D957' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 3 C26.5 15.5, 32.5 21.5, 45 24 C32.5 26.5, 26.5 32.5, 24 45 C21.5 32.5, 15.5 26.5, 3 24 C15.5 21.5, 21.5 15.5, 24 3 Z"
        fill={fill}
        stroke="#080808"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
