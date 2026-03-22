import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity/client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://santosh-web.vercel.app";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/process`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/quality`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/sustainability`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/collect`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  { url: `${BASE_URL}/sample-request`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  { url: `${BASE_URL}/insights`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let postRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await sanityClient.fetch<{ slug: string; publishedAt: string }[]>(
      '*[_type == "post" && defined(publishedAt)] { "slug": slug.current, publishedAt }'
    );
    postRoutes = posts.map((post) => ({
      url: `${BASE_URL}/insights/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Sitemap: failed to fetch Sanity post slugs:", err);
    postRoutes = [];
  }

  return [...staticRoutes, ...postRoutes];
}
