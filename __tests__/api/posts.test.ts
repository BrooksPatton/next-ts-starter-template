import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/posts';
import { getPosts, getPostById } from '@/pages/api/posts';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Posts API', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockRes = {
      status: statusMock,
    };
    mockReq = {
      method: 'GET',
      query: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPosts utility function', () => {
    it('should fetch posts successfully', async () => {
      const mockPosts = [
        { id: 1, title: 'Test Post 1' },
        { id: 2, title: 'Test Post 2' },
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: mockPosts });

      const result = await getPosts();
      expect(result).toEqual(mockPosts);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/posts');
    });

    it('should handle errors and return empty array', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await getPosts();
      expect(result).toEqual([]);
    });
  });

  describe('getPostById utility function', () => {
    it('should fetch a single post successfully', async () => {
      const mockPost = { id: 1, title: 'Test Post' };
      mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

      const result = await getPostById(1);
      expect(result).toEqual(mockPost);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/posts/1');
    });

    it('should handle errors and return null', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await getPostById(1);
      expect(result).toBeNull();
    });
  });

  describe('API Handler', () => {
    it('should return all posts when no ID is provided', async () => {
      const mockPosts = [
        { id: 1, title: 'Test Post 1' },
        { id: 2, title: 'Test Post 2' },
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: mockPosts });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockPosts);
    });

    it('should return a single post when ID is provided', async () => {
      const mockPost = { id: 1, title: 'Test Post' };
      mockReq.query = { id: '1' };
      mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockPost);
    });

    it('should return 404 when post is not found', async () => {
      mockReq.query = { id: '999' };
      mockedAxios.get.mockRejectedValueOnce(new Error('Not found'));

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should return 405 for unsupported methods', async () => {
      mockReq.method = 'POST';

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(405);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Method not allowed' });
    });
  });
}); 