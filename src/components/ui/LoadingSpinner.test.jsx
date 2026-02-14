import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
    it('renders loading spinner', () => {
        render(<LoadingSpinner />);

        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });

    it('applies default medium size', () => {
        const { container } = render(<LoadingSpinner />);
        const spinner = container.querySelector('.w-8');

        expect(spinner).toBeInTheDocument();
    });

    it('applies small size when specified', () => {
        const { container } = render(<LoadingSpinner size="sm" />);
        const spinner = container.querySelector('.w-4');

        expect(spinner).toBeInTheDocument();
    });

    it('applies large size when specified', () => {
        const { container } = render(<LoadingSpinner size="lg" />);
        const spinner = container.querySelector('.w-12');

        expect(spinner).toBeInTheDocument();
    });

    it('applies extra large size when specified', () => {
        const { container } = render(<LoadingSpinner size="xl" />);
        const spinner = container.querySelector('.w-16');

        expect(spinner).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<LoadingSpinner className="my-custom-class" />);

        expect(container.firstChild).toHaveClass('my-custom-class');
    });

    it('has spinning animation', () => {
        const { container } = render(<LoadingSpinner />);
        const spinner = container.querySelector('.animate-spin');

        expect(spinner).toBeInTheDocument();
    });
});
