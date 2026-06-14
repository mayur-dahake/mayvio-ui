# Activity Timeline

The **Activity Timeline** is a pure-CSS layout showing vertical chronological feeds of events and updates.

---

## 📂 File Requirements
* **CSS:** [activity-timeline.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/activity-timeline.css)
* **JS:** Pure CSS layout. No JavaScript required.

---

## 🧱 HTML Template
```html
<div class="timeline">
  <!-- Timeline Item -->
  <div class="timeline-item">
    <!-- Status badge colors: primary, success, warning, error, info -->
    <div class="timeline-badge success" aria-hidden="true"></div>
    <div class="timeline-content">
      <div class="timeline-header">
        <h4 class="timeline-title">Project Deployed</h4>
        <span class="timeline-time">2 mins ago</span>
      </div>
      <p class="timeline-desc">Build succeeded and assets pushed to NPM registry.</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-badge info" aria-hidden="true"></div>
    <div class="timeline-content">
      <div class="timeline-header">
        <h4 class="timeline-title">Task Updated</h4>
        <span class="timeline-time">1 hour ago</span>
      </div>
      <p class="timeline-desc">Completed wrappers parity development.</p>
    </div>
  </div>
</div>
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--card` | `#ffffff` | Background of timeline details box. |
| `--border` | `#e2e8f0` | Border dividers and vertical tracking line. |
| `--text` | `#0f172a` | Header title typography color. |
| `--text-muted` | `#64748b` | Subtitle and time stamps color. |

---

## 🔌 Framework Quick Start

### React
```jsx
import { ActivityTimeline, ActivityTimelineItem } from "@mayvio-ui/react";

<ActivityTimeline>
  <ActivityTimelineItem status="success" title="System Check" time="Just now">
    All systems are fully operational.
  </ActivityTimelineItem>
</ActivityTimeline>
```

### Angular
```html
<mayvio-activity-timeline>
  <mayvio-activity-timeline-item status="success" title="System Check" time="Just now">
    All systems are fully operational.
  </mayvio-activity-timeline-item>
</mayvio-activity-timeline>
```
