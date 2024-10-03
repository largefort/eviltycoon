let evilPoints = 0;
let minionsOwned = 0;
let villainsOwned = 0;
let demonsOwned = 0;
let lairsOwned = 0;

let minionCost = 10;
let villainCost = 50;
let demonCost = 200;
let lairCost = 1000;

let minionEps = 1;
let villainEps = 5;
let demonEps = 20;
let lairEps = 50;

let minionUpgradeCost = 100;
let minionMultiplier = 1;

let eventActive = false;

// Utility function to format numbers with compact notation
function formatNumber(num) {
    if (num < 1e3) return num.toFixed(0);                          // Up to 1,000
    else if (num < 1e6) return (num / 1e3).toFixed(1) + 'K';      // Thousands
    else if (num < 1e9) return (num / 1e6).toFixed(1) + 'M';      // Millions
    else if (num < 1e12) return (num / 1e9).toFixed(1) + 'B';     // Billions
    else if (num < 1e15) return (num / 1e12).toFixed(1) + 'T';    // Trillions
    else if (num < 1e18) return (num / 1e15).toFixed(1) + 'Q';    // Quadrillions
    else if (num < 1e21) return (num / 1e18).toFixed(1) + 'Qa';   // Quintillions
    else if (num < 1e24) return (num / 1e21).toFixed(1) + 'R';    // Sextillions
    else if (num < 1e27) return (num / 1e24).toFixed(1) + 'S';    // Septillions
    else if (num < 1e30) return (num / 1e27).toFixed(1) + 'Sp';   // Octillions
    else if (num < 1e33) return (num / 1e30).toFixed(1) + 'O';    // Nonillions
    else if (num < 1e36) return (num / 1e33).toFixed(1) + 'N';    // Decillions
    else if (num < 1e39) return (num / 1e36).toFixed(1) + 'D';    // Undecillions
    else if (num < 1e42) return (num / 1e39).toFixed(1) + 'U';    // Duodecillions
    else if (num < 1e45) return (num / 1e42).toFixed(1) + 'T'     // Tredecillions
    else if (num < 1e48) return (num / 1e45).toFixed(1) + 'Qu';   // Quattuordecillions
    else if (num < 1e51) return (num / 1e48).toFixed(1) + 'Quin'; // Quindecillions
    else if (num < 1e54) return (num / 1e51).toFixed(1) + 'Sx';   // Sexdecillions
    else if (num < 1e57) return (num / 1e54).toFixed(1) + 'Se';    // Septendecillions
    else if (num < 1e60) return (num / 1e57).toFixed(1) + 'O';     // Octodecillions
    else return (num / 1e60).toFixed(1) + 'N';                     // Novemdecillions
}

function updateDisplay() {
    document.getElementById('evilPoints').textContent = formatNumber(evilPoints);
    document.getElementById('minionsOwned').textContent = formatNumber(minionsOwned);
    document.getElementById('villainsOwned').textContent = formatNumber(villainsOwned);
    document.getElementById('demonsOwned').textContent = formatNumber(demonsOwned);
    document.getElementById('lairsOwned').textContent = formatNumber(lairsOwned);
    
    document.getElementById('minionCost').textContent = formatNumber(minionCost);
    document.getElementById('villainCost').textContent = formatNumber(villainCost);
    document.getElementById('demonCost').textContent = formatNumber(demonCost);
    document.getElementById('lairCost').textContent = formatNumber(lairCost);
    
    document.getElementById('minionUpgradeCost').textContent = formatNumber(minionUpgradeCost);
}

function buyMinion() {
    if (evilPoints >= minionCost) {
        evilPoints -= minionCost;
        minionsOwned += 1;
        minionCost = Math.floor(minionCost * 1.2);
        updateDisplay();
    }
}

function buyVillain() {
    if (evilPoints >= villainCost) {
        evilPoints -= villainCost;
        villainsOwned += 1;
        villainCost = Math.floor(villainCost * 1.5);
        updateDisplay();
    }
}

function buyDemon() {
    if (evilPoints >= demonCost) {
        evilPoints -= demonCost;
        demonsOwned += 1;
        demonCost = Math.floor(demonCost * 1.7);
        updateDisplay();
    }
}

function buyLair() {
    if (evilPoints >= lairCost) {
        evilPoints -= lairCost;
        lairsOwned += 1;
        lairCost = Math.floor(lairCost * 2);
        updateDisplay();
    }
}

function buyMinionUpgrade() {
    if (evilPoints >= minionUpgradeCost) {
        evilPoints -= minionUpgradeCost;
        minionMultiplier = 2;
        minionUpgradeCost = Math.floor(minionUpgradeCost * 2);
        updateDisplay();
    }
}

function generateEvilPoints() {
    evilPoints += (minionsOwned * minionEps * minionMultiplier) + 
                  (villainsOwned * villainEps) + 
                  (demonsOwned * demonEps) + 
                  (lairsOwned * lairEps);
    updateDisplay();
}

function triggerRandomEvent() {
    if (!eventActive) {
        eventActive = true;
        const eventType = Math.random();
        const eventMessage = document.getElementById('eventMessage');

        if (eventType < 0.5) {
            eventMessage.textContent = "Good event: Evil point production is doubled for 10 seconds!";
            minionMultiplier *= 2;
            villainEps *= 2;
            demonEps *= 2;
            lairEps *= 2;

            setTimeout(() => {
                minionMultiplier /= 2;
                villainEps /= 2;
                demonEps /= 2;
                lairEps /= 2;
                eventMessage.textContent = "Event over.";
                eventActive = false;
            }, 10000);
        } else {
            eventMessage.textContent = "Bad event: You lost 20% of your evil points!";
            evilPoints *= 0.8;
            updateDisplay();
            setTimeout(() => {
                eventMessage.textContent = "Event over.";
                eventActive = false;
            }, 5000);
        }
    }
}

function saveGame() {
    const gameState = {
        evilPoints,
        minionsOwned,
        villainsOwned,
        demonsOwned,
        lairsOwned,
        minionCost,
        villainCost,
        demonCost,
        lairCost,
        minionUpgradeCost,
        minionMultiplier,
    };
    localStorage.setItem('evilTycoonSave', JSON.stringify(gameState));
    console.log("Game saved");
}

function loadGame() {
    const savedGame = localStorage.getItem('evilTycoonSave');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        evilPoints = gameState.evilPoints;
        minionsOwned = gameState.minionsOwned;
        villainsOwned = gameState.villainsOwned;
        demonsOwned = gameState.demonsOwned;
        lairsOwned = gameState.lairsOwned;
        minionCost = gameState.minionCost;
        villainCost = gameState.villainCost;
        demonCost = gameState.demonCost;
        lairCost = gameState.lairCost;
        minionUpgradeCost = gameState.minionUpgradeCost;
        minionMultiplier = gameState.minionMultiplier;
        console.log("Game loaded");
        updateDisplay();
    }
}

setInterval(generateEvilPoints, 1000);
setInterval(triggerRandomEvent, 30000);
setInterval(saveGame, 10000); // Auto-save every 10 seconds

// Load the game when the player starts
window.onload = function() {
    loadGame();
};
