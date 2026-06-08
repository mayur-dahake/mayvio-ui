import "mayvio-ui/css";

import {
  initThemeToggle,
  initSkeleton,
  initToast,
  initModal,
  initTabs,
  initAccordion,
  initDropdowns,
  initProgress,
  initAlerts,
  initCommandPalette,
  initSidebar,
  initNotificationCenter,
  initBreadcrumb,
  initDataGrid,
  initMultiSelect,
  initDatePicker,
  initFileUpload
} from "mayvio-ui";

import { initCopyButtons, initSnippetTabs } from "./copy.js";
import { initCodeViewer } from "./code-viewer.js";
import { initDocsViewer } from "./docs-viewer.js";

function initStats() {
  const statValues = document.querySelectorAll("[data-count]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        let current = 0;
        const step = Math.max(Math.ceil(target / 30), 1);

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 30);

        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  statValues.forEach((el) => observer.observe(el));
}

function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSkeleton();
  initToast();
  initModal();
  initTabs();
  initAccordion();
  initDropdowns();
  initProgress();
  initAlerts();
  initCommandPalette();
  initSidebar();
  initNotificationCenter();
  initBreadcrumb();
  initDataGrid();
  initMultiSelect();
  initDatePicker();
  initFileUpload();
  initCopyButtons();
  initSnippetTabs();
  initCodeViewer();
  initDocsViewer();
  initStats();
  initSmoothNav();
});
