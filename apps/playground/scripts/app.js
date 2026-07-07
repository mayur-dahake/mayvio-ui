import "mayvio-ui/styles/main.css";

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
  initFileUpload,
  initKpiCards,
  MayvioChart,
  initDashboardWidgets
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

function initDemoCharts() {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      { label: "Sales", data: [35, 50, 40, 75, 60, 90], color: "var(--primary)" },
      { label: "Costs", data: [20, 25, 30, 45, 35, 50], color: "var(--warning)" }
    ]
  };

  const barData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      { label: "Direct", data: [40, 60, 55, 80], color: "var(--primary)" },
      { label: "Referral", data: [25, 35, 45, 50], color: "var(--success)" }
    ]
  };

  const donutData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        label: "Device share",
        data: [550, 320, 130],
        colors: ["var(--primary)", "var(--success)", "var(--warning)"]
      }
    ]
  };

  const chartEl = document.getElementById("demoChart");
  if (!chartEl) return;

  let activeChart = new MayvioChart("#demoChart", { type: "line", data: lineData });

  const toggles = document.querySelectorAll("[data-chart-toggle]");
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      toggles.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.getAttribute("data-chart-toggle");
      let data = lineData;
      if (type === "bar") data = barData;
      else if (type === "donut") data = donutData;

      activeChart = new MayvioChart("#demoChart", { type, data });
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
  initKpiCards();
  initDashboardWidgets("#demoWidgetGrid");
  initDemoCharts();
  initCopyButtons();
  initSnippetTabs();
  initCodeViewer();
  initDocsViewer();
  initStats();
  initSmoothNav();
});

