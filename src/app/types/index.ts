export interface Category {
  id: number;
  slug: string;
  name: string;
  order: number;
  description?: string;
  created_at: string;
  show_widget_on_homepage: boolean;
  show_in_footer: boolean;
}

export interface Article {
  id: number;
  image_url: string | null;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category_id: number;
  category?: Category;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  published_at: string;
  created_at: string;
  tags?: string[];
}
