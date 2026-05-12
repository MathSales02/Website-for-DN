
    // Evitando conflitos com o WordPress usando IIFE, mas expondo a função dos botões
    (function () {
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        const chatBox = document.getElementById('chat-box');
        const heroSection = document.getElementById('hero-section');

        // Elementos do Histórico e Nova Conversa
        const historyBtn = document.getElementById('historyBtn');
        const newChatBtn = document.getElementById('newChatBtn');
        const historyModal = document.getElementById('historyModal');
        const closeHistoryBtn = document.getElementById('closeHistoryBtn');
        const historyList = document.getElementById('historyList');

        // Elementos do Seletor de Modelo
        const modelToggle = document.getElementById('modelToggle');
        const modelMenu = document.getElementById('modelMenu');
        const currentModelText = document.getElementById('currentModel');
        const modelOptions = document.querySelectorAll('.model-option');
        let currentAiModel = 'turbo'; // padrão

        // Lógica de Sessões e Usuário
        let chatSessions = JSON.parse(localStorage.getItem('dn_chat_sessions') || '[]');
        let currentSessionId = null;

        let userId = localStorage.getItem('dn_user_id');
        if (!userId) {
            userId = 'User-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('dn_user_id', userId);
        }

        // ==================== LÓGICA DO SELETOR DE MODELO ====================
        modelToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            modelMenu.classList.toggle('open');
            modelToggle.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!modelToggle.contains(e.target) && !modelMenu.contains(e.target)) {
                modelMenu.classList.remove('open');
                modelToggle.classList.remove('open');
            }
        });

        modelOptions.forEach(option => {
            option.addEventListener('click', () => {
                modelOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                currentAiModel = option.getAttribute('data-model');
                const name = option.querySelector('.model-name').textContent;
                currentModelText.textContent = name;

                modelMenu.classList.remove('open');
                modelToggle.classList.remove('open');
            });
        });

        // Função para auto-redimensionamento do textarea
        function adjustTextareaHeight() {
            userInput.style.height = '40px';
            const scrollHeight = userInput.scrollHeight;
            const newHeight = Math.max(40, Math.min(scrollHeight, 150));
            userInput.style.height = newHeight + 'px';

            // Ativa/Desativa o botão de envio
            if (userInput.value.trim().length > 0 || (typeof activeCommandValue !== 'undefined' && activeCommandValue !== '')) {
                sendBtn.classList.add('active');
                sendBtn.removeAttribute('disabled');
            } else {
                sendBtn.classList.remove('active');
                sendBtn.setAttribute('disabled', 'true');
            }
        }

        userInput.addEventListener('input', adjustTextareaHeight);

        // Atalho do Enter (sem shift) para enviar
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!sendBtn.disabled) {
                    handleSendMessage();
                }
            }
        });

        sendBtn.addEventListener('click', handleSendMessage);

        // Variável para armazenar o comando selecionado como chip
        let activeCommandValue = '';

        function setCommand(cmd, label) {
            activeCommandValue = cmd;
            const chipText = document.getElementById('commandChipText');
            const chipContainer = document.getElementById('commandChipContainer');

            if (chipText && chipContainer) {
                chipText.textContent = label || cmd;
                chipContainer.style.display = 'flex';
            } else {
                // Fallback se não existir o chip na UI
                userInput.value = cmd + ' ';
            }

            userInput.focus();
            adjustTextareaHeight();
        }

        function clearCommand() {
            activeCommandValue = '';
            const chipContainer = document.getElementById('commandChipContainer');
            if (chipContainer) chipContainer.style.display = 'none';
            adjustTextareaHeight();
        }

        async function handleSendMessage() {
            let text = userInput.value.trim();

            // Anexar o comando se existir
            if (activeCommandValue) {
                text = activeCommandValue + (text.length > 0 ? ' ' + text : '');
            }

            if (!text) return;

            if (text.toLowerCase() === '/limpar' || text.toLowerCase() === '/resetar') {
                localStorage.removeItem('dn_chat_sessions');
                localStorage.removeItem('dn_user_id');
                location.reload();
                return;
            }

            // Se é a primeira mensagem da sessão atual
            if (!currentSessionId) {
                currentSessionId = Date.now();
                chatSessions.push({
                    id: currentSessionId,
                    title: text.substring(0, 30) + (text.length > 30 ? '...' : ''),
                    date: new Date().toLocaleString('pt-BR'),
                    messages: []
                });
            }

            // Se é a primeira mensagem da interface, esconde o hero e mostra o chat
            if (heroSection.style.display !== 'none') {
                heroSection.style.display = 'none';
                chatBox.classList.add('active');
            }

            // Adiciona mensagem do usuário
            appendMessage(text, 'user');

            // Limpa input e o chip
            userInput.value = '';
            clearCommand();
            adjustTextareaHeight();

            // Adiciona indicador de digitação
            const typingId = 'typing-' + Date.now();
            showTypingIndicator(typingId);

            try {
                // Configurações específicas por modelo para ajudar o N8N a ser mais rápido/inteligente
                let systemPrompt = "";
                let temperature = 0.7;

                if (currentAiModel === 'turbo') {
                    systemPrompt = "Você é o Denis Turbo. Responda da forma mais RÁPIDA, DIRETA e CURTA possível. Sem enrolação. Foque na eficiência.";
                    temperature = 0.3; // Menos criatividade, mais exatidão e velocidade
                } else {
                    systemPrompt = "Você é o Denis Pro. Atue como um consultor sênior. Pense passo a passo, forneça detalhes, análises profundas e resolva problemas complexos de forma completa.";
                    temperature = 0.8; // Mais criatividade e profundidade
                }

                // Chamada real ao webhook do N8N
                const response = await fetch('https://n8n.agenciadnegocios.com/webhook/atendimento-site-teste', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        question: text,
                        phone: userId, // Identificador fixo do usuário para ele lembrar o nome/dados
                        sessionId: 'Session-' + currentSessionId, // Identificador da conversa atual para não misturar assuntos
                        model: currentAiModel,
                        system_prompt: systemPrompt,
                        temperature: temperature
                    })
                });

                const data = await response.json();
                removeTypingIndicator(typingId);

                if (data.text) {
                    let cleanText = data.text.replace("HANDOFF_AGORA", "Perfeito! O Denis já foi notificado e entrará em contato com você em breve.");
                    appendMessage(cleanText.replace(/\n/g, '<br>'), 'bot');
                }

            } catch (e) {
                removeTypingIndicator(typingId);
                appendMessage('Ops! Tivemos um problema de conexão. Tente novamente em instantes.', 'bot');
            }
        }

        function saveMessage(htmlContent, sender) {
            if (!currentSessionId) return;

            const sessionIndex = chatSessions.findIndex(s => s.id === currentSessionId);
            if (sessionIndex !== -1) {
                chatSessions[sessionIndex].messages.push({ html: htmlContent, sender: sender });
                localStorage.setItem('dn_chat_sessions', JSON.stringify(chatSessions));
            }
        }

        function appendMessage(htmlContent, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `msg ${sender}`;
            msgDiv.innerHTML = htmlContent;
            chatBox.appendChild(msgDiv);
            chatBox.scrollTop = chatBox.scrollHeight;

            saveMessage(htmlContent, sender);
        }

        function showTypingIndicator(id) {
            const typingHtml = `
        <div id="${id}" class="typing-indicator">
            <div class="typing-avatar">DN</div>
            <div class="typing-text">
                Denis está digitando
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>
    `;
            chatBox.insertAdjacentHTML('beforeend', typingHtml);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function removeTypingIndicator(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
        }

        // ==================== LÓGICA DO MODAL DE HISTÓRICO ====================

        function openHistoryModal() {
            historyModal.classList.add('active');
            renderHistoryList();
        }

        function closeHistoryModal() {
            historyModal.classList.remove('active');
        }

        function loadSession(sessionId) {
            const session = chatSessions.find(s => s.id === sessionId);
            if (!session) return;

            currentSessionId = session.id;

            // Limpar chat atual (mantendo apenas a primeira mensagem do bot)
            chatBox.innerHTML = `
        <div class="msg bot">
            Olá! Tudo bem? Eu sou o Denis, assistente virtual da Agência D' Negócios. Como posso ajudar você a impulsionar seu negócio hoje?
        </div>
    `;

            // Renderizar mensagens da sessão
            session.messages.forEach(msg => {
                const msgDiv = document.createElement('div');
                msgDiv.className = `msg ${msg.sender}`;
                msgDiv.innerHTML = msg.html;
                chatBox.appendChild(msgDiv);
            });

            // Mudar UI
            heroSection.style.display = 'none';
            chatBox.classList.add('active');
            setTimeout(() => chatBox.scrollTop = chatBox.scrollHeight, 50);

            closeHistoryModal();
        }

        function renderHistoryList() {
            historyList.innerHTML = '';

            if (chatSessions.length === 0) {
                historyList.innerHTML = '<div class="empty-history">Nenhum histórico encontrado.</div>';
                return;
            }

            // Ordenar da mais recente para a mais antiga
            const sortedSessions = [...chatSessions].sort((a, b) => b.id - a.id);

            sortedSessions.forEach(session => {
                const div = document.createElement('div');
                div.className = 'history-item';
                div.onclick = () => loadSession(session.id);

                div.innerHTML = `
            <div class="history-title">"${session.title}"</div>
            <div class="history-date">${session.date}</div>
        `;
                historyList.appendChild(div);
            });
        }

        function startNewChat() {
            currentSessionId = null;
            chatBox.innerHTML = `
        <div class="msg bot">
            Olá! Tudo bem? Eu sou o Denis, assistente virtual da Agência D' Negócios. Como posso ajudar você a impulsionar seu negócio hoje?
        </div>
    `;
            chatBox.classList.remove('active');
            heroSection.style.display = 'flex';
            userInput.value = '';
            adjustTextareaHeight();
        }

        historyBtn.addEventListener('click', openHistoryModal);
        newChatBtn.addEventListener('click', startNewChat);
        closeHistoryBtn.addEventListener('click', closeHistoryModal);

        // Fechar modal clicando fora
        historyModal.addEventListener('click', (e) => {
            if (e.target === historyModal) {
                closeHistoryModal();
            }
        });

        // ==================== LÓGICA DE RECONHECIMENTO DE VOZ ====================
        const micBtn = document.getElementById('micBtn');
        const recordingLoader = document.getElementById('recordingLoader');
        let recognition;
        let isRecording = false;

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'pt-BR';

            recognition.onstart = function () {
                isRecording = true;
                micBtn.classList.add('recording');
                userInput.placeholder = "Ouvindo...";
                recordingLoader.classList.add('active');
            };

            recognition.onresult = function (event) {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                // Se for final, adiciona ao input
                if (finalTranscript) {
                    const currentVal = userInput.value;
                    userInput.value = currentVal + (currentVal.endsWith(' ') || currentVal.length === 0 ? '' : ' ') + finalTranscript;
                    adjustTextareaHeight();
                }
            };

            recognition.onerror = function (event) {
                console.error('Erro de reconhecimento:', event.error);
                stopRecording();
            };

            recognition.onend = function () {
                stopRecording();
            };

        } else {
            // Se não for suportado, avisamos o usuário no clique
        }

        function stopRecording() {
            isRecording = false;
            if (micBtn) micBtn.classList.remove('recording');
            userInput.placeholder = "Escreva aqui...";
            recordingLoader.classList.remove('active');
        }

        if (micBtn) {
            micBtn.addEventListener('click', () => {
                if (!recognition) {
                    alert('A gravação de áudio nativa não é suportada pelo seu navegador atual. Tente usar o Google Chrome ou Microsoft Edge.');
                    return;
                }

                if (isRecording) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            });
        }

        window.setCommand = setCommand;
        window.clearCommand = clearCommand;
    })();
