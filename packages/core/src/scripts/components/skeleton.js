const LAYOUTS = {
  social: `
    <div class="skeleton-layout skeleton-social active">
      <div class="social-card">
        <div class="skeleton avatar"></div>
        <div class="content">
          <div class="skeleton line w40"></div>
          <div class="skeleton line w20"></div>
        </div>
      </div>
      <div class="skeleton line"></div>
      <div class="skeleton line w80"></div>
      <div class="skeleton media"></div>
    </div>
  `,
  dashboard: `
    <div class="skeleton-layout skeleton-dashboard active">
      <div class="dash-stats">
        <div class="skeleton card-block"></div>
        <div class="skeleton card-block"></div>
        <div class="skeleton card-block"></div>
      </div>
      <div class="dash-charts">
        <div class="skeleton block" style="height:160px"></div>
        <div class="skeleton block" style="height:160px"></div>
      </div>
    </div>
  `,
  profile: `
    <div class="skeleton-layout skeleton-profile active">
      <div class="skeleton profile-avatar"></div>
      <div class="profile-lines">
        <div class="skeleton line w40" style="margin:0 auto 10px"></div>
        <div class="skeleton line w60" style="margin:0 auto"></div>
      </div>
      <div class="profile-grid">
        <div class="skeleton block"></div>
        <div class="skeleton block"></div>
        <div class="skeleton block"></div>
      </div>
    </div>
  `,
  table: `
    <div class="skeleton-layout skeleton-table active">
      <div class="table-header">
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
      </div>
      <div class="table-row">
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
      </div>
      <div class="table-row">
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
      </div>
      <div class="table-row">
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
        <div class="skeleton line"></div>
      </div>
    </div>
  `,
};

let currentAnimation = "shimmer";

function applyAnimation(type) {
  currentAnimation = type;
  document.querySelectorAll(".skeleton").forEach((el) => {
    el.classList.remove("shimmer", "wave", "pulse");
    el.classList.add(type);
  });
}

function renderLayout(layout) {
  const demo = document.getElementById("skeletonDemo");
  if (!demo) return;

  demo.innerHTML = LAYOUTS[layout] || LAYOUTS.social;
  applyAnimation(currentAnimation);
}

export function initSkeleton() {
  const animationButtons = document.querySelectorAll("[data-animation]");
  const layoutButtons = document.querySelectorAll("[data-layout]");

  renderLayout("social");
  applyAnimation("shimmer");

  animationButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-animation]").forEach((b) => {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      applyAnimation(btn.dataset.animation);
    });
  });

  layoutButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-layout]").forEach((b) => {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      renderLayout(btn.dataset.layout);
    });
  });
}
