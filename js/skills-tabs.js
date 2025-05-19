// Script pour gérer les onglets de la section compétences

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments
    const skillsTabs = document.querySelectorAll('.skills-tab');
    const skillsContents = document.querySelectorAll('.skills-content');
    
    // Ajouter les événements de clic aux onglets
    skillsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Récupérer l'ID de l'onglet à afficher
            const tabId = this.getAttribute('data-tab');
            
            // Supprimer la classe active de tous les onglets et contenus
            skillsTabs.forEach(t => t.classList.remove('active'));
            skillsContents.forEach(c => c.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            // Afficher le contenu correspondant
            document.getElementById(tabId).classList.add('active');
        });
    });
});
