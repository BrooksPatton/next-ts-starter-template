import { getPostList, getPostBySlug, createPost, updatePost, formatDate } from '../../../pages/api/api';
import { Post } from '../../../interfaces/post';

// Mock fetch
global.fetch = jest.fn();

describe('API Functions', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    content: 'Test content',
    author: 'Test Author',
    datePublished: '2024-03-17T12:00:00Z',
    excerpt: 'Test excerpt',
    coverImage: {
      url: '/images/test.jpg',
      alt: 'Test image',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-03-17T12:00:00Z');
      expect(formatDate(date)).toBe('March 17, 2024');
    });

    it('handles different dates', () => {
      const date = new Date('2023-12-25T12:00:00Z');
      expect(formatDate(date)).toBe('December 25, 2023');
    });
  });

  describe('getPostList', () => {
    it('fetches posts successfully', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve([mockPost]) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const posts = await getPostList();
      expect(posts).toEqual([mockPost]);
      expect(global.fetch).toHaveBeenCalledWith('/api/posts');
    });

    it('handles errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      const posts = await getPostList();
      expect(posts).toEqual([]);
    });
  });

  describe('getPostBySlug', () => {
    it('fetches post successfully', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve(mockPost) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const post = await getPostBySlug('test-post');
      expect(post).toEqual(mockPost);
      expect(global.fetch).toHaveBeenCalledWith('/api/posts/test-post');
    });

    it('returns null for invalid slug', async () => {
      const mockResponse = { ok: false };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const post = await getPostBySlug('invalid-slug');
      expect(post).toBeNull();
    });

    it('handles errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      const post = await getPostBySlug('test-post');
      expect(post).toBeNull();
    });
  });

  describe('createPost', () => {
    it('creates post successfully', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve(mockPost) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const newPost = await createPost(mockPost);
      expect(newPost).toEqual(mockPost);
      expect(global.fetch).toHaveBeenCalledWith('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockPost),
      });
    });

    it('handles errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(createPost(mockPost)).rejects.toThrow('API Error');
    });
  });

  describe('updatePost', () => {
    it('updates post successfully', async () => {
      const mockResponse = { ok: true, json: () => Promise.resolve(mockPost) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const updatedPost = await updatePost(1, mockPost);
      expect(updatedPost).toEqual(mockPost);
      expect(global.fetch).toHaveBeenCalledWith('/api/posts/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockPost),
      });
    });

    it('handles errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(updatePost(1, mockPost)).rejects.toThrow('API Error');
    });
  });
}); 