"use client";

import { OPEN_PREFERENCES_EVENT } from "@/lib/consent";

/** Reabre o banner de cookies para o visitante rever ou alterar a escolha. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className={className}
    >
      Preferências de cookies
    </button>
  );
}
