import formatDate from "@/app/lib/transform-date";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import {
  getAllArticlesPaginated,
  getArticlesByCategory,
  getCategoryBySlug,
} from "../../lib/api";
import { Category } from "../../types";

// Set to ensure this page renders at runtime rather than build time
export const dynamic = "force-dynamic";

// This function tells Next.js not to pre-render any paths during build
export async function generateStaticParams() {
  return [];
}

// Fix type issues by defining the function without explicit types
export async function generateMetadata({ params }) {
  const slug = (await params).slug;

  // Special case for tajya-batmya
  if (slug === "tajya-batmya") {
    return {
      title: "Marathi News - Batmi24",
      description: "Browse all the latest Marathi news articles on Batmi24.",
      keywords:
        "marathi news, articles, latest news, civic engagement, marathi",
      openGraph: {
        title: "Marathi News - Batmi24",
        description: "Browse all the latest Marathi news articles on Batmi24.",
      },
    };
  }

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found - Batmi24",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} - Batmi24`,
    description:
      category.description ||
      `Browse all articles in the ${category.name} category on Batmi24.`,
    keywords: `${category.name.toLowerCase()}, articles, news, civic engagement, ${category.name.toLowerCase()} news`,
    openGraph: {
      title: `${category.name} - Batmi24`,
      description:
        category.description ||
        `Browse all articles in the ${category.name} category on Batmi24.`,
    },
  };
}

// Remove explicit typing for params to allow Next.js to handle it
export default async function CategoryPage({ params, searchParams }) {
  const slug = (await params).slug;
  const searchParam = await searchParams;
  const page = searchParam?.page ? parseInt(searchParam.page, 10) : 1;

  const pageSize = 12; // Number of articles per page

  // Special case for tajya-batmya (latest news)
  const isTajyaBatmya = slug === "marathi-tajya-batmya";

  // For normal categories, fetch category data
  const category: Category | null = isTajyaBatmya
    ? ({
        id: 0,
        slug: "marathi-tajya-batmya",
        name: "ताज्या बातम्या",
        order: 0,
        created_at: "",
        show_widget_on_homepage: true,
      } as Category)
    : await getCategoryBySlug(slug);

  if (!category && !isTajyaBatmya) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-6">The category you are looking for does not exist.</p>
        <Link href="/categories" className="text-[#af0000] hover:underline">
          &larr; Back to Categories
        </Link>
      </div>
    );
  }

  if (!category) {
    return null;
  }

  // Get articles based on whether it's the special case or regular category
  const { articles, total } = isTajyaBatmya
    ? await getAllArticlesPaginated(page, pageSize)
    : await getArticlesByCategory(category.id, page, pageSize);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <section className="mb-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="hover:text-[#af0000] font-bold text-lg">
              Marathi News
            </Link>
            {!isTajyaBatmya && (
              <>
                <span>&gt;</span>
                <span className="font-bold text-lg">{category.name}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-3">
            {isTajyaBatmya ? "ताज्या बातम्या" : category.name}
          </h1>
          {!isTajyaBatmya && category.description && (
            <p className="text-lg">{category.description}</p>
          )}
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                {article.featured_image && (
                  <div className="aspect-video relative">
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4">
                  <Link href={`/articles/${article.slug}`}>
                    <h2 className="text-xl font-semibold mb-2 hover:text-[#af0000] transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-sm mb-3 line-clamp-2">
                    {article.description}
                  </p>

                  <div className="flex justify-start items-center text-sm gap-4">
                    <span className="text-gray-600 flex items-center">
                      <CalendarIcon className="h-4 w-4 text-[#af0000] mr-1" />
                      {formatDate(article.published_at)}
                    </span>
                    <span className="text-gray-600 flex items-center">
                      <ClockIcon className="h-4 w-4 text-[#af0000] mr-1" />1 min
                      read
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p>No articles found in this category yet.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            <nav className="flex items-center" aria-label="Pagination">
              {page > 1 && (
                <Link
                  href={`/categories/${slug}?page=${page - 1}`}
                  className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-[#af0000]"
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-2" />
                  Previous
                </Link>
              )}

              <span className="text-sm text-gray-700">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>

              {page < totalPages && (
                <Link
                  href={`/categories/${slug}?page=${page + 1}`}
                  className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-[#af0000]"
                >
                  Next
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </Link>
              )}
            </nav>
          </div>
        )}
      </section>

      <div className="mt-8 text-center">
        <Link href="/" className="inline-block text-[#af0000] hover:underline">
          &larr; Go to home
        </Link>
      </div>
    </div>
  );
}
