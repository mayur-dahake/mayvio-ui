import { HTMLAttributes, ReactNode } from 'react';
export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /**
   * The list of items to display in the breadcrumb.
   */
  items: BreadcrumbItem[];

  /**
   * Custom separator between breadcrumb items. Defaults to '/'.
   */
  separator?: ReactNode;
}
