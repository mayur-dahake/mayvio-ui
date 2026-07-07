import React from 'react';
import { AvatarProps, AvatarGroupProps } from './Avatar.types.js';

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
  ...props
}: AvatarProps) {
  const classes = [
    'mv-avatar',
    `mv-avatar--${size}`,
    shape === 'square' ? 'mv-avatar--square' : '',
    status ? `mv-avatar--${status}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {src ? (
        <img className="mv-avatar__image" src={src} alt={alt} />
      ) : initials ? (
        <span className="mv-avatar__initials" aria-hidden="true">
          {initials}
        </span>
      ) : null}
    </span>
  );
}

export function AvatarGroup({
  size = 'md',
  limit,
  children,
  className = '',
  ...props
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const visible = limit != null ? childArray.slice(0, limit) : childArray;
  const overflow = limit != null && childArray.length > limit ? childArray.length - limit : 0;

  const classes = ['mv-avatar-group', `mv-avatar-group--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {visible}
      {overflow > 0 && (
        <span className="mv-avatar-group__overflow" aria-label={`${overflow} more`}>
          +{overflow}
        </span>
      )}
    </div>
  );
}
