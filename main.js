// main.js
(() => {
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector("[data-nav]");
if (!toggle || !nav) return;

toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    });
});

// Background carousel for hero section
const carouselBg = document.querySelector(".hero__carousel-bg");
if (carouselBg) {
    const slides = carouselBg.querySelectorAll(".carousel__slide");
    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(index) {
    slides.forEach((s) => s.classList.remove("carousel__slide--active"));
    slides[index].classList.add("carousel__slide--active");
    currentSlide = index;
    }

    function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
    }

    function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
    }

    startAutoplay();
}
})();