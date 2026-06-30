(function () {
  "use strict";

  const html = document.documentElement;
  const loader = document.querySelector(".site-loader");
  const navbar = document.querySelector(".navbar");
  const progress = document.querySelector(".scroll-progress");
  const backToTop = document.querySelector(".back-to-top");
  const cursor = document.querySelector(".custom-cursor");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const storedTheme = localStorage.getItem("ps-theme");

  if (storedTheme) {
    html.setAttribute("data-theme", storedTheme);
  }

  window.addEventListener("load", function () {
    if (loader) loader.classList.add("is-hidden");
  });

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (navbar) navbar.classList.toggle("scrolled", scrollTop > 24);
    if (progress) progress.style.width = height > 0 ? `${(scrollTop / height) * 100}%` : "0%";
    if (backToTop) backToTop.classList.toggle("show", scrollTop > 520);
  }

  document.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      localStorage.setItem("ps-theme", next);
      themeToggle.innerHTML = next === "dark" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    });
  }

  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", function (event) {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });
  }

  document.querySelectorAll(".btn-premium, .btn-ghost").forEach(function (button) {
    button.addEventListener("click", function (event) {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      ripple.style.cssText = `
        position:absolute; width:18px; height:18px; border-radius:50%;
        left:${event.clientX - rect.left}px; top:${event.clientY - rect.top}px;
        background:rgba(255,255,255,.55); transform:translate(-50%,-50%) scale(1);
        animation:ripple .55s ease-out forwards; pointer-events:none;`;
      button.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 560);
    });
  });

  if (!document.getElementById("ripple-style")) {
    const style = document.createElement("style");
    style.id = "ripple-style";
    style.textContent = "@keyframes ripple{to{opacity:0;transform:translate(-50%,-50%) scale(14)}}";
    document.head.appendChild(style);
  }

  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 80 });
  }

  if (window.Typed && document.querySelector("[data-typed]")) {
    new Typed("[data-typed]", {
      strings: ["market knowledge", "risk awareness", "confident decisions", "practical learning"],
      typeSpeed: 55,
      backSpeed: 28,
      backDelay: 1600,
      loop: true
    });
  }

  const CountUpCtor = (window.CountUp && window.CountUp.CountUp) || (window.countUp && window.countUp.CountUp);
  if (CountUpCtor) {
    const counters = document.querySelectorAll("[data-count]");
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.target.dataset.done) return;
        entry.target.dataset.done = "true";
        const end = Number(entry.target.dataset.count);
        const suffix = entry.target.dataset.suffix || "";
        const counter = new CountUpCtor(entry.target, end, { suffix, duration: 2.2 });
        if (!counter.error) counter.start();
      });
    }, { threshold: 0.35 });
    counters.forEach(function (counter) { observer.observe(counter); });
  }

  if (window.Swiper && document.querySelector(".testimonial-swiper")) {
    new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 3600, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }
})();
