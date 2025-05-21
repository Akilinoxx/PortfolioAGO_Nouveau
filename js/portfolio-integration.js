/**
 * Intégration de l'Agent Conversationnel CV pour le portfolio d'Antoine Goupil
 * https://akilinoxx.github.io/PortfolioAGO_Nouveau/
 */

document.addEventListener('DOMContentLoaded', function() {
    // Créer le conteneur du chatbot s'il n'existe pas déjà
    let chatbotContainer = document.getElementById('cv-chatbot-container');
    if (!chatbotContainer) {
        chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'cv-chatbot-container';
        document.body.appendChild(chatbotContainer);
        
        // Appliquer des styles au conteneur
        Object.assign(chatbotContainer.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '350px',
            height: '500px',
            zIndex: '1000',
            pointerEvents: 'auto' // S'assurer que les interactions sont activées par défaut
        });
    }
    
    // Créer la structure HTML du chatbot
    chatbotContainer.innerHTML = `
        <div class="cv-chatbot" style="display: flex; flex-direction: column; height: 100%; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); background-color: #fff;">
            <div class="cv-chatbot-header" style="padding: 15px; background-color: #007bff; color: #fff; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
                <div>AGENT IA d'Antoine</div>
                <button class="cv-chatbot-toggle-minimize" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 16px;">−</button>
            </div>
            <div class="cv-chatbot-suggested-questions" style="padding: 10px; background-color: #f0f8ff; display: flex; flex-wrap: wrap; gap: 8px; border-bottom: 1px solid #e0e0e0;">
                <button class="cv-chatbot-question-pill" style="background-color: #e6f2ff; color: #0066cc; border: 1px solid #99ccff; border-radius: 16px; padding: 6px 12px; font-size: 12px; cursor: pointer; transition: all 0.2s;">Quelles sont vos compétences techniques ?</button>
                <button class="cv-chatbot-question-pill" style="background-color: #e6f2ff; color: #0066cc; border: 1px solid #99ccff; border-radius: 16px; padding: 6px 12px; font-size: 12px; cursor: pointer; transition: all 0.2s;">Parlez-moi de votre expérience professionnelle</button>
                <button class="cv-chatbot-question-pill" style="background-color: #e6f2ff; color: #0066cc; border: 1px solid #99ccff; border-radius: 16px; padding: 6px 12px; font-size: 12px; cursor: pointer; transition: all 0.2s;">Quelle est votre formation ?</button>
                <button class="cv-chatbot-question-pill" style="background-color: #e6f2ff; color: #0066cc; border: 1px solid #99ccff; border-radius: 16px; padding: 6px 12px; font-size: 12px; cursor: pointer; transition: all 0.2s;">Quels sont vos projets récents ?</button>
            </div>
            <div class="cv-chatbot-messages" style="flex: 1; overflow-y: auto; padding: 15px; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div class="cv-chatbot-message agent" style="background-color: #e9ecef; color: #333; padding: 10px 15px; border-radius: 18px; margin-bottom: 10px; max-width: 80%; align-self: flex-start; border-bottom-left-radius: 4px; font-size: 14px; line-height: 1.4;">
                    Bonjour ! Je suis l'assistant virtuel d'Antoine Goupil. N'hésitez pas à me poser des questions sur ses compétences, son expérience, sa formation ou ses projets.
                </div>
            </div>
            <div class="cv-chatbot-input" style="display: flex; padding: 10px; background-color: #fff; border-top: 1px solid #ddd;">
                <input type="text" placeholder="Posez votre question ici..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none;">
                <button style="background-color: #007bff; color: white; border: none; border-radius: 20px; padding: 10px 15px; margin-left: 10px; cursor: pointer;">Envoyer</button>
            </div>
        </div>
        <button class="cv-chatbot-toggle-open" style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; background-color: #007bff; color: white; border: none; box-shadow: 0 2px 10px rgba(0,0,0,0.2); cursor: pointer; font-size: 24px; display: none; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
    `;
    
    // Récupérer les références aux éléments
    const chatWindow = chatbotContainer.querySelector('.cv-chatbot');
    const chatMessages = chatbotContainer.querySelector('.cv-chatbot-messages');
    const chatInput = chatbotContainer.querySelector('.cv-chatbot-input input');
    const sendButton = chatbotContainer.querySelector('.cv-chatbot-input button');
    const openButton = chatbotContainer.querySelector('.cv-chatbot-toggle-open');
    const minimizeButton = chatbotContainer.querySelector('.cv-chatbot-toggle-minimize');
    
    // URL de l'API déployée sur Render
    const API_URL = 'https://agent-conversationnel-cv-1.onrender.com/api/chat/stream';
    
    // Fonction pour convertir le texte Markdown en HTML
    function markdownToHtml(text) {
        // Convertir les **texte** en <strong>texte</strong> pour le gras
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convertir les *texte* en <em>texte</em> pour l'italique
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convertir les `texte` en <code>texte</code> pour le code
        text = text.replace(/`(.*?)`/g, '<code style="background-color: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>');
        
        // Convertir les liens [texte](url) en <a href="url">texte</a>
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: inherit; text-decoration: underline;">$1</a>');
        
        // Convertir les sauts de ligne en <br>
        text = text.replace(/\n/g, '<br>');
        
        return text;
    }
    
    // Fonction pour ajouter un message dans la conversation
    function addMessage(content, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('cv-chatbot-message');
        messageElement.classList.add(isUser ? 'user' : 'agent');
        
        // Appliquer les styles en fonction du type de message
        Object.assign(messageElement.style, {
            backgroundColor: isUser ? '#007bff' : '#e9ecef',
            color: isUser ? '#fff' : '#333',
            padding: '10px 15px',
            borderRadius: '18px',
            marginBottom: '10px',
            maxWidth: '80%',
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            fontSize: '14px',  // Taille de police réduite
            lineHeight: '1.4'   // Interligne amélioré
        });
        
        // Ajuster les coins pour indiquer la direction
        if (isUser) {
            messageElement.style.borderBottomRightRadius = '4px';
            messageElement.style.marginLeft = 'auto';
        } else {
            messageElement.style.borderBottomLeftRadius = '4px';
        }
        
        // Convertir le contenu Markdown en HTML si ce n'est pas un message utilisateur
        if (!isUser) {
            messageElement.innerHTML = markdownToHtml(content);
        } else {
            messageElement.textContent = content;
        }
        
        chatMessages.appendChild(messageElement);
        
        // Faire défiler vers le bas
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Fonction pour ajouter l'indicateur de frappe
    function addTypingIndicator() {
        const indicatorElement = document.createElement('div');
        indicatorElement.id = 'cv-chatbot-typing-indicator';
        indicatorElement.classList.add('cv-chatbot-message', 'agent');
        
        // Appliquer les styles
        Object.assign(indicatorElement.style, {
            backgroundColor: '#e9ecef',
            color: '#333',
            padding: '10px 15px',
            borderRadius: '18px',
            marginBottom: '10px',
            maxWidth: '80%',
            alignSelf: 'flex-start',
            borderBottomLeftRadius: '4px'
        });
        
        // Créer l'animation de frappe
        indicatorElement.innerHTML = `
            <div style="display: inline-block; width: 50px; height: 20px; position: relative;">
                <span style="display: inline-block; width: 8px; height: 8px; background-color: #888; border-radius: 50%; margin: 0 2px; animation: typing 1.4s infinite both;"></span>
                <span style="display: inline-block; width: 8px; height: 8px; background-color: #888; border-radius: 50%; margin: 0 2px; animation: typing 1.4s infinite both; animation-delay: 0.2s;"></span>
                <span style="display: inline-block; width: 8px; height: 8px; background-color: #888; border-radius: 50%; margin: 0 2px; animation: typing 1.4s infinite both; animation-delay: 0.4s;"></span>
            </div>
        `;
        
        // Ajouter l'animation CSS si elle n'existe pas déjà
        if (!document.getElementById('cv-chatbot-typing-animation')) {
            const style = document.createElement('style');
            style.id = 'cv-chatbot-typing-animation';
            style.textContent = `
                @keyframes typing {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                    100% { transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        chatMessages.appendChild(indicatorElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Fonction pour supprimer l'indicateur de frappe
    function removeTypingIndicator() {
        const indicator = document.getElementById('cv-chatbot-typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Fonction pour envoyer une question à l'API
    async function sendQuestion(question) {
        // Désactiver l'entrée utilisateur pendant la génération de la réponse
        chatInput.disabled = true;
        sendButton.disabled = true;
        
        // Ajouter la question de l'utilisateur
        addMessage(question, true);
        
        // Ajouter l'indicateur de frappe
        addTypingIndicator();
        
        try {
            // Préparer la requête
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: question,
                    streaming: true
                })
            });
            
            // Vérifier si la requête a réussi
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            // Créer un lecteur pour le flux de données
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            
            // Supprimer l'indicateur de frappe
            removeTypingIndicator();
            
            // Créer un élément pour la réponse de l'agent
            const agentMessageElement = document.createElement('div');
            agentMessageElement.classList.add('cv-chatbot-message', 'agent');
            
            // Appliquer les styles
            Object.assign(agentMessageElement.style, {
                backgroundColor: '#e9ecef',
                color: '#333',
                padding: '10px 15px',
                borderRadius: '18px',
                marginBottom: '10px',
                maxWidth: '80%',
                alignSelf: 'flex-start',
                borderBottomLeftRadius: '4px',
                fontSize: '14px',  // Taille de police réduite
                lineHeight: '1.4'   // Interligne amélioré
            });
            
            chatMessages.appendChild(agentMessageElement);
            
            // Lire le flux de données
            let agentResponse = '';
            
            while (true) {
                const { value, done } = await reader.read();
                
                if (done) {
                    break;
                }
                
                // Décoder les données
                const chunk = decoder.decode(value);
                
                // Traiter les lignes de données
                const lines = chunk.split('\n\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.substring(6));
                            
                            if (data.content) {
                                agentResponse += data.content;
                                agentMessageElement.innerHTML = markdownToHtml(agentResponse);
                                chatMessages.scrollTop = chatMessages.scrollHeight;
                            }
                            
                            if (data.done) {
                                break;
                            }
                        } catch (e) {
                            console.error('Erreur de parsing JSON:', e);
                        }
                    }
                }
            }
            
            // Réactiver l'entrée utilisateur après avoir reçu la réponse complète
            chatInput.disabled = false;
            sendButton.disabled = false;
            chatInput.focus();
            
        } catch (error) {
            console.error('Erreur lors de la communication avec l\'API:', error);
            removeTypingIndicator();
            addMessage('Désolé, une erreur est survenue lors de la communication avec l\'API.', false);
            
            // Réactiver l'entrée utilisateur
            chatInput.disabled = false;
            sendButton.disabled = false;
            chatInput.focus();
        }
    }
    
    // Gestionnaire d'événement pour le bouton d'envoi
    sendButton.addEventListener('click', function() {
        const question = chatInput.value.trim();
        if (question) {
            sendQuestion(question);
            chatInput.value = '';
        }
    });
    
    // Gestionnaire d'événement pour la touche Entrée
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const question = chatInput.value.trim();
            if (question) {
                sendQuestion(question);
                chatInput.value = '';
            }
        }
    });
    
    // Gestionnaire d'événement pour les questions préremplies
    const questionPills = chatbotContainer.querySelectorAll('.cv-chatbot-question-pill');
    questionPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const question = this.textContent.trim();
            sendQuestion(question);
            
            // Effet visuel au clic
            this.style.backgroundColor = '#cce5ff';
            this.style.transform = 'scale(0.95)';
            
            // Réinitialiser l'apparence après un court délai
            setTimeout(() => {
                this.style.backgroundColor = '#e6f2ff';
                this.style.transform = 'scale(1)';
            }, 300);
        });
        
        // Effet de survol
        pill.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#d4e9ff';
            this.style.transform = 'scale(1.03)';
        });
        
        pill.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#e6f2ff';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Gestionnaire d'événement pour le bouton d'ouverture
    openButton.addEventListener('click', function() {
        chatWindow.style.display = 'flex';
        openButton.style.display = 'none';
        // Réactiver les interactions avec le conteneur du chatbot
        chatbotContainer.style.pointerEvents = 'auto';
        chatInput.focus();
    });
    
    // Gestionnaire d'événement pour le bouton de minimisation
    minimizeButton.addEventListener('click', function() {
        chatWindow.style.display = 'none';
        openButton.style.display = 'flex';
        // Désactiver le conteneur du chatbot pour permettre les interactions avec les éléments sous-jacents
        chatbotContainer.style.pointerEvents = 'none';
        // S'assurer que le bouton d'ouverture reste cliquable
        openButton.style.pointerEvents = 'auto';
    });
});
