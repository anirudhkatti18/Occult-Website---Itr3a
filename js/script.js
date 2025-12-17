// Initialize page functions
document.addEventListener('DOMContentLoaded', function() {
    // Aether background particles
    initAether();

    // Hero canvas animation for index
    if (document.getElementById('hero-visual')) {
        initHeroCanvas();
    }

    // Fluid background animation for hero section
    if (document.getElementById('fluid-bg')) {
        console.log('Initializing fluid background animation');
        initFluidBg();
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

// Fluid blob background animation
function initFluidBg() {
    const fluidBg = document.getElementById('fluid-bg');
    if (!fluidBg) return;

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    // No border for clean look
    fluidBg.appendChild(canvas);
    console.log('Canvas created and appended to fluid-bg');

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = fluidBg.offsetWidth;
        canvas.height = fluidBg.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Blob class
    class Blob {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = 0.01 + Math.random() * 0.02;
            this.amplitude = 50 + Math.random() * 100;
            this.offsetX = Math.random() * canvas.width;
            this.offsetY = Math.random() * canvas.height;
        }

        update() {
            this.angle += this.speed;
            this.x = this.offsetX + Math.sin(this.angle) * this.amplitude;
            this.y = this.offsetY + Math.cos(this.angle) * this.amplitude;

            // Keep blobs within bounds
            if (this.x < -this.radius) this.x = canvas.width + this.radius;
            if (this.x > canvas.width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = canvas.height + this.radius;
            if (this.y > canvas.height + this.radius) this.y = -this.radius;
        }

        draw() {
            ctx.save();

            // Create radial gradient for each blob to make it more mystical
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(0.7, this.color + '80'); // Semi-transparent
            gradient.addColorStop(1, this.color + '00'); // Fully transparent

            // Add blur filter for mystical effect
            ctx.filter = 'blur(3px)';

            // Draw the main blob with gradient
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();

            // Enhanced glow effect
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 50;
            ctx.globalAlpha = 0.8;
            ctx.fill();

            // Add outer glow ring
            ctx.filter = 'blur(8px)';
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    // Create blobs
    const blobs = [];
    const colors = ['#4a0e4e', '#16213e', '#0f3460', '#1a1a2e', '#533483'];

    for (let i = 0; i < 2; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 80 + Math.random() * 120;
        const color = colors[Math.floor(Math.random() * colors.length)];
        blobs.push(new Blob(x, y, radius, color));
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw gradient background
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
        );
        gradient.addColorStop(0, 'rgba(10, 10, 10, 0.1)');
        gradient.addColorStop(1, 'rgba(26, 26, 46, 0.3)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw blobs
        blobs.forEach(blob => {
            blob.update();
            blob.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
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
