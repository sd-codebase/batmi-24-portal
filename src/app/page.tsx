import { Metadata } from "next";
import Link from "next/link";
import LatestNews from "./components/LatestNews";
import { getCategories } from "./lib/api";
import { Category } from "./types";

export const metadata: Metadata = {
  title:
    "ताज्या महाराष्ट्र बातम्या व ब्रेकिंग न्यूज | batmi24.com | मराठी बातम्या | Batmi 24 | Latest Marathi News",
  description:
    "महाराष्ट्र, राजकारण, मनोरंजन, आणि शेती बातम्यांचे अचूक अपडेट्स. batmi24.com वर वाचा ताज्या व्हायरल न्यूज, Latest News, आणि ब्रेकिंग न्यूज.",
  keywords:
    "ताज्या बातम्या, Latest News, Maharashtra News, Marathi News, महाराष्ट्र ब्रेकिंग न्यूज, Maharashtra Breaking News, मुंबई बातम्या, मराठी वृत्तपत्र, ताज्या घटना, Maharashtra News Today, Maharashtra News Live, Maharashtra News Paper, Maharashtra News Website",
};

export default async function Home() {
  const categories: Category[] = await getCategories();

  return (
    <div>
      {/* Latest News Section */}
      <section className="mb-12">
        <LatestNews />
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories
            .filter((category) => category.show_widget_on_homepage)
            .sort((a, b) => a.order - b.order)
            .map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className=" bg-[#af0000] text-white hover:bg-[#8b0000] p-6 rounded-lg text-center transition-colors"
              >
                <h3 className="text-xl font-semibold">{category.name}</h3>
                {category.description && (
                  <p className="text-gray-600 mt-2">{category.description}</p>
                )}
              </Link>
            ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-slate-100 p-8 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to receive the latest updates and
            articles.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-[#af0000] text-white rounded hover:bg-[#8b0000] px-6 py-2 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
