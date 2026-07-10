import "mayvio-ui/styles/main.css";
import "mayvio-ui/modal/css";
import "mayvio-ui/dropdown/css";

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


/**
 * Phase 4 — BEM-based mv-modal and mv-dropdown demos
 * These are pure CSS+JS demos using the new `mv-*` CSS classes produced by the core package.
 */
function initPhase4Components() {
  // ── mv-modal ────────────────────────────────────────────────────────────────
  function openMvModal(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (!overlay) return;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('mv-modal-overlay--open');
    document.body.style.overflow = 'hidden';

    // Close on backdrop click
    overlay.addEventListener('mousedown', function handleBackdrop(e) {
      if (e.target === overlay) {
        closeMvModal(overlay);
        overlay.removeEventListener('mousedown', handleBackdrop);
      }
    });

    // Close on Escape
    function handleEsc(e) {
      if (e.key === 'Escape') {
        closeMvModal(overlay);
        document.removeEventListener('keydown', handleEsc);
      }
    }
    document.addEventListener('keydown', handleEsc);
  }

  function closeMvModal(overlay) {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('mv-modal-overlay--open');
    document.body.style.overflow = '';
  }

  // Wire up open buttons
  const mvModalMap = {
    'mvOpenModalSm': 'mvModalSmOverlay',
    'mvOpenModalMd': 'mvModalMdOverlay',
    'mvOpenModalLg': 'mvModalLgOverlay',
  };
  Object.entries(mvModalMap).forEach(([btnId, overlayId]) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.addEventListener('click', () => openMvModal(overlayId));
  });

  // Wire up close buttons (data-mv-modal-close)
  document.querySelectorAll('[data-mv-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.mv-modal-overlay');
      if (overlay) closeMvModal(overlay);
    });
  });

  // ── mv-dropdown ─────────────────────────────────────────────────────────────
  function initMvDropdown(triggerId, menuId) {
    const trigger = document.getElementById(triggerId);
    const menu = document.getElementById(menuId);
    if (!trigger || !menu) return;

    function openMenu() {
      menu.classList.add('mv-dropdown-menu--open');
      menu.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      menu.classList.remove('mv-dropdown-menu--open');
      menu.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function isOpen() {
      return menu.classList.contains('mv-dropdown-menu--open');
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen() ? closeMenu() : openMenu();
    });

    // Close items on click
    menu.querySelectorAll('.mv-dropdown-item:not([disabled])').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) closeMenu();
    });
  }

  initMvDropdown('demoDropdownLeftTrigger', 'demoDropdownLeftMenu');
  initMvDropdown('demoDropdownRightTrigger', 'demoDropdownRightMenu');

  // ── mv-multiselect ────────────────────────────────────────────────────────
  function initMvMultiSelect(triggerId, menuId, inputId, tagsId) {
    const trigger = document.getElementById(triggerId);
    const menu = document.getElementById(menuId);
    const input = document.getElementById(inputId);
    const tags = document.getElementById(tagsId);
    if (!trigger || !menu) return;

    const options = ['React', 'Angular', 'Vue', 'Svelte'];
    let selected = ['React', 'Angular'];

    function renderTags() {
      tags.innerHTML = selected.map(s => 
        `<span class="mv-multiselect-tag">${s} <span class="mv-multiselect-tag-close" data-val="${s}">×</span></span>`
      ).join('');
      tags.querySelectorAll('.mv-multiselect-tag-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          selected = selected.filter(v => v !== btn.getAttribute('data-val'));
          renderTags();
        });
      });
    }

    function renderMenu() {
      menu.innerHTML = options.map(opt => {
        const isSelected = selected.includes(opt);
        return `<div class="mv-multiselect-item ${isSelected ? 'mv-multiselect-item--selected' : ''}" data-val="${opt}">
          <input type="checkbox" ${isSelected ? 'checked' : ''} style="pointer-events:none;"> ${opt}
        </div>`;
      }).join('');
      menu.querySelectorAll('.mv-multiselect-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = item.getAttribute('data-val');
          if (selected.includes(val)) {
            selected = selected.filter(v => v !== val);
          } else {
            selected.push(val);
          }
          renderTags();
          renderMenu();
        });
      });
    }

    function toggleMenu() {
      const isOpen = menu.classList.contains('mv-multiselect-menu--open');
      if (isOpen) {
        menu.classList.remove('mv-multiselect-menu--open');
        trigger.classList.remove('mv-multiselect-trigger--active');
      } else {
        menu.classList.add('mv-multiselect-menu--open');
        trigger.classList.add('mv-multiselect-trigger--active');
      }
    }

    trigger.addEventListener('click', toggleMenu);
    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('mv-multiselect-menu--open');
        trigger.classList.remove('mv-multiselect-trigger--active');
      }
    });

    renderTags();
    renderMenu();
  }
  initMvMultiSelect('demoMultiSelect', 'demoMultiSelectMenu', 'demoMultiSelectInput', 'demoMultiSelectTags');

  // ── mv-datepicker ────────────────────────────────────────────────────────
  function initMvDatePicker(triggerId, popupId, inputId) {
    const trigger = document.getElementById(triggerId);
    const popup = document.getElementById(popupId);
    const input = document.getElementById(inputId);
    if (!trigger || !popup || !input) return;

    popup.innerHTML = `<div style="padding: 1rem; text-align: center;">Calendar Demo<br><small style="color:var(--text-muted)">Interactive calendar omitted for simplicity</small></div>`;

    trigger.addEventListener('click', () => {
      popup.classList.toggle('mv-datepicker-popup--open');
      trigger.classList.toggle('mv-datepicker-trigger--active');
    });

    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !popup.contains(e.target)) {
        popup.classList.remove('mv-datepicker-popup--open');
        trigger.classList.remove('mv-datepicker-trigger--active');
      }
    });
  }
  initMvDatePicker('demoDatePicker', 'demoDatePickerPopup', 'demoDatePickerInput');

  // ── mv-commandpalette ────────────────────────────────────────────────────
  const cpBtn = document.getElementById('demoCommandPaletteBtn');
  const cpOverlay = document.getElementById('demoCommandPaletteOverlay');
  const cpBody = document.getElementById('demoCommandPaletteBody');
  if (cpBtn && cpOverlay && cpBody) {
    cpBtn.addEventListener('click', () => {
      cpOverlay.style.display = 'flex';
      cpBody.innerHTML = `
        <div class="mv-commandpalette-group">
          <div class="mv-commandpalette-group-heading">Navigation</div>
          <div class="mv-commandpalette-item">Dashboard</div>
          <div class="mv-commandpalette-item">Settings</div>
        </div>
      `;
    });
    cpOverlay.addEventListener('click', (e) => {
      if (e.target === cpOverlay) cpOverlay.style.display = 'none';
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cpOverlay.style.display = 'none';
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        cpBtn.click();
      }
    });
  }

  // ── mv-notificationcenter ────────────────────────────────────────────────
  const ncTrigger = document.getElementById('demoNCTrigger');
  const ncPopup = document.getElementById('demoNCPopup');
  const ncBody = document.getElementById('demoNCBody');
  const ncClear = document.getElementById('demoNCClear');
  const ncBadge = document.getElementById('demoNCBadge');
  if (ncTrigger && ncPopup && ncBody) {
    let notifs = ['Welcome to Mayvio UI!', 'Version 4.0 is ready.'];
    const renderNotifs = () => {
      ncBadge.textContent = notifs.length;
      ncBadge.style.display = notifs.length ? 'flex' : 'none';
      if (!notifs.length) {
        ncBody.innerHTML = `<div style="padding:1rem;text-align:center;color:var(--text-muted);">No new notifications</div>`;
        return;
      }
      ncBody.innerHTML = notifs.map(n => `<div class="mv-notificationcenter-item"><div class="mv-notificationcenter-item-title">${n}</div></div>`).join('');
    };
    renderNotifs();

    ncTrigger.addEventListener('click', () => {
      ncPopup.classList.toggle('mv-notificationcenter-popup--open');
    });
    ncClear.addEventListener('click', () => {
      notifs = [];
      renderNotifs();
    });
    document.addEventListener('click', (e) => {
      if (!ncTrigger.contains(e.target) && !ncPopup.contains(e.target)) {
        ncPopup.classList.remove('mv-notificationcenter-popup--open');
      }
    });
  }

  // ── mv-sidebar ───────────────────────────────────────────────────────────
  const sidebar = document.getElementById('demoSidebar');
  const sidebarToggle = document.getElementById('demoSidebarToggle');
  const sidebarNav = document.getElementById('demoSidebarNav');
  if (sidebar && sidebarToggle && sidebarNav) {
    sidebarNav.innerHTML = `
      <a href="#" class="mv-sidebar-link"><span class="mv-sidebar-link-icon">🏠</span><span class="mv-sidebar-link-label">Home</span></a>
      <a href="#" class="mv-sidebar-link"><span class="mv-sidebar-link-icon">⚙️</span><span class="mv-sidebar-link-label">Settings</span></a>
    `;
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mv-sidebar--collapsed');
    });
  }

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
  initPhase4Components(); // Phase 4: mv-modal, mv-dropdown
});

