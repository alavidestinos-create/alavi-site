import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="container-alavi max-w-lg text-center">
        <p className="font-display text-6xl font-bold text-teal-500">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">
          Página não encontrada
        </h1>
        <p className="mt-3 text-sm text-navy-700">
          A página que você procura não existe ou foi movida. Que tal voltar
          para a página inicial ou falar diretamente com a gente?
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
          >
            Voltar ao início
          </Link>
          <WhatsAppButton
            message={siteConfig.whatsappMessages.default}
            label="Falar no WhatsApp"
            variant="outline"
            source="404_page"
          />
        </div>
      </div>
    </section>
  );
}
