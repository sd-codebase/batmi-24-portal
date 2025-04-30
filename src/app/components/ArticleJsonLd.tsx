import { Article } from "../types";

interface ArticleJsonLdProps {
  article: Article;
  url: string;
}

export default function ArticleJsonLd({ article, url }: ArticleJsonLdProps) {
  // Format the structured data according to schema.org
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image ? [article.featured_image] : [],
    datePublished: article.published_at,
    dateModified: article.published_at || article.published_at,
    author: {
      "@type": "Organization",
      name: "Batmi24",
      url: "https://batmi24.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Batmi24",
      logo: {
        "@type": "ImageObject",
        url: "https://batmi24.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
