# Mayvio UI — Framework Integration Guide

Mayvio UI is built using clean vanilla HTML, CSS, and modular ES6 JavaScript. This zero-dependency architecture makes it simple to integrate into modern frontend frameworks such as **React** or **Angular**.

This document outlines the core patterns for wrapping vanilla scripts and styles in these framework environments.

---

## 🎨 Integrating Styling (CSS Variables)

Regardless of your framework, you must load the Mayvio UI theme variable declarations and stylesheets.

### Option A: Consolidated Import (Global)
Add the CSS import to your main application entrypoint (e.g., `index.js`, `main.ts`, `App.css`):
```css
/* In React App.css or Angular styles.css */
@import "mayvio-ui/styles/main.css";
```

### Option B: Modular Imports (Component-level)
If you are lazy-loading styles or only using select components, import the core theme stylesheet followed by individual component files:
```css
/* Core tokens and colors (Required) */
@import "mayvio-ui/styles/theme.css";
@import "mayvio-ui/styles/base.css";

/* Individual component styling */
@import "mayvio-ui/styles/components/modal.css";
@import "mayvio-ui/styles/components/dropdown.css";
```

---

## ⚛️ React Integration Strategy

Because React manages its own virtual DOM, wrapping vanilla DOM manipulation requires using:
1. **`useRef`**: To get a stable reference to the underlying native DOM nodes.
2. **`useEffect`**: To initialize the vanilla handlers on component mount, and cleanly remove listeners on component unmount.

### Core Wrapping Pattern
```jsx
import React, { useEffect, useRef } from 'react';
import { initAccordion } from 'mayvio-ui/scripts/components/accordion.js';

export function Accordion() {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize component behavior on the DOM elements
    const cleanup = initAccordion(containerRef.current);
    
    // 2. Clean up event listeners on component unmount
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="accordion">
      {/* HTML structure here */}
    </div>
  );
}
```

*For complete React examples, see [examples/react-integration/](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/examples/react-integration/).*

---

## 🅰️ Angular Integration Strategy

In Angular, you integrate vanilla components using **Components** or **Attribute Directives**. You query DOM elements using `@ViewChild` or get them injected via `ElementRef`.

### Strategy A: Attribute Directives (Best for trigger actions)
Attribute directives are ideal for trigger buttons (e.g. launching a Modal on click, or attaching a Tooltip):
```typescript
import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { initTooltip } from 'mayvio-ui/scripts/components/tooltip.js';

@Directive({
  selector: '[mayvioTooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() mayvioTooltip: string;
  private destroyFn: () => void;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Initialize tooltip script passing the button element ref
    this.destroyFn = initTooltip(this.el.nativeElement, {
      text: this.mayvioTooltip
    });
  }

  ngOnDestroy() {
    // Tear down listeners
    if (this.destroyFn) {
      this.destroyFn();
    }
  }
}
```

### Strategy B: Component Wrapper (Best for self-contained UI)
Wrap the entire HTML template inside an Angular component and control logic in `AfterViewInit`:
```typescript
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { initTabs } from 'mayvio-ui/scripts/components/tabs.js';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tabsContainer') tabsContainer!: ElementRef;
  private cleanupTabs?: () => void;

  ngAfterViewInit() {
    this.cleanupTabs = initTabs(this.tabsContainer.nativeElement);
  }

  ngOnDestroy() {
    if (this.cleanupTabs) {
      this.cleanupTabs();
    }
  }
}
```

*For complete Angular examples, see [examples/angular-integration/](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/examples/angular-integration/).*
