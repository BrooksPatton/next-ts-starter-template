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

// Mock CSS module
jest.mock('../../styles/MainLayout.module.scss', () => ({
  container: 'container',
  main: 'main',
  footer: 'footer'
}));

// Import MainLayout after mocking
import MainLayout from '../../components/MainLayout';

describe('MainLayout', () => {
  it('renders children content', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders footer with copyright text', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByText('© 2024 Your Blog Name. All rights reserved.')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByRole('main')).toHaveClass('main');
    expect(screen.getByRole('contentinfo')).toHaveClass('footer');
  });

  it('renders footer links', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});