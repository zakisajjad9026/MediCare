document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavOnScroll() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Testimonials Carousel
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('testimonials-dots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateCarousel() {
        const cardWidth = testimonialCards[0].offsetWidth + 30;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex >= testimonialCards.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = testimonialCards.length - 1;
        }
        updateCarousel();
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    startAutoPlay();
    
    // Pause on hover
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    testimonialsWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    testimonialsWrapper.addEventListener('mouseleave', startAutoPlay);
    
    // Doctor Department Mapping
    const departmentSelect = document.getElementById('department');
    const doctorSelect = document.getElementById('doctor');
    
    const doctorsByDepartment = {
        general: [
            { value: 'dr-general-1', text: 'Dr. Amanda Foster - General Practitioner' },
            { value: 'dr-general-2', text: 'Dr. Robert Kim - Family Medicine' }
        ],
        cardiology: [
            { value: 'dr-cardio-1', text: 'Dr. Sarah Johnson - Cardiologist' },
            { value: 'dr-cardio-2', text: 'Dr. Lisa Park - Interventional Cardiology' }
        ],
        orthopedics: [
            { value: 'dr-ortho-1', text: 'Dr. Michael Chen - Orthopedic Surgeon' },
            { value: 'dr-ortho-2', text: 'Dr. David Wilson - Sports Medicine' }
        ],
        pediatrics: [
            { value: 'dr-ped-1', text: 'Dr. Emily Williams - Pediatrician' },
            { value: 'dr-ped-2', text: 'Dr. Rachel Brown - Child Specialist' }
        ],
        neurology: [
            { value: 'dr-neuro-1', text: 'Dr. James Anderson - Neurologist' },
            { value: 'dr-neuro-2', text: 'Dr. Susan Miller - Neurophysiologist' }
        ]
    };
    
    departmentSelect.addEventListener('change', function() {
        const department = this.value;
        
        // Clear existing options
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        
        if (department && doctorsByDepartment[department]) {
            doctorSelect.disabled = false;
            doctorsByDepartment[department].forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.value;
                option.textContent = doctor.text;
                doctorSelect.appendChild(option);
            });
        } else {
            doctorSelect.disabled = true;
            doctorSelect.innerHTML = '<option value="">Select Department First</option>';
        }
    });
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // Form Validation and Submission
    const appointmentForm = document.getElementById('appointment-form');
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\d\s\-\+\(\)]{10,}$/;
        return re.test(phone);
    }
    
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(inputId + '-error');
        input.classList.add('error');
        errorSpan.textContent = message;
    }
    
    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(inputId + '-error');
        input.classList.remove('error');
        errorSpan.textContent = '';
    }
    
    function validateForm() {
        let isValid = true;
        
        // Validate Name
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('name', 'Please enter your full name');
            isValid = false;
        } else {
            clearError('name');
        }
        
        // Validate Email
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            showError('email', 'Please enter your email address');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('email');
        }
        
        // Validate Phone
        const phone = document.getElementById('phone').value.trim();
        if (phone === '') {
            showError('phone', 'Please enter your phone number');
            isValid = false;
        } else if (!validatePhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError('phone');
        }
        
        // Validate Department
        const department = document.getElementById('department').value;
        if (department === '') {
            showError('department', 'Please select a department');
            isValid = false;
        } else {
            clearError('department');
        }
        
        // Validate Doctor
        const doctor = document.getElementById('doctor').value;
        if (doctor === '') {
            showError('doctor', 'Please select a doctor');
            isValid = false;
        } else {
            clearError('doctor');
        }
        
        // Validate Date
        const date = document.getElementById('date').value;
        if (date === '') {
            showError('date', 'Please select a preferred date');
            isValid = false;
        } else {
            clearError('date');
        }
        
        // Validate Time
        const timeSelected = document.querySelector('input[name="time"]:checked');
        if (!timeSelected) {
            document.getElementById('time-error').textContent = 'Please select a preferred time';
            isValid = false;
        } else {
            document.getElementById('time-error').textContent = '';
        }
        
        return isValid;
    }
    
    // Clear errors on input
    document.querySelectorAll('#appointment-form input, #appointment-form select, #appointment-form textarea').forEach(input => {
        input.addEventListener('input', function() {
            clearError(this.id);
        });
    });
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success modal
            modal.classList.add('active');
            
            // Reset form
            appointmentForm.reset();
            
            // Reset doctor select
            doctorSelect.disabled = true;
            doctorSelect.innerHTML = '<option value="">Select Department First</option>';
        }
    });
    
    closeModalBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Scroll Animation - Fade In
    const fadeElements = document.querySelectorAll('.service-card, .doctor-card, .section-header');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Add animation delay to cards for staggered effect
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.doctor-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});
