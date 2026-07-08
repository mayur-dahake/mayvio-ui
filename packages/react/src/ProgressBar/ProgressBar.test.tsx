import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar Component', () => {
  it('applies default BEM class structure', () => {
    render(<ProgressBar value={40} data-testid="pb" />);
    const pb = screen.getByTestId('pb');
    expect(pb).toHaveClass('mv-progress-bar');
    expect(pb).toHaveClass('mv-progress-bar--md');
  });

  it('renders determinate progress bar value style width', () => {
    render(<ProgressBar value={40} max={100} data-testid="pb" />);
    const fill = screen.getByTestId('pb').querySelector('.mv-progress-bar__fill');
    expect(fill).toHaveStyle({ width: '40%' });
  });

  it('applies indeterminate modifier classes', () => {
    render(<ProgressBar indeterminate data-testid="pb" />);
    const track = screen.getByTestId('pb').querySelector('.mv-progress-bar__track');
    expect(track).toHaveClass('mv-progress-bar__track--indeterminate');
  });

  it('applies layout size modifiers', () => {
    render(<ProgressBar size="sm" data-testid="pb" />);
    const pb = screen.getByTestId('pb');
    expect(pb).toHaveClass('mv-progress-bar--sm');
  });
});
