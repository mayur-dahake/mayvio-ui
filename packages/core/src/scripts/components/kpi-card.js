/**
 * KPI Cards Initializer
 * Animates counter numbers smoothly on elements entering the viewport.
 */
export function initKpiCards() {
  const values = document.querySelectorAll(".kpi-card-value[data-value]");

  const animateCounter = (element) => {
    const target = parseFloat(element.getAttribute("data-value"));
    if (isNaN(target)) return;

    const duration = parseInt(element.getAttribute("data-duration"), 10) || 1500;
    const decimals = parseInt(element.getAttribute("data-decimals"), 10) || 0;
    const prefix = element.getAttribute("data-prefix") || "";
    const suffix = element.getAttribute("data-suffix") || "";

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // easeOutQuad easing
      const easedProgress = progress * (2 - progress);
      const currentValue = easedProgress * target;

      element.textContent = prefix + currentValue.toFixed(decimals) + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  values.forEach((val) => observer.observe(val));
}
