import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUpload } from './FileUpload.js';

describe('FileUpload Component', () => {
  it('renders correctly with labels', () => {
    render(<FileUpload label="Upload photo" hint="PNG or JPG" />);
    expect(screen.getByText('Upload photo')).toBeInTheDocument();
    expect(screen.getByText('PNG or JPG')).toBeInTheDocument();
  });

  it('can accept file selections', () => {
    const handleChange = vi.fn();
    render(<FileUpload onChange={handleChange} />);

    const input = screen.getByTestId('fileupload-input');
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(handleChange).toHaveBeenCalled();
    const emittedFiles = handleChange.mock.calls[0][0];
    expect(emittedFiles[0].name).toBe('hello.png');

    // UI should update to show the file
    expect(screen.getByText('hello.png')).toBeInTheDocument();
  });

  it('can remove a selected file', () => {
    const handleChange = vi.fn();
    render(<FileUpload onChange={handleChange} />);

    const input = screen.getByTestId('fileupload-input');
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    // File is in list, click remove
    const removeBtn = screen.getByRole('button', { name: /Remove/i });
    fireEvent.click(removeBtn);

    // After removing, file should disappear and onChange called with empty array
    expect(screen.queryByText('hello.png')).not.toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('disables correctly', () => {
    render(<FileUpload disabled />);
    const input = screen.getByTestId('fileupload-input');
    expect(input).toBeDisabled();
  });
});
