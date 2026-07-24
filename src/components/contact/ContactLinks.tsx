import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactLinks({ className }: { className?: string }) {
  const whatsappHref = buildWhatsAppUrl(siteConfig.whatsappMessages.default);

  return (
    <ul className={className}>
      <li>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="underline-offset-2 transition-opacity hover:opacity-70 hover:underline">
          WhatsApp: {siteConfig.contact.isWhatsappConfigured ? siteConfig.contact.phoneDisplay : "a confirmar"}
        </a>
      </li>
      <li>
        <a href={`mailto:${siteConfig.contact.email}`} className="underline-offset-2 transition-opacity hover:opacity-70 hover:underline">
          {siteConfig.contact.email}
        </a>
      </li>
      <li>
        <a href={siteConfig.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 transition-opacity hover:opacity-70 hover:underline">
          Instagram @{siteConfig.contact.instagramHandle}
        </a>
      </li>
      <li className="opacity-70">{siteConfig.contact.address}</li>
      <li className="opacity-70">{siteConfig.contact.businessHours}</li>
    </ul>
  );
}
