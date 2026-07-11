import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Slider } from './Slider';

describe('Slider Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Slider value={50} min={0} max={100} />);
    expect(container.querySelector('.mv-slider-wrapper')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    const { container } = render(<Slider value={50} disabled />);
    const thumb = container.querySelector('.mv-slider-thumb');
    expect(thumb).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders thumb at correct percentage', () => {
    const { container } = render(<Slider value={75} min={0} max={100} />);
    const thumb = container.querySelector('.mv-slider-thumb') as HTMLElement;
    expect(thumb.style.left).toBe('75%');
  });
});
