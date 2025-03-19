import axios from 'axios';
import { getPosts, getPostById } from '../../../pages/api/posts';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Posts API', () => {
  describe('getPosts', () => {
    it('returns posts data when API call is successful', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockPosts });

      const result = await getPosts();
      expect(result).toEqual(mockPosts);
    });

    it('returns empty array when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await getPosts();
      expect(result).toEqual([]);
    });
  });

  describe('getPostById', () => {
    it('returns post data when API call is successful', async () => {
      const mockPost = { id: 1, title: 'Post 1' };
      mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

      const result = await getPostById(1);
      expect(result).toEqual(mockPost);
    });

    it('returns null when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await getPostById(1);
      expect(result).toBeNull();
    });
  });
}); 