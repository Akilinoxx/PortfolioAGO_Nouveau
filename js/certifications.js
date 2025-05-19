/**
 * Script pour ajouter dynamiquement le contenu de l'onglet Certifications
 * Version unifiée pour éviter les conflits
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Initialisation des certifications...");
    
    // Vérifier si l'onglet Certifications existe déjà
    const certificationsTab = document.querySelector('[data-tab="certifications"]');
    
    if (certificationsTab) {
        // Vérifier si le contenu de l'onglet Certifications existe déjà
        let certificationsContent = document.getElementById('certifications');
        
        // Si le contenu n'existe pas, le créer
        if (!certificationsContent) {
            // Créer le conteneur pour le contenu des certifications
            certificationsContent = document.createElement('div');
            certificationsContent.className = 'skills-content';
            certificationsContent.id = 'certifications';
            
            // Créer le HTML pour le contenu des certifications
            certificationsContent.innerHTML = `
                <div class="certifications-container">
                    <!-- Certification Hackathon -->
                    <div class="certification-card" data-img="./images/Certif_hackaton.jpg" data-title="Certification Hackathon" data-date="Mai 2025" data-description="Développement de solutions innovantes en analyse de données. Cette certification valide mes compétences en analyse de données et développement de solutions innovantes acquises lors d'un hackathon intensif.">
                        <div class="certification-image">
                            <img src="./images/Certif_hackaton.jpg" alt="Certification Hackathon">
                        </div>
                        <div class="certification-details">
                            <h3 data-i18n="cert1_title">Certification Hackathon</h3>
                            <p class="certification-date" data-i18n="cert1_date">Mai 2025</p>
                            <p class="certification-description" data-i18n="cert1_desc">Développement de solutions innovantes en analyse de données.</p>
                        </div>
                    </div>
                    
                    <!-- Certification TOEIC -->
                    <div class="certification-card" data-img="./images/toeic.png" data-title="TOEIC" data-date="2024" data-description="Certification en anglais professionnel. Le Test of English for International Communication (TOEIC) valide mon niveau d'anglais professionnel et ma capacité à communiquer efficacement dans un environnement international.">
                        <div class="certification-image">
                            <img src="./images/toeic.png" alt="Certification TOEIC">
                        </div>
                        <div class="certification-details">
                            <h3 data-i18n="cert2_title">TOEIC</h3>
                            <p class="certification-date" data-i18n="cert2_date">2024</p>
                            <p class="certification-description" data-i18n="cert2_desc">Certification en anglais professionnel.</p>
                        </div>
                    </div>
                    
                    <!-- Master Marketing Spé Data -->
                    <div class="certification-card" data-img="./images/mastermarketingspédata.png" data-title="Master Marketing Spé Data" data-date="2023" data-description="Spécialisation en data marketing et analyse. Ce diplôme valide ma formation avancée en marketing orienté données, combinant des compétences en analyse de données, marketing digital et stratégies basées sur la data.">
                        <div class="certification-image">
                            <img src="./images/mastermarketingspédata.png" alt="Master Marketing Spé Data">
                        </div>
                        <div class="certification-details">
                            <h3 data-i18n="cert3_title">Master Marketing Spé Data</h3>
                            <p class="certification-date" data-i18n="cert3_date">2023</p>
                            <p class="certification-description" data-i18n="cert3_desc">Spécialisation en data marketing et analyse.</p>
                        </div>
                    </div>
                    
                    <!-- Certification Datahaiku Core Designer -->
                    <div class="certification-card" data-img="./images/datahaiku_coredesigner.png" data-title="Datahaiku Core Designer" data-date="2025" data-description="Certification officielle validant mes compétences en conception de flux de données et d'analyses avec Datahaiku DSS. Cette certification atteste de ma capacité à concevoir, développer et déployer des projets data science avec la plateforme Datahaiku.">
                        <div class="certification-image">
                            <img src="./images/datahaiku_coredesigner.png" alt="Datahaiku Core Designer Certification">
                        </div>
                        <div class="certification-details">
                            <h3 data-i18n="cert4_title">Datahaiku Core Designer</h3>
                            <p class="certification-date" data-i18n="cert4_date">2025</p>
                            <p class="certification-description" data-i18n="cert4_desc">Certification officielle validant mes compétences en conception de flux de données et d'analyses avec Datahaiku DSS.</p>
                        </div>
                    </div>
                    
                    <!-- Certification Datahaiku ML -->
                    <div class="certification-card" data-img="./images/datahaiku_ML.png" data-title="Datahaiku Machine Learning" data-date="2025" data-description="Certification attestant de ma maîtrise des techniques de machine learning et d'IA appliquées dans l'environnement Datahaiku. Cette certification valide mes compétences avancées en développement de modèles prédictifs et en automatisation des workflows d'IA.">
                        <div class="certification-image">
                            <img src="./images/datahaiku_ML.png" alt="Datahaiku Machine Learning Certification">
                        </div>
                        <div class="certification-details">
                            <h3 data-i18n="cert5_title">Datahaiku Machine Learning</h3>
                            <p class="certification-date" data-i18n="cert5_date">2025</p>
                            <p class="certification-description" data-i18n="cert5_desc">Certification attestant de ma maîtrise des techniques de machine learning et d'IA appliquées dans l'environnement Datahaiku.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Popup pour afficher les certifications en grand -->
                <div id="certification-popup" class="certification-popup">
                    <div class="popup-content">
                        <span class="close-popup">&times;</span>
                        <div class="popup-image">
                            <img id="popup-img" src="" alt="Certification">
                        </div>
                        <div class="popup-details">
                            <h2 id="popup-title" data-i18n=""></h2>
                            <p id="popup-date" data-i18n=""></p>
                            <p id="popup-description" data-i18n=""></p>
                        </div>
                    </div>
                </div>
            `;

            
            // Trouver l'élément parent où ajouter le contenu des certifications
            const skillsContainer = document.querySelector('.skills .container');
            
            // Ajouter le contenu des certifications après le contenu Tech Stack
            if (skillsContainer) {
                skillsContainer.appendChild(certificationsContent);
                
                // Configurer le popup des certifications
                setupCertificationPopup();
            }
        } else {
            // Si le contenu existe déjà, s'assurer que le popup est configuré
            setupCertificationPopup();
        }
        
        // S'assurer que le contenu des certifications est caché par défaut
        // et ne s'affiche que lorsque l'onglet est actif
        const techStackTab = document.querySelector('[data-tab="tech-stack"]');
        const techStackContent = document.getElementById('tech-stack');
        
        // Ajouter des écouteurs d'événements pour s'assurer que les contenus s'affichent correctement
        techStackTab.addEventListener('click', function() {
            if (certificationsContent) {
                certificationsContent.classList.remove('active');
            }
            if (techStackContent) {
                techStackContent.classList.add('active');
            }
        });
        
        certificationsTab.addEventListener('click', function() {
            if (techStackContent) {
                techStackContent.classList.remove('active');
            }
            if (certificationsContent) {
                certificationsContent.classList.add('active');
            }
        });
    }
});

// Fonction pour configurer le popup des certifications
function setupCertificationPopup() {
    const certificationCards = document.querySelectorAll('.certification-card');
    const popup = document.getElementById('certification-popup');
    const closeBtn = document.querySelector('.close-popup');
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupDate = document.getElementById('popup-date');
    const popupDescription = document.getElementById('popup-description');
    
    if (!popup) return;
    
    // Variable globale pour stocker l'index de la certification actuellement affichée
    window.currentCertificationIndex = 0;
    
    // Ajouter un écouteur d'événement à chaque carte de certification
    certificationCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Récupérer les données de la certification
            const img = this.getAttribute('data-img');
            const certIndex = index + 1; // Index de la certification (1-5)
            
            // Définir les attributs data-i18n pour la traduction
            popupTitle.setAttribute('data-i18n', `cert${certIndex}_title`);
            popupDate.setAttribute('data-i18n', `cert${certIndex}_date`);
            popupDescription.setAttribute('data-i18n', `cert${certIndex}_desc_long`);
            
            // Mettre à jour l'image
            popupImg.src = img;
            
            // Appliquer les traductions immédiatement
            const currentLanguage = localStorage.getItem('preferredLanguage') || 'fr';
            const translations = (currentLanguage === 'fr') ? translationsFR : translationsEN;
            
            // Mettre à jour les textes avec les traductions
            popupTitle.textContent = translations[`cert${certIndex}_title`] || '';
            popupDate.textContent = translations[`cert${certIndex}_date`] || '';
            
            // S'assurer que la description longue est utilisée
            const longDescKey = `cert${certIndex}_desc_long`;
            const shortDescKey = `cert${certIndex}_desc`;
            
            if (translations[longDescKey]) {
                popupDescription.textContent = translations[longDescKey];
            } else if (translations[shortDescKey]) {
                popupDescription.textContent = translations[shortDescKey];
            } else {
                popupDescription.textContent = '';
            }
            
            // Afficher le popup
            popup.classList.add('show');
        });
    });
    
    // Fermer le popup lorsqu'on clique sur le bouton de fermeture
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('show');
        });
    }
    
    // Fermer le popup lorsqu'on clique en dehors du contenu
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.classList.remove('show');
        }
    });
}

// Fonction pour mettre à jour les textes de la popup des certifications
function updateCertificationPopupTexts() {
    const popupTitle = document.getElementById('popup-title');
    const popupDate = document.getElementById('popup-date');
    const popupDescription = document.getElementById('popup-description');
    
    if (!popupTitle || !popupDate || !popupDescription) return;
    
    // Récupérer la langue actuelle
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    const translations = (currentLanguage === 'fr') ? translationsFR : translationsEN;
    
    // Utiliser l'index de la certification actuellement affichée
    const certIndex = window.currentCertificationIndex;
    
    // Mettre à jour les textes avec les traductions
    if (certIndex > 0) {
        if (translations[`cert${certIndex}_title`]) {
            popupTitle.textContent = translations[`cert${certIndex}_title`];
        }
        
        if (translations[`cert${certIndex}_date`]) {
            popupDate.textContent = translations[`cert${certIndex}_date`];
        }
        
        // Utiliser la description longue pour la popup
        if (translations[`cert${certIndex}_desc_long`]) {
            popupDescription.textContent = translations[`cert${certIndex}_desc_long`];
        } else if (translations[`cert${certIndex}_desc`]) {
            // Fallback sur la description courte si la longue n'existe pas
            popupDescription.textContent = translations[`cert${certIndex}_desc`];
        }
    }
}
