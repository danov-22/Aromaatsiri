/* ===================================================
   Aroma Atsiri — Main JavaScript
   Plain vanilla JS. Organized by feature.
   =================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initYoutubePreview();
  initProductTabs();
  initActiveNavLink();
});

/* ---------- Sticky header on scroll ---------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
}

/* ---------- Mobile hamburger menu ---------- */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    toggle.classList.toggle("open");
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      toggle.classList.remove("open");
      nav.classList.remove("open");
    });
  });
}

/* ---------- Highlight current page in nav ---------- */
function initActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const linkPath = link.getAttribute("href");
    if (linkPath === path || (path === "" && linkPath === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* ---------- Scroll reveal animation ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
}

/* ---------- YouTube click-to-play preview ---------- */
function initYoutubePreview() {
  const wrap = document.querySelector(".video-wrap");
  if (!wrap) return;

  const videoId = wrap.getAttribute("data-video-id");
  if (!videoId) return;

  wrap.addEventListener("click", function () {
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0";
    iframe.title = "Aroma Atsiri video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    wrap.innerHTML = "";
    wrap.appendChild(iframe);
  });
}

/* ---------- Product category tabs (Products page) ---------- */
function initProductTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const categories = document.querySelectorAll(".item-category");
  if (!tabs.length || !categories.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const target = tab.getAttribute("data-target");

      tabs.forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");

      categories.forEach(function (cat) {
        if (cat.id === target) {
          cat.classList.add("active");
        } else {
          cat.classList.remove("active");
        }
      });
    });
  });
}
