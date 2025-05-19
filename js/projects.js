// Script pour gérer les fonctionnalités de la section projets

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments
    const projectCards = document.querySelectorAll('.project-card');
    const projectLinks = document.querySelectorAll('.project-link');
    const projectDetails = document.querySelectorAll('.project-details');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    
    // Simuler un clic sur le bouton "Voir plus" (pour une future fonctionnalité)
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function() {
            // Animation du bouton
            this.classList.add('clicked');
            
            // Ici, vous pourriez charger plus de projets ou rediriger vers une page de projets
            setTimeout(() => {
                this.classList.remove('clicked');
                alert('Fonctionnalité à venir : plus de projets seront ajoutés prochainement!');
            }, 300);
        });
    }
    
    // Ajouter des effets de survol aux cartes de projet
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-inner').style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-inner').style.transform = 'translateY(0)';
        });
        
        // Ajouter un gestionnaire de clic pour les cartes de projet
        card.addEventListener('click', function(e) {
            // Si le clic n'est pas sur un lien ou un bouton, ouvrir le lien de détails
            if (!e.target.closest('.project-link') && !e.target.closest('.project-details')) {
                const detailsLink = this.querySelector('.project-details');
                if (detailsLink && detailsLink.getAttribute('href') !== '#') {
                    window.open(detailsLink.getAttribute('href'), '_blank');
                }
            }
        });
    });
    
    // S'assurer que les liens GitHub et Détails sont cliquables indépendamment
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêcher la propagation du clic à la carte
        });
    });
    
    projectDetails.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêcher la propagation du clic à la carte
        });
    });
    
    // Ajouter l'animation de base aux cartes de projet
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});
