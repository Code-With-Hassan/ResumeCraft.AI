import { render, screen } from '@testing-library/react';
import PricingPage from './page';

// Mock Next.js Link component for testing
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Pricing Page', () => {
  it('renders the main heading', () => {
    render(<PricingPage />);
    const heading = screen.getByRole('heading', { name: /Pricing Plans/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the Cadet tier', () => {
    render(<PricingPage />);
    const tierTitle = screen.getByRole('heading', { name: /Cadet/i });
    const ctaButton = screen.getByRole('link', { name: /Start for Free/i });
    expect(tierTitle).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
  });

  it('renders the Commander tier', () => {
    render(<PricingPage />);
    const tierTitle = screen.getByRole('heading', { name: /Commander/i });
    const ctaButton = screen.getByRole('link', { name: /Upgrade Now/i });
    expect(tierTitle).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
  });

  it('renders the Enterprise tier', () => {
    render(<PricingPage />);
    const tierTitle = screen.getByRole('heading', { name: /Enterprise/i });
    const ctaButton = screen.getByRole('link', { name: /Contact Sales/i });
    expect(tierTitle).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
  });
});
