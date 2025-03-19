import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import NewPost from '../../pages/new';
import { createPost } from '../../pages/api/api';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the API function
jest.mock('../../pages/api/api', () => ({
  createPost: jest.fn(),
}));

// Mock CSS module
jest.mock('../../styles/NewPost.module.scss', () => ({
  container: 'container',
  form: 'form',
  formGroup: 'formGroup',
  submitButton: 'submitButton',
}));

describe('NewPost', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (createPost as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Test Title',
      slug: 'test-title',
      content: 'Test Content',
      author: 'default',
      datePublished: '2025-03-18T17:09:56.680Z',
    });
  });

  it('renders form elements', () => {
    render(<NewPost />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create post/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(<NewPost />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);
    const submitButton = screen.getByRole('button', { name: /create post/i });

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(createPost).toHaveBeenCalledWith({
        title: 'Test Title',
        content: 'Test Content',
        author: 'default',
        datePublished: expect.any(String),
        slug: 'test-title',
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/posts/test-title');
    });
  });

  it('displays validation errors for empty fields', async () => {
    render(<NewPost />);
    
    const submitButton = screen.getByRole('button', { name: /create post/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a title/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter content/i)).toBeInTheDocument();
    });
  });
}); 