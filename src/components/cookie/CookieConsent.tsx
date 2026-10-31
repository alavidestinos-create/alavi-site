"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { OPEN_PREFERENCES_EVENT, readConsent, saveConsent } from "@/lib/consent";

interface CategoryRowProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

function CategoryRow({ id, title, description, checked, disabled, onChange }: CategoryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/15 bg-white/5 p-4">
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-white">
          {title}
        </label>
        <p className="mt-1 text-xs text-navy-200">{description}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 accent-teal-500 disabled:opacity-60"
      />
    </div>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Primeira visita: mostra o banner. Visitantes que já escolheram não veem nada.
  useEffect(() => {
    if (!readConsent()) setVisible(true);
  }, []);

  // Botão "Preferências de cookies" (rodapé): reabre já no modo personalizar.
  useEffect(() => {
    function reopen() {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setCustomizing(true);
      setVisible(true);
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (visible && customizing) dialogRef.current?.focus();
  }, [visible, customizing]);

  function choose(nextAnalytics: boolean, nextMarketing: boolean) {
    saveConsent({ analytics: nextAnalytics, marketing: nextMarketing });
    setVisible(false);
    setCustomizing(false);
  }

  if (!visible) return null;

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-live="polite"
      aria-label="Preferências de cookies"
      className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto border-t border-navy-800 bg-navy-950/97 px-4 py-4 text-navy-100 outline-none backdrop-blur sm:px-6"
    >
      <div className="container-alavi flex flex-col gap-4">
        <p className="text-sm">
          Usamos cookies necessários para o funcionamento do site e, com a sua
          permissão, cookies de análise (para entender como o site é usado) e de
          publicidade (para medir e melhorar nossos anúncios). Você escolhe o
          que permitir e pode mudar de ideia a qualquer momento em
          &ldquo;Preferências de cookies&rdquo;, no rodapé. Saiba mais na{" "}
          <Link href="/cookies" className="underline hover:text-teal-300">
            Política de Cookies
          </Link>
          .
        </p>

        {customizing && (
          <div className="grid gap-3 md:grid-cols-3">
            <CategoryRow
              id="cookie-necessary"
              title="Necessários"
              description="Garantem o funcionamento do site e lembram a sua escolha de cookies. Sempre ativos."
              checked
              disabled
            />
            <CategoryRow
              id="cookie-analytics"
              title="Análise"
              description="Google Analytics e Microsoft Clarity: nos ajudam a entender o uso do site e a melhorar a experiência."
              checked={analytics}
              onChange={setAnalytics}
            />
            <CategoryRow
              id="cookie-marketing"
              title="Publicidade"
              description="Meta (Facebook/Instagram) e Google Ads: medem a eficácia dos anúncios e permitem remarketing."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose(false, false)}
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Recusar
          </button>
          {customizing ? (
            <button
              type="button"
              onClick={() => choose(analytics, marketing)}
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Salvar preferências
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Personalizar
            </button>
          )}
          <button
            type="button"
            onClick={() => choose(true, true)}
            className="rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
