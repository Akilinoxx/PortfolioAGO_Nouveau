// Script pour l'animation de particules rappelant un réseau de neurones
document.addEventListener('DOMContentLoaded', () => {
    // Création du canvas pour les particules
    const particlesCanvas = document.createElement('canvas');
    particlesCanvas.id = 'particles-canvas';
    particlesCanvas.classList.add('particles');
    document.body.appendChild(particlesCanvas);

    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    // Configuration des particules
    const config = {
        particleCount: 100,
        particleColor: 'rgba(255, 255, 255, 0.5)',
        lineColor: 'rgba(255, 255, 255, 0.2)',
        particleRadius: 2,
        lineWidth: 1,
        connectionDistance: 150,
        speed: 0.5
    };

    // Redimensionnement du canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Initialisation des particules
    let particles = [];
    function initParticles() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * config.speed,
                vy: (Math.random() - 0.5) * config.speed,
                radius: Math.random() * 1 + config.particleRadius,
                color: config.particleColor
            });
        }
    }

    // Animation des particules
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner les connexions entre particules
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.connectionDistance) {
                    // Opacité basée sur la distance
                    const opacity = 1 - (distance / config.connectionDistance);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                    ctx.lineWidth = config.lineWidth;
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Dessiner et mettre à jour les particules
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Mise à jour de la position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebond sur les bords
            if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy;
        });
        
        requestAnimationFrame(animateParticles);
    }

    // Effet de suivi du curseur
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 150;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Ajouter une légère attraction vers la souris
        particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRadius) {
                const force = (mouseRadius - distance) / mouseRadius;
                particle.vx += dx * force * 0.02;
                particle.vy += dy * force * 0.02;
                
                // Limiter la vitesse
                const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                if (speed > config.speed * 2) {
                    particle.vx = (particle.vx / speed) * config.speed * 2;
                    particle.vy = (particle.vy / speed) * config.speed * 2;
                }
            }
        });
    });

    // Initialisation
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    resizeCanvas();
    initParticles();
    animateParticles();

    // Ajouter des effets de connexion entre les sections
    function addNeuralConnections() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            if (index < sections.length - 1) {
                const connection = document.createElement('div');
                connection.classList.add('neural-connection');
                connection.style.setProperty('--rotation', `${Math.random() * 10 - 5}deg`);
                connection.style.top = `${section.offsetTop + section.offsetHeight - 1}px`;
                document.body.appendChild(connection);
            }
        });
    }
    
    // Exécuter après le chargement complet de la page
    window.addEventListener('load', addNeuralConnections);
});
