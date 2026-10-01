"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface ArticleShareButtonsProps {
  title: string;
  url: string;
}

/**
 * Botões "Compartilhe esta dica" (WhatsApp + Copiar link), usados apenas
 * nos artigos que optarem por isso via BlogPost.shareCta — não faz parte
 * do template padrão de artigo, para não alterar o restante do Guia do
 * Viajante.
 */
export function ArticleShareButtons({ title, url }: ArticleShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const whatsappMessage = `Olha essa dica da ALAVI ✈️ ${title} — ${url}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  async function handleCopyLink() {
    setCopyFailed(false);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      trackEvent("article_link_copied", { url });
      setTimeout(() => setCopied(false), 4000);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <div className="mt-10 rounded-2xl border border-sand-200 bg-sand-50 p-6 sm:p-8">
      <p className="font-display text-lg font-semibold text-navy-900">Compartilhe esta dica ✈️</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("article_share_whatsapp", { url })}
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-opacity hover:opacity-90"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.81.48 3.58 1.4 5.15L2 22l5.09-1.49a9.85 9.85 0 0 0 4.95 1.33h.01c5.46 0 9.91-4.45 9.91-9.92C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-3.02.88.9-2.94-.19-.3a8.16 8.16 0 0 1-1.25-4.37c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.4a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.67 8.16-8.31 8.04Zm4.48-6.12c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
          </svg>
          WhatsApp
        </a>
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-full border border-navy-300 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-500"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 shrink-0">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          Copiar link
        </button>
        {copied && (
          <span role="status" className="text-sm font-medium text-teal-700">
            Link copiado! Use no seu Story do Instagram 🔗
          </span>
        )}
        {copyFailed && (
          <span role="status" className="text-sm font-medium text-red-700">
            Não foi possível copiar automaticamente — selecione o link na barra de endereço.
          </span>
        )}
      </div>
    </div>
  );
}
