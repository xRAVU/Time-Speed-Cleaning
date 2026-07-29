window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            AOS.init({ once: true, offset: 50, duration: 800 });
        }, 500);
    }, 1000);
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
});

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(faq => faq.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + (target === 100 ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (target === 100 ? '%' : '+');
            }
        };
        updateCounter();
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true;
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if(statsSection) observer.observe(statsSection);

const themeToggle = document.getElementById('theme-toggle');
const body = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = body.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const lang = bookingForm.getAttribute('data-lang');
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const city = document.getElementById('city').value.trim();
        const region = document.getElementById('region').value.trim();
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const notes = document.getElementById('notes').value.trim();
        
        let message = '';
        
        if (lang === 'ar') {
            message = `مرحباً فريق TIME SPEED CLEANING، 🌟
أرغب في حجز خدمة تنظيف (VIP) بناءً على التفاصيل التالية:

👤 الاسم: ${name}
📞 الهاتف: ${phone}
📍 العنوان: ${city} - ${region}
🧹 الخدمة: ${service}
📅 التاريخ: ${date}
⏰ الوقت: ${time}
📝 ملاحظات: ${notes ? notes : 'لا يوجد'}

أرجو تأكيد الحجز، شكراً لكم! ✨`;
        } else {
            message = `Hello TIME SPEED CLEANING Team, 🌟
I want to book a VIP cleaning service with the following details:

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${city} - ${region}
🧹 Service: ${service}
📅 Date: ${date}
⏰ Time: ${time}
📝 Notes: ${notes ? notes : 'None'}

Please confirm, thank you! ✨`;
        }
        
        const whatsappNumber = "962778144774";
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
    });
}
