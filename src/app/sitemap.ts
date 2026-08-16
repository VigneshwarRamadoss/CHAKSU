import type { MetadataRoute } from "next";
import { MOCK_COLLECTIONS, MOCK_PRODUCTS } from "@/lib/data/fixtures";
import { EDITORIAL_STORIES } from "@/lib/data/editorial";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chaksu.vercel.app";
  const updated = new Date();
  const staticRoutes = ["", "/collections/all", "/search", "/stories", "/about", "/customer-care"];

  return [
    ...staticRoutes.map(route => ({ url: `${siteUrl}${route}`, lastModified: updated })),
    ...MOCK_COLLECTIONS.filter(collection => collection.handle !== "all").map(collection => ({
      url: `${siteUrl}/collections/${collection.handle}`,
      lastModified: updated,
    })),
    ...MOCK_PRODUCTS.map(product => ({
      url: `${siteUrl}/products/${product.handle}`,
      lastModified: updated,
    })),
    ...EDITORIAL_STORIES.map(story => ({
      url: `${siteUrl}/stories/${story.id}`,
      lastModified: updated,
    })),
  ];
}
