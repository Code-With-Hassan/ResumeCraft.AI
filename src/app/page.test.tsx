import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Home Page', () => {
  it('renders the main headline', () => {
    render(<Home />);
    const headline = screen.getByRole('heading', {
      name: /Engineer Your Career's Future/i,
    });
    expect(headline).toBeInTheDocument();
  });

  it('renders the "Start Building" button', () => {
    render(<Home />);
    const button = screen.getByRole('link', { name: /Start Building/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/builder');
  });

  it('renders all three feature cards', () => {
    render(<Home />);
    expect(screen.getByText('AI-Powered Content')).toBeInTheDocument();
    expect(screen.getByText('ATS-Optimized')).toBeInTheDocument();
    expect(screen.getByText('Futuristic Templates')).toBeInTheDocument();
  });

  it('renders all three "How It Works" steps', () => {
    render(<Home />);
    expect(screen.getByText('1. Input Your Data')).toBeInTheDocument();
    expect(screen.getByText('2. Enhance with AI')).toBeInTheDocument();
    expect(screen.getByText('3. Export & Apply')).toBeInTheDocument();
  });

  it('renders all three testimonials', () => {
    render(<Home />);
    expect(screen.getByText('Alex Rivera')).toBeInTheDocument();
    expect(screen.getByText('Samantha Chen')).toBeInTheDocument();
    expect(screen.getByText('David Patel')).toBeInTheDocument();
  });
});
