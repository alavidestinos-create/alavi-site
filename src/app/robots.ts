import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Endpoints internos não precisam ser rastreados.
        disallow: ["/api/"],
      },
      // Rastreadores de SEO/IA que só consomem banda e distorcem métricas.
      { userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "Bytespider"], disallow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
