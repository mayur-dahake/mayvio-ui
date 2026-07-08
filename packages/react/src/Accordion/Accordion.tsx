import { useState, useId } from 'react';
import { AccordionProps } from './Accordion.types.js';

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  expandedIds,
  onChange,
  className = '',
  ...props
}: AccordionProps) {
  const generatedId = useId();
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(defaultExpandedIds);

  const currentExpandedIds = expandedIds !== undefined ? expandedIds : internalExpandedIds;

  const toggleItem = (id: string) => {
    let nextExpandedIds: string[];

    const isExpanded = currentExpandedIds.includes(id);

    if (allowMultiple) {
      if (isExpanded) {
        nextExpandedIds = currentExpandedIds.filter((item) => item !== id);
      } else {
        nextExpandedIds = [...currentExpandedIds, id];
      }
    } else {
      if (isExpanded) {
        nextExpandedIds = [];
      } else {
        nextExpandedIds = [id];
      }
    }

    if (expandedIds === undefined) {
      setInternalExpandedIds(nextExpandedIds);
    }

    onChange?.(nextExpandedIds);
  };

  return (
    <div className={`mv-accordion ${className}`.trim()} {...props}>
      {items.map((item) => {
        const isExpanded = currentExpandedIds.includes(item.id);
        const headerId = `${generatedId}-header-${item.id}`;
        const contentId = `${generatedId}-content-${item.id}`;

        return (
          <div key={item.id} className="mv-accordion__item">
            <h3 className="mv-accordion__header">
              <button
                type="button"
                id={headerId}
                className="mv-accordion__trigger"
                aria-expanded={isExpanded}
                aria-controls={contentId}
                disabled={item.disabled}
                onClick={() => !item.disabled && toggleItem(item.id)}
              >
                {item.title}
                <svg
                  className="mv-accordion__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </h3>
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className="mv-accordion__content"
              hidden={!isExpanded}
            >
              <div className="mv-accordion__content-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
