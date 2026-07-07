export interface AvatarConfig {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy';
}

export interface AvatarGroupConfig {
  size?: 'sm' | 'md' | 'lg';
  limit?: number;
}

export type AvatarSize = NonNullable<AvatarConfig['size']>;
export type AvatarShape = NonNullable<AvatarConfig['shape']>;
export type AvatarStatus = NonNullable<AvatarConfig['status']>;
