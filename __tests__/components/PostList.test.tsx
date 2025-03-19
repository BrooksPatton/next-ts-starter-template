import { render, screen } from '@testing-library/react';
import PostList from '../../components/PostList';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

describe('PostList', () => {
  const mockPosts = [
    {
      id: 1,
      title: 'Test Post 1',
      slug: 'test-post-1',
      content: 'Test content 1',
      author: 'Test Author 1',
      datePublished: '2024-01-01',
      excerpt: 'Test excerpt 1',
      coverImage: {
        url: '/images/test-cover-1.jpg',
        alt: 'Test cover 1'
      }
    },
    {
      id: 2,
      title: 'Test Post 2',
      slug: 'test-post-2',
      content: 'Test content 2',
      author: 'Test Author 2',
      datePublished: '2024-01-02',
      excerpt: 'Test excerpt 2',
      coverImage: {
        url: '/images/test-cover-2.jpg',
        alt: 'Test cover 2'
      }
    }
  ];

  it('renders posts with cover images', () => {
    render(<PostList posts={mockPosts} />);
    
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', '/images/test-cover-1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Test cover 1');
    expect(images[1]).toHaveAttribute('src', '/images/test-cover-2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Test cover 2');
  });

  it('renders posts with titles and excerpts', () => {
    render(<PostList posts={mockPosts} />);
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt 2')).toBeInTheDocument();
  });

  it('returns null when posts is null', () => {
    const { container } = render(<PostList posts={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('returns null when posts array is empty', () => {
    const { container } = render(<PostList posts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
}); 