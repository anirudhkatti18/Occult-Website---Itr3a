// Initialize page functions
document.addEventListener('DOMContentLoaded', function() {
    // Hero canvas animation for index - DISABLED for performance
    // if (document.getElementById('hero-visual')) {
    //     initHeroCanvas();
    // }

    // Fluid background animation for hero section - DISABLED for performance
    // if (document.getElementById('fluid-bg')) {
    //     console.log('Initializing fluid background animation');
    //     initFluidBg();
    // }

    // Mobile menu
    initMobileMenu();

    // Scroll reveal
    initScrollReveal();

    // Form validation
    initFormValidation();
});



// Hero canvas pulsating shape - throttled to 30fps
function initHeroCanvas() {
    const canvas = document.getElementById('hero-visual');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    function draw(currentTime) {
        if (currentTime - lastTime < frameInterval) {
            requestAnimationFrame(draw);
            return;
        }
        lastTime = currentTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        // Center the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Pulsating tetrahedron-like shape
        const time = Date.now() * 0.001;
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

    requestAnimationFrame(draw);
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
            this.speed = 0.005 + Math.random() * 0.01;
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

            // Use the cyan color from footer
            const pathColor = '#00FFFF';

            // Add blur filter for mystical effect
            ctx.filter = 'blur(20px)';

            // Draw the main blob - curvy path
            ctx.globalAlpha = 0.05;
            ctx.beginPath();
            if (this === blobs[0]) {
                // First blob: left bottom to right top
                ctx.moveTo(0, canvas.height);
                ctx.quadraticCurveTo(canvas.width / 2, this.y, canvas.width, 0);
            } else {
                // Second blob: right bottom to left top
                ctx.moveTo(canvas.width, canvas.height);
                ctx.quadraticCurveTo(canvas.width / 2, canvas.height - this.y, 0, 0);
            }
            ctx.lineWidth = this.radius * 1.5;
            ctx.strokeStyle = pathColor;
            ctx.stroke();

            // Enhanced glow effect
            ctx.shadowColor = pathColor;
            ctx.shadowBlur = 30;
            ctx.globalAlpha = 0.1;
            ctx.stroke();

            // Add outer glow ring - thicker curve
            ctx.filter = 'blur(25px)';
            ctx.globalAlpha = 0.02;
            ctx.beginPath();
            if (this === blobs[0]) {
                ctx.moveTo(0, canvas.height);
                ctx.quadraticCurveTo(canvas.width / 2, this.y, canvas.width, 0);
            } else {
                ctx.moveTo(canvas.width, canvas.height);
                ctx.quadraticCurveTo(canvas.width / 2, canvas.height - this.y, 0, 0);
            }
            ctx.lineWidth = this.radius * 3.0;
            ctx.stroke();

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

    // Animation loop - throttled to 24fps for better performance
    let lastTime = 0;
    const targetFPS = 24;
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime) {
        if (currentTime - lastTime < frameInterval) {
            requestAnimationFrame(animate);
            return;
        }
        lastTime = currentTime;

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

    requestAnimationFrame(animate);
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
