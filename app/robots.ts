import type { MetadataRoute } from "next";

const SITE = "https://faang.fer.tec.br";

/**
 * The crawler's map: every public page is allowed, the model endpoint is not,
 * and the sitemap tells search engines where the rest of the site is.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
