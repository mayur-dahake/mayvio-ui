import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarGroup } from './Avatar';

// ── Avatar ──────────────────────────────────────

describe('Avatar Component', () => {
  it('renders with base class', () => {
    render(<Avatar data-testid="av" />);
    expect(screen.getByTestId('av')).toHaveClass('mv-avatar');
  });

  it('renders initials when no src', () => {
    render(<Avatar initials="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders img element when src provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="Alice" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(img).toHaveAttribute('alt', 'Alice');
  });

  it('applies size class', () => {
    render(<Avatar size="lg" data-testid="av" />);
    expect(screen.getByTestId('av')).toHaveClass('mv-avatar--lg');
  });

  it('applies default size md', () => {
    render(<Avatar data-testid="av" />);
    expect(screen.getByTestId('av')).toHaveClass('mv-avatar--md');
  });

  it('applies square shape modifier', () => {
    render(<Avatar shape="square" data-testid="av" />);
    expect(screen.getByTestId('av')).toHaveClass('mv-avatar--square');
  });

  it('applies status modifier', () => {
    render(<Avatar status="online" data-testid="av" />);
    expect(screen.getByTestId('av')).toHaveClass('mv-avatar--online');
  });

  it('forwards extra props', () => {
    render(<Avatar data-testid="custom" aria-label="User avatar" />);
    expect(screen.getByTestId('custom')).toHaveAttribute('aria-label', 'User avatar');
  });
});

// ── AvatarGroup ──────────────────────────────────

describe('AvatarGroup Component', () => {
  it('renders with base class', () => {
    render(
      <AvatarGroup data-testid="ag">
        <Avatar initials="A" />
      </AvatarGroup>
    );
    expect(screen.getByTestId('ag')).toHaveClass('mv-avatar-group');
  });

  it('renders all avatars when no limit', () => {
    render(
      <AvatarGroup data-testid="ag">
        <Avatar initials="A" />
        <Avatar initials="B" />
        <Avatar initials="C" />
      </AvatarGroup>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('shows overflow pill when limit exceeded', () => {
    render(
      <AvatarGroup limit={2}>
        <Avatar initials="A" />
        <Avatar initials="B" />
        <Avatar initials="C" />
        <Avatar initials="D" />
      </AvatarGroup>
    );
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('hides avatars beyond limit', () => {
    render(
      <AvatarGroup limit={2}>
        <Avatar initials="A" />
        <Avatar initials="B" />
        <Avatar initials="C" />
      </AvatarGroup>
    );
    expect(screen.queryByText('C')).not.toBeInTheDocument();
  });

  it('applies size class to group', () => {
    render(
      <AvatarGroup size="lg" data-testid="ag">
        <Avatar initials="A" />
      </AvatarGroup>
    );
    expect(screen.getByTestId('ag')).toHaveClass('mv-avatar-group--lg');
  });
});
