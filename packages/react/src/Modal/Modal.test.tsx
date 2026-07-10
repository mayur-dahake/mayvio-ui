// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

describe('Modal Component', () => {
  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('renders but is visually hidden when isOpen is false', () => {
    render(
      <Modal isOpen={false} data-testid="modal">
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    const overlay = modal.parentElement!;
    expect(overlay.className).not.toContain('mv-modal-overlay--open');
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders into a portal when isOpen is true', () => {
    render(
      <Modal isOpen={true} data-testid="modal">
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal.className).toContain('mv-modal');

    // Check overlay
    const overlay = modal.parentElement;
    expect(overlay?.className).toContain('mv-modal-overlay');
    expect(overlay?.className).toContain('mv-modal-overlay--open');

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('applies the correct size class', () => {
    render(
      <Modal isOpen={true} size="lg" data-testid="modal">
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.getByTestId('modal').className).toContain('mv-modal--lg');
  });

  it('calls onClose when clicking outside by default', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div data-testid="overlay" className="mv-modal-overlay">
          <div data-testid="modal" className="mv-modal">
            Content
          </div>
        </div>
      </Modal>
    );

    // The component uses the parent div as overlay
    // We'll simulate clicking on the overlay backdrop
    const dialogElement = screen.getByRole('dialog');
    const overlay = dialogElement.parentElement!;

    fireEvent.mouseDown(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Clicking inside the modal should NOT trigger onClose
    fireEvent.mouseDown(dialogElement);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when closeOnOutsideClick is false', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOutsideClick={false}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );

    const overlay = screen.getByRole('dialog').parentElement!;
    fireEvent.mouseDown(overlay);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEscape is false', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEscape={false}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  describe('ModalHeader', () => {
    it('renders children and close button by default', () => {
      render(<ModalHeader data-testid="header">My Title</ModalHeader>);
      expect(screen.getByTestId('header').className).toContain('mv-modal-header');
      expect(screen.getByText('My Title')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(<ModalHeader showCloseButton={false}>My Title</ModalHeader>);
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('calls context onClose when close button is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <ModalHeader>My Title</ModalHeader>
        </Modal>
      );

      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('ModalBody', () => {
    it('renders correctly', () => {
      render(<ModalBody data-testid="body">Body Content</ModalBody>);
      const body = screen.getByTestId('body');
      expect(body.className).toContain('mv-modal-body');
      expect(body.textContent).toBe('Body Content');
    });
  });

  describe('ModalFooter', () => {
    it('renders correctly', () => {
      render(<ModalFooter data-testid="footer">Footer Content</ModalFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer.className).toContain('mv-modal-footer');
      expect(footer.textContent).toBe('Footer Content');
    });
  });
});
