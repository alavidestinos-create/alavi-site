"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

type AnimateState = "visible" | "pending" | "animating";

/**
 * Fade-in + translate suave quando o elemento entra na viewport.
 *
 * Importante: o conteúdo nasce SEMPRE visível por padrão (tanto no HTML
 * gerado pelo servidor quanto antes de qualquer JavaScript rodar). A
 * animação é aplicada apenas como um efeito progressivo opcional — só entra
 * em estado "escondido antes de animar" depois que o próprio JavaScript, já
 * rodando no navegador, confirma que o elemento está fora da tela. Isso
 * evita que uma conexão lenta, hidratação atrasada ou qualquer falha de JS
 * deixe seções inteiras invisíveis permanentemente (bug real já visto em
 * produção).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<AnimateState>("visible");

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 1.1 && rect.bottom > 0;
    if (alreadyInView) return; // já visível, sem necessidade de animar

    setState("pending");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState("animating");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(node);

    // Rede de segurança: garante que o conteúdo nunca fique escondido por
    // muito tempo, mesmo se o observer não disparar por algum motivo.
    const fallback = window.setTimeout(() => setState("animating"), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        state === "pending" && "reveal-init",
        state === "animating" && "reveal-in",
        className
      )}
      style={state === "animating" ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
