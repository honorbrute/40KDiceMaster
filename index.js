// selector class to highlight selected dice
// const diceClick3 = document.getElementById(`hSel${3}`);
// const diceClick2 = document.getElementById("hSel2");
// diceClick3.classList.add("selected");
// diceClick2.classList.remove("selected");

//Start

let diceContainer = document.getElementById("diceHolder");
const selectorSize = 5;

// Highlighting hit selector buttons
let hSelectors = document.getElementsByClassName("hitSelector");
let wSelectors = document.getElementsByClassName("woundSelector");

// DiceCount for hits and wounds DOM
let hDiceCountID = document.getElementById("hDiceCount")
let wDiceCountID = document.getElementById("wDiceCount")

//Button DOM
let clearID = document.getElementById("clearButton")

let rollForWoundsID = document.getElementById("rollforwounds");
let rollForHitsID = document.getElementById("rollforhits");

let diceArray = [];
let newDiceArray = [];
let hitRolls = 0;


// Event listeners for "Hit" selectors
for (let i = 0; i < selectorSize; i++) {
    hSelectors[i].addEventListener("click", function() {
        let currentHSel = document.getElementsByClassName("hSelected");
        let currentRolls = document.querySelectorAll(".rollSelected");
        // console.log(currentRolls.length)
        // Remove selected red functions
        if (currentHSel.length > 0) {
            currentHSel[0].classList.remove("hSelected")
            for (let i =0; i < currentRolls.length; i++) {
                currentRolls[i].classList.remove("rollSelected")
            }
        }
        this.classList.add("hSelected");
        let selectorString = this.innerHTML.split("+");
        const selectorValue = parseInt(selectorString[0], 10)
        selectDice(diceArray, selectorValue);
        hitRolls = newDiceArray.length;
        hDiceCountID.innerHTML = `= ${hitRolls} HITS`;
    })
}

// Event listeners for "Wound" selectors
for (let i = 0; i < selectorSize; i++) {
    wSelectors[i].addEventListener("click", function() {
        console.log(`diceArray: ${diceArray}`)
        let currentWSel = document.getElementsByClassName("wSelected");
        let currentRolls = document.querySelectorAll(".rollSelected");
        // console.log(currentRolls.length)
        // Remove selected red functions
        if (currentWSel.length > 0) {
            currentWSel[0].classList.remove("wSelected")
            for (let i =0; i < currentRolls.length; i++) {
                currentRolls[i].classList.remove("rollSelected")
            }
        }
        this.classList.add("wSelected");
        let selectorString = this.innerHTML.split("+");
        const selectorValue = parseInt(selectorString[0], 10)
        selectDice(diceArray, selectorValue);
        hitRolls = newDiceArray.length;
        wDiceCountID.innerHTML = `= ${hitRolls} WOUNDS`;
        
    })
}

// For auto hitters
rollForWoundsID.addEventListener("click", rollWounds);
function rollWounds() {
    generateDice();
}

// Select rolls based on selector
// Paramaters = (array, int)
// Return array of indexes that meet selector criteria.
function selectDice(diceRolls, diceSelector) {
    newDiceArray = diceRolls.reduce(function(indexes, currentRoll, index) {
        // console.log(`current roll: ${currentRoll}`);
        // console.log(`diceSelector: ${diceSelector}`);
        if (currentRoll >= diceSelector) {
            indexes.push(index)
        }
        return indexes;
    }, []);

    //Need to make this into a function highlightRolls()? .eq(i) in a forloop
    for (let i = 0; i < newDiceArray.length; i++) {
        $("div.dice").eq(newDiceArray[i])[0].classList.add("rollSelected");
    }
    // console.log(`newDiceArray: ${newDiceArray}`);
    // console.log(`diceRolls: ${diceRolls}`);
}


// Generates X random dice from 1 to 6 when ROLL is clicked
rollForHitsID.addEventListener("click", generateDice);
function generateDice() {
    diceArray = [];
    const diceCount = document.getElementById("diceCount").value;

    // If no hit rolls were rolled previously
    if (hitRolls === 0) {
        console.log("Wound rolls generate dice")
        //Array size of diceCount to hold dices.    
        //Need to create a forloop for diceCount? Use the forloop tocreate the div class into string.

        let diceDiv = ""
            for (let i = 0; i < diceCount; i++) {
                let dice = Math.floor(Math.random()*6)+1;
                diceDiv +=
                `<div class="dice">${dice}</div>`;
                diceArray.push(dice);
            }
        diceContainer.innerHTML = diceDiv;
        rollForHitsID.disabled = true;
    // Rolling wound rolls based on number of hit rolls
    } else if (hitRolls > 0) {
        let diceDiv = ""
            for (let i = 0; i < hitRolls; i++) {
                let dice = Math.floor(Math.random()*6)+1;
                diceDiv +=
                `<div class="dice">${dice}</div>`;
                diceArray.push(dice);
            }
        diceContainer.innerHTML = diceDiv;
        rollForWoundsID.disabled = true;
        console.log("Hit rolls generate dice")

    }

}

clearID.addEventListener("click", clearDice);

function clearDice() {
    let currentHSel = document.getElementsByClassName("hSelected");
    let currentWSel = document.getElementsByClassName("wSelected");
    if (currentHSel.length > 0) {
        currentHSel[0].classList.remove("hSelected");
    }
    if (currentWSel.length > 0) {
        currentWSel[0].classList.remove("wSelected")
    }
    
    document.getElementById("diceCount").value = '';
    hDiceCountID.innerHTML = '= X HITS'
    wDiceCountID.innerHTML = '= X WOUNDS'
    diceCount = 0;
    diceContainer.innerHTML = '';
    diceArray = [];
    newDiceArray = [];
    hitRolls = 0;

    rollForHitsID.disabled = false;
    rollForWoundsID.disabled = false;

    
    //need to make a clear everything here
}