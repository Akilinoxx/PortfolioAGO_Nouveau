/**
 * Script de correction pour les certifications
 * Ce script garantit que les certifications s'affichent correctement sur GitHub Pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Attendre que le DOM soit complètement chargé
    setTimeout(function() {
        console.log("Exécution des correctifs pour les certifications...");
        
        // S'assurer que les images sont correctement centrées
        fixCertificationImages();
        
        // Réinitialiser le popup des certifications
        reinitializeCertificationPopup();
    }, 500); // Attendre 500ms pour s'assurer que tout est chargé
});

/**
 * Corrige l'affichage des images de certification
 */
function fixCertificationImages() {
    const certImages = document.querySelectorAll('.certification-image img');
    
    certImages.forEach(img => {
        // Appliquer des styles pour garantir le centrage
        img.style.display = 'block';
        img.style.margin = '0 auto';
        img.style.objectFit = 'contain';
        
        // Vérifier si l'image est chargée
        if (!img.complete || img.naturalWidth === 0) {
            console.log("Image non chargée correctement:", img.src);
            
            // Réessayer avec un chemin absolu
            const imgName = img.src.split('/').pop();
            img.src = './images/' + imgName;
        }
    });
    
    // Appliquer des styles aux conteneurs d'images
    const certImageContainers = document.querySelectorAll('.certification-image');
    certImageContainers.forEach(container => {
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
    });
}

/**
 * Réinitialise le popup des certifications
 */
function reinitializeCertificationPopup() {
    // Supprimer les anciens écouteurs d'événements
    const oldCards = document.querySelectorAll('.certification-card');
    oldCards.forEach(card => {
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
    });
    
    // Reconfigurer le popup
    const certificationCards = document.querySelectorAll('.certification-card');
    const popup = document.getElementById('certification-popup');
    const closeBtn = document.querySelector('.close-popup');
    
    if (!popup) {
        console.error("Popup des certifications non trouvé!");
        return;
    }
    
    // Récupérer les éléments du popup
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupDate = document.getElementById('popup-date');
    const popupDescription = document.getElementById('popup-description');
    
    // Ajouter des écouteurs d'événements aux cartes
    certificationCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            console.log("Carte de certification cliquée");
            
            // Récupérer les données
            const img = this.getAttribute('data-img');
            const title = this.getAttribute('data-title');
            const date = this.getAttribute('data-date');
            const description = this.getAttribute('data-description');
            
            console.log("Données récupérées:", {img, title, date});
            
            // Mettre à jour le contenu du popup
            popupImg.src = img;
            popupTitle.textContent = title;
            popupDate.textContent = date;
            popupDescription.textContent = description;
            
            // Afficher le popup
            popup.style.display = 'block';
            setTimeout(() => {
                popup.classList.add('show');
            }, 10);
        });
    });
    
    // Fermer le popup
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        });
    }
    
    // Fermer le popup en cliquant en dehors
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    });
}
