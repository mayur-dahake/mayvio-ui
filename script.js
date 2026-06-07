const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener(
  "click",
  () => {

    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");

    themeToggle.textContent =
      isDark
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );
  }
);

if(
  localStorage.getItem("theme")
  === "dark"
){
  document.body.classList.add("dark");
  themeToggle.textContent =
    "☀️ Light Mode";
}