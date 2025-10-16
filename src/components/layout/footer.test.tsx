import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
  it('renders the footer with the current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const text = screen.getByText(`© ${currentYear} ResumeCraft AI. All Systems Operational.`);
    
    expect(text).toBeInTheDocument();
  });
});
