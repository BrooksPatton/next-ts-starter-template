import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/'
    };
  }
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

// Mock CSS modules
const mockStyles = {
  layout: 'layout',
  main: 'main',
};

jest.doMock('../../styles/MainLayout.module.scss', () => mockStyles);

// Import MainLayout after mocking
import MainLayout from '../../components/MainLayout';

describe('MainLayout', () => {
  const mockChildren = <div data-testid="mock-children">Test Content</div>;

  it('renders children content', () => {
    render(<MainLayout>{mockChildren}</MainLayout>);
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
  });

  it('renders Navbar and Footer components', () => {
    render(<MainLayout>{mockChildren}</MainLayout>);
    
    // Check for navigation elements
    const navElements = screen.getAllByRole('navigation');
    expect(navElements).toHaveLength(2); // One for navbar, one for footer
    
    // Check for footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<MainLayout>{mockChildren}</MainLayout>);
    
    // Check if layout has correct class
    const layout = screen.getByTestId('mock-children').parentElement;
    expect(layout).toHaveClass(mockStyles.layout);
    
    // Check if main has correct class
    const main = layout?.querySelector('main');
    expect(main).toHaveClass(mockStyles.main);
  });
});