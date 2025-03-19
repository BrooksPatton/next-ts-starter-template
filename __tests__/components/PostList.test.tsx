import React from 'react';
import { render, screen } from '@testing-library/react';
import PostList from '../../components/PostList';
import { Post } from '../../interfaces/post';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} />;
  },
}));

// Mock CSS modules
jest.mock('../../styles/PostList.module.scss', () => ({
  postList: 'postList',
  postCard: 'postCard',
  postImage: 'postImage',
  postContent: 'postContent',
  postTitle: 'postTitle',
  postExcerpt: 'postExcerpt',
  postMeta: 'postMeta',
}));

describe('PostList', () => {
  const mockPosts: Post[] = [
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
    images.forEach((img, index) => {
      const post = mockPosts[index];
      if (post.coverImage) {
        expect(img).toHaveAttribute('src', post.coverImage.url);
        expect(img).toHaveAttribute('alt', post.coverImage.alt);
      }
      expect(img.parentElement).toHaveClass('postImage');
    });
  });

  it('renders posts with titles and excerpts', () => {
    render(<PostList posts={mockPosts} />);
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt 2')).toBeInTheDocument();
  });

  it('renders posts with correct links', () => {
    render(<PostList posts={mockPosts} />);
    
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/posts/test-post-1');
    expect(links[1]).toHaveAttribute('href', '/posts/test-post-2');
  });

  it('renders posts with correct metadata', () => {
    render(<PostList posts={mockPosts} />);
    
    expect(screen.getByText('Test Author 1')).toBeInTheDocument();
    expect(screen.getByText('Test Author 2')).toBeInTheDocument();
    expect(screen.getByText('12/31/2023')).toBeInTheDocument();
    expect(screen.getByText('1/1/2024')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<PostList posts={mockPosts} />);
    
    // Check if post list has correct class
    const postList = screen.getByRole('list');
    expect(postList).toHaveClass('postList');
    
    // Check if post cards have correct class
    const postCards = screen.getAllByRole('listitem');
    postCards.forEach(card => {
      expect(card).toHaveClass('postCard');
    });
    
    // Check if images have correct class
    const imageContainers = screen.getAllByRole('img').map(img => img.parentElement);
    imageContainers.forEach(container => {
      expect(container).toHaveClass('postImage');
    });
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