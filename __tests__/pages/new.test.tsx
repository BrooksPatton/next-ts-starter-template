import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewPost from '@/pages/new';
import { createPost } from '@/pages/api/api';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/pages/api/api', () => ({
  createPost: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt} />;
  },
}));

// Mock next/head
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe('NewPostForm', () => {
  beforeEach(() => {
    (createPost as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Test Title',
      slug: 'test-title',
      content: 'Test Content',
      author: 'default',
      datePublished: new Date().toISOString(),
    });
  });

  it('submits form with correct data', async () => {
    render(<NewPost />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test Content' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/create post/i));

    // Check if createPost was called with correct data
    await waitFor(() => {
      expect(createPost).toHaveBeenCalledWith({
        title: 'Test Title',
        slug: 'test-title',
        content: 'Test Content',
        author: 'default',
        datePublished: expect.any(String),
      });
    });
  });

  it('shows error message when submission fails', async () => {
    (createPost as jest.Mock).mockRejectedValue(new Error('Failed to create post'));

    render(<NewPost />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test Content' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/create post/i));

    // Check if error message is shown
    await waitFor(() => {
      expect(screen.getByText(/failed to create post/i)).toBeInTheDocument();
    });
  });
}); 