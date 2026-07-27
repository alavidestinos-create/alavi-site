interface BrandMarkProps {
  className?: string;
  /** Cor do traço principal do símbolo. */
  strokeColor?: string;
  /** Cor do ponto de destino (acento). */
  accentColor?: string;
}

/**
 * Símbolo exclusivo da ALAVI — desenhado como vetor original (sem depender
 * de imagem gerada por IA, sem fundo/glow para remover, sem perda de
 * qualidade em nenhum tamanho).
 *
 * Conceito: duas linhas convergem num ápice (horizonte/montanha, e também a
 * inicial "A" da marca), cruzadas por uma linha de horizonte — e a
 * trajetória continua além do ápice, em frente, terminando num ponto único
 * (o destino). Movimento, precisão e horizonte em um traço só, sem
 * elementos decorativos.
 *
 * Funciona sozinho, sem o texto "ALAVI" ao lado, em qualquer tamanho.
 */
export function BrandMark({
  className,
  strokeColor = "currentColor",
  accentColor = "#b08d43",
}: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="Símbolo ALAVI"
    >
      {/* Base do "A" / horizonte com montanha */}
      <path
        d="M20 78 L50 22 L80 78"
        stroke={strokeColor}
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Linha do horizonte cruzando a base */}
      <path
        d="M32.5 55 L67.5 55"
        stroke={strokeColor}
        strokeWidth={5.5}
        strokeLinecap="round"
      />
      {/* Trajetória que segue além do ápice, rumo ao destino */}
      <path
        d="M50 22 L73 7.5"
        stroke={strokeColor}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.85}
      />
      {/* Ponto de destino */}
      <circle cx={75.5} cy={6} r={4.5} fill={accentColor} />
    </svg>
  );
}
