// Header solid background on scroll
const header = document.getElementById("siteHeader");

function onScroll() {
  if (!header) return;
  if (window.scrollY > 30) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}
window.addEventListener("scroll", onScroll);
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function openMenu() {
  if (!navLinks || !navToggle) return;
  navLinks.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close menu");
}

function closeMenu() {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
}

function toggleMenu() {
  if (!navLinks) return;
  const isOpen = navLinks.classList.contains("open");
  if (isOpen) closeMenu();
  else openMenu();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu after clicking a link
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    const clickedToggle = navToggle.contains(e.target);
    const clickedMenu = navLinks.contains(e.target);
    if (!clickedToggle && !clickedMenu) closeMenu();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // If resizing to desktop, ensure menu isn't stuck open
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "Gallery image";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".shot").forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const full = btn.getAttribute("data-full") || (img ? img.src : "");
    openLightbox(full, img ? img.alt : "");
  });
});

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
