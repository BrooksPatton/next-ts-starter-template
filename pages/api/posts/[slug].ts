import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../interfaces/post';

// Mock data store
let posts: Post[] = [
  {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    content: 'Test content',
    author: 'Test Author',
    datePublished: '2024-01-01',
    excerpt: 'Test excerpt',
    coverImage: {
      url: '/images/test.jpg',
      alt: 'Test image',
    },
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | { error: string }>
) {
  const { slug } = req.query;

  if (req.method === 'GET') {
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json(post);
  }

  if (req.method === 'PUT') {
    const postIndex = posts.findIndex((p) => p.slug === slug);
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const updates = req.body;
    posts[postIndex] = { ...posts[postIndex], ...updates };
    return res.status(200).json(posts[postIndex]);
  }

  if (req.method === 'DELETE') {
    const postIndex = posts.findIndex((p) => p.slug === slug);
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    posts = posts.filter((p) => p.slug !== slug);
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 