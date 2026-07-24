import type { Testimonial } from "@/content/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
      <blockquote className="flex-1 text-sm italic text-navy-700">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-navy-900">
        {testimonial.name}
        <span className="block text-xs font-normal text-navy-500">{testimonial.trip}</span>
      </figcaption>
    </figure>
  );
}
