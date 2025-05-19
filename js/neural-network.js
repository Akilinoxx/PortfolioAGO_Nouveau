// Configuration du réseau de neurones
const config = {
    nodes: [
        { id: 'about', label: 'À propos', url: 'index.html#a-propos', color: '#4285F4', description: 'Découvrez mon parcours et mes motivations' },
        { id: 'projects', label: 'Projets', url: 'index.html#projets', color: '#EA4335', description: 'Explorez mes projets de data science et d\'automatisation' },
        { id: 'skills', label: 'Compétences', url: 'index.html#competences', color: '#FBBC05', description: 'Mes compétences techniques en data science et programmation' },
        { id: 'contact', label: 'Contact', url: 'index.html#contact', color: '#34A853', description: 'Prenez contact avec moi pour discuter de vos projets' },
        { id: 'data-analysis', label: 'Analyse de données', url: 'index.html#projets', color: '#7986CB', description: 'Extraction d\'insights à partir de données complexes' },
        { id: 'automation', label: 'Automatisation', url: 'index.html#projets', color: '#4DB6AC', description: 'Solutions d\'automatisation pour optimiser les processus' },
        { id: 'machine-learning', label: 'Machine Learning', url: 'index.html#projets', color: '#FF8A65', description: 'Modèles prédictifs et algorithmes d\'apprentissage' },
        { id: 'linkedIn', label: 'Linkedin', url: 'https://www.linkedin.com/in/goupil27/', color: '#0077B5', description: 'Mon profil LinkedIn', isImage: true, imagePath: 'images/picto linkedni.png' }
    ],
    nodeCount: 80, // Nombre total de nœuds réduit de 150 à 80
    maxConnections: 5, // Nombre maximum de connexions par nœud réduit de 8 à 5
    speed: 0.15, // Vitesse de déplacement des nœuds réduite de 0.3 à 0.15
    interactionRadius: 120, // Rayon d'interaction avec la souris réduit de 150 à 120
    nodeRadius: { min: 1.5, max: 4 }, // Rayon des nœuds normaux réduit
    specialNodeRadius: 10, // Rayon des nœuds spéciaux réduit de 12 à 10
    depthLayers: 4, // Nombre de couches de profondeur réduit de 5 à 4
    depthEffect: 0.6, // Effet de profondeur légèrement réduit de 0.7 à 0.6
    pulseEffect: true, // Effet de pulsation pour les nœuds
};

// Fonction utilitaire pour convertir une couleur hex en rgba
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Initialisation du réseau de neurones
function initNeuralNetwork() {
    const canvas = document.getElementById('neural-network');
    const ctx = canvas.getContext('2d');
    
    // Variables pour le zoom et le déplacement
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let targetScale = 1;
    let currentScale = 1;
    
    // Variables pour l'interaction avec la souris
    let mouseX = 0;
    let mouseY = 0;
    
    // Redimensionner le canvas pour qu'il occupe tout l'écran avec une résolution HD
    function resizeCanvas() {
        // Obtenir les dimensions de la fenêtre
        const displayWidth = window.innerWidth;
        const displayHeight = window.innerHeight;
        
        // Appliquer un facteur de résolution plus élevé pour les écrans haute résolution
        const pixelRatio = window.devicePixelRatio || 1;
        
        // Définir les dimensions du canvas en tenant compte du ratio de pixels
        canvas.width = displayWidth * pixelRatio;
        canvas.height = displayHeight * pixelRatio;
        
        // Ajuster la taille d'affichage CSS
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        
        // Ajuster le contexte pour la haute résolution
        ctx.scale(pixelRatio, pixelRatio);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Créer les nœuds avec des couches de profondeur
    let nodes = [];
    let specialNodes = [];
    
    // Créer d'abord les nœuds spéciaux (sections du portfolio)
    config.nodes.forEach(nodeConfig => {
        const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
        const y = Math.random() * canvas.height * 0.8 + canvas.height * 0.1;
        const node = {
            x,
            y,
            z: Math.random() * 0.5 + 0.5, // Profondeur Z entre 0.5 et 1 (plus proche)
            vx: (Math.random() - 0.5) * config.speed,
            vy: (Math.random() - 0.5) * config.speed,
            vz: (Math.random() - 0.5) * config.speed * 0.1, // Vitesse en Z plus lente
            baseRadius: config.specialNodeRadius,
            radius: config.specialNodeRadius,
            color: nodeConfig.color,
            isSpecial: true,
            label: nodeConfig.label,
            url: nodeConfig.url,
            description: nodeConfig.description,
            isImage: nodeConfig.isImage || false,
            imagePath: nodeConfig.imagePath || '',
            image: null, // Sera chargé plus tard si nécessaire
            connections: [],
            pulsePhase: Math.random() * Math.PI * 2, // Phase aléatoire pour l'effet de pulsation
            pulseSpeed: 0.02 + Math.random() * 0.03 // Vitesse de pulsation réduite
        };
        specialNodes.push(node);
        nodes.push(node);
    });
    
    // Créer les nœuds normaux avec différentes couches de profondeur
    for (let i = 0; i < config.nodeCount - config.nodes.length; i++) {
        // Distribuer les nœuds dans différentes couches de profondeur
        const layerIndex = Math.floor(Math.random() * config.depthLayers);
        const z = 0.2 + (layerIndex / config.depthLayers) * 0.8; // Profondeur Z entre 0.2 et 1
        
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const baseRadius = Math.random() * (config.nodeRadius.max - config.nodeRadius.min) + config.nodeRadius.min;
        
        // Ajuster la taille et l'opacité en fonction de la profondeur
        const sizeMultiplier = 0.5 + z * 0.5; // Plus petit si plus loin
        const opacityMultiplier = 0.3 + z * 0.7; // Plus transparent si plus loin
        
        const node = {
            x,
            y,
            z,
            vx: (Math.random() - 0.5) * config.speed * (1 + (1-z) * 0.5), // Plus lent si plus loin
            vy: (Math.random() - 0.5) * config.speed * (1 + (1-z) * 0.5),
            vz: (Math.random() - 0.5) * config.speed * 0.05, // Mouvement en Z très lent
            baseRadius: baseRadius,
            radius: baseRadius * sizeMultiplier,
            color: `rgba(255, 255, 255, ${0.15 + 0.25 * opacityMultiplier})`, // Opacité réduite
            isSpecial: false,
            connections: [],
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.01 + Math.random() * 0.02, // Vitesse de pulsation réduite
            panicColor: false,
            panicTimer: 0
        };
        nodes.push(node);
    }
    
    // Créer des connexions en tenant compte de la profondeur
    nodes.forEach(node => {
        // Préférer les connexions avec des nœuds à une profondeur similaire
        const potentialConnections = nodes.filter(target => {
            return target !== node && Math.abs(target.z - node.z) < 0.3;
        });
        
        const connectionCount = Math.min(
            Math.floor(Math.random() * config.maxConnections) + 1,
            potentialConnections.length
        );
        
        // Sélectionner des connexions aléatoires parmi les nœuds à profondeur similaire
        const shuffled = [...potentialConnections].sort(() => 0.5 - Math.random());
        node.connections = shuffled.slice(0, connectionCount);
    });
    
    // Gérer le mouvement de la souris
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Vérifier si la souris survole un neurone spécial pour changer le curseur
        const pixelRatio = window.devicePixelRatio || 1;
        const worldX = (mouseX / scale - offsetX - canvas.width / (2 * pixelRatio) / scale + canvas.width / (2 * pixelRatio)) * pixelRatio;
        const worldY = (mouseY / scale - offsetY - canvas.height / (2 * pixelRatio) / scale + canvas.height / (2 * pixelRatio)) * pixelRatio;
        
        let isOverNode = false;
        specialNodes.forEach(node => {
            const dx = worldX - node.x * pixelRatio;
            const dy = worldY - node.y * pixelRatio;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < node.radius * pixelRatio * 1.5) {
                isOverNode = true;
            }
        });
        
        if (e.buttons === 1) { // Si le bouton gauche est enfoncé
            // Si le mouvement est significatif, considérer comme un déplacement
            if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
                isDragging = true;
            }
            
            if (isDragging) {
                const dx = (e.clientX - lastX) / scale;
                const dy = (e.clientY - lastY) / scale;
                offsetX += dx;
                offsetY += dy;
                lastX = e.clientX;
                lastY = e.clientY;
                document.body.style.cursor = 'grabbing';
            }
        } else {
            document.body.style.cursor = isOverNode ? 'pointer' : 'default';
        }
    });
    
    // Gérer le début du clic
    canvas.addEventListener('mousedown', (e) => {
        isDragging = false; // Commence à false, deviendra true si on déplace
        lastX = e.clientX;
        lastY = e.clientY;
        document.body.style.cursor = 'grabbing';
    });
    
    // Gérer la fin du clic
    canvas.addEventListener('mouseup', (e) => {
        // Si c'était un clic (pas un déplacement)
        if (!isDragging || (Math.abs(e.clientX - lastX) < 5 && Math.abs(e.clientY - lastY) < 5)) {
            // Vérifier si on a cliqué sur un neurone spécial
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Convertir les coordonnées de la souris en coordonnées du monde
            const pixelRatio = window.devicePixelRatio || 1;
            const worldX = (mouseX / scale - offsetX - canvas.width / (2 * pixelRatio) / scale + canvas.width / (2 * pixelRatio)) * pixelRatio;
            const worldY = (mouseY / scale - offsetY - canvas.height / (2 * pixelRatio) / scale + canvas.height / (2 * pixelRatio)) * pixelRatio;
            
            // Vérifier chaque neurone spécial
            specialNodes.forEach(node => {
                const dx = worldX - node.x * pixelRatio;
                const dy = worldY - node.y * pixelRatio;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Si le clic est sur le neurone
                if (distance < node.radius * pixelRatio * 1.5) {
                    // Rediriger vers l'URL associée
                    if (node.url) {
                        window.location.href = node.url;
                    }
                }
            });
        }
        
        isDragging = false;
        document.body.style.cursor = 'default';
    });
    
    // Gérer le zoom avec la molette de la souris
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = -Math.sign(e.deltaY) * 0.1;
        targetScale = Math.max(0.5, Math.min(5, targetScale + delta));
        document.getElementById('zoom-level').textContent = `${Math.round(targetScale * 100)}%`;
    });
    
    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });
    
    // Contrôles de zoom avec les boutons
    document.getElementById('zoom-in').addEventListener('click', () => {
        targetScale = Math.min(5, targetScale + 0.2);
        document.getElementById('zoom-level').textContent = `${Math.round(targetScale * 100)}%`;
    });
    
    document.getElementById('zoom-out').addEventListener('click', () => {
        targetScale = Math.max(0.5, targetScale - 0.2);
        document.getElementById('zoom-level').textContent = `${Math.round(targetScale * 100)}%`;
    });
    
    document.getElementById('reset-view').addEventListener('click', () => {
        targetScale = 1;
        offsetX = 0;
        offsetY = 0;
        document.getElementById('zoom-level').textContent = '100%';
    });
    
    // Fonction d'animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Animation fluide du zoom
        currentScale += (targetScale - currentScale) * 0.1;
        scale = currentScale;
        
        // Appliquer la transformation pour le zoom et le déplacement
        ctx.save();
        // Ajuster pour le pixelRatio dans les transformations
        const pixelRatio = window.devicePixelRatio || 1;
        ctx.translate(canvas.width / (2 * pixelRatio), canvas.height / (2 * pixelRatio));
        ctx.scale(scale, scale);
        ctx.translate(-canvas.width / (2 * pixelRatio) + offsetX, -canvas.height / (2 * pixelRatio) + offsetY);
        
        // Trier les nœuds par profondeur (z) pour un rendu 3D correct
        const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);
        
        // Dessiner les connexions en tenant compte de la profondeur
        sortedNodes.forEach(node => {
            node.connections.forEach(target => {
                // Calculer l'opacité en fonction de la profondeur moyenne des deux nœuds
                const avgZ = (node.z + target.z) / 2;
                const opacity = 0.05 + avgZ * 0.15;
                
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(target.x, target.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 0.5 + avgZ * 0.5;
                ctx.stroke();
            });
        });
        
        // Mettre à jour et dessiner les nœuds
        sortedNodes.forEach(node => {
            // Mettre à jour la position
            node.x += node.vx;
            node.y += node.vy;
            node.z += node.vz;
            
            // Maintenir Z entre 0.2 et 1
            if (node.z < 0.2 || node.z > 1) {
                node.vz = -node.vz;
                node.z = Math.max(0.2, Math.min(1, node.z));
            }
            
            // Rebondir sur les bords
            if (node.x < 0 || node.x > canvas.width) node.vx = -node.vx;
            if (node.y < 0 || node.y > canvas.height) node.vy = -node.vy;
            
            // Effet de pulsation
            if (config.pulseEffect) {
                node.pulsePhase += node.pulseSpeed;
                const pulseFactor = 1 + Math.sin(node.pulsePhase) * 0.07; // Amplitude de pulsation réduite
                node.radius = node.baseRadius * pulseFactor * (0.7 + node.z * 0.3);
            } else {
                node.radius = node.baseRadius * (0.7 + node.z * 0.3);
            }
            
            // Interaction avec la souris pour les nœuds normaux
            if (!node.isSpecial) {
                const worldX = (node.x + offsetX) * scale;
                const worldY = (node.y + offsetY) * scale;
                const dx = mouseX - worldX;
                const dy = mouseY - worldY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.interactionRadius * scale * 1.5) { // Augmenté le rayon d'interaction
                    const angle = Math.atan2(dy, dx);
                    const force = (config.interactionRadius * scale * 1.5 - distance) / (config.interactionRadius * scale * 1.5);
                    
                    // Réaction plus douce et moins agressive
                    const panicFactor = 0.04 / scale; // Facteur de panique réduit de moitié
                    node.vx -= Math.cos(angle) * force * panicFactor;
                    node.vy -= Math.sin(angle) * force * panicFactor;
                    
                    // Effet de rebond pour certains neurones (comportement aléatoire)
                    if (node.baseRadius % 2 === 0) { // Pour environ la moitié des neurones
                        // Parfois, certains neurones "paniquent" et changent de direction
                        if (Math.random() < 0.05) {
                            node.vx = (Math.random() - 0.5) * config.speed * 3;
                            node.vy = (Math.random() - 0.5) * config.speed * 3;
                        }
                    }
                    
                    // Effet de pulsation temporaire pour les neurones effrayés
                    node.pulseSpeed = Math.min(node.pulseSpeed * 1.05, 0.2);
                    
                    // Changement temporaire de couleur pour les neurones très proches
                    if (distance < config.interactionRadius * scale * 0.5) {
                        node.panicColor = true;
                        node.panicTimer = 20; // Durée de l'effet de panique en frames
                    }
                } else {
                    // Retour progressif à la normale
                    if (node.panicTimer > 0) {
                        node.panicTimer--;
                        if (node.panicTimer === 0) {
                            node.panicColor = false;
                        }
                    }
                    
                    // Retour progressif à la vitesse de pulsation normale
                    node.pulseSpeed = Math.max(node.pulseSpeed * 0.99, 0.02 + Math.random() * 0.03);
                }
            }
            
            // Calculer l'opacité en fonction de la profondeur
            let opacity = 0.2 + node.z * 0.8;
            if (node.isSpecial) opacity = Math.min(1, opacity + 0.2);
            
            // Dessiner le nœud avec un effet de profondeur et anti-aliasing
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            
            if (node.isSpecial) {
                // Utiliser la couleur spécifiée pour les nœuds spéciaux
                const rgbaColor = hexToRgba(node.color, opacity);
                ctx.fillStyle = rgbaColor;
                
                // Ajouter un effet de lueur interne pour les nœuds spéciaux
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius
                );
                gradient.addColorStop(0, hexToRgba(node.color, opacity * 1.2));
                gradient.addColorStop(1, rgbaColor);
                ctx.fillStyle = gradient;
            } else {
                // Utiliser des nuances de bleu pour les nœuds normaux avec dégradé
                // Ou des nuances de rouge/orange pour les nœuds en "panique"
                let blueShade, redComponent, greenComponent;
                
                if (node.panicColor) {
                    // Couleur de panique (rouge-orange)
                    redComponent = 255;
                    greenComponent = Math.floor(100 + Math.random() * 50);
                    blueShade = 50;
                } else {
                    // Couleur normale (bleu)
                    redComponent = 100;
                    blueShade = Math.floor(150 + node.z * 100);
                    greenComponent = blueShade;
                }
                
                const baseColor = `rgba(${redComponent}, ${greenComponent}, ${blueShade}, ${opacity})`;
                
                // Créer un dégradé radial pour un effet plus doux et réaliste
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius
                );
                
                if (node.panicColor) {
                    // Centre plus lumineux pour l'effet de panique
                    gradient.addColorStop(0, `rgba(255, 255, 100, ${opacity * 1.2})`);
                    gradient.addColorStop(1, baseColor);
                } else {
                    gradient.addColorStop(0, `rgba(150, ${blueShade + 30}, 255, ${opacity})`);
                    gradient.addColorStop(1, baseColor);
                }
                
                ctx.fillStyle = gradient;
            }
            
            // Activer l'anti-aliasing pour un rendu plus doux
            ctx.shadowBlur = 1;
            ctx.shadowColor = ctx.fillStyle;
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Ajouter un effet de lueur pour les nœuds spéciaux
            if (node.isSpecial) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
                const glowColor = hexToRgba(node.color, 0.2 * opacity);
                ctx.fillStyle = glowColor;
                ctx.fill();
                
                            // Ajouter le label ou l'image pour les nœuds spéciaux
            if (node.isImage) {
                // Charger l'image si elle n'existe pas déjà
                if (!node.image) {
                    node.image = new Image();
                    node.image.src = node.imagePath;
                }
                
                // Dessiner l'image centrée sur le nœud si elle est chargée
                if (node.image.complete && node.image.naturalWidth !== 0) {
                    const imgSize = node.radius * 1.5;
                    ctx.drawImage(node.image, node.x - imgSize/2, node.y - imgSize/2, imgSize, imgSize);
                } else {
                    // Si l'image n'est pas encore chargée, afficher le label comme fallback
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.font = `${Math.max(10, 12 * node.z)}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(node.label, node.x, node.y);
                }
            } else {
                // Afficher le texte du label comme avant
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.font = `${Math.max(10, 12 * node.z)}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.label, node.x, node.y);
            }
                        }
        });
        
        ctx.restore();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialiser le réseau de neurones lorsque la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    // Gérer le bouton de fermeture du message d'introduction
    document.getElementById('close-intro').addEventListener('click', () => {
        document.getElementById('intro-text').classList.add('hidden');
    });
    
    // Initialiser le réseau de neurones
    initNeuralNetwork();
    
    // Attendre que la page soit complètement chargée
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
            }, 1000);
        }, 1500);
    });
});
