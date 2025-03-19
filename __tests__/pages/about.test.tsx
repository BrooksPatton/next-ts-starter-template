import { render, screen } from '@testing-library/react';
import AboutPage from '../../pages/about';

describe('AboutPage', () => {
  it('renders the about page with all sections', () => {
    render(<AboutPage />);
    
    // Check main title
    expect(screen.getByText('About This Project')).toBeInTheDocument();
    
    // Check section headings
    expect(screen.getByText('Purpose')).toBeInTheDocument();
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    expect(screen.getByText('Interview Scenarios')).toBeInTheDocument();
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
    
    // Check some key content
    expect(screen.getByText(/This Next.js TypeScript starter template/)).toBeInTheDocument();
    expect(screen.getByText(/Blog-style content management with CRUD operations/)).toBeInTheDocument();
    expect(screen.getByText(/Next.js for server-side rendering and routing/)).toBeInTheDocument();
  });
}); 