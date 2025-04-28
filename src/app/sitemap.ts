import { MetadataRoute } from "next";
import { getArticles, getCategories } from "./lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://thecivicdiary.com";

  // Get all articles and categories
  const articles = await getArticles();
  const categories = await getCategories();

  // Create article URLs
  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updated_at || article.published_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Create category URLs
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Create static URLs
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Combine all URLs
  return [...staticUrls, ...articleUrls, ...categoryUrls];
}
