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

// DOM for radio button
let hitRadio = document.getElementById("hit");
let woundRadio = document.getElementById("wounds");

// DiceCount for hits
let hDiceCountID = document.getElementById("hDiceCount")

let diceArray = [];

// if "Hits" radio is clicked, reveal wounds dice.
hitRadio.addEventListener("click", function() {
    document.getElementById("hitSelectorSection").style.display ="flex";
    document.getElementById("rollforwounds").style.display ="block";
})

// if "Wounds" radio is clicked, hide hits dice.
woundRadio.addEventListener("click", function() {

    document.getElementById("hitSelectorSection").style.display ="none";
    document.getElementById("rollforwounds").style.display ="none";
})

// Event listeners for "Hit" selectors
for (let i = 0; i < selectorSize; i++) {
    hSelectors[i].addEventListener("click", function() {
        let currentHSel = document.getElementsByClassName("hSelected");
        let currentRolls = document.querySelectorAll(".rollSelected");
        console.log(currentRolls.length)
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
    console.log(`newDiceArray: ${newDiceArray}`);
    console.log(`diceRolls: ${diceRolls}`);
    hDiceCountID.innerHTML = `= ${newDiceArray.length} HITS`;
}

// Generates X random dice from 1 to 6 when ROLL is clicked
function generateDice() {
    if (hitRadio.checked || woundRadio.checked) {
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
    } else {
        alert(`Must select "Hits" or "Wounds"`)
    }

}

function clearDice() {
    document.getElementById("diceCount").value = '';
    diceCount = 0;
    diceContainer.innerHTML = '';

    //need to make a clear everything here
}