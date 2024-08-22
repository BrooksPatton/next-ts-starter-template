import * as response from './response.json';
import { Post } from '../../interfaces/post';

export const getPostBySlug = async (slug: string) => {
  return {
    id: 5,
    slug: slug,
    title: `${slug.replace('-', ' ')} Blog Post`,
    author: 'John Doe',
    content: 'This is the content of my first blog post.',
    datePublished: formatDate(new Date()),
  };
};

export const createPost = async (data: Post) => {
  return data;
};

export const updatePost = async (id: number, data: Post) => {
  return data;
};

export const getPostList = async () => {
  const res = response;
  return res.data;
};

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}
