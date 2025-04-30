import Link from "next/link";
import { unstable_noStore } from "next/cache"; // Import unstable_noStore
import { supabase } from "../lib/supabase";
import { BoltIcon } from "@heroicons/react/24/solid";

type NewsItem = {
  title: string;
  link: string;
};

// This is a Server Component (no "use client" directive)
async function ScrollingNews() {
  // Fetch the news items server-side
  const newsItems = await fetchScrollingNews();

  return (
    <div className="bg-gray-100 py-2 w-full left-0 right-0">
      {/* We set z-index to 30, which is lower than the header's z-50 but higher than content */}
      <div className="max-w-[1200px] mx-auto flex items-center h-6 relative overflow-hidden px-4">
        <span className="font-bold text-[#af0000] mr-4 whitespace-nowrap flex-shrink-0 z-10 flex items-center">
          <BoltIcon className="w-4 h-4 mr-1.5" />
          Latest:
        </span>

        {/* We're applying all styles via regular CSS classes to avoid client-side specifics */}
        <div className="relative flex-1 overflow-hidden h-full">
          <div className="ticker-wrap">
            <div className="ticker">
              {newsItems.map((item, index) => (
                <Link href={item.link} key={index} className="ticker-item">
                  {item.title}
                </Link>
              ))}
              {/* Repeat items for continuous scrolling effect */}
              {newsItems.map((item, index) => (
                <Link
                  href={item.link}
                  key={`repeat-${index}`}
                  className="ticker-item"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Server-side data fetching function
async function fetchScrollingNews(): Promise<NewsItem[]> {
  // Opt out of static rendering / caching
  unstable_noStore();

  try {
    const { data, error } = await supabase
      .from("articles")
      .select(
        `title,
        slug
        `
      )
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .range(0, 10);

    if (error) {
      console.error("Error fetching articles:", error);
      return [];
    }

    return (
      data?.map((newsItem) => ({
        title: newsItem.title,
        link: `/articles/${newsItem.slug}`,
      })) || []
    );
  } catch (error) {
    console.error("Exception while fetching articles:", error);
    return [];
  }
}

export default ScrollingNews;
