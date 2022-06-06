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

let rerollHitsID = document.getElementById("rerollhitsID");
let rerollWoundsID = document.getElementById("rerollwoundsID");

let diceArray = [];
let newDiceArray = [];
let diceRolls = 0;
let selectorValue = 0;
// Tracker for Reroll button.disabled
let hRerollCount = 0;
let wRerollCount = 0;

rerollHitsID.disabled = true;
rerollWoundsID.disabled = true;

createSelectors("wSelected", wSelectors)
createSelectors("hSelected", hSelectors)

/*
Creates event listeners for the Dice Selectors.
Highlights the dice that meets selector threshold.
Updates X hits or X wounds.
*/
function createSelectors(selectorClass, selectorslisteners) {
    for (let i = 0; i < selectorSize; i++) {
        selectorslisteners[i].addEventListener("click", function() {
            let currentWSel = document.getElementsByClassName(selectorClass);
            let currentRolls = document.querySelectorAll(".rollSelected");
            // console.log(currentRolls.length)
            // Remove selected red functions
            if (currentWSel.length > 0) {
                currentWSel[0].classList.remove(selectorClass)
                for (let i =0; i < currentRolls.length; i++) {
                    currentRolls[i].classList.remove("rollSelected")
                }
            }
            this.classList.add(selectorClass);
            let selectorString = this.innerHTML.split("+");
            selectorValue = parseInt(selectorString[0], 10)
            selectDice(diceArray, selectorValue);
            diceRolls = newDiceArray.length;
            //Keep track of Wound number
            if (selectorClass === "wSelected") {
                wDiceCountID.innerHTML = `= ${diceRolls} WOUNDS`;
                // Keep track of Reroll button.disabled
                wRerollCount++;
                if (wRerollCount === 1) {
                    rerollWoundsID.disabled = false;
                }
            //Keep track of Hit number
            } else if (selectorClass === "hSelected") {
                hDiceCountID.innerHTML = `= ${diceRolls} HITS`;
                // Keep track of Hit number
                hRerollCount++;
                if (hRerollCount === 1) {
                    rerollHitsID.disabled = false;
                }

            }

            
            
        })
    }
}


// For auto hitters
rollForWoundsID.addEventListener("click", rollWounds);
function rollWounds() {
    generateDice();
    rollForWoundsID.disabled = true;
    rerollHitsID.disabled = true;
}

// Select rolls based on selector
// Paramaters = (array, int)
// Return array of indexes that meet selector criteria.
function selectDice(diceRollsArray, diceSelector) {
    newDiceArray = diceRollsArray.reduce(function(indexes, currentRoll, index) {
        if (currentRoll >= diceSelector) {
            indexes.push(index)
        }
        return indexes;
    }, []);

    //Need to make this into a function highlightRolls()? .eq(i) in a forloop
    for (let i = 0; i < newDiceArray.length; i++) {
        $("div.dice").eq(newDiceArray[i])[0].classList.add("rollSelected");
    }
}


// Generates X random dice from 1 to 6 when ROLL is clicked
rollForHitsID.addEventListener("click", rollHits);

function rollHits() {
    generateDice();
}

function generateDice() {
    diceArray = [];
    const diceCount = document.getElementById("diceCount").value;

    // If no hit rolls were rolled previously
    if (diceRolls === 0) {
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
    } else if (diceRolls > 0) {
        let diceDiv = ""
            for (let i = 0; i < diceRolls; i++) {
                let dice = Math.floor(Math.random()*6)+1;
                diceDiv +=
                `<div class="dice">${dice}</div>`;
                diceArray.push(dice);
            }
        diceContainer.innerHTML = diceDiv;
    }

    // Rerolls when you click on a rolled dice at the bottom.
    // TODO: Need to update main array when dice is rerolled. Possibly with diceArray? accomplished
    // TODO: Update selector count if rerolled meets threshold?
    document.querySelectorAll(".dice").forEach(diceEl => {
        diceEl.addEventListener("click", event => {
            // for loop?
            rerollDice(diceEl);
        })
      })
}

rerollHitsID.addEventListener("click", function() {
    document.querySelectorAll(".dice").forEach(diceEl => {
        if (diceEl.innerHTML === "1") {
            console.log("equals 1");
            rerollDice(diceEl)
        }
    })
    rerollHitsID.disabled = true;
})

rerollWoundsID.addEventListener("click", function() {
    document.querySelectorAll(".dice").forEach(diceEl => {
        if (diceEl.innerHTML === "1") {
            console.log("equals 1");
            rerollDice(diceEl)
        }
    })
    rerollWoundsID.disabled = true;
})

function rerollDice(diceElem) {
    let timesRun = 0;
    let interval = setInterval(function () {
        timesRun += 1;
        diceElem.innerHTML = Math.floor(Math.random() * 6) + 1;
        // Reroll animation
        // Update hit or wound count
        if (timesRun === 10) {
            clearInterval(interval)
            let tempArray = [];
            document.querySelectorAll(".dice").forEach(itemRoll => {
                tempArray.push(itemRoll.innerHTML);
            })
            diceArray = tempArray;
            diceArray = diceArray.map(diceNum => Number(diceNum))

            // Hit reroll
            if (diceElem.innerHTML >= selectorValue && rollForHitsID.disabled && !rollForWoundsID.disabled) {
                diceElem.classList.add("rollSelected");
                diceRolls += 1;
                hDiceCountID.innerHTML = `= ${diceRolls} HITS`;

            } else if (diceElem.innerHTML >= selectorValue
                && rollForHitsID.disabled
                && rollForWoundsID.disabled) {
                diceElem.classList.add("rollSelected");
                diceRolls += 1;
                wDiceCountID.innerHTML = `= ${diceRolls} WOUNDS`;
            }
        }
    }, 20)

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
    diceRolls = 0;

    rollForHitsID.disabled = false;
    rollForWoundsID.disabled = false;
    rerollHitsID.disabled = true;
    rerollWoundsID.disabled = true;
    hRerollCount = 0;
    wRerollCount = 0;
}