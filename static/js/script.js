document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initReveal();
    initThemeCube();
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Navigation: scrolled state, mobile menu, active section
function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = [...document.querySelectorAll('.nav-menu a[href^="#"]')];

    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const setOpen = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    document.querySelectorAll('.nav-menu a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

    const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) => a.classList.remove('is-active'));
            byId.get(entry.target.id)?.classList.add('is-active');
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
}

// Fade panels in as they scroll into view
function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
}

// Theme cube: cycles the photo backdrop and accent colours from themes.json
function initThemeCube() {
    const cube = document.getElementById('themeCube');
    const layers = document.querySelectorAll('.backdrop-layer');
    const root = document.documentElement;
    let themes = [];
    let index = 0;
    let front = 0;
    let busy = false;

    const save = (theme) => {
        try {
            localStorage.setItem('sp-theme', JSON.stringify({
                name: theme.name,
                bg: theme.background,
                accent: theme.colors.dominant,
                accent2: theme.colors.palette[1],
            }));
        } catch (e) {}
    };

    const apply = (theme, animate) => {
        const url = `url('/${theme.background}')`;
        root.style.setProperty('--accent', theme.colors.dominant);
        root.style.setProperty('--accent-2', theme.colors.palette[1] || theme.colors.dominant);

        if (!animate) {
            layers[front].style.backgroundImage = url;
            return;
        }
        const next = 1 - front;
        const img = new Image();
        img.onload = img.onerror = () => {
            layers[next].style.backgroundImage = url;
            layers[next].classList.add('is-active');
            layers[front].classList.remove('is-active');
            front = next;
            setTimeout(() => { busy = false; }, 700);
        };
        img.src = `/${theme.background}`;
    };

    fetch('/static/themes.json')
        .then((r) => r.json())
        .then((data) => {
            themes = Object.entries(data).map(([name, t]) => ({ name, ...t }));
            // Restore the theme the inline <head> script already applied
            const savedBg = root.dataset.bg;
            const saved = themes.findIndex((t) => t.background === savedBg);
            if (saved > -1) {
                index = saved;
                apply(themes[index], false);
            }
            // Warm the cache for the next background
            if (themes.length > 1) new Image().src = `/${themes[(index + 1) % themes.length].background}`;
        })
        .catch(() => { cube.hidden = true; });

    cube.addEventListener('click', () => {
        if (busy || themes.length < 2) return;
        busy = true;
        cube.classList.remove('is-flipping');
        void cube.offsetWidth;
        cube.classList.add('is-flipping');

        index = (index + 1) % themes.length;
        apply(themes[index], true);
        save(themes[index]);
        new Image().src = `/${themes[(index + 1) % themes.length].background}`;
    });
    cube.addEventListener('animationend', () => cube.classList.remove('is-flipping'));
}
