import response from './response.json';
import { Post } from '../../interfaces/post';

// Mock data store
let posts: Post[] = response.data.map(post => {
  const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  console.log('Generated slug:', slug, 'for title:', post.title);
  return {
    ...post,
    slug,
    excerpt: post.content.substring(0, 150) + '...',
    coverImage: {
      url: '/images/default-cover.jpg',
      alt: post.title
    }
  };
});

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    console.log('Looking for post with slug:', slug);
    console.log('Available posts:', posts.map(p => ({ title: p.title, slug: p.slug })));
    const post = posts.find(p => p.slug === slug);
    return post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  try {
    const newPost: Post = {
      ...post,
      id: posts.length + 1,
    };
    posts.push(newPost);
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (id: number, updates: Partial<Post>): Promise<Post> => {
  try {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Post not found');
    }
    posts[index] = { ...posts[index], ...updates };
    return posts[index];
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const getPostList = async (): Promise<Post[]> => {
  try {
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
