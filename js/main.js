(function () {
                    var wrapper = document.getElementById('img-comparison-wrapper');
                    if (!wrapper) return;
                    var before = document.getElementById('img-before');
                    var after = document.getElementById('img-after');
                    var divider = document.getElementById('img-divider');
                    var isDragging = false;

                    function setPosition(pct) {
                        pct = Math.min(Math.max(pct, 0), 100);
                        before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
                        after.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
                        divider.style.left = pct + '%';
                    }

                    function getPercent(e) {
                        var rect = wrapper.getBoundingClientRect();
                        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
                        return ((clientX - rect.left) / rect.width) * 100;
                    }

                    divider.addEventListener('mousedown', function (e) { isDragging = true; e.preventDefault(); });
                    wrapper.addEventListener('mousemove', function (e) { if (isDragging) setPosition(getPercent(e)); });
                    document.addEventListener('mouseup', function () { isDragging = false; });
                    divider.addEventListener('touchstart', function (e) { isDragging = true; }, { passive: true });
                    wrapper.addEventListener('touchmove', function (e) { if (isDragging) { if(e.cancelable) e.preventDefault(); setPosition(getPercent(e)); } }, { passive: false });
                    document.addEventListener('touchend', function () { isDragging = false; });
                })();
        


                function initNetworkSection() {
                    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                        setTimeout(initNetworkSection, 100);
                        return;
                    }

                    const section = document.getElementById('globe-section');
                    const bg = document.getElementById('globe-bg');
                    const content = document.getElementById('globe-content');

                    // Set initial opacity to 0 so text doesn't show before the white circle expands
                    gsap.set(content, { opacity: 0 });

                    const isMobile = window.innerWidth < 768;

                    if (isMobile) {
                        // Mobile: animate circle expansion on scroll-enter (NO pin)
                        ScrollTrigger.create({
                            trigger: section,
                            start: 'top 70%',
                            once: true,
                            onEnter: function() {
                                gsap.timeline()
                                    .to(bg, { clipPath: 'circle(150% at center)', duration: 1.2, ease: 'power2.inOut' })
                                    .to(content, { opacity: 1, duration: 0.6, ease: 'power1.out' }, '-=0.4');
                            }
                        });
                    } else {
                        // Desktop: full pinned reveal animation
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: section,
                                start: 'top top',
                                end: '+=200%',
                                scrub: true,
                                pin: true
                            }
                        });
                        tl.to(bg, { clipPath: 'circle(150% at center)', duration: 1, ease: 'power2.inOut' });
                        tl.to(content, { opacity: 1, duration: 0.5, ease: 'power1.out' }, "-=0.5");
                        tl.to({}, { duration: 1 });
                        tl.to(content, { opacity: 0, duration: 0.5, ease: 'power1.out' });
                        tl.to(bg, { clipPath: 'circle(0% at center)', duration: 1, ease: 'power2.inOut' }, "-=0.2");
                    }
                }

                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', initNetworkSection);
                } else {
                    initNetworkSection();
                }
            


                (function () {
                    function initMarketingQuote() {
                        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                            setTimeout(initMarketingQuote, 100);
                            return;
                        }

                        var section = document.getElementById('marketing-quote-section');
                        var line    = document.getElementById('mq-line');
                        var lineBot = document.getElementById('mq-line-bottom');
                        var label   = document.getElementById('mq-label');
                        var text    = document.getElementById('mq-text');
                        var sub     = document.getElementById('mq-sub');
                        var stats   = document.getElementById('mq-stats');
                        var stat1   = document.getElementById('mq-stat-1');
                        var stat2   = document.getElementById('mq-stat-2');
                        var stat3   = document.getElementById('mq-stat-3');

                        /* ---- SET INITIAL STATES ---- */
                        // Start text massive to create "coming through the text" effect
                        // Reduced from 50 to 15 to prevent GPU clipping and text cut-off
                        gsap.set(text, { scale: 15, opacity: 0, transformOrigin: "50% 50%" });
                        
                        /* ---- SCRUB TIMELINE WITH PINNING ---- */
                        var tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: section,
                                start: 'top top',
                                end: '+=200%',
                                scrub: 1,
                                pin: true
                            }
                        });

                        // 1. Text fades in slightly while massive
                        tl.to(text, { opacity: 1, duration: 0.5 }, 0);
                        
                        // 2. Text zooms out to normal scale
                        tl.to(text, { scale: 1, duration: 2.5, ease: 'power3.inOut' }, 0);

                        // 3. Reveal surrounding elements right as the text lands
                        tl.to(line,  { width: '100%', duration: 0.8, ease: 'power2.out' }, 1.8);
                        tl.to(label, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.0);
                        tl.to(sub,   { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 2.2);
                        tl.to(stats, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 2.4);
                        tl.to(lineBot, { width: '60%', duration: 0.8, ease: 'power2.out' }, 2.6);

                        /* ---- FLOATING NOS STATS (loop infinito independente do scroll) ---- */
                        /* Inicia após o primeiro trigger */
                        ScrollTrigger.create({
                            trigger: section,
                            start: 'top 85%',
                            once: true,
                            onEnter: function () {
                                /* Stat 1 — sobe primeiro */
                                gsap.to(stat1, {
                                    y: -12,
                                    duration: 2.2,
                                    ease: 'sine.inOut',
                                    yoyo: true,
                                    repeat: -1,
                                    delay: 0
                                });
                                /* Stat 2 — fase diferente */
                                gsap.to(stat2, {
                                    y: -10,
                                    duration: 2.8,
                                    ease: 'sine.inOut',
                                    yoyo: true,
                                    repeat: -1,
                                    delay: 0.7
                                });
                                /* Stat 3 — fase mais lenta */
                                gsap.to(stat3, {
                                    y: -14,
                                    duration: 2.5,
                                    ease: 'sine.inOut',
                                    yoyo: true,
                                    repeat: -1,
                                    delay: 1.4
                                });
                            }
                        });
                    }
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', initMarketingQuote);
                    } else {
                        initMarketingQuote();
                    }
                })();
            

        // Force scroll to top on refresh
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis for smooth scroll
        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Initial load animation for the intro text
        gsap.set("#intro-logo", { scale: 8, opacity: 0 });
        
        const tlLoad = gsap.timeline();
        tlLoad.to("#intro-text-container h2", { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 })
              .to("#intro-text-container h1", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")
              .to("#intro-scroll-indicator", { opacity: 1, duration: 1 }, "-=0.4");

        // Hide header initially
        gsap.set("header", { opacity: 0, y: -50, pointerEvents: "none" });

        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            let { isMobile } = context.conditions;

            if (isMobile) {
                // Mobile: animate the intro without scroll-pinning (avoids scroll lock)
                gsap.to("#intro-text-container", { scale: 1.15, opacity: 0, duration: 0.8, delay: 1.5, ease: "power2.in" });
                gsap.to("#intro-logo", { opacity: 1, scale: 1, duration: 1.2, delay: 1.8, ease: "power3.inOut" });
                gsap.to("#intro-sequence", {
                    opacity: 0, duration: 0.8, delay: 3.0, ease: "none",
                    onComplete: function() {
                        var el = document.getElementById('intro-sequence');
                        if (el) { el.style.pointerEvents = 'none'; el.style.display = 'none'; }
                    }
                });
                gsap.to("header", { opacity: 1, y: 0, duration: 0.8, delay: 3.0, ease: "power2.out", pointerEvents: "auto" });
            } else {
                // Desktop: full scroll-pinned intro sequence
                const tlScroll = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#hero-geometric",
                        start: "top top",
                        end: "+=150%",
                        scrub: 1,
                        pin: true,
                        pinSpacing: true
                    }
                });
                tlScroll.to("#intro-text-container", { scale: 1.5, opacity: 0, duration: 1, ease: "power2.in" }, 0);
                tlScroll.to("#intro-logo", { opacity: 0.8, duration: 1 }, 0);
                tlScroll.to("#intro-logo", { scale: 1, opacity: 1, duration: 2, ease: "power3.inOut" }, 1);
                tlScroll.to("#intro-sequence", { opacity: 0, duration: 0.8, ease: "none", pointerEvents: "none" }, 3);
                tlScroll.to("header", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", pointerEvents: "auto" }, 3);
            }
        });

        // Hero Geometric Entry Animation
        gsap.to(".hero-fade-up", {
            scrollTrigger: {
                trigger: "#hero-geometric",
                start: "top 60%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Horizontal Scroll Animation
        const hContainer = document.querySelector("#horizontal-scroll-container");
        const hPanels = document.querySelector("#horizontal-panels");

        if (hContainer && hPanels) {
            gsap.to(hPanels, {
                x: () => -(hPanels.scrollWidth - window.innerWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: hContainer,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    end: () => "+=" + (hPanels.scrollWidth - window.innerWidth)
                }
            });
        }

        // Services Section Animation
        const serviceCards = gsap.utils.toArray("#services-section .glass-card");
        if (serviceCards.length > 0) {
            gsap.fromTo(serviceCards,
                { y: 100, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: "#services-section",
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out"
                }
            );
        }

        // Services Button Animation
        gsap.to(".service-btn-fade", {
            scrollTrigger: {
                trigger: "#services-section",
                start: "top 40%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        });

        // Benefits Section Animation
        const benefitCards = gsap.utils.toArray("#benefits-section .glass-card");
        if (benefitCards.length > 0) {
            gsap.fromTo(benefitCards,
                { y: 100, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: "#benefits-section",
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out"
                }
            );
        }
    


        (function () {
            // Toggle Logic
            const widgetToggle = document.getElementById('chat-widget-toggle');
            const appWrapper = document.getElementById('dn-app-wrapper');
            const closeChatBtn = document.getElementById('closeChatBtn');
            let isChatOpen = false;

            function toggleChat() {
                isChatOpen = !isChatOpen;
                if (isChatOpen) {
                    appWrapper.classList.add('open');
                    widgetToggle.style.transform = 'scale(0)';
                } else {
                    appWrapper.classList.remove('open');
                    widgetToggle.style.transform = 'scale(1)';
                }
            }

            widgetToggle.addEventListener('click', toggleChat);
            closeChatBtn.addEventListener('click', toggleChat);

            // Chat Logic
            const userInput = document.getElementById('userInput');
            const sendBtn = document.getElementById('sendBtn');
            const chatBox = document.getElementById('chat-box');
            const heroSection = document.getElementById('chat-hero-section');

            const historyBtn = document.getElementById('historyBtn');
            const newChatBtn = document.getElementById('newChatBtn');
            const historyModal = document.getElementById('historyModal');
            const closeHistoryBtn = document.getElementById('closeHistoryBtn');
            const historyList = document.getElementById('historyList');

            const modelToggle = document.getElementById('modelToggle');
            const modelMenu = document.getElementById('modelMenu');
            const currentModelText = document.getElementById('currentModel');
            const modelOptions = document.querySelectorAll('.model-option');
            let currentAiModel = 'turbo';

            let chatSessions = JSON.parse(localStorage.getItem('dn_chat_sessions') || '[]');
            let currentSessionId = null;

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
                    currentModelText.textContent = option.querySelector('.model-name').textContent;
                    modelMenu.classList.remove('open');
                    modelToggle.classList.remove('open');
                });
            });

            function adjustTextareaHeight() {
                userInput.style.height = '40px';
                const newHeight = Math.max(40, Math.min(userInput.scrollHeight, 100));
                userInput.style.height = newHeight + 'px';
                if (userInput.value.trim().length > 0) {
                    sendBtn.classList.add('active');
                    sendBtn.removeAttribute('disabled');
                } else {
                    sendBtn.classList.remove('active');
                    sendBtn.setAttribute('disabled', 'true');
                }
            }

            userInput.addEventListener('input', adjustTextareaHeight);

            userInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!sendBtn.disabled) handleSendMessage();
                }
            });

            sendBtn.addEventListener('click', handleSendMessage);

            window.setCommand = function (cmd) {
                userInput.value = cmd + ' ';
                userInput.focus();
                adjustTextareaHeight();
            }

            async function handleSendMessage() {
                const text = userInput.value.trim();
                if (!text) return;

                if (text.toLowerCase() === '/limpar') {
                    localStorage.removeItem('dn_chat_sessions');
                    location.reload();
                    return;
                }

                if (!currentSessionId) {
                    currentSessionId = Date.now();
                    chatSessions.push({ id: currentSessionId, title: text.substring(0, 30) + '...', date: new Date().toLocaleString('pt-BR'), messages: [] });
                }

                if (heroSection.style.display !== 'none') {
                    heroSection.style.display = 'none';
                    chatBox.classList.add('active');
                }

                appendMessage(text, 'user');
                userInput.value = '';
                adjustTextareaHeight();

                const typingId = 'typing-' + Date.now();
                showTypingIndicator(typingId);

                try {
                    const response = await fetch('https://n8n.agenciadnegocios.com/webhook/atendimento-site-teste', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ question: text, phone: 'Web-Client-DN', model: currentAiModel })
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
                    <div class="typing-text">Denis está digitando<div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>
                </div>`;
                chatBox.insertAdjacentHTML('beforeend', typingHtml);
                chatBox.scrollTop = chatBox.scrollHeight;
            }

            function removeTypingIndicator(id) {
                const el = document.getElementById(id);
                if (el) el.remove();
            }

            function openHistoryModal() { historyModal.classList.add('active'); renderHistoryList(); }
            function closeHistoryModal() { historyModal.classList.remove('active'); }

            function loadSession(sessionId) {
                const session = chatSessions.find(s => s.id === sessionId);
                if (!session) return;
                currentSessionId = session.id;
                chatBox.innerHTML = `<div class="msg bot">Olá! Tudo bem? Eu sou o Denis, assistente virtual da Agência D' Negócios. Como posso ajudar você a impulsionar seu negócio hoje?</div>`;
                session.messages.forEach(msg => {
                    const msgDiv = document.createElement('div');
                    msgDiv.className = `msg ${msg.sender}`;
                    msgDiv.innerHTML = msg.html;
                    chatBox.appendChild(msgDiv);
                });
                heroSection.style.display = 'none';
                chatBox.classList.add('active');
                setTimeout(() => chatBox.scrollTop = chatBox.scrollHeight, 50);
                closeHistoryModal();
            }

            function renderHistoryList() {
                historyList.innerHTML = '';
                if (chatSessions.length === 0) { historyList.innerHTML = '<div class="empty-history">Nenhum histórico encontrado.</div>'; return; }
                const sortedSessions = [...chatSessions].sort((a, b) => b.id - a.id);
                sortedSessions.forEach(session => {
                    const div = document.createElement('div');
                    div.className = 'history-item';
                    div.onclick = () => loadSession(session.id);
                    div.innerHTML = `<div class="history-title">"${session.title}"</div><div class="history-date">${session.date}</div>`;
                    historyList.appendChild(div);
                });
            }

            function startNewChat() {
                currentSessionId = null;
                chatBox.innerHTML = `<div class="msg bot">Olá! Tudo bem? Eu sou o Denis, assistente virtual da Agência D' Negócios. Como posso ajudar você a impulsionar seu negócio hoje?</div>`;
                chatBox.classList.remove('active');
                heroSection.style.display = 'flex';
                userInput.value = '';
                adjustTextareaHeight();
            }

            historyBtn.addEventListener('click', openHistoryModal);
            newChatBtn.addEventListener('click', startNewChat);
            closeHistoryBtn.addEventListener('click', closeHistoryModal);
            historyModal.addEventListener('click', (e) => { if (e.target === historyModal) closeHistoryModal(); });

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
                    let finalTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
                    }
                    if (finalTranscript) {
                        const currentVal = userInput.value;
                        userInput.value = currentVal + (currentVal.endsWith(' ') || currentVal.length === 0 ? '' : ' ') + finalTranscript;
                        adjustTextareaHeight();
                    }
                };
                recognition.onerror = function (event) { stopRecording(); };
                recognition.onend = function () { stopRecording(); };
            }

            function stopRecording() {
                isRecording = false;
                if (micBtn) micBtn.classList.remove('recording');
                userInput.placeholder = "Escreva aqui...";
                recordingLoader.classList.remove('active');
            }

            if (micBtn) {
                micBtn.addEventListener('click', () => {
                    if (!recognition) { alert('A gravação nativa não é suportada pelo seu navegador atual.'); return; }
                    if (isRecording) recognition.stop();
                    else recognition.start();
                });
            }
        })();

        // About Timeline Animation
        (function() {
            function initAboutTimeline() {
                if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                    setTimeout(initAboutTimeline, 100);
                    return;
                }

                var section = document.getElementById('about-timeline-section');
                if (!section) return;

                var progress = document.getElementById('timeline-progress');
                var items = gsap.utils.toArray('#about-timeline-section .timeline-item');

                var tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: '+=250%',
                        scrub: 1,
                        pin: true
                    }
                });

                // Animate line growing
                tl.to(progress, { height: '100%', ease: 'none', duration: 100 }, 0);

                // Animate each item
                items.forEach(function(item, index) {
                    var startTime = (index + 1) * (100 / (items.length + 1));
                    tl.fromTo(item, 
                        { opacity: 0, y: 50 }, 
                        { opacity: 1, y: 0, duration: 15, ease: 'power2.out' }, 
                        startTime - 15
                    );
                });
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initAboutTimeline);
            } else {
                initAboutTimeline();
            }
        })();

        // --- Custom Cursor & Magnetic Buttons ---
        (function() {
            if (window.innerWidth < 1024) return; // Only on Desktop

            const cursor = document.getElementById('custom-cursor');
            const follower = document.getElementById('cursor-follower');
            
            if(!cursor || !follower) return;

            let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

            gsap.ticker.add(() => {
                followerX += (mouseX - followerX) * 0.15;
                followerY += (mouseY - followerY) * 0.15;
                gsap.set(follower, { x: followerX, y: followerY });
            });

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                gsap.set(cursor, { x: mouseX, y: mouseY });
            });

            // Expand cursor on hoverable elements
            const hoverables = document.querySelectorAll('a, button, details summary');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(cursor, { scale: 3, duration: 0.3, backgroundColor: 'rgba(255, 255, 255, 0.5)' });
                    gsap.to(follower, { scale: 1.5, borderColor: 'rgba(255,255,255,0.2)', duration: 0.3 });
                });
                el.addEventListener('mouseleave', () => {
                    gsap.to(cursor, { scale: 1, duration: 0.3, backgroundColor: '#2f6b65' });
                    gsap.to(follower, { scale: 1, borderColor: 'rgba(47,107,101,0.5)', duration: 0.3 });
                });
            });

            // Magnetic Buttons
            const magneticBtns = document.querySelectorAll('.magnetic-btn');
            magneticBtns.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    gsap.to(btn, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });
                
                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, {
                        x: 0,
                        y: 0,
                        duration: 0.7,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            });
        })();

        // --- FAQ Accordion Logic ---
        (function() {
            const faqs = document.querySelectorAll('#faq-section details');
            faqs.forEach(faq => {
                const summary = faq.querySelector('summary');
                const content = faq.querySelector('div');
                
                summary.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isOpen = faq.hasAttribute('open');
                    
                    // Close others
                    faqs.forEach(other => {
                        if(other !== faq && other.hasAttribute('open')) {
                            const otherContent = other.querySelector('div');
                            gsap.to(otherContent, { height: 0, opacity: 0, duration: 0.3, onComplete: () => other.removeAttribute('open') });
                            gsap.to(other.querySelector('.material-symbols-outlined'), { rotation: 0, duration: 0.3 });
                        }
                    });

                    if(isOpen) {
                        gsap.to(content, { height: 0, opacity: 0, duration: 0.3, onComplete: () => faq.removeAttribute('open') });
                        gsap.to(summary.querySelector('.material-symbols-outlined'), { rotation: 0, duration: 0.3 });
                    } else {
                        faq.setAttribute('open', '');
                        gsap.fromTo(content, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.3 });
                        gsap.to(summary.querySelector('.material-symbols-outlined'), { rotation: 180, duration: 0.3 });
                    }
                });
            });
        })();

        // --- Parallax Footer Config ---
        (function() {
            const mainContent = document.querySelector('main');
            const parallaxFooter = document.getElementById('parallax-footer');
            
            function adjustFooter() {
                if(parallaxFooter && mainContent) {
                    const footerHeight = parallaxFooter.offsetHeight;
                    mainContent.style.marginBottom = footerHeight + 'px';
                }
            }
            
            window.addEventListener('load', adjustFooter);
            window.addEventListener('resize', adjustFooter);
            if (document.readyState === 'complete') adjustFooter();
            else document.addEventListener('DOMContentLoaded', adjustFooter);
        })();

        // --- Stair Animation for "ESCALAR" ---
        (function() {
            const escalarHeading = document.getElementById('escalar-heading');
            const letters = document.querySelectorAll('.stair-letter');
            
            if(!escalarHeading || letters.length === 0) return;

            escalarHeading.addEventListener('mouseenter', () => {
                letters.forEach((letter, index) => {
                    gsap.to(letter, {
                        y: -(index * 15), // creates the stair effect
                        scale: 1 + (index * 0.05), // slightly grows the letters
                        duration: 0.5,
                        ease: "back.out(1.5)",
                        delay: index * 0.03
                    });
                });
            });

            escalarHeading.addEventListener('mouseleave', () => {
                gsap.to(letters, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out",
                    stagger: 0.02
                });
            });
            
            // Also trigger once when scrolled into view
            ScrollTrigger.create({
                trigger: "#parallax-footer",
                start: "top 80%",
                onEnter: () => {
                    letters.forEach((letter, index) => {
                        gsap.to(letter, {
                            y: -(index * 15),
                            scale: 1 + (index * 0.05),
                            duration: 0.5,
                            ease: "back.out(1.5)",
                            delay: index * 0.03,
                            onComplete: () => {
                                // reset after a moment
                                setTimeout(() => {
                                    gsap.to(letter, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
                                }, 1000);
                            }
                        });
                    });
                },
                once: true
            });
        })();

        // --- Mobile Menu Interaction ---
        (function() {
            const btn = document.getElementById('mobile-menu-btn');
            const overlay = document.getElementById('mobile-menu-overlay');
            const line1 = document.getElementById('hamburger-line-1');
            const line2 = document.getElementById('hamburger-line-2');
            const navLinks = document.querySelectorAll('.mobile-nav-link');
            
            if(!btn || !overlay) return;

            let isMenuOpen = false;
            let menuTl = gsap.timeline({ paused: true });

            menuTl.to(overlay, {
                display: 'flex',
                opacity: 1,
                duration: 0.4,
                ease: "power2.inOut"
            })
            .fromTo(navLinks, 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.5)" },
                "-=0.2"
            );

            btn.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                
                if(isMenuOpen) {
                    // Animate Hamburger to X
                    gsap.to(line1, { y: 4, rotate: 45, duration: 0.3, ease: "power2.inOut" });
                    gsap.to(line2, { y: -4, rotate: -45, duration: 0.3, ease: "power2.inOut" });
                    
                    // Prevent body scroll
                    document.body.style.overflow = 'hidden';
                    if (window.lenis) window.lenis.stop();
                    
                    menuTl.play();
                } else {
                    // Animate X back to Hamburger
                    gsap.to(line1, { y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" });
                    gsap.to(line2, { y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" });
                    
                    // Allow body scroll
                    document.body.style.overflow = '';
                    if (window.lenis) window.lenis.start();
                    
                    menuTl.reverse();
                }
            });

            // Close menu when clicking a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if(isMenuOpen) btn.click();
                });
            });
        })();
// ==========================================
// Video Testimonials Logic
// ==========================================
(function() {
    const panels = document.querySelectorAll('.panel');
    const lightbox = document.getElementById('video-lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeLightboxBtn = document.getElementById('close-lightbox');

    if (!lightbox || !lightboxVideo || panels.length === 0) return;

    panels.forEach(panel => {
        // Setup Lightbox Trigger
        const playBtn = panel.querySelector('.play-btn');
        const bgVideo = panel.querySelector('video.testimonial-video');

        if (playBtn && bgVideo) {
            playBtn.addEventListener('click', () => {
                // Open lightbox
                lightbox.classList.remove('opacity-0', 'pointer-events-none');
                
                // Copy video src
                lightboxVideo.src = bgVideo.src;
                
                // Stop background video
                bgVideo.pause();

                // Play lightbox video with sound
                lightboxVideo.muted = false;
                const playPromise = lightboxVideo.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => console.log("Lightbox autoplay prevented", e));
                }
            });
        }
    });

    // Close Lightbox Logic
    function closeLightbox() {
        lightbox.classList.add('opacity-0', 'pointer-events-none');
        lightboxVideo.pause();
        lightboxVideo.src = ""; // Clear src to stop buffering
        
        // Resume all background videos
        document.querySelectorAll('video.testimonial-video').forEach(v => {
            const p = v.play();
            if (p !== undefined) p.catch(e => {});
        });
    }

    closeLightboxBtn.addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('opacity-0')) {
            closeLightbox();
        }
    });
})()

// ==========================================
// E-Book Section Animation (slide from left)
// ==========================================
(function() {
    const section = document.getElementById('ebook-section');
    if (!section) return;

    const badge   = document.getElementById('eb-badge');
    const title   = document.getElementById('eb-title');
    const desc    = document.getElementById('eb-desc');
    const bullets = section.querySelectorAll('.eb-bullet');
    const cta     = document.getElementById('eb-cta');
    const visual  = document.getElementById('eb-visual');

    // Shared trigger config
    const trigger = {
        trigger: section,
        start: 'top 72%',
        once: true,
    };

    // Left-side elements: slide from left, staggered
    const leftItems = [badge, title, desc, ...bullets, cta].filter(Boolean);

    gsap.from(leftItems, {
        x: -70,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: trigger,
    });

    // Right visual: slide from right
    if (visual) {
        gsap.from(visual, {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: trigger,
        });
    }
})();
