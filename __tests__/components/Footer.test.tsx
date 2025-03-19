import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';
import styles from '../../styles/Home.module.scss';

// Mock the styles module
jest.mock('@/styles/Home.module.scss', () => ({
  footer: 'footer-class',
}));

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders with correct class', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toHaveClass(styles.footer);
  });
}); 