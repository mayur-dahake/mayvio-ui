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

## ⚛️ React Integration

You can install and use our pre-built React components directly in your project.

### 1. Installation
Install the core CSS package and the React wrapper:
```bash
npm install mayvio-ui @mayvio-ui/react
```

### 2. Import Styles
Import the library styles in your main entry file (e.g. `index.js`, `main.tsx` or `App.css`):
```javascript
import "mayvio-ui/css";
```

### 3. Usage Example
Use components directly with standard React properties:
```jsx
import React, { useState } from 'react';
import { DataGrid, DatePicker, Modal } from '@mayvio-ui/react';

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const columns = [
    { key: "name", label: "Name", type: "string", sortable: true },
    { key: "role", label: "Role", type: "string", sortable: true }
  ];

  const data = [
    { name: "Mayur Dahake", role: "Frontend Developer" },
    { name: "Jane Smith", role: "UI Designer" }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>My Workspace Dashboard</h1>
      
      <DatePicker onChange={setSelectedDate} />
      
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Dashboard Action">
        <p>Selected Date: {selectedDate}</p>
      </Modal>

      <DataGrid initialData={data} columns={columns} />
    </div>
  );
}
```

---

## 🅰️ Angular Integration

You can import and use our pre-built Angular modules directly in your project.

### 1. Installation
Install the core CSS package and the Angular wrapper:
```bash
npm install mayvio-ui @mayvio-ui/angular
```

### 2. Import Styles
Add the core CSS to your `angular.json` styles configuration, or import it in your global `styles.css`:
```css
/* In styles.css */
@import "mayvio-ui/css";
```

### 3. Import Module
Import the `MayvioUIModule` in your AppModule (`app.module.ts`) or component imports array:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MayvioUIModule } from '@mayvio-ui/angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MayvioUIModule // Import module
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 4. Template Usage
Use the pre-registered tags and directives in your templates:
```html
<!-- Data Grid -->
<mayvio-data-grid [initialData]="data" [columns]="columns"></mayvio-data-grid>

<!-- Date Picker -->
<mayvio-date-picker rangeMode="true" (dateSelected)="onDateSelect($event)"></mayvio-date-picker>

<!-- Modal Trigger Directive -->
<button [mayvioModalTarget]="'#modalOverlay'">Open Modal</button>

<div class="modal-overlay" id="modalOverlay" aria-hidden="true" role="dialog">
  <div class="modal">
    <div class="modal-header">
      <h3>Modal Title</h3>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body">
      Modal content here...
    </div>
  </div>
</div>
```
