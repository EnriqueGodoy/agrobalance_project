(function () {

// Year
var year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Mobile nav
var toggle = document.querySelector(".nav__toggle");
var navLinks = document.querySelector("[data-nav]");

if (toggle && navLinks) {
toggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    });
});
}

// Hero carousel
var carouselBg = document.querySelector(".hero__carousel-bg");

if (carouselBg) {

var slides = carouselBg.querySelectorAll(".carousel__slide");
var currentSlide = 0;

function showSlide(index) {
    slides.forEach(function (s) {
        s.classList.remove("carousel__slide--active");
    });
    slides[index].classList.add("carousel__slide--active");
    currentSlide = index;
}

if (slides.length > 1) {
    setInterval(function () {
        showSlide((currentSlide + 1) % slides.length);
    }, 5000);
}
}


// DARK MODE
var root = document.documentElement;
var stored = localStorage.getItem("theme");

if (stored === "dark") root.classList.add("dark");

var dmBtn = document.createElement("button");
dmBtn.className = "dark-mode-btn";
dmBtn.setAttribute("aria-label", "Cambiar modo oscuro");
dmBtn.innerHTML = root.classList.contains("dark") ? "☀" : "🌙";
document.body.appendChild(dmBtn);

dmBtn.addEventListener("click", function () {

var isDark = root.classList.toggle("dark");

dmBtn.innerHTML = isDark ? "☀" : "🌙";

localStorage.setItem("theme", isDark ? "dark" : "light");

});





})();