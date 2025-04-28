import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getArticleBySlug, getArticles } from "../../lib/api";
import { Article } from "../../types";
import ArticleJsonLd from "../../components/ArticleJsonLd";
import formatDate from "@/app/lib/transform-date";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import ShareButtons from "../../components/ShareButtons";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata dynamically based on the article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found - The Civic Diary",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.meta_title || `${article.title} - The Civic Diary`,
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

  const articleUrl = `https://thecivicdiary.com/articles/${article.slug}`;

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
        <meta itemProp="author" content="The Civic Diary" />
        <meta itemProp="publisher" content="The Civic Diary" />

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[#af0000] font-bold text-lg">
              Marathi News
            </Link>
            {article.category && (
              <>
                <span>&gt;</span>
                <Link
                  href={`/categories/${article.category.slug}`}
                  className="hover:text-[#af0000] font-bold text-lg"
                >
                  {article.category.name}
                </Link>
              </>
            )}
            <span>&gt;</span>
            <span className="font-bold text-lg">{article.title}</span>
          </div>

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

        {article.featured_image ? (
          <div className="mx-auto mb-8">
            <div className="relative max-w-full" style={{ maxHeight: "500px" }}>
              <Image
                src={article.featured_image}
                alt={article.title}
                width={1200}
                height={675}
                className="rounded-lg mx-auto object-contain"
                priority={true}
                itemProp="image"
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto mb-8">
            <div className="relative max-w-full" style={{ maxHeight: "500px" }}>
              <Image
                src="/brand/the-civic-diary-small-red.jpeg"
                alt={article.title}
                width={800}
                height={450}
                className="rounded-lg mx-auto object-contain"
                priority={true}
                itemProp="image"
              />
            </div>
          </div>
        )}

        <div
          className="prose prose-lg max-w-none mb-12 text-lg"
          itemProp="articleBody"
        >
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
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
                #{tag}
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
