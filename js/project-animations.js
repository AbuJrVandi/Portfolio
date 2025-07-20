document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project-card');

    function handleScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;

        projects.forEach((project, index) => {
            const projectTop = project.getBoundingClientRect().top;

            if (projectTop < triggerBottom) {
                project.classList.add('visible');
            } else {
                project.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});
