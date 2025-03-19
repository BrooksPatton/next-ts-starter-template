import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

const mockProps = {
  title: 'Test Post Title',
  excerpt: 'Test post excerpt',
  slug: 'test-post',
  coverImage: {
    url: '/images/test-cover.jpg',
    alt: 'Test cover image',
  },
  date: '2024-03-20',
  author: 'Test Author',
};

describe('PostCard', () => {
  it('renders post card with all required props', () => {
    render(<PostCard {...mockProps} />);

    // Check if title is present and linked correctly
    const titleLink = screen.getByRole('link', { name: mockProps.title });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', `/blog/${mockProps.slug}`);

    // Check if excerpt is present
    expect(screen.getByText(mockProps.excerpt)).toBeInTheDocument();

    // Check if author is present
    expect(screen.getByText(mockProps.author)).toBeInTheDocument();

    // Check if date is present
    expect(screen.getByText(mockProps.date)).toBeInTheDocument();

    // Check if cover image is present with correct props
    const coverImage = screen.getByRole('img');
    expect(coverImage).toHaveAttribute('src', mockProps.coverImage.url);
    expect(coverImage).toHaveAttribute('alt', mockProps.coverImage.alt);
  });

  it('renders with correct CSS classes', () => {
    render(<PostCard {...mockProps} />);

    expect(screen.getByRole('article')).toHaveClass('postCard');
    expect(screen.getByRole('img').parentElement).toHaveClass('postImage');
    expect(screen.getByText(mockProps.excerpt)).toHaveClass('postExcerpt');
    expect(screen.getByText(mockProps.author)).toHaveClass('postAuthor');
  });

  it('renders with default cover image when not provided', () => {
    const propsWithoutCover = {
      ...mockProps,
      coverImage: undefined,
    };
    render(<PostCard {...propsWithoutCover} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/default-cover.jpg');
    expect(image).toHaveAttribute('alt', mockProps.title);
  });

  it('renders without meta section when date and author are not provided', () => {
    const propsWithoutMeta = {
      ...mockProps,
      date: undefined,
      author: undefined,
    };
    render(<PostCard {...propsWithoutMeta} />);

    expect(screen.queryByRole('meta')).not.toBeInTheDocument();
  });
}); 