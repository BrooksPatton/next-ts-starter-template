import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock CSS module
const mockStyles = {
  navbar: 'navbar',
  container: 'container',
  logo: 'logo',
  links: 'links',
  link: 'link',
  active: 'active',
};

jest.doMock('../styles/Navbar.module.scss', () => mockStyles);

// Import Navbar after mocking
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    // Reset router mock before each test
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/',
    }));
  });

  it('renders the navbar with logo and navigation links', () => {
    render(<Navbar />);
    
    // Check if logo is present
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('width', '150');
    expect(logo).toHaveAttribute('height', '40');
    expect(logo).toHaveAttribute('src', '/images/logo.png');
    
    // Check if logo is wrapped in a Link with correct class
    const logoLink = logo.closest('a');
    expect(logoLink).toHaveClass(mockStyles.logo);
    expect(logoLink).toHaveAttribute('href', '/');

    // Check if navigation links are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('New Post')).toBeInTheDocument();
  });

  it('applies active class to current route', () => {
    render(<Navbar />);
    
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveClass(mockStyles.link, mockStyles.active);
  });

  it('renders with correct classes', () => {
    render(<Navbar />);
    
    // Check if navbar has correct class
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass(mockStyles.navbar);
    
    // Check if container has correct class
    const container = navbar.firstChild;
    expect(container).toHaveClass(mockStyles.container);
    
    // Check if links container has correct class
    const linksContainer = screen.getByText('Home').parentElement?.parentElement;
    expect(linksContainer).toHaveClass(mockStyles.links);
  });
}); 