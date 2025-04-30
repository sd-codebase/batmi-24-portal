import { BoltIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { unstable_noStore } from "next/cache"; // Import unstable_noStore
import { supabase } from "../lib/supabase";
import ArticleImage from "./ArticleImage";

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  category: string;
  category_slug: string;
  published_at: string;
  image_url: string;
};

// Server component - no "use client" directive
async function LatestNews() {
  // Fetch articles server-side
  const news = await getLatestArticles();

  // Ensure we have at least 10 articles to display
  if (!news || news.length < 3) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3 flex items-center">
          <BoltIcon className="w-6 h-6 text-[#af0000] mr-2" />
          Latest News
        </h2>
        <div className="w-20 h-1 bg-[#af0000]"></div>
      </div>

      {/* News Grid - Now with 2 columns instead of 3 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Column 1 - Main content (8 cols) */}
        <div className="md:col-span-8 flex flex-col gap-4">
          {/* Featured Article */}
          <div className="border-b border-gray-200 pb-4">
            <ArticleImage imageUrl={news[0].image_url} title={news[0].title} />
            <div className="block">
              {news[0].category && news[0].category_slug && (
                <Link
                  href={`/categories/${news[0].category_slug}`}
                  className="text-sm font-semibold uppercase text-[#af0000] mb-1 inline-block hover:underline"
                >
                  {news[0].category}
                </Link>
              )}
              <Link href={`/articles/${news[0].slug}`}>
                <h3 className="font-bold text-lg hover:text-[#af0000] transition-colors mb-2">
                  {news[0].title}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {news[0].content.replace(/<[^>]*>/g, "")}
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Column 2 - Secondary content (4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          {news.slice(1, 7).map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4">
              <div className="block">
                {item.category && item.category_slug && (
                  <Link
                    href={`/categories/${item.category_slug}`}
                    className="text-sm font-semibold uppercase text-[#af0000] mb-1 inline-block hover:underline"
                  >
                    {item.category}
                  </Link>
                )}
                <Link href={`/articles/${item.slug}`}>
                  <h3 className="font-bold hover:text-[#af0000] transition-colors mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Read More Button */}
      <div className="mt-6 text-center">
        <Link
          href="/articles"
          className="inline-block bg-[#af0000] text-white py-2 px-6 rounded hover:bg-[#8b0000] transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

// Server-side data fetching function
async function getLatestArticles(): Promise<NewsItem[]> {
  // Opt out of static rendering / caching
  unstable_noStore();

  try {
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        title,
        slug,
        content,
        author,
        category_id,
        published_at,
        image_url,
        categories (
          name,
          slug
        )
        `
      )
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .range(0, 9);

    if (error) {
      console.error("Error fetching articles:", error);
      return [];
    }

    // Transform the data to match our NewsItem type
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      content: item.content,
      author: item.author,
      category: item.categories?.name || "",
      category_slug: item.categories?.slug || "",
      published_at: item.published_at,
      image_url: item.image_url,
    }));
  } catch (error) {
    console.error("Exception while fetching articles:", error);
    return [];
  }
}

export default LatestNews;
