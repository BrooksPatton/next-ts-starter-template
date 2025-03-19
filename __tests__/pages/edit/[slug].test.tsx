import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import EditPost from '../../../pages/edit/[slug]';
import { getPostBySlug, updatePost } from '../../../pages/api/api';
import { Post } from '../../../interfaces/post';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the API functions
jest.mock('../../../pages/api/api', () => ({
  getPostBySlug: jest.fn(),
  updatePost: jest.fn(),
}));

// Mock CSS module
jest.mock('../../../styles/NewPost.module.scss', () => ({
  container: 'container',
  form: 'form',
  formGroup: 'formGroup',
  submitButton: 'submitButton',
}));

describe('EditPost', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    content: 'Test content',
    author: 'Test Author',
    datePublished: '2024-03-16',
    excerpt: 'Test excerpt',
    coverImage: {
      url: '/images/test.jpg',
      alt: 'Test image',
    },
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (getPostBySlug as jest.Mock).mockResolvedValue(mockPost);
    (updatePost as jest.Mock).mockResolvedValue(mockPost);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('renders form with post data', async () => {
    render(<EditPost post={mockPost} />);
    
    expect(screen.getByLabelText(/title/i)).toHaveValue(mockPost.title);
    expect(screen.getByLabelText(/content/i)).toHaveValue(mockPost.content);
  });

  it('handles form submission', async () => {
    render(<EditPost post={mockPost} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);
    const submitButton = screen.getByRole('button', { name: /update post/i });

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(contentInput, { target: { value: 'Updated Content' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledWith({
        ...mockPost,
        title: 'Updated Title',
        content: 'Updated Content',
        slug: 'updated-title',
        excerpt: 'Updated Content...',
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/posts/updated-title');
    });
  });

  it('handles errors during submission', async () => {
    const error = new Error('API Error');
    (updatePost as jest.Mock).mockRejectedValue(error);
    
    render(<EditPost post={mockPost} />);
    
    const submitButton = screen.getByRole('button', { name: /update post/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Failed to update post:', error);
    });
  });
}); 