export const HTML_TEMPLATES = {
  "theme-toggle": `<!-- Theme Toggle Switch -->
<button class="theme-toggle" id="theme-toggle-btn" type="button" role="switch" aria-checked="false" aria-label="Switch to dark theme"></button>`,

  skeleton: `<!-- Skeleton Avatar & Text Layout -->
<div class="skeleton-layout skeleton-social active">
  <div class="social-card">
    <div class="skeleton avatar"></div>
    <div class="content">
      <div class="skeleton line w40"></div>
      <div class="skeleton line w20"></div>
    </div>
  </div>
  <div class="skeleton line"></div>
  <div class="skeleton line w80"></div>
  <div class="skeleton media"></div>
</div>`,

  toast: `<!-- Toast Container (place at body root) -->
<div id="toastContainer" aria-live="polite" aria-atomic="true"></div>

<!-- Success Toast Example -->
<div class="toast success" role="alert">
  <span class="toast-icon" aria-hidden="true">✓</span>
  <span class="toast-message">Data saved successfully</span>
  <button class="toast-close" aria-label="Dismiss notification">✕</button>
  <div class="toast-progress"></div>
</div>`,

  modal: `<!-- Modal Toggle Button -->
<button class="btn btn-primary" data-modal-target="#confirmModal">Open Modal</button>

<!-- Accessible Modal Overlay -->
<div class="modal-overlay" id="confirmModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal">
    <div class="modal-header">
      <h3 id="modal-title">Delete Item</h3>
      <button class="modal-close" aria-label="Close modal">✕</button>
    </div>
    <p class="modal-body">
      Are you sure you want to delete this item? This action cannot be undone.
    </p>
    <div class="modal-actions">
      <button class="btn btn-secondary" data-modal-dismiss>Cancel</button>
      <button class="btn btn-danger">Delete</button>
    </div>
  </div>
</div>`,

  tabs: `<!-- Tabs Component -->
<div class="tabs">
  <div role="tablist" aria-label="Project tabs">
    <button role="tab" id="tab-1" aria-controls="panel-1" aria-selected="true" tabindex="0">Tab 1</button>
    <button role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false" tabindex="-1">Tab 2</button>
  </div>

  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" class="active">
    <h3>Tab 1 Panel</h3>
    <p>Content panel 1 goes here...</p>
  </div>

  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    <h3>Tab 2 Panel</h3>
    <p>Content panel 2 goes here...</p>
  </div>
</div>`,

  "command-palette": `<!-- Trigger Shortcut: Ctrl + K -->
<button class="btn btn-ghost" data-open-palette>Open Palette</button>

<!-- Command Palette Modal -->
<div class="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
  <div class="command-palette-panel">
    <div class="command-palette-header">
      <h3>Command Palette</h3>
      <button class="command-palette-close" aria-label="Close command palette">×</button>
    </div>
    <input class="command-palette-input" type="search" placeholder="Search commands…" aria-label="Search commands" />
    <div class="command-palette-list">
      <button class="command-palette-item" data-command="Go to Dashboard">
        <div>
          <h4>Go to Dashboard</h4>
          <p>Navigate to main workspace.</p>
        </div>
        <span>⌘+1</span>
      </button>
    </div>
  </div>
</div>`,

  sidebar: `<!-- Sidebar Navigation -->
<div class="sidebar">
  <nav class="sidebar-nav" aria-label="Main menu">
    <a href="#" class="sidebar-link active" title="Dashboard">
      <span class="sidebar-icon">📊</span>
      <span class="sidebar-label">Dashboard</span>
    </a>
    <a href="#" class="sidebar-link" title="Projects">
      <span class="sidebar-icon">📁</span>
      <span class="sidebar-label">Projects</span>
    </a>
  </nav>
</div>`,

  "notification-center": `<!-- Notification Trigger Button -->
<button class="control-btn" data-toggle-notifications aria-expanded="false">Show notifications</button>

<!-- Notification Panel -->
<div class="notification-panel">
  <div class="notification-item notification-item-success">
    <div class="notification-badge" aria-hidden="true"></div>
    <div class="notification-info">
      <h4>System Backup</h4>
      <p>Workspace backup complete.</p>
    </div>
    <button class="notification-dismiss" aria-label="Dismiss notification">✕</button>
  </div>
  <div class="notification-footer">
    <button data-clear-notifications>Clear all</button>
  </div>
</div>`,

  breadcrumb: `<!-- Navigation Breadcrumbs -->
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="#">Home</a>
  <span class="breadcrumb-separator" aria-hidden="true">/</span>
  <a href="#">Projects</a>
  <span class="breadcrumb-separator" aria-hidden="true">/</span>
  <span aria-current="page">Dashboard</span>
</nav>`,

  accordion: `<!-- Accordion Component -->
<div class="accordion" data-multi-expand="false">
  <div class="accordion-item">
    <button class="accordion-trigger" aria-expanded="false" aria-controls="panel-1">
      Item Title 1
      <span class="accordion-icon" aria-hidden="true">▼</span>
    </button>
    <div class="accordion-content" id="panel-1">
      <div class="accordion-content-inner">
        <div class="accordion-body">Panel content goes here...</div>
      </div>
    </div>
  </div>
</div>`,

  dropdown: `<!-- Single Select Dropdown -->
<div class="dropdown" id="dropdownExample">
  <button class="dropdown-trigger" aria-haspopup="listbox" aria-expanded="false">
    <span class="dropdown-label placeholder">Select an option…</span>
    <span class="dropdown-chevron" aria-hidden="true">▼</span>
  </button>
  <div class="dropdown-menu" role="listbox">
    <div class="dropdown-search">
      <input type="text" placeholder="Search…" aria-label="Search options">
    </div>
    <ul class="dropdown-options">
      <li class="dropdown-option" data-value="val1" role="option">Option 1</li>
      <li class="dropdown-option" data-value="val2" role="option">Option 2</li>
    </ul>
  </div>
</div>`,

  tooltip: `<!-- Tooltip Trigger wrapper -->
<div class="tooltip-wrapper" data-position="top">
  <button class="tooltip-trigger" aria-describedby="tooltip-item">Hover Me</button>
  <span class="tooltip" id="tooltip-item" role="tooltip">Dynamic hint text</span>
</div>`,

  badge: `<!-- Badge Labels -->
<span class="badge success dot">Success</span>
<span class="badge error outline">Beta</span>`,

  avatar: `<!-- Profile Avatars -->
<span class="avatar md">
  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User avatar">
</span>
<span class="avatar md">MD</span>`,

  progress: `<!-- Determinate Progress -->
<div class="progress-demo">
  <div class="progress-header">
    <span class="progress-label">Upload progress</span>
    <span class="progress-value">60%</span>
  </div>
  <div class="progress-track">
    <div class="progress-fill" style="width: 60%"></div>
  </div>
  <input type="range" class="progress-slider" min="0" max="100" value="60" aria-label="Upload slider">
</div>`,

  alert: `<!-- Dismissible Alert Alert -->
<div class="alert success" role="alert">
  <span class="alert-icon" aria-hidden="true">✓</span>
  <div class="alert-content">
    <div class="alert-title">Success alert</div>
    <div class="alert-message">Action was completed successfully.</div>
  </div>
  <button class="alert-close" aria-label="Dismiss alert">✕</button>
</div>`,

  "data-grid": `<!-- Data Grid Container -->
<div class="data-grid-container">
  <div class="data-grid-toolbar">
    <div class="data-grid-search">
      <input type="text" id="dgSearch" placeholder="Search rows..." aria-label="Search rows">
    </div>
    <div class="data-grid-actions">
      <div class="dg-dropdown" id="dgColDropdown">
        <button class="control-btn dg-dropdown-trigger" aria-haspopup="listbox" aria-expanded="false" id="dgColBtn">
          <span class="dg-dropdown-label">Columns</span>
          <span class="dg-dropdown-arrow">▼</span>
        </button>
        <div class="dg-dropdown-menu" role="listbox" aria-label="Toggle Columns"></div>
      </div>
    </div>
  </div>

  <div class="data-grid-wrapper" role="region" aria-label="Data Grid" tabindex="0">
    <table class="data-grid" id="dgTable" role="grid">
      <thead>
        <tr role="row"></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>

  <div class="data-grid-pagination">
    <div class="dg-page-size">
      <label for="dgPageSize">Rows per page:</label>
      <select id="dgPageSize" aria-label="Rows per page">
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="15">15</option>
      </select>
    </div>
    <div class="dg-pagination-info" id="dgPaginationInfo" aria-live="polite"></div>
    <div class="dg-pagination-controls">
      <button class="control-btn dg-pag-btn" id="dgFirstPage" aria-label="First page">«</button>
      <button class="control-btn dg-pag-btn" id="dgPrevPage" aria-label="Previous page">‹</button>
      <div class="dg-page-numbers" id="dgPageNumbers"></div>
      <button class="control-btn dg-pag-btn" id="dgNextPage" aria-label="Next page">›</button>
      <button class="control-btn dg-pag-btn" id="dgLastPage" aria-label="Last page">»</button>
    </div>
  </div>
</div>`
};

export const REACT_TEMPLATES = {
  "theme-toggle": `import React, { useState, useEffect } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className={\`theme-toggle \${theme === "dark" ? "dark" : ""}\`}
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Switch to dark theme"
      onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
    />
  );
}`,

  skeleton: `import React from "react";

export function SkeletonLoader({ layout = "social", animation = "shimmer" }) {
  return (
    <div className={\`skeleton-layout skeleton-\${layout} active\`} data-animation={animation}>
      <div className="social-card">
        <div className="skeleton avatar"></div>
        <div className="content">
          <div className="skeleton line w40"></div>
          <div className="skeleton line w20"></div>
        </div>
      </div>
      <div className="skeleton line"></div>
      <div className="skeleton line w80"></div>
      <div className="skeleton media"></div>
    </div>
  );
}`,

  toast: `import React, { useEffect } from "react";

export function Toast({ type = "success", message, onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={\`toast \${type}\`} role="alert">
      <span className="toast-icon">✓</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">✕</button>
      <div className="toast-progress" style={{ animationDuration: \`\${duration}ms\` }}></div>
    </div>
  );
}`,

  modal: `import React, { useEffect, useRef } from "react";

export function ModalWrapper({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      overlayRef.current?.querySelector(".modal-close")?.focus();
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="modal-overlay show"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}`,

  tabs: `import React, { useState } from "react";

export function Tabs({ items = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="tabs">
      <div role="tablist" aria-label="Navigation Tabs">
        {items.map((tab, idx) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeIdx === idx}
            tabIndex={activeIdx === idx ? 0 : -1}
            onClick={() => setActiveIdx(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {items.map((tab, idx) => (
        <div key={tab.id} role="tabpanel" hidden={activeIdx !== idx} className={activeIdx === idx ? "active" : ""}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}`,

  "command-palette": `import React, { useState, useEffect, useRef } from "react";

export function CommandPalette({ isOpen, onClose, commands = [], onExecute }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = commands.filter(cmd => cmd.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="command-palette show" role="dialog" onClick={onClose}>
      <div className="command-palette-panel" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search commands..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="command-palette-list">
          {filtered.map(cmd => (
            <button key={cmd} className="command-palette-item" onClick={() => onExecute(cmd)}>
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`,

  sidebar: `import React, { useState } from "react";

export function Sidebar({ links = [] }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={\`sidebar \${isCollapsed ? "collapsed" : ""}\`}>
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "→" : "←"}
      </button>
      <nav className="sidebar-nav">
        {links.map(link => (
          <a key={link.label} href={link.href} className="sidebar-link">
            <span className="sidebar-icon">{link.icon}</span>
            {!isCollapsed && <span className="sidebar-label">{link.label}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
}`,

  "notification-center": `import React, { useState } from "react";

export function NotificationCenter({ notifications = [], onDismiss, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="notification-center">
      <button aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>Show notifications</button>
      {isOpen && (
        <div className="notification-panel">
          {notifications.map(n => (
            <div key={n.id} className="notification-item">
              <p>{n.text}</p>
              <button onClick={() => onDismiss(n.id)}>✕</button>
            </div>
          ))}
          <button onClick={onClear}>Clear all</button>
        </div>
      )}
    </div>
  );
}`,

  breadcrumb: `import React from "react";

export function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          {idx > 0 && <span className="breadcrumb-separator">/</span>}
          {idx === items.length - 1 ? (
            <span aria-current="page">{item.label}</span>
          ) : (
            <a href={item.href}>{item.label}</a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}`,

  accordion: `import React, { useState } from "react";

export function Accordion({ items = [], allowMultiple = false }) {
  const [openIndices, setOpenIndices] = useState([]);

  const toggle = (idx) => {
    if (allowMultiple) {
      setOpenIndices(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    } else {
      setOpenIndices(prev => prev.includes(idx) ? [] : [idx]);
    }
  };

  return (
    <div className="accordion">
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div key={idx} className="accordion-item">
            <button aria-expanded={isOpen} onClick={() => toggle(idx)}>
              {item.title}
            </button>
            {isOpen && <div className="accordion-body">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}`,

  dropdown: `import React, { useState, useEffect, useRef } from "react";

export function DropdownWrapper({ options = [], value, isMulti = false, onChange, placeholder = "Select option..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);

  const selected = isMulti
    ? options.filter(o => Array.isArray(value) && value.includes(o.value))
    : options.find(o => o.value === value) || null;

  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  const handleSelect = (opt) => {
    if (isMulti) {
      const vals = Array.isArray(value) ? value : [];
      onChange(vals.includes(opt.value) ? vals.filter(v => v !== opt.value) : [...vals, opt.value]);
    } else {
      onChange(opt.value);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={\`dropdown \${isOpen ? "open" : ""}\`}>
      <button type="button" className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown-label">{isMulti ? \`\${selected.length} selected\` : (selected?.label || placeholder)}</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <input type="text" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
          <ul className="dropdown-options">
            {options.filter(o => o.label.toLowerCase().includes(query.toLowerCase())).map(o => (
              <li key={o.value} className="dropdown-option" onClick={() => handleSelect(o)}>{o.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`,

  tooltip: `import React, { useState } from "react";

export function Tooltip({ text, position = "top", children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      data-position={position}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && <span className="tooltip role-tooltip">{text}</span>}
    </div>
  );
}`,

  badge: `import React from "react";

export function Badge({ children, variant = "success", outline = false }) {
  return (
    <span className={\`badge \${variant} \${outline ? "outline" : "dot"}\`}>
      {children}
    </span>
  );
}`,

  avatar: `import React from "react";

export function Avatar({ src, initials, size = "md" }) {
  return (
    <span className={\`avatar \${size}\`}>
      {src ? <img src={src} alt="User profile" /> : initials}
    </span>
  );
}`,

  progress: `import React from "react";

export function ProgressBar({ value = 0, isIndeterminate = false }) {
  return (
    <div className="progress-demo">
      <div className="progress-track" style={{ width: "100%" }}>
        <div
          className={\`progress-fill \${isIndeterminate ? "indeterminate" : ""}\`}
          style={isIndeterminate ? {} : { width: \`\${value}%\` }}
        />
      </div>
    </div>
  );
}`,

  alert: `import React, { useState } from "react";

export function Alert({ title, message, variant = "info", onClose }) {
  return (
    <div className={\`alert \${variant}\`} role="alert">
      <span className="alert-icon">ℹ</span>
      <div className="alert-content">
        <div className="alert-title">{title}</div>
        <div className="alert-message">{message}</div>
      </div>
      {onClose && <button className="alert-close" onClick={onClose}>✕</button>}
    </div>
  );
}`,

  "data-grid": `import React, { useState, useMemo } from "react";

export function DataGrid({ data = [], columns = [] }) {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ col: null, dir: "asc" });
  const [visibleCols, setVisibleCols] = useState(columns.map(c => c.key));
  const [showColMenu, setShowColMenu] = useState(false);

  const processedData = useMemo(() => {
    let result = [...data];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(row =>
        Object.values(row).some(val => String(val).toLowerCase().includes(q))
      );
    }
    if (sort.col) {
      const colDef = columns.find(c => c.key === sort.col);
      const isAsc = sort.dir === "asc";
      const factor = isAsc ? 1 : -1;
      result.sort((a, b) => {
        let valA = a[sort.col];
        let valB = b[sort.col];
        if (colDef?.type === "number") return (valA - valB) * factor;
        return String(valA).localeCompare(String(valB)) * factor;
      });
    }
    return result;
  }, [data, search, sort, columns]);

  const totalPages = Math.ceil(processedData.length / pageSize) || 1;
  const paginatedData = processedData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    setSort(prev => ({
      col: key,
      dir: prev.col === key && prev.dir === "asc" ? "desc" : "asc"
    }));
    setPage(1);
  };

  return (
    <div className="data-grid-container">
      <div className="data-grid-toolbar">
        <input
          type="text"
          className="data-grid-search"
          placeholder="Search..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <div className="dg-dropdown">
          <button onClick={() => setShowColMenu(!showColMenu)} className="dg-dropdown-trigger">
            Columns <span>▼</span>
          </button>
          {showColMenu && (
            <div className="dg-dropdown-menu open">
              {columns.map(c => (
                <label key={c.key} className="dg-dropdown-item">
                  <input
                    type="checkbox"
                    checked={visibleCols.includes(c.key)}
                    onChange={() => {
                      setVisibleCols(prev => prev.includes(c.key) ? prev.filter(k => k !== c.key) : [...prev, c.key]);
                    }}
                  />
                  {c.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="data-grid-wrapper">
        <table className="data-grid">
          <thead>
            <tr>
              {columns.filter(c => visibleCols.includes(c.key)).map(c => (
                <th key={c.key} className="sortable" onClick={() => handleSort(c.key)}>
                  {c.label} {sort.col === c.key ? (sort.dir === "asc" ? "▲" : "▼") : "⇅"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr key={i}>
                {columns.filter(c => visibleCols.includes(c.key)).map(c => (
                  <td key={c.key}>{row[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`
};

export const ANGULAR_TEMPLATES = {
  "theme-toggle": `import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-theme-toggle",
  template: \`<button class="theme-toggle" (click)="toggleTheme()" [attr.aria-checked]="isDark"></button>\`
})
export class ThemeToggleComponent implements OnInit {
  isDark = false;

  ngOnInit() {
    this.isDark = localStorage.getItem("theme") === "dark";
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.toggle("dark", this.isDark);
    localStorage.setItem("theme", this.isDark ? "dark" : "light");
  }
}`,

  skeleton: `import { Component, Input } from "@angular/core";

@Component({
  selector: "app-skeleton",
  template: \`
    <div class="skeleton-layout skeleton-{{layout}} active" aria-busy="true">
      <div class="social-card">
        <div class="skeleton avatar"></div>
        <div class="content">
          <div class="skeleton line w40"></div>
          <div class="skeleton line w20"></div>
        </div>
      </div>
    </div>
  \`
})
export class SkeletonComponent {
  @Input() layout = "social";
}`,

  toast: `import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-toast",
  template: \`
    <div class="toast {{type}}" role="alert">
      <span class="toast-message">{{message}}</span>
      <button class="toast-close" (click)="close.emit()">✕</button>
      <div class="toast-progress" [style.animationDuration.ms]="duration"></div>
    </div>
  \`
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() type = "success";
  @Input() message = "";
  @Input() duration = 4000;
  @Output() close = new EventEmitter<void>();
  private timer: any;

  ngOnInit() {
    this.timer = setTimeout(() => this.close.emit(), this.duration);
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }
}`,

  modal: `import { Directive, ElementRef, HostListener, Input, OnDestroy } from "@angular/core";

@Directive({
  selector: "[mdevModalTarget]"
})
export class ModalTargetDirective implements OnDestroy {
  @Input("mdevModalTarget") targetSelector!: string;
  private overlay: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  @HostListener("click")
  onClick() {
    this.overlay = document.querySelector(this.targetSelector) as HTMLElement;
    if (this.overlay) {
      this.overlay.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = "";
  }
}`,

  tabs: `import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tabs",
  template: \`
    <div class="tabs">
      <div role="tablist">
        <button *ngFor="let tab of items; let idx = index" role="tab" [attr.aria-selected]="activeIdx === idx" (click)="activeIdx = idx">
          {{tab.label}}
        </button>
      </div>
      <div *ngFor="let tab of items; let idx = index" role="tabpanel" [class.active]="activeIdx === idx" [hidden]="activeIdx !== idx">
        {{tab.content}}
      </div>
    </div>
  \`
})
export class TabsComponent {
  @Input() items: Array<{label: string, content: string}> = [];
  activeIdx = 0;
}`,

  "command-palette": `import { Component, HostListener, Input } from "@angular/core";

@Component({
  selector: "app-command-palette",
  template: \`
    <div *ngIf="isOpen" class="command-palette show" role="dialog" (click)="close()">
      <div class="command-palette-panel" (click)="$event.stopPropagation()">
        <input type="search" placeholder="Search..." [(ngModel)]="query" />
        <button class="command-palette-item" *ngFor="let item of getFiltered()" (click)="select(item)">
          {{item}}
        </button>
      </div>
    </div>
  \`
})
export class CommandPaletteComponent {
  @Input() items: string[] = [];
  isOpen = false;
  query = "";

  @HostListener("document:keydown.escape")
  close() {
    this.isOpen = false;
  }

  getFiltered() {
    return this.items.filter(i => i.toLowerCase().includes(this.query.toLowerCase()));
  }

  select(item: string) {
    this.close();
  }
}`,

  sidebar: `import { Component, Input } from "@angular/core";

@Component({
  selector: "app-sidebar",
  template: \`
    <div class="sidebar" [class.collapsed]="isCollapsed">
      <button (click)="isCollapsed = !isCollapsed">Collapse</button>
      <nav class="sidebar-nav">
        <a *ngFor="let link of links" [href]="link.href" class="sidebar-link">
          {{link.label}}
        </a>
      </nav>
    </div>
  \`
})
export class SidebarComponent {
  @Input() links: Array<{label: string, href: string}> = [];
  isCollapsed = false;
}`,

  "notification-center": `import { Component, Input } from "@angular/core";

@Component({
  selector: "app-notification-center",
  template: \`
    <div class="notification-panel">
      <div *ngFor="let item of notifications" class="notification-item">
        <h4>{{item.title}}</h4>
        <p>{{item.text}}</p>
      </div>
    </div>
  \`
})
export class NotificationCenterComponent {
  @Input() notifications: Array<{title: string, text: string}> = [];
}`,

  breadcrumb: `import { Component, Input } from "@angular/core";

@Component({
  selector: "app-breadcrumb",
  template: \`
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ng-container *ngFor="let item of items; let last = last">
        <a *ngIf="!last" [href]="item.href">{{item.label}}</a>
        <span *ngIf="last" aria-current="page">{{item.label}}</span>
        <span *ngIf="!last" class="breadcrumb-separator">/</span>
      </ng-container>
    </nav>
  \`
})
export class BreadcrumbComponent {
  @Input() items: Array<{label: string, href?: string}> = [];
}`,

  accordion: `import { Component, Input } from "@angular/core";

@Component({
  selector: "app-accordion",
  template: \`
    <div class="accordion">
      <div *ngFor="let item of items; let idx = index" class="accordion-item">
        <button (click)="toggle(idx)">{{item.title}}</button>
        <div *ngIf="openIdx === idx" class="accordion-body">{{item.content}}</div>
      </div>
    </div>
  \`
})
export class AccordionComponent {
  @Input() items: Array<{title: string, content: string}> = [];
  openIdx = -1;

  toggle(idx: number) {
    this.openIdx = this.openIdx === idx ? -1 : idx;
  }
}`,

  dropdown: `import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "mdev-dropdown",
  template: \`
    <div class="dropdown" [class.open]="isOpen">
      <button class="dropdown-trigger" (click)="isOpen = !isOpen">
        <span class="dropdown-label">{{value || placeholder}}</span>
      </button>
      <div *ngIf="isOpen" class="dropdown-menu">
        <input type="text" placeholder="Search..." [(ngModel)]="query" />
        <ul class="dropdown-options">
          <li *ngFor="let opt of options" class="dropdown-option" (click)="select(opt)">{{opt.label}}</li>
        </ul>
      </div>
    </div>
  \`
})
export class DropdownComponent {
  @Input() options: Array<{value: string, label: string}> = [];
  @Input() placeholder = "Select option...";
  @Input() value = "";
  @Output() valueChange = new EventEmitter<string>();
  isOpen = false;
  query = "";

  select(opt: any) {
    this.value = opt.value;
    this.valueChange.emit(this.value);
    this.isOpen = false;
  }
}`,

  tooltip: `import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[mdevTooltip]"
})
export class TooltipDirective {
  @Input() mdevTooltip = "";

  constructor(private el: ElementRef) {}

  @HostListener("mouseenter")
  onMouseEnter() {
    // Show custom tooltip UI element
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    // Remove custom tooltip UI element
  }
}`,

  badge: `import { Component, Input } from "@angular/core";

@Component({
  selector: "app-badge",
  template: \`<span class="badge {{variant}} {{outline ? 'outline' : 'dot'}}"><ng-content></ng-content></span>\`
})
export class BadgeComponent {
  @Input() variant = "success";
  @Input() outline = false;
}`,

  avatar: `import { Component, Input } from "@angular/core";

@Component({
  selector: "app-avatar",
  template: \`
    <span class="avatar {{size}}">
      <img *ngIf="src" [src]="src" alt="User avatar" />
      <span *ngIf="!src">{{initials}}</span>
    </span>
  \`
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() initials = "";
  @Input() size = "md";
}`,

  progress: `import { Component, Input } from "@angular/core";

@Component({
  selector: "app-progressbar",
  template: \`
    <div class="progress-track" style="width: 100%">
      <div class="progress-fill" [style.width.%]="value"></div>
    </div>
  \`
})
export class ProgressbarComponent {
  @Input() value = 0;
}`,

  alert: `import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-alert",
  template: \`
    <div class="alert {{variant}}" role="alert">
      <div class="alert-content">
        <div class="alert-title">{{title}}</div>
        <div class="alert-message">{{message}}</div>
      </div>
      <button class="alert-close" (click)="close.emit()">✕</button>
    </div>
  \`
})
export class AlertComponent {
  @Input() variant = "info";
  @Input() title = "";
  @Input() message = "";
  @Output() close = new EventEmitter<void>();
}`,

  "data-grid": `// @ts-nocheck
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "mayvio-data-grid",
  template: \`
    <div class="data-grid-container">
      <div class="data-grid-toolbar">
        <input type="text" [(ngModel)]="searchQuery" (input)="filter()" placeholder="Search...">
      </div>
      <div class="data-grid-wrapper">
        <table class="data-grid">
          <thead>
            <tr>
              <th *ngFor="let col of visibleCols" (click)="sort(col.key)">
                {{col.label}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of paginatedData">
              <td *ngFor="let col of visibleCols">
                {{row[col.key]}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  \`
})
export class DataGridComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  searchQuery = "";
  visibleCols: any[] = [];
  paginatedData: any[] = [];

  ngOnInit() {
    this.visibleCols = this.columns;
    this.filter();
  }

  filter() {
    this.paginatedData = this.data.filter(row =>
      Object.values(row).some(val => String(val).toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }

  sort(key: string) {}
}`
};
