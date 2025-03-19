import { getPostList, getPostBySlug, createPost, updatePost } from '../../../pages/api/api';
import { Post } from '../../../interfaces/post';

// Mock fetch globally
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

  describe('getPostList', () => {
    it('fetches posts successfully', async () => {
      const mockResponse = new Response(JSON.stringify([mockPost]));
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const posts = await getPostList();
      expect(posts).toEqual([mockPost]);
    });

    it('handles errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      const posts = await getPostList();
      expect(posts).toEqual([]);
    });
  });

  describe('getPostBySlug', () => {
    it('fetches post successfully', async () => {
      const mockResponse = new Response(JSON.stringify(mockPost));
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const post = await getPostBySlug('test-post');
      expect(post).toEqual(mockPost);
    });

    it('handles errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      const post = await getPostBySlug('test-post');
      expect(post).toBeNull();
    });
  });

  describe('createPost', () => {
    const newPost: Omit<Post, 'id'> = {
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

    it('creates post successfully', async () => {
      const mockResponse = new Response(JSON.stringify({ ...newPost, id: 1 }));
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const createdPost = await createPost(newPost);
      expect(createdPost).toEqual({ ...newPost, id: 1 });
      expect(global.fetch).toHaveBeenCalledWith('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
    });

    it('handles errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      await expect(createPost(newPost)).rejects.toThrow('API Error');
    });
  });

  describe('updatePost', () => {
    it('updates post successfully', async () => {
      const mockResponse = new Response(JSON.stringify(mockPost));
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

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
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      await expect(updatePost(1, mockPost)).rejects.toThrow('API Error');
    });
  });
}); 