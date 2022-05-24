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

let diceArray = [];


for (let i = 0; i < selectorSize; i++) {
    hSelectors[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("selected");
        let currentRolls = document.querySelectorAll(".rollSelected");
        console.log(currentRolls.length)
        // Remove selected red functions
        if (current.length > 0) {
            current[0].classList.remove("selected")
            for (let i =0; i < currentRolls.length; i++) {
                currentRolls[i].classList.remove("rollSelected")
            }
        }
        this.classList.add("selected");
        let selectorString = this.innerHTML.split("+");
        const selectorValue = parseInt(selectorString[0], 10)
        selectDice(diceArray, selectorValue);
    })
}

// Select rolls based on selector
// Paramaters = (array, int)
// Return array of indexes that meet selector criteria.
function selectDice(diceRolls, diceSelector) {
    const newDiceArray = diceRolls.reduce(function(indexes, currentRoll, index) {
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
}

// Generates X random dice from 1 to 6 when ROLL is clicked
function generateDice() {
    diceArray = [];
    const diceCount = document.getElementById("diceCount").value;
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

}

function clearDice() {
    document.getElementById("diceCount").value = '';
    diceCount = 0;
    diceContainer.innerHTML = '';

    //need to make a clear everything here
}