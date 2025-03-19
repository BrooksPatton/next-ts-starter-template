import React from 'react';
import { render, screen } from '@testing-library/react';
import PostTemplate, { getStaticPaths, getStaticProps } from '../../../pages/posts/[slug]';
import { getPostBySlug, getPostList } from '../../../pages/api/api';

// Mock the API functions
jest.mock('../../../pages/api/api');

describe('PostTemplate', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    content: 'Test Content',
    author: 'Test Author',
    datePublished: '2024-01-01',
    excerpt: 'Test excerpt',
    coverImage: {
      url: '/images/test-cover.jpg',
      alt: 'Test cover'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getPostBySlug as jest.Mock).mockResolvedValue(mockPost);
  });

  it('renders post content correctly', async () => {
    render(<PostTemplate post={mockPost} />);
    
    // Check if the title is present
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    
    // Check if the content is present
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    
    // Check if the author and date are present
    expect(screen.getByText(`by ${mockPost.author}`)).toBeInTheDocument();
    expect(screen.getByText('December 31, 2023')).toBeInTheDocument();
  });

  it('generates correct static paths', async () => {
    const mockPosts = [
      { slug: 'post-1' },
      { slug: 'post-2' }
    ];
    
    (getPostList as jest.Mock).mockResolvedValue(mockPosts);
    
    const paths = await getStaticPaths();
    
    expect(paths).toEqual({
      paths: [
        { params: { slug: 'post-1' } },
        { params: { slug: 'post-2' } }
      ],
      fallback: false
    });
  });

  it('fetches post data correctly', async () => {
    const result = await getStaticProps({ params: { slug: 'test-post' } });
    
    expect(result).toEqual({
      props: {
        post: mockPost
      }
    });
  });
}); 