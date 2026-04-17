// Banco de perguntas sobre "10 Coisas que Eu Odeio em Você"
const questions = [
    {
        question: "Qual é o nome da protagonista feminina do filme?",
        options: ["Kat Stratford", "Bianca Stratford", "Chastity Church", "Mandella"],
        correct: 0,
        explanation: "Kat Stratford é a irmã mais velha, interpretada por Julia Stiles."
    },
    {
        question: "Qual ator interpreta o rebelde Patrick Verona?",
        options: ["Joseph Gordon-Levitt", "Heath Ledger", "Andrew Keegan", "David Krumholtz"],
        correct: 1,
        explanation: "Heath Ledger interpreta Patrick Verona, em um de seus papéis mais icônicos."
    },
    {
        question: "Qual é o nome do colégio onde se passa a história?",
        options: ["Padua High School", "Seattle Academy", "Ridgemont High", "Westwood High"],
        correct: 0,
        explanation: "Padua High School é o nome do colégio, uma referência à cidade de Pádua da obra original de Shakespeare."
    },
    {
        question: "O filme é uma adaptação moderna de qual obra de Shakespeare?",
        options: ["Romeu e Julieta", "A Megera Domada", "Sonho de uma Noite de Verão", "Muito Barulho por Nada"],
        correct: 1,
        explanation: "'10 Coisas que Eu Odeio em Você' é baseado em 'A Megera Domada' (The Taming of the Shrew)."
    },
    {
        question: "Quem é o novo aluno que se interessa por Bianca, mas não pode namorá-la por causa da regra do pai?",
        options: ["Joey Donner", "Cameron James", "Michael Eckman", "Patrick Verona"],
        correct: 1,
        explanation: "Cameron James (Joseph Gordon-Levitt) é o novo aluno apaixonado por Bianca."
    },
    {
        question: "Qual é a regra imposta pelo pai das irmãs Stratford sobre namoro?",
        options: [
            "Bianca só pode namorar quando Kat namorar",
            "Nenhuma das duas pode namorar até a faculdade",
            "Elas só podem sair em encontros duplos",
            "Precisam apresentar boas notas primeiro"
        ],
        correct: 0,
        explanation: "O pai determina que Bianca só pode namorar quando Kat também estiver namorando."
    },
    {
        question: "Qual personagem é pago para tentar conquistar Kat?",
        options: ["Joey Donner", "Cameron James", "Patrick Verona", "Michael Eckman"],
        correct: 2,
        explanation: "Patrick Verona é pago por Joey (através de Cameron) para sair com Kat."
    },
    {
        question: "Em qual cidade americana o filme se passa?",
        options: ["Seattle", "Portland", "San Francisco", "Los Angeles"],
        correct: 0,
        explanation: "O filme se passa em Seattle, Washington, com cenas icônicas como o Gas Works Park."
    },
    {
        question: "Qual banda Patrick menciona como uma de suas favoritas, que Kat também gosta?",
        options: ["Nirvana", "The Clash", "Pearl Jam", "Sonic Youth"],
        correct: 1,
        explanation: "Patrick menciona The Clash, banda que Kat também admira."
    },
    {
        question: "Complete a frase do poema de Kat: 'Eu odeio o jeito que você fala comigo, e o jeito que você corta o cabelo. Eu odeio o jeito que você dirige o meu carro. Eu odeio quando você me olha assim. Eu odeio...'",
        options: [
            "seus sapatos ridículos",
            "suas piadas sem graça",
            "que eu não consigo te odiar",
            "seu sorriso irritante"
        ],
        correct: 2,
        explanation: "O poema termina com '...mas eu não consigo te odiar. Nem um pouco. Nem mesmo um pouco. Nem mesmo um pouquinho.'"
    }
];

// ========== FUNÇÃO PARA EMBARALHAR ARRAY ==========
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ========== FUNÇÃO PARA CRIAR PERGUNTA EMBARALHADA ==========
function shuffleQuestion(question) {
    const optionsWithIndex = question.options.map((text, index) => ({
        text: text,
        originalIndex: index
    }));
    
    const shuffledOptions = shuffleArray(optionsWithIndex);
    
    const newCorrectIndex = shuffledOptions.findIndex(
        item => item.originalIndex === question.correct
    );
    
    return {
        ...question,
        options: shuffledOptions.map(item => item.text),
        correct: newCorrectIndex
    };
}

// ========== VARIÁVEL PARA ARMAZENAR PERGUNTAS EMBARALHADAS ==========
let shuffledQuestions = [];

// Frases icônicas para o resultado baseado na pontuação
const resultQuotes = [
    {
        min: 0,
        max: 4,
        title: "🤔 Você assistiu mesmo?",
        description: "Parece que você precisa maratonar esse clássico novamente!",
        quote: "Você não é de ferro fundido, você é de queijo!"
    },
    {
        min: 5,
        max: 7,
        title: "🎸 Você conhece, mas pode melhorar!",
        description: "Nada mal! Mas ainda dá pra afinar esse conhecimento.",
        quote: "Remova a cabeça do traseiro, ligue a TV e preste atenção!"
    },
    {
        min: 8,
        max: 9,
        title: "📚 Fã de carteirinha!",
        description: "Você realmente prestou atenção em Padua High!",
        quote: "Eu tenho uma queda por garotas inteligentes e sarcásticas que gostam de se divertir."
    },
    {
        min: 10,
        max: 10,
        title: "👑 Verdadeiro Stratford!",
        description: "Perfeito! Você sabe tudo sobre esse clássico dos anos 90!",
        quote: "Mas, principalmente, eu odeio o jeito que eu não consigo te odiar. Nem um pouco. Nem mesmo um pouco. Nem mesmo um pouquinho."
    }
];

// Mapeamento de personagens por faixa de pontuação
const characterResults = [
    {
        min: 0,
        max: 4,
        name: "Sr. Stratford",
        icon: "fa-user-tie"
    },
    {
        min: 5,
        max: 7,
        name: "Michael Eckman",
        icon: "fa-user-graduate"
    },
    {
        min: 8,
        max: 9,
        name: "Cameron James",
        icon: "fa-user-secret"
    },
    {
        min: 10,
        max: 10,
        name: "Kat Stratford",
        icon: "fa-user-astronaut"
    }
];

// Estado da aplicação
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let quizFinished = false;

// Elementos DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMessage = document.getElementById('feedback-message');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-value');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const resultQuote = document.getElementById('result-quote');
const resultCharacterIcon = document.getElementById('result-character-icon');
const resultCharacterName = document.getElementById('result-character-name');

// Inicialização
function init() {
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    reviewBtn.addEventListener('click', showReview);
}

// Iniciar quiz com embaralhamento
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    quizFinished = false;
    
    // Embaralhar todas as perguntas ao iniciar um novo quiz
    shuffledQuestions = questions.map(q => shuffleQuestion(q));
    
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    updateScore();
    loadQuestion();
}

// Carregar pergunta atual
function loadQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1}/${shuffledQuestions.length}`;
    
    const progress = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    optionsContainer.innerHTML = '';
    feedbackMessage.classList.remove('show', 'correct-feedback', 'incorrect-feedback');
    feedbackMessage.innerHTML = '';
    
    nextBtn.disabled = true;
    
    const letters = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `
            <span class="option-letter">${letters[index]}</span>
            <span>${option}</span>
        `;
        
        if (userAnswers[currentQuestionIndex] !== undefined) {
            button.disabled = true;
            if (index === question.correct) {
                button.classList.add('correct');
            } else if (index === userAnswers[currentQuestionIndex] && index !== question.correct) {
                button.classList.add('incorrect');
            }
        } else {
            button.addEventListener('click', () => selectOption(index, button));
        }
        
        optionsContainer.appendChild(button);
    });
    
    if (userAnswers[currentQuestionIndex] !== undefined) {
        const selectedIndex = userAnswers[currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        
        showFeedback(isCorrect, question.explanation);
        nextBtn.disabled = false;
    }
}

// Selecionar opção
function selectOption(index, button) {
    const question = shuffledQuestions[currentQuestionIndex];
    const isCorrect = index === question.correct;
    const allOptions = document.querySelectorAll('.option-btn');
    
    userAnswers[currentQuestionIndex] = index;
    
    if (isCorrect) {
        score++;
        updateScore();
    }
    
    allOptions.forEach(btn => {
        btn.disabled = true;
    });
    
    allOptions.forEach((btn, i) => {
        if (i === question.correct) {
            btn.classList.add('correct');
        } else if (i === index && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    showFeedback(isCorrect, question.explanation);
    
    nextBtn.disabled = false;
}

// Mostrar feedback
function showFeedback(isCorrect, explanation) {
    feedbackMessage.classList.add('show');
    feedbackMessage.classList.add(isCorrect ? 'correct-feedback' : 'incorrect-feedback');
    
    feedbackMessage.innerHTML = `
        <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
        <span>${isCorrect ? 'Correto! ' : 'Ops! '}${explanation}</span>
    `;
}

// Atualizar pontuação
function updateScore() {
    scoreDisplay.textContent = score;
}

// Próxima pergunta
function nextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        
        const progress = (currentQuestionIndex / shuffledQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
    } else {
        finishQuiz();
    }
}

// Finalizar quiz
function finishQuiz() {
    quizFinished = true;
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    finalScore.textContent = score;
    
    const result = resultQuotes.find(r => score >= r.min && score <= r.max);
    resultTitle.textContent = result.title;
    resultDescription.textContent = result.description;
    resultQuote.textContent = result.quote;
    
    // Atualizar ícone do personagem baseado na pontuação
    const character = characterResults.find(c => score >= c.min && score <= c.max);
    if (resultCharacterIcon && resultCharacterName) {
        // Limpa classes anteriores e adiciona a nova
        resultCharacterIcon.innerHTML = `<i class="fas ${character.icon}"></i>`;
        resultCharacterName.textContent = character.name;
    }
    
    progressFill.style.width = '100%';
}

// Reiniciar quiz
function restartQuiz() {
    resultScreen.classList.remove('active');
    startQuiz(); // Isso já chama o embaralhamento novamente
}

// Mostrar revisão
function showReview() {
    if (quizFinished) {
        currentQuestionIndex = 0;
        resultScreen.classList.remove('active');
        quizScreen.classList.add('active');
        loadQuestion();
        
        const progress = (currentQuestionIndex / shuffledQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
        
        nextBtn.disabled = false;
        nextBtn.textContent = 'Próxima →';
        
        nextBtn.onclick = reviewNextHandler;
    }
}

// Handler para navegação no modo review
function reviewNextHandler() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        const progress = (currentQuestionIndex / shuffledQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
    } else {
        quizScreen.classList.remove('active');
        resultScreen.classList.add('active');
        nextBtn.onclick = nextQuestion;
        nextBtn.textContent = 'Próxima →';
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
