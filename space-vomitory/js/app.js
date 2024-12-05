// fonction qui mélange
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// je construit mon memory et je double les cartes
const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let cards = [...imageNumbers, ...imageNumbers];
//je met à zero les scores et tentatives
let score = 0;
let moves = 0;
// Variables pour gérer l'état du plateau
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// je créer mon plateau
function createBoard() {
    const gameBoard = document.querySelector('.memory-game');
    if (!gameBoard) return; 

    gameBoard.innerHTML = '';
    shuffle(cards); // Le plateau est créer je le mélange
    cards.forEach((imgNumber) => {
        const card = document.createElement('div');
        // p'tit coup de CSS
        card.classList.add('memory-card');
        card.dataset.framework = imgNumber;
        // je passe en html
        card.innerHTML = `
            <div class="front-face">
                <img src="../memory/${imgNumber}.jpg" alt="Image ${imgNumber}">
            </div>
            <div class="back-face">
                <img src="../memory/windows95.jpg">
            </div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.memory-game')) {
        createBoard();
    }
});

// Fonction pour retourner une carte
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    // hop p'tit coup de CSS
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Correspondace des cartes
    secondCard = this;
    checkForMatch();
}

// Fonction pour voir si les deux cartes correspondents
function checkForMatch() {
    moves++;
    document.getElementById('moves').textContent = moves;
    
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    // bloque les cartes faces visibles si elles correspondent
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score++;
    document.getElementById('score').textContent = score;
    resetBoard();
    
    if (score === cards.length / 2) {
        setTimeout(() => {
            alert('Félicitations! Vous avez gagné en ' + moves + ' coups!');
        }, 500);
    }
}
function unflipCards() {
    lockBoard = true;
    // Délais de 5 secondes pour mémoriser (cf long mais consigne exo)
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 5000);
}

// Réinitialise les variables du plateau
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
