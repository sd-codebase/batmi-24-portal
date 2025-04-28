# The Civic Diary - SEO-Optimized Next.js Website

A fully SEO-optimized Next.js website application for news and articles focused on civic matters and community initiatives.

## Features

- Fully server-side rendered pages with Next.js App Router
- SEO optimized with dynamic metadata, structured data, and sitemap
- Responsive design with Tailwind CSS
- Supabase database integration for content management
- Dynamic routing for categories and articles
- Clean, accessible, and semantic HTML
- Schema.org structured data for improved search engine visibility
- Optimized performance with Next.js image optimization

## Pages

- **Homepage**: Featured articles and category listings
- **Categories Page**: Browse all categories
- **Category Page**: Articles filtered by category (dynamic route: `/categories/[slug]`)
- **Articles Page**: Browse all articles
- **Article Page**: Individual article display (dynamic route: `/articles/[slug]`)

## SEO Optimizations

- Server-side rendering for all pages
- Metadata optimization with dynamic title, description, and keywords
- Open Graph and Twitter card metadata for social sharing
- JSON-LD structured data for article pages
- HTML5 semantic markup with microdata
- Dynamic sitemap generation
- Robots.txt configuration
- Optimized image loading with proper alt text
- Breadcrumb navigation

## Tech Stack

- **Next.js 14**: Framework for server-side rendering and routing
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend database for content
- **Server Components**: For SEO-friendly rendering

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Supabase Database Schema

The application uses the following Supabase database tables:

### Categories Table

- `id`: Primary key
- `slug`: URL-friendly identifier
- `name`: Category name
- `description`: Optional category description
- `created_at`: Timestamp

### Articles Table

- `id`: Primary key
- `slug`: URL-friendly identifier
- `title`: Article title
- `content`: HTML content
- `excerpt`: Short description
- `category_id`: Foreign key to categories table
- `featured_image`: Optional image URL
- `meta_title`: Optional SEO title
- `meta_description`: Optional SEO description
- `published_at`: Publication date
- `created_at`: Timestamp

## Deployment

This application can be deployed on Vercel or any hosting platform that supports Next.js:

```bash
npm run build
npm start
```

## License

[MIT](LICENSE)
