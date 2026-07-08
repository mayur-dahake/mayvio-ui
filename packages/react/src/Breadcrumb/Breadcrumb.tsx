import { BreadcrumbProps } from './Breadcrumb.types.js';

export function Breadcrumb({ items, separator = '/', className = '', ...props }: BreadcrumbProps) {
  return (
    <nav className={`mv-breadcrumb ${className}`.trim()} aria-label="Breadcrumb" {...props}>
      <ol className="mv-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.active || isLast;

          return (
            <li
              key={item.label}
              className={`mv-breadcrumb__item ${isActive ? 'mv-breadcrumb__item--active' : ''}`.trim()}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.href && !isActive ? (
                <a href={item.href} className="mv-breadcrumb__link">
                  {item.label}
                </a>
              ) : (
                <span className="mv-breadcrumb__link">{item.label}</span>
              )}

              {!isLast && (
                <span className="mv-breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
