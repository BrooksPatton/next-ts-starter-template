import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../interfaces/post';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      const post = await getPostById(Number(id));
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json(post);
    }

    const posts = await getPosts();
    return res.status(200).json(posts);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}