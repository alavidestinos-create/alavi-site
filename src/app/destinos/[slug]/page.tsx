import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroDestination } from "@/components/destinos/HeroDestination";
import { DestinationHighlights } from "@/components/destinos/DestinationHighlights";
import { MapSection } from "@/components/destinos/MapSection";
import { Faq } from "@/components/sections/Faq";
import { CallToAction } from "@/components/ui/CallToAction";
import { destinations, getAllDestinationSlugs, getDestinationBySlug } from "@/content/destinations";
import { siteConfig } from "@/config/site";

interface DestinationPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: DestinationPageProps): Metadata {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) {
    return { title: "Destino não encontrado" };
  }

  const title = `Viagem para ${destination.name}`;
  const description = destination.shortDescription;

  return {
    title,
    description,
    alternates: { canonical: `/destinos/${destination.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${siteConfig.url}/destinos/${destination.slug}`,
      images: [{ url: destination.image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [destination.image],
    },
  };
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Destinos", item: `${siteConfig.url}/destinos` },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.name,
        item: `${siteConfig.url}/destinos/${destination.slug}`,
      },
    ],
  };

  const touristDestinationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.summary,
    image: destination.image,
    url: `${siteConfig.url}/destinos/${destination.slug}`,
    touristType: "Lazer",
    includesAttraction: destination.attractions.map((attraction) => ({
      "@type": "TouristAttraction",
      name: attraction,
    })),
  };

  const otherDestinations = destinations.filter((item) => item.slug !== destination.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="container-alavi pt-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-navy-500">
          <li>
            <Link href="/" className="hover:text-teal-700">
              Início
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/destinos" className="hover:text-teal-700">
              Destinos
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-navy-800">{destination.name}</li>
        </ol>
      </nav>

      <HeroDestination destination={destination} />
      <DestinationHighlights destination={destination} />
      <MapSection query={destination.mapQuery} name={destination.name} />
      <Faq
        items={destination.faq}
        eyebrow="Dúvidas frequentes"
        title={`Perguntas sobre ${destination.name}`}
      />

      {otherDestinations.length > 0 && (
        <section className="bg-sand-50 py-16 sm:py-20">
          <div className="container-alavi">
            <h3 className="font-display text-xl font-medium text-navy-900">Outros destinos</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {otherDestinations.map((item) => (
                <Link
                  key={item.slug}
                  href={`/destinos/${item.slug}`}
                  className="rounded-full border border-sand-300 bg-white px-5 py-2 text-sm font-semibold text-navy-800 transition-colors hover:border-teal-600 hover:text-teal-700"
                >
                  {item.flag} {item.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction
        title={`Vamos montar seu roteiro para ${destination.name}?`}
        description="Conte para a gente quem vai viajar e o que não pode faltar no roteiro — a proposta é sempre sob medida."
        whatsappMessage={siteConfig.whatsappMessages.destino(destination.name)}
        source={`destino_${destination.slug}`}
      />
    </>
  );
}
