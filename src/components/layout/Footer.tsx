import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

const siteLinks = [
  { href: "/sobre", label: "Sobre a ALAVI" },
  { href: "/servicos", label: "Serviços" },
  { href: "/destinos", label: "Destinos" },
  { href: "/disney-orlando", label: "Disney & Orlando" },
  { href: "/guia-do-viajante", label: "Guia do Viajante" },
  { href: "/orcamento", label: "Solicitar orçamento" },
];

const legalLinks = [
  { href: "/privacidade", label: "Política de Privacidade" },
  { href: "/termos", label: "Termos de Uso" },
  { href: "/cookies", label: "Política de Cookies" },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-alavi grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/brand/logo-icon.png"
            alt="ALAVI Destinos & Experiências"
            width={56}
            height={56}
            className="h-14 w-14 rounded-2xl object-cover"
          />
          <p className="mt-3 font-display text-xl font-extrabold text-white">ALAVI</p>
          <p className="mt-1 text-sm text-teal-400">Destinos &amp; Experiências</p>
          <p className="mt-4 max-w-xs text-sm text-navy-300">{siteConfig.brand.shortDescription}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <WhatsAppButton
              message={siteConfig.whatsappMessages.footer}
              label="Falar no WhatsApp"
              source="footer"
            />
            <a
              href={siteConfig.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram da ALAVI: @${siteConfig.contact.instagramHandle}`}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-teal-400 hover:text-teal-400"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Site</p>
          <ul className="mt-4 space-y-2 text-sm">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-navy-300 hover:text-teal-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contato</p>
          <ContactLinks className="mt-4 space-y-2 text-sm text-navy-300" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Legal</p>
          <ul className="mt-4 space-y-2 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-navy-300 hover:text-teal-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-alavi flex flex-col gap-2 py-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.fullName}. Todos os direitos reservados.
          </p>
          <p>{siteConfig.legal.razaoSocial !== "PENDENTE_INFORMAR_RAZAO_SOCIAL" ? `${siteConfig.legal.razaoSocial} — CNPJ ${siteConfig.legal.cnpj}` : "Razão social e CNPJ: a informar"}</p>
        </div>
      </div>
    </footer>
  );
}
