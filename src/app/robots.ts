import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://santosh-web.vercel.app"}/sitemap.xml`,
  };
}
