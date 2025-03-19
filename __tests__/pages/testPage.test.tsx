import { render, screen } from '@testing-library/react';
import TestPage from '../../pages/testPage';

jest.mock('../../components/MainLayout', () => {
  return function MockMainLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="main-layout">{children}</div>;
  };
});

describe('TestPage', () => {
  it('renders the page content correctly', () => {
    render(<TestPage />);
    
    // Check if the heading is present
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    
    // Check if the paragraph is present
    expect(screen.getByText('This is a test page to verify routing and layout functionality.')).toBeInTheDocument();
    
    // Check if the back link is present
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });
}); 