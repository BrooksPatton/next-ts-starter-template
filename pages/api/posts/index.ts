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
  res: NextApiResponse<Post | Post[] | { error: string }>
) {
  if (req.method === 'GET') {
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const newPost: Post = {
      ...req.body,
      id: posts.length + 1,
    };
    posts.push(newPost);
    return res.status(201).json(newPost);
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 