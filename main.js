(function () {

// =============================================
// YEAR
// =============================================
var year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// =============================================
// MOBILE NAV
// =============================================
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

// =============================================
// HERO CAROUSEL
// =============================================
var carouselBg = document.querySelector(".hero__carousel-bg");
if (carouselBg) {
    var slides = carouselBg.querySelectorAll(".carousel__slide");
    var currentSlide = 0;
    function showSlide(index) {
        slides.forEach(function (s) { s.classList.remove("carousel__slide--active"); });
        slides[index].classList.add("carousel__slide--active");
        currentSlide = index;
    }
    if (slides.length > 1) {
        setInterval(function () { showSlide((currentSlide + 1) % slides.length); }, 5000);
    }
}

// =============================================
// DARK MODE
// =============================================
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

// =============================================
// 1. SCROLL ANIMATIONS — IntersectionObserver
// =============================================
var animatedEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
if ("IntersectionObserver" in window && animatedEls.length > 0) {
    var scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    animatedEls.forEach(function (el) { scrollObserver.observe(el); });
} else {
    animatedEls.forEach(function (el) { el.classList.add("is-visible"); });
}

// =============================================
// 2. SCROLL PROGRESS BAR
// =============================================
var progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);

window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
}, { passive: true });

// =============================================
// 3. COUNTER ANIMADO
// =============================================
var counters = document.querySelectorAll("[data-counter]");
if (counters.length > 0 && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.getAttribute("data-counter"), 10);
                var suffix = el.getAttribute("data-suffix") || "";
                var duration = 1800;
                var start = null;
                function step(ts) {
                    if (!start) start = ts;
                    var progress = Math.min((ts - start) / duration, 1);
                    // Ease out quad
                    var eased = 1 - (1 - progress) * (1 - progress);
                    el.textContent = Math.floor(eased * target) + suffix;
                    if (progress < 1) requestAnimationFrame(step);
                    else el.textContent = target + suffix;
                }
                requestAnimationFrame(step);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObserver.observe(c); });
}

// =============================================
// 4. HOVER 3D EN VALUE-CARDS
// =============================================
var valueCards = document.querySelectorAll(".value-card");
valueCards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var rotateX = ((y - cy) / cy) * -10;
        var rotateY = ((x - cx) / cx) * 10;
        card.style.transform = "perspective(700px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.03)";
    });
    card.addEventListener("mouseleave", function () {
        card.style.transform = "";
    });
});

// =============================================
// 5. RIPPLE EN BOTONES
// =============================================
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        var rect = btn.getBoundingClientRect();
        var ripple = document.createElement("span");
        ripple.className = "ripple-effect";
        var size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 700);
    });
});

// =============================================
// 6. TYPEWRITER EN HERO TITLE
// =============================================
var heroTitle = document.querySelector(".hero__title");
if (heroTitle) {
    var lines = heroTitle.querySelectorAll(".title-line");
    var fullTexts = [];
    lines.forEach(function (l) {
        fullTexts.push(l.textContent.trim());
        l.textContent = "";
        l.style.opacity = "1";
    });

    var lineIdx = 0;
    var charIdx = 0;
    var typingDelay = 55;

    function typeNext() {
        if (lineIdx >= lines.length) return;
        if (charIdx < fullTexts[lineIdx].length) {
            lines[lineIdx].textContent += fullTexts[lineIdx][charIdx];
            charIdx++;
            setTimeout(typeNext, typingDelay);
        } else {
            lineIdx++;
            charIdx = 0;
            if (lineIdx < lines.length) setTimeout(typeNext, 220);
        }
    }

    // Esperar a que el reveal-left esté visible
    var titleEl = heroTitle;
    if ("IntersectionObserver" in window) {
        var titleObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                setTimeout(typeNext, 400);
                titleObserver.disconnect();
            }
        }, { threshold: 0.3 });
        titleObserver.observe(titleEl);
    } else {
        setTimeout(typeNext, 400);
    }
}

})();