/**
 * Script pour gérer l'animation de retournement de la photo de profil
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner le conteneur de la carte de profil
    const profileCardContainer = document.querySelector('.profile-card-container');
    
    if (profileCardContainer) {
        // Ajouter un écouteur d'événement pour le clic
        profileCardContainer.addEventListener('click', function() {
            // Basculer la classe 'flipped' pour déclencher l'animation
            this.classList.toggle('flipped');
            
            // Jouer un son discret (optionnel)
            // const flipSound = new Audio('sounds/flip-sound.mp3');
            // flipSound.play();
        });
    }
});
