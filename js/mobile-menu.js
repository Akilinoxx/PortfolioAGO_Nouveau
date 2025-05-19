// Script pour gérer le menu mobile responsive
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Fonction pour basculer l'état du menu mobile
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        
        // Animation du bouton hamburger
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    }
    
    // Ajouter l'événement de clic au bouton hamburger
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
});
