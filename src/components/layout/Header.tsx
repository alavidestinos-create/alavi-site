"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/destinos", label: "Destinos" },
  { href: "/disney-orlando", label: "Disney & Orlando" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-cream/95 backdrop-blur">
      <div className="container-alavi flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy-50">
            <Image
              src="/brand/logo-icon.png"
              alt="ALAVI Destinos & Experiências"
              width={40}
              height={40}
              className="h-9 w-9 object-cover"
              priority
            />
          </span>
          <span className="font-display text-xl font-medium tracking-tight text-navy-900">
            ALAVI
            <span className="ml-1.5 hidden text-xs font-normal text-teal-700 sm:inline">
              Destinos &amp; Experiências
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold uppercase tracking-wide text-navy-700 transition-colors hover:text-teal-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex">
          <Button href="/orcamento" size="sm">
            Planejar minha viagem
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-800 xl:hidden"
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
          "border-t border-sand-200 bg-cream xl:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="container-alavi flex flex-col gap-1 py-4" aria-label="Navegação mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3">
            <Button href="/orcamento" className="w-full" onClick={() => setOpen(false)}>
              Planejar minha viagem
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
