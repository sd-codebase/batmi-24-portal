import formatDate from "@/app/lib/transform-date";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Link from "next/link";
import ArticleImage from "../../components/ArticleImage";
import ArticleJsonLd from "../../components/ArticleJsonLd";
import ShareButtons from "../../components/ShareButtons";
import { getArticleBySlug, getArticles } from "../../lib/api";
import { Article } from "../../types";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata dynamically based on the article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found - Batmi24",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.meta_title || `${article.title} - Batmi24`,
    description: article.meta_description || article.excerpt,
    keywords: article.category
      ? `${article.category.name.toLowerCase()}, ${article.title.toLowerCase()}, civic engagement, news, article`
      : `${article.title.toLowerCase()}, civic engagement, news, article`,
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      type: "article",
      publishedTime: article.published_at,
      ...(article.featured_image && {
        images: [
          {
            url: article.featured_image,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      ...(article.featured_image && {
        images: [article.featured_image],
      }),
    },
  };
}

// Generate static paths for all articles
export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article: Article | null = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-6">
          The article you are looking for does not exist.
        </p>
        <Link href="/articles" className="text-blue-600 hover:underline">
          &larr; Back to Articles
        </Link>
      </div>
    );
  }

  const articleUrl = `https://batmi24.com/articles/${article.slug}`;

  return (
    <>
      <ArticleJsonLd article={article} url={articleUrl} />

      <article itemScope itemType="https://schema.org/NewsArticle">
        <meta itemProp="headline" content={article.title} />
        <meta itemProp="description" content={article.excerpt} />
        {article.featured_image && (
          <meta itemProp="image" content={article.featured_image} />
        )}
        <meta itemProp="datePublished" content={article.published_at} />
        <meta itemProp="dateModified" content={article.published_at} />
        <meta itemProp="author" content="Batmi24" />
        <meta itemProp="publisher" content="Batmi24" />

        <div className="mb-8">
          <nav
            aria-label="Breadcrumb"
            className="overflow-x-auto mb-4 scrollbar-hide"
          >
            <ol className="flex flex-wrap md:flex-nowrap items-center text-sm md:text-base gap-1 md:gap-2">
              <li className="flex items-center">
                <Link
                  href="/"
                  className="hover:text-[#af0000] font-semibold whitespace-nowrap"
                >
                  Marathi News
                </Link>
              </li>
              {article.category && (
                <li className="flex items-center">
                  <span className="mx-1 text-gray-500">&gt;</span>
                  <Link
                    href={`/categories/${article.category.slug}`}
                    className="hover:text-[#af0000] font-semibold whitespace-nowrap"
                  >
                    {article.category.name}
                  </Link>
                </li>
              )}
              <li className="flex items-center">
                <span className="mx-1 text-gray-500">&gt;</span>
                <span
                  className="font-semibold text-gray-700 truncate max-w-[180px] sm:max-w-xs md:max-w-none"
                  title={article.title}
                >
                  {article.title}
                </span>
              </li>
            </ol>
          </nav>

          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            itemProp="headline"
          >
            {article.title}
          </h1>

          <div className="flex items-center text-lg text-gray-600 mb-6">
            <span className="text-gray-600 flex items-center">
              <CalendarIcon className="h-5 w-5 text-[#af0000] mr-1" />
              {formatDate(article.published_at)}
            </span>
            <span className="mx-2">&bull;</span>
            <span className="text-gray-600 flex items-center">
              <ClockIcon className="h-5 w-5 text-[#af0000] mr-1" />1 min read
            </span>
            {article.category && (
              <>
                <span className="mx-2">&bull;</span>
                <Link
                  href={`/categories/${article.category.slug}`}
                  className="hover:text-[#af0000] hover:underline"
                >
                  {article.category.name}
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mx-auto mb-8 md:w-[700px] sm:w-full">
          <ArticleImage
            imageUrl={article.image_url}
            title={article.title}
            height={300}
          />
        </div>

        <div
          className="prose prose-lg max-w-none mb-12 text-lg"
          itemProp="articleBody"
        >
          {article.content.includes("\n") ? (
            // Split content by newlines and create paragraph for each segment with empty paragraphs in between (except after the last one)
            article.content
              .split("\n")
              .filter((segment) => segment.trim() !== "")
              .flatMap((segment, index, array) => {
                const contentParagraph = (
                  <p
                    key={`content-${index}`}
                    dangerouslySetInnerHTML={{ __html: segment }}
                  />
                );

                // Add an empty paragraph after each content paragraph except the last one
                if (index < array.length - 1) {
                  return [
                    contentParagraph,
                    <p key={`space-${index}`} className="empty-space">
                      &nbsp;
                    </p>,
                  ];
                }

                return [contentParagraph];
              })
          ) : (
            // If there are no newlines, render the content as is
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          )}
        </div>
        {/* Tags section */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-block px-3 py-1 rounded-full text-white bg-[#af0000] hover:bg-[#8f0000] transition-colors text-sm font-medium"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Social media sharing buttons */}
        <ShareButtons url={articleUrl} title={article.title} />
      </article>
    </>
  );
}
