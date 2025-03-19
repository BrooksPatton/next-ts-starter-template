import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock CSS module
jest.mock('../../styles/Navbar.module.scss', () => ({
  navbar: 'navbar',
  logoText: 'logoText',
  navLinks: 'navLinks',
  navLink: 'navLink',
  active: 'active',
}));

describe('Navbar', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/',
    });
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('New Post')).toBeInTheDocument();
  });

  it('applies active class to current route', () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/about',
    });
    render(<Navbar />);
    expect(screen.getByText('About')).toHaveClass('active');
  });

  it('applies correct CSS classes', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toHaveClass('navbar');
    expect(screen.getByText('Next Blog')).toHaveClass('logoText');
    expect(screen.getByText('Home').parentElement).toHaveClass('navLinks');
  });
}); 