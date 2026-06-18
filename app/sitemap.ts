import type { MetadataRoute } from "next";
import { getRegionPageUrl, gyeongsanSeo, mokpoSeo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getRegionPageUrl(mokpoSeo),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getRegionPageUrl(gyeongsanSeo),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
