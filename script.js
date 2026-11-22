document.addEventListener('DOMContentLoaded', () => {
    // 1. Controle da Barra Lateral (Sidebar)
    const openMenuBtn = document.getElementById('openMenu');
    const closeMenuBtn = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    function toggleMenu() {
        if(sidebar && overlay) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        }
    }

    if (openMenuBtn && closeMenuBtn && overlay) {
        openMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // 2. Controle de Abas (Tabs) nas páginas de assunto
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            if(targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 3. Alternância entre Login e Cadastro na página index.html
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');

    if (loginBox && registerBox && showRegisterBtn && showLoginBtn) {
        showRegisterBtn.addEventListener('click', () => {
            loginBox.classList.add('hidden');
            registerBox.classList.remove('hidden');
        });

        showLoginBtn.addEventListener('click', () => {
            registerBox.classList.add('hidden');
            loginBox.classList.remove('hidden');
        });
    }

    // 4. Lógica Interativa do Quiz (Carrossel de Exercícios)
    const questionCards = document.querySelectorAll('.question-card');
    const prevBtn = document.getElementById('prevQuestion');
    const nextBtn = document.getElementById('nextQuestion');
    let currentQuestionIndex = 0;

    // Função para atualizar qual questão está visível
    function updateCarousel() {
        questionCards.forEach((card, index) => {
            if(index === currentQuestionIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        // Habilita/Desabilita botões Anterior e Próximo
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentQuestionIndex === 0;
            nextBtn.disabled = currentQuestionIndex === questionCards.length - 1;
        }
    }

    // Lógica dos cliques nas alternativas e feedback
    questionCards.forEach(card => {
        const options = card.querySelectorAll('.option-btn');
        const feedbackBox = card.querySelector('.feedback-box');
        
        options.forEach(option => {
            option.addEventListener('click', function() {
                if (card.classList.contains('answered')) return;
                
                card.classList.add('answered');
                
                options.forEach(opt => {
                    opt.disabled = true;
                    const isCorrect = opt.getAttribute('data-correct') === 'true';
                    
                    if (isCorrect) {
                        opt.classList.add('correct');
                    } else if (opt === this && !isCorrect) {
                        opt.classList.add('wrong');
                    }
                });
                
                feedbackBox.classList.remove('hidden');
            });
        });
    });

    // Ações dos botões de navegação do carrossel
    if (prevBtn && nextBtn && questionCards.length > 0) {
        prevBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < questionCards.length - 1) {
                currentQuestionIndex++;
                updateCarousel();
            }
        });
        
        // Inicializa mostrando a primeira questão
        updateCarousel();
    }

    // 5. Toque em Flashcards para dispositivos Mobile
    const flashcards = document.querySelectorAll('.flashcard-container');
    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });


// 6. Lógica do Carrossel de Flashcards 3D
    const fcSlides = document.querySelectorAll('.fc-slide');
    const prevFcBtn = document.getElementById('prevFc');
    const nextFcBtn = document.getElementById('nextFc');
    let currentFcIndex = 0;

    function updateFcCarousel() {
        fcSlides.forEach((slide, index) => {
            if(index === currentFcIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
                // IMPORTANTE: Desvira a carta automaticamente ao sair dela
                const container = slide.querySelector('.flashcard-container');
                if(container) {
                    container.classList.remove('flipped');
                }
            }
        });
        
        if (prevFcBtn && nextFcBtn) {
            prevFcBtn.disabled = currentFcIndex === 0;
            nextFcBtn.disabled = currentFcIndex === fcSlides.length - 1;
        }
    }

    if (prevFcBtn && nextFcBtn && fcSlides.length > 0) {
        prevFcBtn.addEventListener('click', () => {
            if (currentFcIndex > 0) {
                currentFcIndex--;
                updateFcCarousel();
            }
        });

        nextFcBtn.addEventListener('click', () => {
            if (currentFcIndex < fcSlides.length - 1) {
                currentFcIndex++;
                updateFcCarousel();
            }
        });
        
        updateFcCarousel(); // Inicializa o carrossel
    }




});