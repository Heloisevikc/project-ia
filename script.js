// Banco de perguntas sobre o filme "10 Coisas que Eu Odeio em Você"
const questions = [
    {
        question: "Qual é o nome da escola onde se passa a maior parte do filme?",
        options: [
            "Padua High School",
            "Verona High School",
            "Seattle High School",
            "California High School"
        ],
        correct: 0,
        quote: "Eu odeio o jeito que você fala comigo, e o jeito que você corta o cabelo."
    },
    {
        question: "Quem é o ator que interpreta Patrick Verona?",
        options: [
            "Joseph Gordon-Levitt",
            "Heath Ledger",
            "Andrew Keegan",
            "David Krumholtz"
        ],
        correct: 1,
        quote: "Eu odeio o jeito que você dirige meu carro. E odeio quando você me encara."
    },
    {
        question: "Qual é o nome da irmã mais nova de Kat Stratford?",
        options: [
            "Mandy Stratford",
            "Bianca Stratford",
            "Chastity Stratford",
            "Joey Stratford"
        ],
        correct: 1,
        quote: "Eu odeio suas botas de combate enormes, e o jeito que você lê minha mente."
    },
    {
        question: "Qual é o nome da banda favorita de Kat?",
        options: [
            "The Clash at Demonhead",
            "Bikini Kill",
            "Letters to Cleo",
            "The Raincoats"
        ],
        correct: 2,
        quote: "Eu odeio tanto você que isso me deixa doente — isso até me faz rimar."
    },
    {
        question: "Que tipo de dança Patrick faz para conquistar Kat?",
        options: [
            "Dança de salão",
            "Balé",
            "Cantando 'Can't Take My Eyes Off You' no estádio",
            "Dança contemporânea"
        ],
        correct: 2,
        quote: "Eu odeio o jeito que eu não odeio você. Nem um pouco, nem mesmo um pouquinho, nem nada."
    },
    {
        question: "Qual é o nome do melhor amigo de Cameron?",
        options: [
            "Michael Eckman",
            "Patrick Verona",
            "Joey Donner",
            "Walter Stratford"
        ],
        correct: 0,
        quote: "Eu odeio o jeito que você é sempre a pessoa certa. Eu odeio quando você mente."
    },
    {
        question: "O que Kat quer fazer depois do ensino médio?",
        options: [
            "Ser atriz",
            "Estudar em uma universidade na Costa Leste, como Sarah Lawrence",
            "Viajar pela Europa",
            "Ser escritora"
        ],
        correct: 1,
        quote: "Eu odeio quando você me faz rir — ainda mais quando você me faz chorar."
    },
    {
        question: "Qual é o nome do personagem interpretado por Joseph Gordon-Levitt?",
        options: [
            "Patrick Verona",
            "Cameron James",
            "Michael Eckman",
            "Joey Donner"
        ],
        correct: 1,
        quote: "Eu odeio quando você não está por perto, e o fato de você não ter me ligado."
    },
    {
        question: "O que Patrick compra para Kat na loja de discos?",
        options: [
            "Um disco do Bikini Kill",
            "Um violão Fender",
            "Ingressos para um show",
            "Um livro de poesia"
        ],
        correct: 1,
        quote: "Mas acima de tudo, eu odeio o jeito que eu não odeio você."
    },
    {
        question: "Qual é a profissão do pai das irmãs Stratford?",
        options: [
            "Médico",
            "Advogado",
            "Ginecologista/Obstetra",
            "Professor universitário"
        ],
        correct: 2,
        quote: "Nem um pouco, nem mesmo um pouquinho, nem nada."
    }
];

// Estado do quiz
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let answerSelected = false;

// Elementos DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const movieQuote = document.getElementById('movie-quote');

// Função para embaralhar array (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Função para embaralhar as opções mantendo o índice correto
function shuffleOptions(question) {
    // Criar array de pares [opção, índice]
    const optionsWithIndex = question.options.map((option, index) => ({
        text: option,
        isCorrect: index === question.correct
    }));
    
    // Embaralhar os pares
    const shuffled = shuffleArray(optionsWithIndex);
    
    // Retornar as opções embaralhadas e o novo índice da resposta correta
    return {
        shuffledOptions: shuffled.map(item => item.text),
        newCorrectIndex: shuffled.findIndex(item => item.isCorrect)
    };
}

// Função para embaralhar as perguntas
function shuffleQuestions() {
    shuffledQuestions = shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;
}

// Função para carregar pergunta atual
function loadQuestion() {
    answerSelected = false;
    nextBtn.disabled = true;
    
    const question = shuffledQuestions[currentQuestionIndex];
    const { shuffledOptions, newCorrectIndex } = shuffleOptions(question);
    
    // Armazenar o índice correto na pergunta atual
    question.currentCorrectIndex = newCorrectIndex;
    question.shuffledOptions = shuffledOptions;
    
    // Atualizar UI
    questionText.textContent = question.question;
    questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1}/${shuffledQuestions.length}`;
    
    // Atualizar barra de progresso
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Criar botões de opções
    optionsContainer.innerHTML = '';
    shuffledOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.dataset.index = index;
        button.addEventListener('click', () => selectOption(index, question.currentCorrectIndex));
        optionsContainer.appendChild(button);
    });
    
    // Atualizar placar
    updateScore();
}

// Função para selecionar opção
function selectOption(selectedIndex, correctIndex) {
    if (answerSelected) return;
    
    answerSelected = true;
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Desabilitar todos os botões
    optionButtons.forEach(btn => btn.disabled = true);
    
    // Verificar se acertou
    const isCorrect = selectedIndex === correctIndex;
    
    if (isCorrect) {
        score++;
        optionButtons[selectedIndex].classList.add('correct');
        updateScore();
    } else {
        optionButtons[selectedIndex].classList.add('incorrect');
        optionButtons[correctIndex].classList.add('correct');
    }
    
    // Habilitar botão próximo
    nextBtn.disabled = false;
}

// Função para atualizar pontuação
function updateScore() {
    scoreDisplay.textContent = score;
}

// Função para próxima pergunta
function nextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}

// Função para mostrar resultado
function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    finalScore.textContent = score;
    
    // Definir mensagem baseada na pontuação
    let message = '';
    let quote = '';
    
    if (score === 10) {
        message = '🎬 Perfeito! Você é um verdadeiro fã de "10 Coisas que Eu Odeio em Você"! Patrick e Kat ficariam orgulhosos!';
        quote = questions[0].quote;
    } else if (score >= 8) {
        message = '🌟 Muito bem! Você realmente conhece o filme! Só faltou um pouquinho...';
        quote = questions[2].quote;
    } else if (score >= 5) {
        message = '📺 Nada mal! Que tal assistir o filme de novo para melhorar sua pontuação?';
        quote = questions[4].quote;
    } else {
        message = '💔 Parece que você precisa assistir "10 Coisas que Eu Odeio em Você" novamente! É um clássico!';
        quote = questions[6].quote;
    }
    
    resultMessage.textContent = message;
    movieQuote.textContent = quote;
}

// Função para reiniciar quiz
function restartQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    loadQuestion();
}

// Função para voltar ao início
function goHome() {
    resultScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    startScreen.classList.add('active');
}

// Event Listeners
startBtn.addEventListener('click', () => {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    shuffleQuestions();
    loadQuestion();
});

nextBtn.addEventListener('click', nextQuestion);

restartBtn.addEventListener('click', restartQuiz);

homeBtn.addEventListener('click', goHome);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    startScreen.classList.add('active');
});
