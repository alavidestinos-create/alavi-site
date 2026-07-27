"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics";

type ConsentValue = "accepted" | "rejected";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function setConsent(value: ConsentValue) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // localStorage indisponível: apenas fecha o aviso nesta sessão.
    }
    setVisible(false);
    // Recarrega para que os scripts de analytics respeitem a escolha imediatamente.
    if (value === "accepted") {
      window.location.reload();
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-800 bg-navy-950/97 px-4 py-4 text-navy-100 backdrop-blur sm:px-6"
    >
      <div className="container-alavi flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          Usamos cookies essenciais para o funcionamento do site e, mediante seu
          consentimento, cookies de análise para entender como o site é usado.
          Saiba mais na{" "}
          <Link href="/cookies" className="underline hover:text-teal-400">
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Aceitar
          </button>
        </div>
      </div>
      <p className="container-alavi mt-2 text-[11px] text-navy-400">
        Crafted by{" "}
        <a
          href="https://secureprivacy.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-teal-400"
        >
          Secure Privacy
        </a>
      </p>
    </div>
  );
}
