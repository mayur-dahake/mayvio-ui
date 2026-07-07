import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar Accessibility', () => {
  it('img has alt attribute when src is provided', () => {
    render(<Avatar src="https://example.com/img.jpg" alt="Alice" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Alice');
  });

  it('initials span is aria-hidden (decorative) or has label', () => {
    render(<Avatar initials="AB" data-testid="av" aria-label="AB avatar" />);
    expect(screen.getByTestId('av')).toHaveAttribute('aria-label', 'AB avatar');
  });

  it('overflow count is readable', () => {
    render(
      <AvatarGroup limit={1}>
        <Avatar initials="A" />
        <Avatar initials="B" />
        <Avatar initials="C" />
      </AvatarGroup>
    );
    // overflow pill should be findable
    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
