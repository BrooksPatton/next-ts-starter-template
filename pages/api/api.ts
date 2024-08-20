import axios from 'axios';
import { Post } from '../../interfaces/post';
import * as response from './response.json';

const API_URL = 'http://localhost:3000/api';

export const getPostBySlug = async (slug: number) => {
  const res = response;
  return res.data[slug];
};

export const createPost = async (data: Post) => {
  const res = await axios.post(`${API_URL}/posts`, data);
  return res.data;
};

export const updatePost = async (id: number, data: Post) => {
  const res = await axios.put(`${API_URL}/posts/${id}`, data);
  return res.data;
};

export const getPostList = async () => {
    const res = response;
    return res.data;
};