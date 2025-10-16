import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders a button with the correct text', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /Click Me/i });
    expect(button).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button', { name: /Click Me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole('button', { name: /Click Me/i });
    expect(button).toBeDisabled();
  });

  it('applies the correct variant class', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: /Delete/i });
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders as a child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/">Go Home</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /Go Home/i });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });
});
