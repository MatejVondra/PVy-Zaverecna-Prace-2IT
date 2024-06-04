// Funkce pro kontrolu věku uživatele
function checkAge() {
    const isOldEnough = confirm('Je vám 15 let nebo více? Hazardní hry mohou být návykové.');
    if (!isOldEnough) {
        alert('Omlouváme se, ale musíte být starší 15 let, abyste mohli hrát.');
        window.location.href = 'https://www.blesk.cz/clanek/radce-zdravi-a-zivotni-styl-zdravi/373228/7-1-rada-jak-osalit-vek.html'; // Přesměrování na jinou stránku
    }
}

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

// Funkce pro hod kostkou (z velmi malé části ze cvičení)
function rollDice() {
    if (selectedNumber === null || bet === null) {
        alert('Prosím, nejdříve si vsadíte.');
        return;
    }

    const diceRoll = Math.floor(Math.random() * 20) + 1;
    diceResultDisplay.textContent = `${diceRoll}`;

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

// Funkce pro přidání záznamu do historie (ChatGPT)
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

// Funkce pro aktualizaci zobrazení historie (Částečně ChatGPT)
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

// Kontrola věku uživatele při načtení stránky (ChatGPT)
window.onload = checkAge;