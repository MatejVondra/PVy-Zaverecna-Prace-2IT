// script.js

let tokens = 100; // Počáteční počet tokenů
const tokensDisplay = document.getElementById('tokens');
const numberSelect = document.getElementById('numberSelect');
const betAmount = document.getElementById('betAmount');
const placeBetButton = document.getElementById('placeBet');
const rollDiceButton = document.getElementById('rollDice');
const diceResultDisplay = document.getElementById('diceResult');
const messageDisplay = document.getElementById('message');
const historyList = document.getElementById('historyList');

let selectedNumber = null;
let bet = null;
let history = []; // Pole pro ukládání historie

// Aktualizace zobrazení tokenů
function updateTokens() {
    tokensDisplay.textContent = tokens;
}

// Funkce pro nastavení sázky
function placeBet() {
    const number = parseInt(numberSelect.value);
    const amount = parseInt(betAmount.value);

    if (isNaN(number) || number < 1 || number > 20) {
        alert('Prosím, vyberte číslo mezi 1 a 20.');
        return;
    }

    if (isNaN(amount) || amount < 1 || amount > tokens) {
        alert('Prosím, zadejte platnou sázku.');
        return;
    }

    selectedNumber = number;
    bet = amount;
    messageDisplay.textContent = `Sázka: ${bet} tokenů na číslo ${selectedNumber}. Hodit kostkou!`;
}

// Funkce pro hod kostkou
function rollDice() {
    if (selectedNumber === null || bet === null) {
        alert('Prosím, nejdříve si vsadíte.');
        return;
    }

    const diceRoll = Math.floor(Math.random() * 20) + 1;
    diceResultDisplay.textContent = `Padlo číslo: ${diceRoll}`;

    let resultMessage;
    if (diceRoll === selectedNumber) {
        tokens += bet;
        resultMessage = `Vyhráli jste! Vyhráli jste ${bet * 2} tokenů.`;
    } else {
        tokens -= bet;
        resultMessage = `Prohráli jste ${bet} tokenů.`;
    }
    messageDisplay.textContent = resultMessage;

    // Přidání záznamu do historie
    addHistoryEntry(selectedNumber, bet, diceRoll, resultMessage);

    // Resetování sázky
    selectedNumber = null;
    bet = null;
    numberSelect.value = '';
    betAmount.value = '';

    updateTokens();
}

// Funkce pro přidání záznamu do historie
function addHistoryEntry(number, bet, result, message) {
    const entry = {
        number: number,
        bet: bet,
        result: result,
        message: message
    };

    history.push(entry);
    updateHistoryDisplay();
}

// Funkce pro aktualizaci zobrazení historie
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    for (const entry of history) {
        const li = document.createElement('li');
        li.textContent = `Číslo: ${entry.number}, Sázka: ${entry.bet}, Výsledek: ${entry.result} - ${entry.message}`;
        historyList.appendChild(li);
    }
}

// Event listenery pro tlačítka
placeBetButton.addEventListener('click', placeBet);
rollDiceButton.addEventListener('click', rollDice);

// Inicializace zobrazení tokenů
updateTokens();

// Přidání komentářů pro vysvětlení kódu
// tokens je proměnná pro sledování aktuálního počtu tokenů
// updateTokens aktualizuje zobrazení tokenů na stránce
// placeBet zpracovává sázení hráče
// rollDice simuluje hod kostkou a vyhodnocuje výsledek
// addHistoryEntry přidává záznam do historie sázek a hodů
// updateHistoryDisplay aktualizuje zobrazení historie na stránce
// Event listenery pro tlačítka zpracovávají kliknutí uživatele na tlačítka
