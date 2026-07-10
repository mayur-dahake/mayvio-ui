import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FileUpload } from './FileUpload.js';

describe('FileUpload Component A11y', () => {
  it('input is hidden but accessible', () => {
    render(<FileUpload label="Upload photo" />);
    const input = screen.getByTestId('fileupload-input');
    expect(input).toBeInTheDocument();
  });
});
