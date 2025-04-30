import React from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import MobileMenuToggle from "./MobileMenuToggle";

type Category = {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
};

// Server component - no "use client" directive
async function Header() {
  // Fetch categories server-side
  const { categories, childCategoriesMap } = await fetchCategories();

  return (
    <header className="w-full sticky top-0 left-0 right-0 z-50">
      {/* Main Logo Bar */}
      <div className="bg-white py-4">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-center">
            <Link
              href="/"
              style={{
                backgroundColor: "#af0000",
                padding: "1rem 1rem",
                borderRadius: "0.5rem",
              }}
            >
              <Image
                src="/brand/batmi-24-long-red.png"
                alt="Batmi24"
                width={320}
                height={130}
                className="h-auto rounded-lg"
                priority
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#af0000] text-white shadow-md">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center h-12 relative">
            {/* Home icon */}
            <Link
              href="/"
              className="px-3 h-full flex items-center hover:bg-[#8b0000] whitespace-nowrap"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>

            {/* Latest News */}
            <Link
              href="/categories/marathi-tajya-batmya"
              className="px-3 h-full flex items-center hover:bg-[#8b0000] whitespace-nowrap"
            >
              <span className="font-semibold">ताज्या बातम्या</span>
            </Link>

            {/* Categories - Desktop View */}
            <div className="hidden md:flex h-full">
              {categories.map((category) => (
                <div key={category.id} className="relative group h-full">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="px-3 h-full flex items-center hover:bg-[#8b0000] whitespace-nowrap group-hover:bg-[#8b0000]"
                  >
                    <span className="font-semibold">{category.name}</span>
                    {childCategoriesMap[category.id] &&
                      childCategoriesMap[category.id].length > 0 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 ml-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      )}
                  </Link>

                  {/* Dropdown for subcategories - uses CSS for interactivity */}
                  {childCategoriesMap[category.id] &&
                    childCategoriesMap[category.id].length > 0 && (
                      <div
                        className="absolute left-0 top-full bg-[#af0000] text-white shadow-lg z-10 w-48 opacity-0 invisible 
                                   group-hover:opacity-100 group-hover:visible transition-all duration-300 transform 
                                   translate-y-1 group-hover:translate-y-0"
                      >
                        {childCategoriesMap[category.id].map((child) => (
                          <Link
                            key={child.id}
                            href={`/categories/${child.slug}`}
                            className="block px-4 py-3 hover:bg-[#8b0000] hover:text-white border-b border-gray-100 last:border-none"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Mobile menu toggle - using client component */}
            <div className="ml-auto">
              <MobileMenuToggle
                categories={categories}
                childCategoriesMap={childCategoriesMap}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Server-side data fetching function
async function fetchCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");

  if (error) {
    console.error("Error fetching categories:", error);
    return { categories: [], childCategoriesMap: {} };
  }

  // Get main categories (with parent = null)
  const categories = data?.filter((category) => category.parent === null) || [];

  // Create a map of childCategories by parent ID for easier access
  const childCategoriesMap: Record<number, Category[]> = {};

  // Process all child categories
  data
    ?.filter((category) => category.parent !== null)
    .forEach((child) => {
      if (child.parent) {
        if (!childCategoriesMap[child.parent]) {
          childCategoriesMap[child.parent] = [];
        }
        childCategoriesMap[child.parent].push(child);
      }
    });

  return { categories, childCategoriesMap };
}

export default Header;
