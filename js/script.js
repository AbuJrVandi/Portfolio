// Main JavaScript file for Abu Jr Vandi's portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .fade-in-section, .about-card, .skill-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Add pulse effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.bg-blue-600');
    ctaButtons.forEach(button => {
        button.classList.add('pulse-button');
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on page load
    setTimeout(animateOnScroll, 500);
    
    // Function to show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500 translate-x-0';
        successMessage.innerHTML = `
            <div class="flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Message sent successfully! I'll get back to you soon.</span>
            </div>
        `;
        document.body.appendChild(successMessage);
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            successMessage.style.transform = 'translateX(120%)';
            setTimeout(() => successMessage.remove(), 500);
        }, 5000);
    }

    // Function to show error message
    function showErrorMessage() {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500 translate-x-0';
        errorMessage.innerHTML = `
            <div class="flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>Failed to send message. Please try again later.</span>
            </div>
        `;
        document.body.appendChild(errorMessage);
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            errorMessage.style.transform = 'translateX(120%)';
            setTimeout(() => errorMessage.remove(), 500);
        }, 5000);
    }

    // Form submission handling with EmailJS
    function sendEmail(form) {
        // Get form values
        const name = form.name.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const message = form.message.value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        
        // Send email using EmailJS
        emailjs.send('service_vhxqa8s', 'template_nqg1i8u', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        })
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage();
            form.reset();
        })
        .catch((error) => {
            console.error('FAILED...', error);
            showErrorMessage();
            // Show more detailed error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500 translate-x-0';
            errorMessage.innerHTML = `
                <div class="flex items-center">
                    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>Failed to send message. Error: ${error.text}</span>
                </div>
            `;
            document.body.appendChild(errorMessage);
            
            // Remove the message after 5 seconds
            setTimeout(() => {
                errorMessage.style.transform = 'translateX(120%)';
                setTimeout(() => errorMessage.remove(), 500);
            }, 5000);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
        
        return false; // Prevent form from submitting normally
    }
    
    // Skill Progress Bar Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');
                    
                    // Set CSS custom property for the target width
                    progressBar.style.setProperty('--target-width', targetWidth);
                    
                    // Add animate class to trigger the animation
                    setTimeout(() => {
                        progressBar.classList.add('animate');
                        progressBar.style.width = targetWidth;
                    }, 300);
                    
                    // Stop observing this element
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Initialize skill bar animations
    animateSkillBars();
    
    // Enhanced scroll animations for skills section
    function enhancedScrollAnimations() {
        const skillCards = document.querySelectorAll('.skill-card-modern');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100); // Stagger the animations
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });
        
        skillCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }
    
    // Initialize enhanced scroll animations
    enhancedScrollAnimations();
    
    // Enhanced Project Cards Animation
    function initProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card-modern');
        
        // Ensure cards are visible immediately
        projectCards.forEach((card, index) => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    
                    setTimeout(() => {
                        // Add dramatic entrance effect
                        entry.target.style.transform = 'translateY(-10px) scale(1.05)';
                        entry.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
                        
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1)';
                            entry.target.style.boxShadow = '';
                        }, 300);
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -20px 0px'
        });
        
        projectCards.forEach(card => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(card);
        });
    }
    
    // Initialize project animations
    initProjectAnimations();
    
    // Canvas Animation for Projects Section
    function initProjectsCanvas() {
        const canvas = document.getElementById('projects-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationId;
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        // Particle system
        const particles = [];
        const particleCount = 15;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`; // Blue to purple range
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around edges
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
                
                // Pulse opacity
                this.opacity += Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.01;
                this.opacity = Math.max(0.05, Math.min(0.4, this.opacity));
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Add glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.restore();
            }
        }
        
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections between nearby particles
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.save();
                        ctx.globalAlpha = (100 - distance) / 100 * 0.1;
                        ctx.strokeStyle = particle.color;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                });
            });
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Initialize
        resizeCanvas();
        animate();
        
        // Handle resize
        window.addEventListener('resize', resizeCanvas);
        
        // Cleanup function
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }
    
    // Initialize projects canvas animation
    const cleanupProjectsCanvas = initProjectsCanvas();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (cleanupProjectsCanvas) {
            cleanupProjectsCanvas();
        }
        if (cleanupContactCanvas) {
            cleanupContactCanvas();
        }
    });
    
    // Fix for project images loading
    function ensureProjectImagesLoad() {
        const projectImages = document.querySelectorAll('.project-card-modern img');
        
        projectImages.forEach((img, index) => {
            // Ensure image is visible
            img.style.opacity = '1';
            img.style.display = 'block';
            
            // Add loading event listeners
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.display = 'block';
                console.log(`Project image ${index + 1} loaded successfully:`, this.src);
            });
            
            img.addEventListener('error', function() {
                console.error(`Failed to load project image ${index + 1}:`, this.src);
                // Keep the gradient background visible
                this.style.display = 'none';
                console.log('Gradient background will show instead');
            });
            
            // Check if image is already loaded
            if (img.complete && img.naturalHeight > 0) {
                img.style.opacity = '1';
                img.style.display = 'block';
            }
        });
    }
    
    // Initialize image loading fixes
    ensureProjectImagesLoad();
    
    // Enhanced Contact Section Animations
    function initContactAnimations() {
        const contactCards = document.querySelectorAll('.contact-info-card, .contact-form-card');
        const contactMethods = document.querySelectorAll('.contact-method');
        
        // Ensure cards are visible immediately
        contactCards.forEach((card, index) => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.classList.contains('contact-animated')) {
                    entry.target.classList.add('contact-animated');
                    
                    setTimeout(() => {
                        // Add dramatic glow effect
                        entry.target.style.transform = 'translateY(-8px) scale(1.02)';
                        entry.target.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
                        entry.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                        
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1)';
                            entry.target.style.boxShadow = '';
                            entry.target.style.borderColor = '';
                        }, 400);
                    }, index * 300);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        });
        
        contactCards.forEach(card => {
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(card);
        });
        
        // Animate contact methods with stagger
        contactMethods.forEach((method, index) => {
            setTimeout(() => {
                method.style.opacity = '1';
                method.style.transform = 'translateX(0)';
            }, index * 150);
        });
    }
    
    // Initialize contact animations
    initContactAnimations();
    
    // Contact Canvas Animation
    function initContactCanvas() {
        const canvas = document.getElementById('contact-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationId;
        
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        // Particle system for contact section
        const particles = [];
        const particleCount = 20;
        
        class ContactParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.hue = Math.random() * 60 + 200;
                this.pulse = Math.random() * Math.PI * 2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
                
                this.pulse += 0.02;
                this.opacity = 0.1 + Math.sin(this.pulse) * 0.1;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 3
                );
                gradient.addColorStop(0, `hsl(${this.hue}, 70%, 60%)`);
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = `hsl(${this.hue}, 80%, 80%)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new ContactParticle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        ctx.save();
                        ctx.globalAlpha = (120 - distance) / 120 * 0.1;
                        ctx.strokeStyle = `hsl(${(particle.hue + otherParticle.hue) / 2}, 70%, 60%)`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                });
            });
            
            animationId = requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        animate();
        
        window.addEventListener('resize', resizeCanvas);
        
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }
    
    // Initialize contact canvas
    const cleanupContactCanvas = initContactCanvas();
    
    // Force visibility and refresh
    function forceVisibilityRefresh() {
        // Ensure all sections are visible
        const sections = document.querySelectorAll('.project-card-modern, .contact-info-card, .contact-form-card, .skills-category');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
            section.style.display = 'block';
        });
        
        // Force image refresh
        const images = document.querySelectorAll('.project-card-modern img');
        images.forEach(img => {
            img.style.opacity = '1';
            img.style.display = 'block';
            
            // Force reload if needed
            if (!img.complete) {
                const src = img.src;
                img.src = '';
                img.src = src;
            }
        });
        
        console.log('Forced visibility refresh completed');
    }
    
    // Run immediately and after a short delay
    forceVisibilityRefresh();
    setTimeout(forceVisibilityRefresh, 1000);
});
