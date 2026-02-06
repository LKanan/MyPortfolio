document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Initial Check
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });

    // Optional: Add active state to sidebar links on scroll
    // This adds a nice touch of "animation" or interactiveness
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#side-navbar a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;
        
        // Safety check for bottom of page
        if ((window.innerHeight + scrollY) >= document.body.scrollHeight - 10) {
           if (sections.length > 0) {
               current = sections[sections.length - 1].getAttribute('id');
           }
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Trigger when 1/3 of the section is visible or when the top of section is near center
                if (scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('scale-125', 'text-orange-500'); // Remove active styles
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('scale-125', 'text-orange-500'); // Add active styles
            }
        });
    });
});
