import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditPostForm from '../../../pages/edit/[slug]';
import { Post } from '../../../interfaces/post';
import { updatePost, getPostBySlug } from '../../../pages/api/api';

jest.mock('../../../pages/api/api', () => ({
  updatePost: jest.fn(),
  formatDate: jest.fn().mockReturnValue('2024-03-20'),
  getPostBySlug: jest.fn(),
}));

describe('EditPostForm', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    content: 'This is a test post content',
    author: 'Test Author',
    datePublished: '2024-03-20',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with initial values', () => {
    render(<EditPostForm {...mockPost} />);
    
    // Check if the form elements are present with correct initial values
    expect(screen.getByLabelText(/title/i)).toHaveValue(mockPost.title);
    expect(screen.getByLabelText(/content/i)).toHaveValue(mockPost.content);
    expect(screen.getByRole('button', { name: /update post/i })).toBeInTheDocument();
    expect(screen.getByText('Edit Post')).toBeInTheDocument();
  });

  it('updates form values when user types', () => {
    render(<EditPostForm {...mockPost} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);
    
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(contentInput, { target: { value: 'Updated Content' } });
    
    expect(titleInput).toHaveValue('Updated Title');
    expect(contentInput).toHaveValue('Updated Content');
  });

  it('calls updatePost when form is submitted', async () => {
    render(<EditPostForm {...mockPost} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);
    const submitButton = screen.getByRole('button', { name: /update post/i });
    
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(contentInput, { target: { value: 'Updated Content' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledWith(mockPost.id, {
        title: 'Updated Title',
        slug: 'Updated-Title',
        content: 'Updated Content',
        author: 'default',
        id: mockPost.id,
        datePublished: '2024-03-20',
      });
    });
  });

  it('generates correct static paths', () => {
    const { getStaticPaths } = require('../../../pages/edit/[slug]');
    const paths = getStaticPaths();
    
    expect(paths).toEqual({
      paths: [
        { params: { slug: 'Post-One' } },
        { params: { slug: 'Post-Two' } },
        { params: { slug: 'Post-Three' } },
      ],
      fallback: false,
    });
  });

  it('fetches post data in getStaticProps', async () => {
    const { getStaticProps } = require('../../../pages/edit/[slug]');
    (getPostBySlug as jest.Mock).mockResolvedValueOnce(mockPost);

    const result = await getStaticProps({ params: { slug: 'test-post' } });
    
    expect(getPostBySlug).toHaveBeenCalledWith('test-post');
    expect(result).toEqual({ props: mockPost });
  });
}); 