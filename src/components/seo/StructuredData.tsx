import { siteConfig } from "@/config/site";

export function StructuredData() {
  const { addressDetails } = siteConfig.contact;

  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.brand.fullName,
    alternateName: siteConfig.brand.name,
    url: siteConfig.url,
    description: siteConfig.seo.defaultDescription,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.isWhatsappConfigured ? `+${siteConfig.contact.whatsappNumber}` : undefined,
    image: `${siteConfig.url}/brand/logo-nova.png`,
    logo: `${siteConfig.url}/brand/logo-nova.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: addressDetails.streetAddress,
      addressLocality: addressDetails.city,
      addressRegion: addressDetails.state,
      addressCountry: addressDetails.country,
    },
    openingHours: ["Mo-Fr 09:30-18:00", "Sa 09:30-12:00"],
    sameAs: [siteConfig.social.instagramUrl].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
