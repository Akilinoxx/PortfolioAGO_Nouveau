// Script pour gérer le changement de langue
document.addEventListener('DOMContentLoaded', function() {
    // Langue par défaut (français)
    let currentLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    
    // Initialiser la langue au chargement de la page
    setLanguage(currentLanguage);
    
    // Mettre à jour l'indicateur visuel du sélecteur de langue
    updateLanguageSelector(currentLanguage);
    
    // Ajouter des écouteurs d'événements aux boutons de langue
    document.getElementById('lang-fr').addEventListener('click', function() {
        setLanguage('fr');
        updateLanguageSelector('fr');
    });
    
    document.getElementById('lang-en').addEventListener('click', function() {
        setLanguage('en');
        updateLanguageSelector('en');
    });
});

// Fonction pour mettre à jour l'interface avec la langue sélectionnée
function setLanguage(lang) {
    // Sauvegarder la préférence de langue dans le localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Obtenir les traductions appropriées
    const translations = (lang === 'fr') ? translationsFR : translationsEN;
    
    // Mettre à jour tous les éléments avec des attributs data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[key]) {
            // Si l'élément a un attribut placeholder, mettre à jour le placeholder
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[key]);
            } 
            // Sinon, mettre à jour le contenu HTML (pour préserver les balises HTML dans les traductions)
            else {
                element.innerHTML = translations[key];
            }
        }
    });
    
    // Mettre à jour le titre de la page
    document.title = (lang === 'fr') ? 'Portfolio Data Science & Automatisation' : 'Data Science & Automation Portfolio';
    
    // Traduire tous les boutons GitHub et Détails qui n'ont pas d'attribut data-i18n
    document.querySelectorAll('.project-link span:not([data-i18n])').forEach(element => {
        element.textContent = translations['github'];
    });
    
    document.querySelectorAll('.project-details span:not([data-i18n])').forEach(element => {
        element.textContent = translations['details'];
    });
    
    // Traduire le texte de contact s'il n'a pas d'attribut data-i18n
    const contactText = document.querySelector('.contact p:not([data-i18n])');
    if (contactText) {
        contactText.textContent = translations['contact_text'];
    }
    
    // Mettre à jour les textes dynamiques (comme le texte de typing)
    updateDynamicTexts(lang);
    
    // Mettre à jour la popup des certifications si elle est ouverte
    const popup = document.querySelector('.certification-popup.show');
    if (popup) {
        const popupTitle = document.getElementById('popup-title');
        const popupDate = document.getElementById('popup-date');
        const popupDescription = document.getElementById('popup-description');
        
        if (popupTitle && popupDate && popupDescription) {
            // Trouver l'index de la certification actuellement affichée
            // On peut le déduire des attributs data-i18n
            let certIndex = 1;
            const titleKey = popupTitle.getAttribute('data-i18n');
            if (titleKey && titleKey.match(/cert(\d+)_title/)) {
                certIndex = titleKey.match(/cert(\d+)_title/)[1];
            }
            
            // Mettre à jour les textes avec les traductions
            if (translations[`cert${certIndex}_title`]) {
                popupTitle.textContent = translations[`cert${certIndex}_title`];
            }
            
            if (translations[`cert${certIndex}_date`]) {
                popupDate.textContent = translations[`cert${certIndex}_date`];
            }
            
            // S'assurer que la description longue est utilisée
            const longDescKey = `cert${certIndex}_desc_long`;
            const shortDescKey = `cert${certIndex}_desc`;
            
            if (translations[longDescKey]) {
                popupDescription.textContent = translations[longDescKey];
            } else if (translations[shortDescKey]) {
                popupDescription.textContent = translations[shortDescKey];
            }
        }
    }
}

// Fonction pour mettre à jour l'indicateur visuel du sélecteur de langue
function updateLanguageSelector(lang) {
    // Mettre à jour les classes actives
    document.getElementById('lang-fr').classList.toggle('active', lang === 'fr');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
}

// Fonction pour mettre à jour les textes dynamiques
function updateDynamicTexts(lang) {
    // Mettre à jour le texte de typing si le script est chargé
    if (window.typingTexts) {
        window.typingTexts = (lang === 'fr') 
            ? ['Data Analysis', 'Data Science', 'Automatisation', 'Intelligence Artificielle'] 
            : ['Data Analysis', 'Data Science', 'Automation', 'Artificial Intelligence'];
        
        // Redémarrer l'animation de typing si elle est en cours
        if (window.restartTyping) {
            window.restartTyping();
        }
    }
}
