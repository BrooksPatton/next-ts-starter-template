import { render, screen } from '@testing-library/react';
import { getPostBySlug, getPostList } from '../../../pages/api/api';
import PostTemplate from '../../../pages/posts/[slug]';
import { Post } from '../../../interfaces/post';

// Mock the API functions
jest.mock('../../../pages/api/api', () => ({
  getPostBySlug: jest.fn(),
  getPostList: jest.fn(),
}));

// Mock CSS module
jest.mock('../../../styles/Post.module.scss', () => ({
  postContainer: 'postContainer',
  postHeader: 'postHeader',
  post: 'post',
  coverImageContainer: 'coverImageContainer',
  coverImage: 'coverImage',
  postMeta: 'postMeta',
  postDate: 'postDate',
  postAuthor: 'postAuthor',
  postContent: 'postContent',
  editLink: 'editLink',
}));

describe('PostTemplate', () => {
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
    jest.clearAllMocks();
  });

  it('renders post content correctly', () => {
    render(<PostTemplate post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(/by Test Author/)).toBeInTheDocument();
  });

  it('handles null post', () => {
    render(<PostTemplate post={undefined as unknown as Post} />);
    expect(screen.getByText('Post not found')).toBeInTheDocument();
  });

  it('generates correct static paths', async () => {
    const mockPosts = [mockPost];
    (getPostList as jest.Mock).mockResolvedValue(mockPosts);

    const paths = await (PostTemplate as any).getStaticPaths();
    expect(paths.paths).toEqual([
      { params: { slug: mockPost.slug } }
    ]);
  });

  it('generates correct static props', async () => {
    (getPostBySlug as jest.Mock).mockResolvedValue(mockPost);

    const props = await (PostTemplate as any).getStaticProps({ params: { slug: mockPost.slug } });
    expect(props.props.post).toEqual(mockPost);
  });

  it('handles post not found in static props', async () => {
    (getPostBySlug as jest.Mock).mockResolvedValue(null);

    const props = await (PostTemplate as any).getStaticProps({ params: { slug: 'non-existent' } });
    expect(props.notFound).toBe(true);
  });
}); 