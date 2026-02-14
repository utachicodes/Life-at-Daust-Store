import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
    it('renders with children text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click me</Button>);
        await user.click(screen.getByText('Click me'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows loading state and disables button', () => {
        render(<Button loading>Submit</Button>);
        const button = screen.getByRole('button');

        expect(button).toBeDisabled();
        expect(button.querySelector('svg')).toBeInTheDocument(); // Loading spinner
    });

    it('applies primary variant styles by default', () => {
        render(<Button>Primary</Button>);
        const button = screen.getByRole('button');

        expect(button).toHaveClass('bg-brand-navy');
    });

    it('applies secondary variant styles', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole('button');

        expect(button).toHaveClass('border-brand-navy');
    });

    it('applies different sizes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-4');

        rerender(<Button size="lg">Large</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-8');
    });

    it('disables button when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies uppercase text transform by default', () => {
        render(<Button>Test</Button>);
        expect(screen.getByRole('button')).toHaveClass('uppercase');
    });

    it('removes uppercase when uppercase prop is false', () => {
        render(<Button uppercase={false}>Test</Button>);
        expect(screen.getByRole('button')).not.toHaveClass('uppercase');
    });
});
