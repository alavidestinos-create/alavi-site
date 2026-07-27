"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fade-in + translate suave quando o elemento entra na viewport.
 * Sem JavaScript (ou com prefers-reduced-motion), o conteúdo permanece
 * sempre visível — ver regra em globals.css.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Se o elemento já está visível (ou quase) no momento em que o
    // componente monta — comum em telas pequenas, links com âncora ou
    // conexões lentas, quando o JS termina de carregar depois de o usuário
    // já ter rolado a página — mostra o conteúdo imediatamente, sem
    // depender do IntersectionObserver disparar a tempo.
    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInView) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);

    // Rede de segurança: garante que o conteúdo nunca fique escondido
    // permanentemente, mesmo se o observer não disparar por algum motivo
    // (rolagem muito rápida, aba em segundo plano, navegador incomum).
    const fallback = window.setTimeout(() => setVisible(true), 1800);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal-init", visible && "reveal-in", className)}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
