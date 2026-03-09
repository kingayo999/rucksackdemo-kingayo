if (window.gsap) {
    if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    gsap.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 1
    });

    gsap.utils.toArray(".service-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: card,
            y: 40,
            opacity: 0,
            duration: 0.6
        });
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');

if (mobileMenuBtn && mobileMenu) {
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars', isHidden);
            menuIcon.classList.toggle('fa-times', !isHidden);
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            if (menuIcon) {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
            }
        });
    });
}

// Testimonial Slider Functionality
let currentSlide = 0;
const testimonialContainer = document.querySelector('.testimonial-container');
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const totalSlides = testimonialSlider ? testimonialSlider.children.length : 0;

function updateSlider() {
    if (testimonialSlider && testimonialContainer) {
        const width = testimonialContainer.clientWidth;
        testimonialSlider.style.transform = `translateX(-${currentSlide * width}px)`;
    }

    // Update dots
    testimonialDots.forEach((dot, index) => {
        const isActive = index === currentSlide;
        dot.classList.toggle('active', isActive);
        dot.classList.toggle('bg-blue-600', isActive);
        dot.classList.toggle('bg-gray-300', !isActive);
    });
}

function nextSlide() {
    if (totalSlides > 0) {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

// Auto slide every 5 seconds
if (testimonialSlider && totalSlides > 0) {
    setInterval(nextSlide, 15000);

    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Initialize
    updateSlider();
}


if (document.querySelectorAll(".faq-question").length > 0) {

    document.querySelectorAll(".faq-question").forEach(btn => {

        btn.addEventListener("click", () => {

            const answer = btn.nextElementSibling

            answer.style.display =
                answer.style.display === "block" ? "none" : "block"

        })

    })

}