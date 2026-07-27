import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { blogPosts } from "@/content/blog";
import { destinations } from "@/content/destinations";

const routes = [
  "",
  "/sobre",
  "/servicos",
  "/destinos",
  "/disney-orlando",
  "/guia-do-viajante",
  "/pontos-e-milhas",
  "/orcamento",
  "/contato",
  "/privacidade",
  "/termos",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: `${siteConfig.url}/destinos/${destination.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/guia-do-viajante/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...destinationRoutes, ...guideRoutes];
}
