import { render, screen } from '@testing-library/react';
import OtherPage from '../../pages/otherPage';

jest.mock('../../components/MainLayout', () => {
  return function MockMainLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="main-layout">{children}</div>;
  };
});

describe('OtherPage', () => {
  it('renders the page content correctly', () => {
    render(<OtherPage />);
    
    // Check if the heading is present
    expect(screen.getByText('Other Page')).toBeInTheDocument();
    
    // Check if the paragraph is present
    expect(screen.getByText('This is another test page to verify routing and layout functionality.')).toBeInTheDocument();
    
    // Check if the back link is present
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });
}); 