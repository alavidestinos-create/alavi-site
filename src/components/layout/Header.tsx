"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/destinos", label: "Destinos" },
  { href: "/servicos", label: "Serviços" },
  { href: "/guia-do-viajante", label: "Guia do Viajante" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueia o scroll da página enquanto o menu fullscreen mobile está aberto.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Fecha o menu automaticamente se a rota mudar (ex.: navegação pelo botão voltar).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-shadow duration-300",
        scrolled ? "border-sand-200 shadow-soft" : "border-transparent"
      )}
    >
      {/* Importante: o blur/fundo fica num wrapper interno, não no <header>.
          backdrop-filter em um ancestral vira "containing block" para
          elementos filhos com position:fixed — isso fazia o menu mobile
          (fixed, abaixo) ficar preso dentro da caixa de ~64px do header em
          vez de cobrir a tela inteira, deixando as opções invisíveis. */}
      <div className="bg-cream/95 backdrop-blur">
        <div className="container-alavi grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 sm:h-[72px] xl:h-20">
          <Link href="/" className="flex items-center gap-2.5" aria-label="ALAVI Destinos & Experiências — página inicial">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy-50 sm:h-10 sm:w-10">
              <Image
                src="/brand/logo-icon.png"
                alt=""
                width={40}
                height={40}
                className="h-[34px] w-[34px] object-cover sm:h-9 sm:w-9"
                priority
              />
            </span>
            <span className="font-display text-lg font-medium tracking-tight text-navy-900 sm:text-xl">
              ALAVI
              <span className="ml-1.5 hidden text-xs font-normal text-teal-700 lg:inline">
                Destinos &amp; Experiências
              </span>
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-9 xl:flex" aria-label="Navegação principal">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors",
                    active ? "text-teal-700" : "text-navy-700 hover:text-teal-700"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal-600 transition-transform duration-200 ease-out group-hover:scale-x-100",
                      active && "scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden justify-self-end xl:flex">
            <Button href="/orcamento" size="sm">
              Planejar minha viagem
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-navy-800 xl:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile fullscreen — sem links horizontais no topo; abre por cima de tudo.
          Fica como filho direto do <header> (sem filter/backdrop-blur), garantindo
          que o "fixed" seja relativo à janela inteira, não a um ancestral com blur. */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          "fixed inset-0 top-16 z-40 bg-cream transition-all duration-200 ease-out sm:top-[72px] xl:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav
          className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-6"
          aria-label="Navegação mobile"
        >
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block text-[22px] font-medium leading-tight transition-colors hover:text-teal-700",
                      active ? "text-teal-700" : "text-navy-900"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8">
            <Button href="/orcamento" onClick={() => setOpen(false)} className="h-14 w-full justify-center text-base">
              Planejar minha viagem
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
