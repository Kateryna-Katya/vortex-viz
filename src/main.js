document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);

    // --- МОБИЛЬНОЕ МЕНЮ ---
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // --- HERO АНИМАЦИЯ ---
    const heroTitle = new SplitType('#hero-title', { types: 'words, chars', tagName: 'span' });
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    heroTl.from('.hero__badge', { y: -20, opacity: 0, duration: 1, delay: 0.5 })
          .from(heroTitle.chars, { y: 40, opacity: 0, rotateX: -90, stagger: 0.02, duration: 0.8 }, "-=0.6")
          .from('.hero__subtitle', { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
          .from('.hero__actions', { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
          .from('.hero__visual', { scale: 0.9, opacity: 0, duration: 1 }, "-=0.8");

    // --- ИСПРАВЛЕННАЯ ФУНКЦИЯ ПОЯВЛЕНИЯ (Once: true) ---
    const revealOnScroll = (selector, x = 0, y = 50) => {
        const items = gsap.utils.toArray(selector);
        
        items.forEach((item) => {
            // Начальное состояние
            gsap.set(item, { opacity: 0, x: x, y: y });

            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%', 
                    once: true, // Анимация проиграется только один раз
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    };

    // Запускаем анимации (теперь они не будут пропадать)
    revealOnScroll('.info-card', 0, 40);
    revealOnScroll('.benefit-item', 0, 40);
    revealOnScroll('.innov-card', -30, 0);
    revealOnScroll('.roadmap__item', 0, 40); 
    revealOnScroll('.contact__form-wrapper', 0, 40);

    // --- КУКИ И ФОРМА ---
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieBtn = document.getElementById('cookie-accept');
    if (cookiePopup && !localStorage.getItem('vortex_cookies')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2500);
    }
    if (cookieBtn) {
        cookieBtn.addEventListener('click', () => {
            localStorage.setItem('vortex_cookies', 'true');
            cookiePopup.classList.remove('active');
        });
    }

    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ''));
    }

    const captchaQ = document.getElementById('captcha-question');
    if (captchaQ) {
        const n1 = Math.floor(Math.random() * 9) + 1;
        const n2 = Math.floor(Math.random() * 9) + 1;
        window.cRes = n1 + n2;
        captchaQ.innerText = `${n1} + ${n2}`;
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userAns = document.getElementById('captcha-answer').value;
            if (parseInt(userAns) !== window.cRes) return alert('Ошибка в примере');
            contactForm.querySelector('button').innerText = 'Отправка...';
            setTimeout(() => {
                document.getElementById('success-msg').style.display = 'flex';
                gsap.from('#success-msg', { opacity: 0, scale: 0.9, duration: 0.5 });
            }, 1000);
        });
    }

    // --- HEADER ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.style.backgroundColor = window.scrollY > 50 ? 'rgba(45, 62, 80, 0.98)' : 'transparent';
            header.style.padding = window.scrollY > 50 ? '12px 0' : '20px 0';
        }
    });

    // Рефреш для точности после загрузки всех картинок
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
});