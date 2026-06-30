(function () {
  "use strict";

  if (!window.gsap) return;

  gsap.from(".hero-title", { y: 34, opacity: 0, duration: 0.9, ease: "power3.out" });
  gsap.from(".hero-copy", { y: 24, opacity: 0, duration: 0.9, delay: 0.15, ease: "power3.out" });
  gsap.from(".chart-panel", { y: 38, opacity: 0, duration: 1, delay: 0.25, ease: "power3.out" });

  document.querySelectorAll("[data-tilt]").forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateY: x * 5, rotateX: y * -5, transformPerspective: 800, duration: 0.25 });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.35 });
    });
  });
})();
