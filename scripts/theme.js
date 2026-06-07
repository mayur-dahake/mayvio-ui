export function initTheme() {
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    toggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    toggle.setAttribute("aria-pressed", String(isDark));
  }

  toggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    applyTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  if (localStorage.getItem("theme") === "dark") {
    applyTheme(true);
  }
}
