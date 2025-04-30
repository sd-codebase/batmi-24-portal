import { supabase } from "./supabase";
import { Article, Category } from "../types";

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
}

// Get a category by slug
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  // Decode URL-encoded slugs to handle spaces and special characters
  const decodedSlug = decodeURIComponent(slug);

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }

  return data;
}

// Get all articles
export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*, category:category_id(*)")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return data || [];
}

// Get featured articles
export async function getFeaturedArticles(
  limit: number = 4
): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*, category:category_id(*)")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured articles:", error);
    return [];
  }

  return data || [];
}

// Get an article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Decode URL-encoded slugs to handle spaces and special characters
  const decodedSlug = decodeURIComponent(slug);

  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      *, 
      category:category_id(*)
    `
    )
    .eq("slug", decodedSlug)
    .single();

  if (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }

  return data;
}

// Get articles by category
export async function getArticlesByCategory(
  categoryId: number,
  page: number = 1,
  pageSize: number = 15
): Promise<{ articles: Article[]; total: number }> {
  // Calculate range for pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Get total count for pagination
  const countResponse = await supabase
    .from("articles")
    .select("id", { count: "exact" })
    .eq("category_id", categoryId);

  const total = countResponse.count || 0;

  // Get paginated articles
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      *, 
      category:category_id(*)
    `
    )
    .eq("category_id", categoryId)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(`Error fetching articles for category ${categoryId}:`, error);
    return { articles: [], total: 0 };
  }

  return { articles: data || [], total };
}

// Get all articles with pagination
export async function getAllArticlesPaginated(
  page: number = 1,
  pageSize: number = 9
): Promise<{ articles: Article[]; total: number }> {
  // Calculate range for pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Get total count for pagination
  const countResponse = await supabase
    .from("articles")
    .select("id", { count: "exact" })
    .eq("is_published", true);

  const total = countResponse.count || 0;

  // Get paginated articles
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      *, 
      category:category_id(*)
    `
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(`Error fetching all articles:`, error);
    return { articles: [], total: 0 };
  }

  return { articles: data || [], total };
}
