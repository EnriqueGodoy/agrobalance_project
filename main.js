(function () {
'use strict';

// =============================================
// YEAR
// =============================================
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =============================================
// MOBILE NAV
// =============================================
var toggle   = document.querySelector('.nav__toggle');
var navLinks = document.querySelector('[data-nav]');
if (toggle && navLinks) {
toggle.addEventListener('click', function () {
var isOpen = navLinks.classList.toggle('is-open');
toggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(function (a) {
a.addEventListener('click', function () {
    navLinks.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
});
});
}

// =============================================
// HERO CAROUSEL (solo si hay mas de 1 slide)
// =============================================
var carouselBg = document.querySelector('.hero__carousel-bg');
if (carouselBg) {
var slides = carouselBg.querySelectorAll('.carousel__slide');
if (slides.length > 1) {
var current = 0;
setInterval(function () {
    slides[current].classList.remove('carousel__slide--active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('carousel__slide--active');
}, 5000);
}
}

// =============================================
// DARK MODE
// =============================================
var root   = document.documentElement;
var stored = localStorage.getItem('theme');
if (stored === 'dark') root.classList.add('dark');

var createDarkBtn = function () {
var btn = document.createElement('button');
btn.className = 'dark-mode-btn';
btn.setAttribute('aria-label', 'Cambiar modo oscuro');
btn.textContent = root.classList.contains('dark') ? '\u2600' : '\uD83C\uDF19';
document.body.appendChild(btn);
btn.addEventListener('click', function () {
var isDark = root.classList.toggle('dark');
btn.textContent = isDark ? '\u2600' : '\uD83C\uDF19';
localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
};
if ('requestIdleCallback' in window) {
requestIdleCallback(createDarkBtn);
} else {
setTimeout(createDarkBtn, 200);
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
var animEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
if (animEls.length > 0) {
if ('IntersectionObserver' in window) {
var scrollObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
    if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollObs.unobserve(entry.target);
    }
    });
}, { threshold: 0, rootMargin: '0px' });

animEls.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
    el.classList.add('is-visible');
    } else {
    scrollObs.observe(el);
    }
});
} else {
animEls.forEach(function (el) { el.classList.add('is-visible'); });
}
}

// =============================================
// SCROLL PROGRESS BAR
// =============================================
var progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', function () {
var scrollTop = window.scrollY || document.documentElement.scrollTop;
var docHeight = document.documentElement.scrollHeight - window.innerHeight;
progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
}, { passive: true });

// =============================================
// COUNTER ANIMADO
// =============================================
var counters = document.querySelectorAll('[data-counter]');
if (counters.length > 0) {
var animateCounter = function (el) {
var target   = parseInt(el.getAttribute('data-counter'), 10);
var suffix   = el.getAttribute('data-suffix') || '';
var duration = 1600;
var start    = null;
var step = function (ts) {
    if (!start) start = ts;
    var progress = Math.min((ts - start) / duration, 1);
    var eased    = 1 - (1 - progress) * (1 - progress);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) { requestAnimationFrame(step); }
    else { el.textContent = target + suffix; }
};
requestAnimationFrame(step);
};

if ('IntersectionObserver' in window) {
var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
    if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
    }
    });
}, { threshold: 0 });

counters.forEach(function (c) {
    var r = c.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) { animateCounter(c); }
    else { counterObs.observe(c); }
});
} else {
counters.forEach(function (c) {
    c.textContent = c.getAttribute('data-counter') + (c.getAttribute('data-suffix') || '');
});
}
}

// =============================================
// HOVER 3D EN VALUE-CARDS (solo desktop)
// =============================================
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
document.querySelectorAll('.value-card').forEach(function (card) {
card.addEventListener('mousemove', function (e) {
    var rect    = card.getBoundingClientRect();
    var rotateX = ((e.clientY - rect.top  - rect.height / 2) / rect.height) * -12;
    var rotateY = ((e.clientX - rect.left - rect.width  / 2) / rect.width)  *  12;
    card.style.transform = 'perspective(700px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.03)';
});
card.addEventListener('mouseleave', function () { card.style.transform = ''; });
});
}

// =============================================
// RIPPLE EN BOTONES
// =============================================
document.querySelectorAll('.btn').forEach(function (btn) {
btn.addEventListener('click', function (e) {
var rect   = btn.getBoundingClientRect();
var ripple = document.createElement('span');
var size   = Math.max(rect.width, rect.height) * 2;
ripple.className = 'ripple-effect';
ripple.style.cssText =
    'width:' + size + 'px;height:' + size + 'px;' +
    'left:' + (e.clientX - rect.left - size / 2) + 'px;' +
    'top:'  + (e.clientY - rect.top  - size / 2) + 'px;';
btn.appendChild(ripple);
setTimeout(function () { ripple.remove(); }, 700);
});
});

// =============================================
// TYPEWRITER EN HERO TITLE
// =============================================
var heroTitle = document.querySelector('.hero__title');
if (heroTitle) {
var lines     = heroTitle.querySelectorAll('.title-line');
var fullTexts = [];
lines.forEach(function (l) {
fullTexts.push(l.textContent.trim());
l.textContent = '';
l.style.opacity = '1';
});
var lineIdx = 0;
var charIdx = 0;
var typeNext = function () {
if (lineIdx >= lines.length) return;
if (charIdx < fullTexts[lineIdx].length) {
    lines[lineIdx].textContent += fullTexts[lineIdx][charIdx++];
    setTimeout(typeNext, 52);
} else {
    lineIdx++;
    charIdx = 0;
    if (lineIdx < lines.length) setTimeout(typeNext, 200);
}
};
setTimeout(typeNext, 300);
}

})();