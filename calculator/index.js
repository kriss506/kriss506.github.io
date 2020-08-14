/* 

Simple Calculator

Kriss Wilson 13/08/2020 

This simple calculator allows the user to enter a string of calculations eg 1+2+3*4/5

The javascript eval function performs the calculation ensuring the correct order of operations rules are applied.
eg multiplication and division before addition and subtraction (brackets buttons are not provided).

A backspace key can be used to delete the last characters of the equation string.

When the answer is calculated after the equals key is pressed, the user can click another operator button to use the answer as
a starting point for a new equation.

If a digit is clicked after the answer has been displayed, the calculator is reset.

*/

let buttons = document.querySelectorAll(".button");
let display = document.querySelector(".display");
// The display will be the destination for the answer
display.innerHTML = "0";
let secondaryDisplay = document.querySelector(".secondaryDisplay");
// The secondaryDisplay will show the equation entered

let termQueue = [];
// The termQueue stores the terms of the equation
let buttonQueue = [];
// The button innerHTML is added to the beginning of the buttonQueue.
// The buttonQueue can be used to check the last button pressed etc

let termString = "";
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const OPERATORS = ['+', '-', '*', '/', '%'];

let equationString = "";
// Will store the user's button presses including digits and operators

let lastButtonClicked = "";

// Assign one event listener for all the buttons
for (let i = 0; i < buttons.length; i++) {
    const element = buttons[i];
    element.addEventListener("click", buttonClicked);
}


// Function buttonClicked responds to all button clicks (digits,operators, = ,C) etc
function buttonClicked(event) {
    console.log(event.target.innerHTML);
    buttonQueue.unshift(event.target.innerHTML);
    // Insert items at the start of the queue so that the current click will always be buttonQueue[0]
    // Which makes it easier to compare the current and previous button clicks



    // If C key was clicked
    if (event.target.innerHTML == "C") {
        equationString = "";
        termString = "";
        termQueue = [];
        buttonQueue = [];
        //queueDisplay.innerHTML = '';
        secondaryDisplay.innerHTML = '';
        display.innerHTML = "0";

    }

    // If the backspace button was clicked
    if (event.target.innerHTML.charCodeAt(0) == 9003) {
        //Backspace key = 9003
        let n = String(termString).length;
        termString = String(termString);

        // Remove the last character from the term string
        if (n > 0) {
            termString = termString.substring(0, termString.length - 1);

        }
        // Remove the last character from the equation string
        n = String(equationString).length;
        equationString = String(equationString);

        if (n > 0) {
            equationString = equationString.substring(0, equationString.length - 1);

        }

    }

    // If a digit button was clicked

    if (DIGITS.includes(Number(event.target.innerHTML)) || event.target.innerHTML == '.')
    // First check if 0..9 or a decimal point 
    {
        let acceptDigit = true;

        if (buttonQueue[1] == "=") { equationString = ""; termString = ""; }
        // If the answer is being displayed, and another digit is clicked, reset the calculator strings



        if (termString.includes(".") && event.target.innerHTML == '.') {
            acceptDigit = false;
            // If the term string already includes a decimal point, don't add another one.

        }
        if (buttonQueue[1] == "0" && buttonQueue[0] == 0 && termString.length == 1) {
            acceptDigit = false;
            /*             buttonQueue[1] is the digit previous to the current one
                        buttonQueue[0] is the current digit
                        So, this is checking whether 2 zeroes where entered in succession at the start of the term
                        If so, we don't want to accept the zero */

        }
        if (buttonQueue[1] == "0" && buttonQueue[0] > 0 && termString.length == 1) {
            termString = "";
            //equationString = "";
            /*              buttonQueue[1] is the digit previous to the current one
                        buttonQueue[0] is the current digit
                        So, this is checking whether a digit >0 was entered at the start of the term.
                        If so, only accept the digit that is greater than 0 by setting the strings to "" */
        }

        if (acceptDigit) {
            // If passes the tests, acceptDigit will be true, which signals it's ok to add the digit or decimal point to the equation and term strings
            console.log("a digit was entered");
            console.log(event.target.innerHTML);
            termString += event.target.innerHTML;
            equationString += event.target.innerHTML;
            console.log(equationString);
            console.log('term string value ' + termString);
        }
    }

    // Display the equation so far
    if (equationString != "") { secondaryDisplay.innerHTML = equationString; display.innerHTML = termString }
    else { display.innerHTML = "0"; secondaryDisplay.innerHTML = ""; }

    // If an operator key was clicked
    if (OPERATORS.includes(event.target.innerHTML)) {
        console.log("an operator was entered");
        console.log(event.target.innerHTML);
        let myOperator = event.target.innerHTML;
        // The operator type is represented by the button's innerHTML

        let lastCharacterOfEquation = equationString.charAt(equationString.length - 1);

        if (OPERATORS.includes(lastCharacterOfEquation)) {
            console.log("attempting to insert two operators in succession");
        } else
            if ((myOperator == '*' || myOperator == '/') && equationString.length == 0) {
                console.log(" attempting to insert * or / at beginning of equation string");
            }
            else {
                // Clicking an operator signals the start of a new term
                termQueue.push(termString);
                display.innerHTML = termString;
                termString = "";
                console.table(termQueue);
                equationString += myOperator;
                console.log(equationString);
                secondaryDisplay.innerHTML = equationString;
            }
    }



    // If the equals key was clicked
    if (event.target.innerHTML == "=") {
        // console.log(eval(equationString));
        secondaryDisplay.innerHTML = equationString + "=";
        let answer = eval(equationString);
        // Let eval provide the answer to perform order of operations correctly
        console.log(answer);
        display.innerHTML = answer;
        equationString = String(answer);
        termString = String(answer);
        // Assign the answer to the equation string
        termQueue = [];
        termQueue.push(answer);

    }


}
