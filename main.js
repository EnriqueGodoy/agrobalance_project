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

// Cerrar menú al tocar un link
nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    });
});

// Smooth scroll mejorado para la categoría
const catLink = document.querySelector('.cat');
if (catLink) {
    catLink.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = catLink.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
        });
    }
    });
}
})();