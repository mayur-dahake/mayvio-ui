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

const animationButtons =
document.querySelectorAll(
  ".animation-btn"
);

const skeletons =
document.querySelectorAll(
  ".skeleton"
);

function applyAnimation(type){

  skeletons.forEach(el => {

    el.classList.remove(
      "shimmer",
      "wave",
      "pulse"
    );

    el.classList.add(type);

  });
}

applyAnimation("shimmer");

animationButtons.forEach(btn => {

  btn.addEventListener(
    "click",
    () => {

      animationButtons.forEach(
        b => b.classList.remove("active")
      );

      btn.classList.add("active");

      applyAnimation(
        btn.dataset.animation
      );
    }
  );
});


const toastContainer =
document.getElementById(
  "toastContainer"
);

document
  .querySelectorAll(".toast-btn")
  .forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        createToast(
          btn.classList[1]
        );

      }
    );

});

function createToast(type){

  const messages = {

    success:
      "Data saved successfully",

    error:
      "Something went wrong",

    warning:
      "Check your input",

    info:
      "New update available"

  };

  const icons = {

    success:"✓",
    error:"✕",
    warning:"⚠",
    info:"ℹ"

  };

  const toast =
    document.createElement("div");

  toast.className =
    `toast ${type}`;

  toast.innerHTML = `
    <span>${icons[type]}</span>
    <span>${messages[type]}</span>
    <div class="toast-progress"></div>
  `;

  toastContainer.appendChild(
    toast
  );

  setTimeout(() => {

    toast.style.animation =
      "slideOut .3s ease forwards";

    setTimeout(() => {

      toast.remove();

    },300);

  },4000);
}