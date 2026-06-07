export function initTheme() {
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    toggle.classList.toggle("is-dark", isDark);
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }

  toggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    applyTheme(isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {
      // ignore
    }
  });

  // initialize from localStorage or system preference
  const saved = localStorage.getItem("theme");
  if (saved === "dark") applyTheme(true);
  else if (saved === "light") applyTheme(false);
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) applyTheme(true);
}
