import { initThemeToggle } from "./components/theme-toggle.js";
import { initSkeleton } from "./components/skeleton.js";
import { initToast } from "./components/toast.js";
import { initModal } from "./components/modal.js";
import { initTabs } from "./components/tabs.js";
import { initAccordion } from "./components/accordion.js";
import { initDropdowns } from "./components/dropdown.js";
import { initProgress } from "./components/progress.js";
import { initAlerts } from "./components/alert.js";
import { initCommandPalette } from "./components/command-palette.js";
import { initSidebar } from "./components/sidebar.js";
import { initNotificationCenter } from "./components/notification-center.js";
import { initBreadcrumb } from "./components/breadcrumb.js";
import { initCopyButtons, initSnippetTabs } from "./copy.js";

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
  initCopyButtons();
  initSnippetTabs();
  initStats();
  initSmoothNav();
});
