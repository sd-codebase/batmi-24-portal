"use client";

import React, { useState } from "react";
import Link from "next/link";

type MobileMenuToggleProps = {
  categories: {
    id: number;
    name: string;
    slug: string;
    parent: number | null;
  }[];
  childCategoriesMap: Record<
    number,
    {
      id: number;
      name: string;
      slug: string;
      parent: number | null;
    }[]
  >;
};

export default function MobileMenuToggle({
  categories,
  childCategoriesMap,
}: MobileMenuToggleProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubCategories, setOpenSubCategories] = useState<
    Record<number, boolean>
  >({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubCategory = (categoryId: number) => {
    setOpenSubCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="text-white p-2 focus:outline-none"
        aria-label="Toggle mobile menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-12 bg-[#af0000] text-white shadow-lg z-20 max-h-[calc(100vh-12rem)] overflow-y-auto">
          <div className="flex flex-col">
            <Link
              href="/"
              className="px-4 py-3 border-b border-[#8b0000] hover:bg-[#8b0000]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/marathi-tajya-batmya"
              className="px-4 py-3 border-b border-[#8b0000] hover:bg-[#8b0000]"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-semibold">ताज्या बातम्या</span>
            </Link>

            {categories.map((category) => (
              <div key={category.id} className="border-b border-[#8b0000]">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="px-4 py-3 block flex-grow hover:bg-[#8b0000]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>

                  {childCategoriesMap[category.id] &&
                    childCategoriesMap[category.id].length > 0 && (
                      <button
                        onClick={() => toggleSubCategory(category.id)}
                        className="px-4 py-3 hover:bg-[#8b0000]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-4 h-4 transition-transform ${
                            openSubCategories[category.id] ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    )}
                </div>

                {/* Subcategories */}
                {openSubCategories[category.id] &&
                  childCategoriesMap[category.id] && (
                    <div className="bg-[#960000]">
                      {childCategoriesMap[category.id].map((child) => (
                        <Link
                          key={child.id}
                          href={`/categories/${child.slug}`}
                          className="block px-6 py-2 border-b border-[#8b0000] last:border-0 hover:bg-[#8b0000]"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
