// ========== NOVAS FUNCIONALIDADES: IMAGENS DOS PERSONAGENS NO RESULTADO ==========

// Mapeamento de personagens por faixa de pontuação
const characterResults = [
    {
        min: 0,
        max: 4,
        name: "Sr. Stratford",
        image: "https://via.placeholder.com/120/6B1630/FFFFFF?text=Pai",
        // Substituir por: "img/sr-stratford.jpg"
    },
    {
        min: 5,
        max: 7,
        name: "Michael Eckman",
        image: "https://via.placeholder.com/120/4A2035/FFFFFF?text=Michael",
        // Substituir por: "img/michael.jpg"
    },
    {
        min: 8,
        max: 9,
        name: "Cameron James",
        image: "https://via.placeholder.com/120/D4A017/FFFFFF?text=Cameron",
        // Substituir por: "img/cameron.jpg"
    },
    {
        min: 10,
        max: 10,
        name: "Kat Stratford",
        image: "https://via.placeholder.com/120/8B1E3F/FFFFFF?text=Kat",
        // Substituir por: "img/kat.jpg"
    }
];

// Elemento da imagem do personagem no resultado
const resultCharacterImg = document.getElementById('result-character-img');
const resultCharacterName = document.getElementById('result-character-name');

// ========== MODIFICAR: Finalizar quiz com imagem do personagem ==========
function finishQuiz() {
    quizFinished = true;
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    // Atualizar pontuação final
    finalScore.textContent = score;
    
    // Encontrar mensagem de resultado apropriada
    const result = resultQuotes.find(r => score >= r.min && score <= r.max);
    resultTitle.textContent = result.title;
    resultDescription.textContent = result.description;
    resultQuote.textContent = result.quote;
    
    // ===== NOVO: Atualizar imagem do personagem baseado na pontuação =====
    const character = characterResults.find(c => score >= c.min && score <= c.max);
    if (resultCharacterImg && resultCharacterName) {
        resultCharacterImg.src = character.image;
        resultCharacterImg.alt = character.name;
        resultCharacterName.textContent = character.name;
    }
    
    // Animar barra de progresso final
    progressFill.style.width = '100%';
}
