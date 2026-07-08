import { useState, useId } from 'react';
import { TabsProps } from './Tabs.types.js';

export function Tabs({
  items,
  defaultActiveId,
  activeId,
  onChange,
  className = '',
  ...props
}: TabsProps) {
  const generatedId = useId();
  const [internalActiveId, setInternalActiveId] = useState(defaultActiveId || items[0]?.id);

  const currentActiveId = activeId !== undefined ? activeId : internalActiveId;

  const handleTabClick = (id: string) => {
    if (activeId === undefined) {
      setInternalActiveId(id);
    }
    onChange?.(id);
  };

  return (
    <div className={`mv-tabs ${className}`.trim()} {...props}>
      <div className="mv-tabs__list" role="tablist">
        {items.map((item) => {
          const isActive = item.id === currentActiveId;
          const classNames = ['mv-tabs__tab'];
          if (isActive) classNames.push('mv-tabs__tab--active');
          if (item.disabled) classNames.push('mv-tabs__tab--disabled');

          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              className={classNames.join(' ')}
              aria-selected={isActive}
              aria-controls={`${generatedId}-panel-${item.id}`}
              id={`${generatedId}-tab-${item.id}`}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleTabClick(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const isActive = item.id === currentActiveId;
        return (
          <div
            key={item.id}
            role="tabpanel"
            id={`${generatedId}-panel-${item.id}`}
            aria-labelledby={`${generatedId}-tab-${item.id}`}
            className={`mv-tabs__panel ${!isActive ? 'mv-tabs__panel--hidden' : ''}`.trim()}
            hidden={!isActive}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
