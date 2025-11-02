import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('logs in as a student and sees the student dashboard', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Sign In \/ Register/i }));
    await user.click(await screen.findByRole('button', { name: 'Student' }));
    await user.click(screen.getByRole('button', { name: 'Sign In as Student' }));
    expect(await screen.findByText('For You')).toBeInTheDocument();
  });

  it('logs in as a vendor and sees the vendor dashboard', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Sign In \/ Register/i }));
    await user.click(await screen.findByRole('button', { name: 'Vendor' }));
    await user.click(screen.getByRole('button', { name: 'Sign In as Vendor' }));
    expect(await screen.findByText('Profile Views')).toBeInTheDocument();
  });

  it('logs in as a host and sees the host dashboard', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Sign In \/ Register/i }));
    await user.click(await screen.findByRole('button', { name: 'University Host' }));
    await user.click(screen.getByRole('button', { name: 'Sign In as University Host' }));
    await user.click(await screen.findByText('University'));
    expect(await screen.findByText('Events Dashboard')).toBeInTheDocument();
  });
});
