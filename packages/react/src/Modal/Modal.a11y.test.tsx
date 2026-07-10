import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modal, ModalHeader } from './Modal';

describe('Modal Accessibility', () => {
  it('should have role="dialog" and aria-modal="true"', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('overlay should have aria-hidden inversely matching isOpen', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    const overlay = screen.getByRole('dialog').parentElement!;
    expect(overlay).toHaveAttribute('aria-hidden', 'false');

    rerender(
      <Modal isOpen={false} onClose={vi.fn()}>
        Content
      </Modal>
    );

    // In our implementation, we still render the portal when closed but with opacity 0 and visibility hidden.
    // The overlay is given aria-hidden="true".
    // Since it's aria-hidden, getByRole won't find it easily unless we use query. Let's find it by class.
    const overlayWhenClosed = document.querySelector('.mv-modal-overlay');
    expect(overlayWhenClosed).toHaveAttribute('aria-hidden', 'true');
  });

  it('close button should have aria-label', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <ModalHeader>Accessible Modal Title</ModalHeader>
      </Modal>
    );

    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-label', 'Close modal');
  });
});
