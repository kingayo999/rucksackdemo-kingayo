if (window.gsap) {
    if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    gsap.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 1
    });

    gsap.utils.toArray(".service-card, .glass-card, .price-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    window.addEventListener("resize", () => {
        ScrollTrigger.refresh();
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const header = document.querySelector('header');
const body = document.body;

if (mobileMenuBtn && mobileMenu) {
    const menuIcon = mobileMenuBtn.querySelector('i');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenu.classList.remove('hidden');
            if (header) header.classList.add('menu-open');
            // Small timeout to allow transition to trigger after hidden removal
            setTimeout(() => {
                mobileMenu.classList.add('active');
            }, 10);
            body.style.overflow = 'hidden';
            if (menuIcon) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            }
        } else {
            mobileMenu.classList.remove('active');
            if (header) header.classList.remove('menu-open');
            body.style.overflow = '';
            if (menuIcon) {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
            // Wait for transition to end before adding hidden
            setTimeout(() => {
                if (!mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.add('hidden');
                }
            }, 400); // Matches CSS transition duration
        }
    };

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('active');
        toggleMenu(!isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
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


// FAQ Functionality
if (document.querySelectorAll(".faq-question").length > 0) {
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            const answer = btn.nextElementSibling
            answer.style.display =
                answer.style.display === "block" ? "none" : "block"
        })
    })
}

// Form Submission Handling (AJAX)
const forms = document.querySelectorAll('form');
const successPopup = document.getElementById('success-popup');

if (forms.length > 0 && successPopup) {
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            // Check if it's a FormSubmit form
            if (form.action.includes('formsubmit.co')) {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';
                
                if (submitBtn) {
                    submitBtn.innerText = 'Sending...';
                    submitBtn.disabled = true;
                }

                try {
                    const formData = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        showPopup();
                        form.reset();
                    } else {
                        alert('Something went wrong. Please try again or call us directly.');
                    }
                } catch (error) {
                    console.error('Submission error:', error);
                    alert('Could not send message. Please check your connection.');
                } finally {
                    if (submitBtn) {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                    }
                }
            }
        });
    });
}

function showPopup() {
    if (successPopup) {
        successPopup.classList.remove('hidden');
        setTimeout(() => {
            successPopup.classList.add('opacity-100');
            successPopup.querySelector('.glass-card').classList.add('scale-100');
            successPopup.querySelector('.glass-card').classList.remove('scale-90');
        }, 10);
    }
}

function closePopup() {
    if (successPopup) {
        successPopup.classList.remove('opacity-100');
        successPopup.querySelector('.glass-card').classList.remove('scale-100');
        successPopup.querySelector('.glass-card').classList.add('scale-90');
        setTimeout(() => {
            successPopup.classList.add('hidden');
        }, 300);
    }
}

// Make globally accessible for the onclick attribute
window.closePopup = closePopup;