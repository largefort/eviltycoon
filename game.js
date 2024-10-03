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

function updateDisplay() {
    document.getElementById('evilPoints').textContent = evilPoints.toFixed(0);
    document.getElementById('minionsOwned').textContent = minionsOwned;
    document.getElementById('villainsOwned').textContent = villainsOwned;
    document.getElementById('demonsOwned').textContent = demonsOwned;
    document.getElementById('lairsOwned').textContent = lairsOwned;
    
    document.getElementById('minionCost').textContent = minionCost;
    document.getElementById('villainCost').textContent = villainCost;
    document.getElementById('demonCost').textContent = demonCost;
    document.getElementById('lairCost').textContent = lairCost;
    
    document.getElementById('minionUpgradeCost').textContent = minionUpgradeCost;
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
