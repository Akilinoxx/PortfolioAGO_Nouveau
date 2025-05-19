// Script pour l'effet de typing dans la section d'accueil
document.addEventListener('DOMContentLoaded', function() {
    // Liste des compétences à afficher dans l'animation de typing
    const typingTexts = [
        "Automatisation",
        "Scraping Web",
        "Data Intelligence"
    ];
    
    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150; // Délai entre chaque caractère
    let erasingDelay = 100; // Délai pour effacer
    let newTextDelay = 2000; // Délai avant de commencer un nouveau texte
    
    const typingElement = document.querySelector('.typing-text');
    
    function type() {
        if (!typingElement) return;
        
        const currentText = typingTexts[currentTextIndex];
        
        if (isDeleting) {
            // Effacer les caractères
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            // Ajouter des caractères
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }
        
        // Si le texte est complètement écrit
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } 
        // Si le texte est complètement effacé
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Démarrer l'animation de typing
    setTimeout(type, 1000);
});
