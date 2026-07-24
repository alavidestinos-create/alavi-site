import Link from "next/link";
import type { Service } from "@/content/services";

const iconPaths: Record<Service["icon"], string> = {
  plane: "M2 16l20-8-8 20-3-8-9-4z",
  hotel: "M3 21V7l9-4 9 4v14M3 21h18M9 21v-6h6v6",
  package: "M21 8l-9-5-9 5 9 5 9-5zM3 8v9l9 5 9-5V8",
  route: "M4 20c4-8 12-8 16-16M4 4l4 4M20 20l-4-4",
  snow: "M12 2v20M4.2 6l15.6 12M19.8 6L4.2 18",
  seat: "M6 4v9a3 3 0 003 3h6M6 4H4M6 13H4m14 8h-3l-1-4",
  shield: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
  transfer: "M3 12h13M13 6l6 6-6 6M21 6H8",
  sim: "M6 2h9l5 5v15H6zM6 2v20",
  experience: "M12 3l2.5 5 5.5.8-4 4 1 5.5L12 16l-5 2.3 1-5.5-4-4 5.5-.8z",
  miles: "M4 12a8 8 0 1116 0 8 8 0 01-16 0zM12 8v4l3 2",
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/servicos#${service.slug}`}
      className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition-shadow hover:shadow-lg"
    >
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d={iconPaths[service.icon]} />
        </svg>
      </span>
      <h3 className="font-display text-lg font-semibold text-navy-900">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-navy-700">{service.shortDescription}</p>
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-teal-700 group-hover:underline">
        Solicitar orçamento →
      </span>
    </Link>
  );
}
