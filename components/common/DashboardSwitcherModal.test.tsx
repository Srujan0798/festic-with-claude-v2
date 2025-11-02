import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DashboardSwitcherModal from './DashboardSwitcherModal';

describe('DashboardSwitcherModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSelectRole = vi.fn();
  const mockOnLogout = vi.fn();

  it('renders the modal when isOpen is true', () => {
    render(
      <DashboardSwitcherModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectRole={mockOnSelectRole}
        onLogout={mockOnLogout}
      />
    );
    expect(screen.getByText('Switch Dashboard')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <DashboardSwitcherModal
        isOpen={false}
        onClose={mockOnClose}
        onSelectRole={mockOnSelectRole}
        onLogout={mockOnLogout}
      />
    );
    expect(screen.queryByText('Switch Dashboard')).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <DashboardSwitcherModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectRole={mockOnSelectRole}
        onLogout={mockOnLogout}
      />
    );
    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectRole with the correct role when a role is clicked', () => {
    render(
      <DashboardSwitcherModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectRole={mockOnSelectRole}
        onLogout={mockOnLogout}
      />
    );
    fireEvent.click(screen.getByText('University'));
    expect(mockOnSelectRole).toHaveBeenCalledWith('University');
  });

  it('calls onLogout when the logout button is clicked', () => {
    render(
      <DashboardSwitcherModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectRole={mockOnSelectRole}
        onLogout={mockOnLogout}
      />
    );
    fireEvent.click(screen.getByText('Logout'));
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});
