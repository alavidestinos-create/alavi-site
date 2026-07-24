"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/destinos", label: "Destinos" },
  { href: "/pontos-e-milhas", label: "Pontos e Milhas" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur">
      <div className="container-alavi flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-navy-50">
            <Image
              src="/brand/logo-icon.png"
              alt="ALAVI Destinos & Experiências"
              width={40}
              height={40}
              className="h-9 w-9 object-cover"
              priority
            />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-navy-900">
            ALAVI
            <span className="ml-1 hidden text-xs font-medium text-teal-700 sm:inline">
              Destinos &amp; Experiências
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-700 transition-colors hover:text-teal-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <WhatsAppButton
            message={siteConfig.whatsappMessages.header}
            label="WhatsApp"
            size="sm"
            source="header"
          />
          <Link
            href="/orcamento"
            className="inline-flex items-center justify-center rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Solicitar orçamento
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-800 lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "border-t border-navy-100 bg-white lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="container-alavi flex flex-col gap-1 py-3" aria-label="Navegação mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <WhatsAppButton
              message={siteConfig.whatsappMessages.header}
              label="Falar no WhatsApp"
              source="header_mobile"
            />
            <Link
              href="/orcamento"
              className="inline-flex items-center justify-center rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Solicitar orçamento
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
