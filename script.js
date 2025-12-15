// Header solid background on scroll
const header = document.getElementById("siteHeader");

function onScroll() {
  if (window.scrollY > 30) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}
window.addEventListener("scroll", onScroll);
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a link
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
