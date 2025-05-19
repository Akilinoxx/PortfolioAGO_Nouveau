// Script pour l'effet de tilt sur l'image
document.addEventListener('DOMContentLoaded', function() {
    const tiltImage = document.querySelector('.tilt');
    
    if (tiltImage) {
        // Paramètres de l'effet tilt
        const maxTilt = 15; // Angle maximum de rotation en degrés
        const perspective = 1000; // Perspective en pixels
        const scale = 1.05; // Facteur d'échelle lors du survol
        const speed = 400; // Vitesse de transition en ms
        
        // Appliquer les styles initiaux
        tiltImage.style.willChange = 'transform';
        tiltImage.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
        
        // Fonction pour appliquer l'effet tilt
        function applyTilt(event) {
            const imageRect = tiltImage.getBoundingClientRect();
            const imageWidth = imageRect.width;
            const imageHeight = imageRect.height;
            
            // Position relative de la souris dans l'élément (de -1 à 1)
            const mouseX = ((event.clientX - imageRect.left) / imageWidth) * 2 - 1;
            const mouseY = ((event.clientY - imageRect.top) / imageHeight) * 2 - 1;
            
            // Calculer l'angle de rotation
            const rotateX = mouseY * -maxTilt;
            const rotateY = mouseX * maxTilt;
            
            // Appliquer la transformation
            tiltImage.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
        }
        
        // Fonction pour réinitialiser l'effet
        function resetTilt() {
            tiltImage.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
        
        // Ajouter les écouteurs d'événements
        tiltImage.parentElement.addEventListener('mousemove', applyTilt);
        tiltImage.parentElement.addEventListener('mouseleave', resetTilt);
        tiltImage.parentElement.addEventListener('mouseenter', function() {
            resetTilt(); // Réinitialiser d'abord pour éviter les sauts
        });
    }
});
