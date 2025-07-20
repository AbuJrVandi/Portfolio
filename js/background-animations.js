document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        about: { id: 'about-canvas', active: false, animationFrameId: null, init: () => initFloatingShapes('about-canvas', 'about') },
        skills: { id: 'skills-canvas', active: false, animationFrameId: null, init: () => initFloatingShapes('skills-canvas', 'skills') },
        projects: { id: 'projects-canvas', active: false, animationFrameId: null, init: () => initFloatingShapes('projects-canvas', 'projects') },
        contact: { id: 'contact-canvas', active: false, animationFrameId: null, init: () => initFloatingShapes('contact-canvas', 'contact') },
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const sectionKey = sectionId.replace('-canvas', '');

            if (sections[sectionKey]) {
                if (entry.isIntersecting) {
                    if (!sections[sectionKey].active) {
                        sections[sectionKey].active = true;
                        sections[sectionKey].init();
                    }
                } else {
                    if (sections[sectionKey].active) {
                        sections[sectionKey].active = false;
                        if (sections[sectionKey].animationFrameId) {
                            cancelAnimationFrame(sections[sectionKey].animationFrameId);
                            sections[sectionKey].animationFrameId = null;
                        }
                    }
                }
            }
        });
    }, { threshold: 0.1 });

    Object.values(sections).forEach(section => {
        const canvas = document.getElementById(section.id);
        if (canvas) {
            observer.observe(canvas);
        }
    });

    // --- Reusable Floating Shapes Animation ---
    function initFloatingShapes(canvasId, sectionKey) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let shapes = [];

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            shapes = [];
            for (let i = 0; i < 20; i++) {
                shapes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 40 + 20,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: `rgba(147, 197, 253, ${Math.random() * 0.2 + 0.1})`
                });
            }
        }

        function animate() {
            if (!sections[sectionKey] || !sections[sectionKey].active) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            shapes.forEach(shape => {
                shape.x += shape.speedX;
                shape.y += shape.speedY;
                if (shape.x < -shape.size || shape.x > canvas.width + shape.size) shape.speedX *= -1;
                if (shape.y < -shape.size || shape.y > canvas.height + shape.size) shape.speedY *= -1;
                ctx.fillStyle = shape.color;
                ctx.beginPath();
                ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
                ctx.fill();
            });
            sections[sectionKey].animationFrameId = requestAnimationFrame(animate);
        }
        resize();
        animate();
        window.addEventListener('resize', resize);
    }
});
