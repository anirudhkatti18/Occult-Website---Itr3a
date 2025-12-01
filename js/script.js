// Initialize page functions
document.addEventListener('DOMContentLoaded', function() {
    // Aether background particles
    initAether();

    // Hero canvas animation for index
    if (document.getElementById('hero-visual')) {
        initHeroCanvas();
    }

    // Mobile menu
    initMobileMenu();

    // Scroll reveal
    initScrollReveal();

    // Form validation
    initFormValidation();
});

// Aether particle background
function initAether() {
    const aetherBg = document.getElementById('aether-bg');
    if (!aetherBg) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 10 + 15 + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        aetherBg.appendChild(particle);
    }
}

// Hero canvas pulsating shape
function initHeroCanvas() {
    const canvas = document.getElementById('hero-visual');
    const ctx = canvas.getContext('2d');

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        // Center the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Pulsating tetrahedron-like shape
        const time = Date.now() * 0.002;
        const scale = 0.8 + Math.sin(time) * 0.2;

        // Draw sigil-like shape
        ctx.strokeStyle = '#ffffff'; // White
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const x = Math.cos(angle) * 100 * scale;
            const y = Math.sin(angle) * 100 * scale;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(0, 0, 50 * scale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
        requestAnimationFrame(draw);
    }

    draw();
}

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('nav ul');

    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('mobile-open');
        });

        // Close on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                menu.classList.remove('mobile-open');
            });
        });
    }
}

// Scroll reveal animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    function reveal() {
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
}

// Form validation
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!name || !email || !message) return;

        if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
            alert('Please fill in all fields.');
            e.preventDefault();
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            alert('Please enter a valid email address.');
            e.preventDefault();
            return;
        }
    });
}
