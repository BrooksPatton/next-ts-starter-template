import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/index';
import { getPostList } from '../../pages/api/api';
import { Post } from '../../interfaces/post';

// Mock the API
jest.mock('../../pages/api/api', () => ({
  getPostList: jest.fn(),
}));

// Mock CSS module
jest.mock('../../styles/Home.module.scss', () => ({
  main: 'main',
}));

describe('HomePage', () => {
  const mockPosts: Post[] = [
    {
      id: 1,
      title: 'Test Post 1',
      slug: 'test-post-1',
      content: 'Test content 1',
      author: 'Test Author',
      datePublished: '2024-03-17T12:00:00Z',
      excerpt: 'Test excerpt 1',
      coverImage: {
        url: '/images/test1.jpg',
        alt: 'Test image 1',
      },
    },
    {
      id: 2,
      title: 'Test Post 2',
      slug: 'test-post-2',
      content: 'Test content 2',
      author: 'Test Author',
      datePublished: '2024-03-16T12:00:00Z',
      excerpt: 'Test excerpt 2',
      coverImage: {
        url: '/images/test2.jpg',
        alt: 'Test image 2',
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome message', () => {
    render(<HomePage posts={mockPosts} />);
    expect(screen.getByText('Welcome to My Blog')).toBeInTheDocument();
    expect(screen.getByText('These are the most recent blog posts')).toBeInTheDocument();
  });

  it('renders list of posts', () => {
    render(<HomePage posts={mockPosts} />);
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('renders posts with correct links', () => {
    render(<HomePage posts={mockPosts} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/blog/test-post-1');
    expect(links[1]).toHaveAttribute('href', '/blog/test-post-2');
  });

  it('getStaticProps fetches posts correctly', async () => {
    (getPostList as jest.Mock).mockResolvedValue(mockPosts);
    
    const { getStaticProps } = require('../../pages/index');
    const result = await getStaticProps();
    
    expect(result).toEqual({
      props: {
        posts: mockPosts
      }
    });
  });
}); 