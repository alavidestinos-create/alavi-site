import Link from "next/link";
import type { Service } from "@/content/services";

const iconPaths: Record<Service["icon"], string> = {
  plane: "M2 16l20-8-8 20-3-8-9-4z",
  hotel: "M3 21V7l9-4 9 4v14M3 21h18M9 21v-6h6v6",
  package: "M21 8l-9-5-9 5 9 5 9-5zM3 8v9l9 5 9-5V8",
  route: "M4 20c4-8 12-8 16-16M4 4l4 4M20 20l-4-4",
  castle: "M4 21V10l3-2v3h2V7l3-2 3 2v4h2V8l3 2v11H4zM10 21v-5h4v5",
  coaster: "M3 18c3 0 3-6 6-6s3 6 6 6 3-8 6-8",
  shield: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
  transfer: "M3 12h13M13 6l6 6-6 6M21 6H8",
  experience: "M12 3l2.5 5 5.5.8-4 4 1 5.5L12 16l-5 2.3 1-5.5-4-4 5.5-.8z",
  concierge: "M4 20h16M6 20v-3a6 6 0 1112 0v3M12 4v3",
  executive: "M4 19l7-15 7 15M6.5 14h9M12 4v2",
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/servicos#${service.slug}`}
      className="group flex flex-col rounded-2xl border border-sand-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
    >
      <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand-100 text-teal-700">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d={iconPaths[service.icon]} />
        </svg>
      </span>
      <h3 className="font-display text-lg font-medium text-navy-900">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-700">{service.shortDescription}</p>
      <span className="mt-5 inline-flex items-center text-sm font-semibold text-teal-700 group-hover:underline">
        Solicitar orçamento →
      </span>
    </Link>
  );
}
