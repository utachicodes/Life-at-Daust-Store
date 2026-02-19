import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test/utils';
import Newsletter from './Newsletter';

describe('Newsletter Component', () => {
    it('renders newsletter signup form', () => {
        renderWithProviders(<Newsletter />);

        expect(screen.getByText(/stay ahead of/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
    });

    it('shows error for empty email submission', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Newsletter />);

        const button = screen.getByRole('button', { name: /subscribe/i });
        await user.click(button);

        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    it('shows error for invalid email format', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Newsletter />);

        const input = screen.getByPlaceholderText(/your@email.com/i);
        const button = screen.getByRole('button', { name: /subscribe/i });

        await user.type(input, 'invalid-email');
        await user.click(button);

        await waitFor(() => {
            expect(screen.getByText(/valid email/i)).toBeInTheDocument();
        });
    });

    it('shows success message on valid submission', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Newsletter />);

        const input = screen.getByPlaceholderText(/your@email.com/i);
        const button = screen.getByRole('button', { name: /subscribe/i });

        await user.type(input, 'test@example.com');
        await user.click(button);

        // Should show loading state (spinner in button)
        expect(button).toBeDisabled();

        // Should show success message after delay
        await waitFor(() => {
            expect(screen.getByText(/you're in/i)).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    it('clears email input after successful submission', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Newsletter />);

        const input = screen.getByPlaceholderText(/your@email.com/i);
        await user.type(input, 'test@example.com');
        await user.click(screen.getByRole('button', { name: /subscribe/i }));

        await waitFor(() => {
            expect(screen.getByText(/you're in/i)).toBeInTheDocument();
        }, { timeout: 2000 });

        // Input should be cleared (success message replaces form)
        expect(screen.queryByPlaceholderText(/your@email.com/i)).not.toBeInTheDocument();
    });

    it('disables input and button during submission', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Newsletter />);

        const input = screen.getByPlaceholderText(/your@email.com/i);
        const button = screen.getByRole('button', { name: /subscribe/i });

        await user.type(input, 'test@example.com');
        await user.click(button);

        // During loading state, button and input should be disabled
        expect(button).toBeDisabled();
        expect(input).toBeDisabled();
    });
});
