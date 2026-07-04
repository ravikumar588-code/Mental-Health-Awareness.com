const loader = document.getElementById("loader");
const navMenu = document.getElementById("navMenu");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".nav-link");
const scrollProgress = document.getElementById("scrollProgress");
const fab = document.getElementById("fab");
const themeToggle = document.getElementById("themeToggle");
const particles = document.getElementById("particles");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 450);
});

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

const navSectionIds = [...navLinks].map((link) => link.getAttribute("href").slice(1));
const sections = navSectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
  fab.classList.toggle("show", scrollTop > 500);

  let current = "home";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollTop >= sectionTop) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

fab.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀" : "☾";
  localStorage.setItem("mindcare-theme", isDark ? "dark" : "light");
});

if (localStorage.getItem("mindcare-theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const signalOptions = document.querySelectorAll(".signal-option");
const signalIcon = document.getElementById("signalIcon");
const signalTitle = document.getElementById("signalTitle");
const signalSigns = document.getElementById("signalSigns");
const signalReason = document.getElementById("signalReason");
const signalAction = document.getElementById("signalAction");

signalOptions.forEach((option) => {
  option.addEventListener("click", () => {
    signalOptions.forEach((item) => item.classList.remove("active"));
    option.classList.add("active");
    signalIcon.textContent = option.dataset.icon;
    signalTitle.textContent = option.dataset.title;
    signalSigns.textContent = option.dataset.signs;
    signalReason.textContent = option.dataset.reason;
    signalAction.textContent = option.dataset.action;
  });
});

const habitCards = document.querySelectorAll(".habit-card");
const habitInfoPanel = document.createElement("article");
habitInfoPanel.className = "habit-info-panel searchable";
habitInfoPanel.setAttribute("aria-live", "polite");

habitCards.forEach((card) => {
  card.addEventListener("click", () => {
    habitCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    habitInfoPanel.innerHTML = `
      <span>Habit Information</span>
      <h3>${card.dataset.title}</h3>
      <p>${card.dataset.info}</p>
    `;
    card.insertAdjacentElement("afterend", habitInfoPanel);
  });
});

const galleryLightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxText = document.getElementById("lightboxText");
const lightboxClose = document.getElementById("lightboxClose");

function closeLightbox() {
  galleryLightbox.classList.remove("open");
  galleryLightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".gallery-card").forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");
    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = card.querySelector("figcaption")?.textContent || "Gallery Photo";
    lightboxText.textContent = card.querySelector("p")?.textContent || "";
    galleryLightbox.classList.add("open");
    galleryLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

lightboxClose.addEventListener("click", closeLightbox);
galleryLightbox.addEventListener("click", (event) => {
  if (event.target === galleryLightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && galleryLightbox.classList.contains("open")) {
    closeLightbox();
  }
});

function createParticles() {
  const count = window.innerWidth < 720 ? 18 : 34;
  particles.innerHTML = "";
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${9 + Math.random() * 13}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particle.style.opacity = `${0.22 + Math.random() * 0.48}`;
    particles.appendChild(particle);
  }
}

createParticles();
window.addEventListener("resize", createParticles);
