export interface Post {
  id?: number;
  slug: string;
  title: string;
  author: string;
  content: string;
  datePublished: string;
  date?: string;
  excerpt?: string;
  coverImage?: {
    url: string;
    alt: string;
  };
}
