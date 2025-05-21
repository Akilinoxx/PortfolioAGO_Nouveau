/**
 * Script pour gérer l'animation de retournement de la photo de profil
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner le conteneur de la carte de profil
    const profileCardContainer = document.querySelector('.profile-card-container');
    
    if (profileCardContainer) {
        // Ajouter un écouteur d'événement pour le survol de la souris
        profileCardContainer.addEventListener('mouseenter', function() {
            // Ajouter la classe 'flipped' pour déclencher l'animation
            this.classList.add('flipped');
        });
        
        // Ajouter un écouteur d'événement pour la sortie de la souris
        profileCardContainer.addEventListener('mouseleave', function() {
            // Retirer la classe 'flipped' pour revenir à l'état initial
            this.classList.remove('flipped');
        });
    }
});
