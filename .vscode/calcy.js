
const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let startNewNumber = true;

function addNumber(number) {
    if (display.value === "Error") {
        resetCalculator();
    }

    if (startNewNumber) {
        display.value = number === "." ? "0." : number;
        startNewNumber = false;
        return;
    }

    if (number === "." && display.value.includes(".")) {
        return;
    }

    if (display.value.length >= 15) {
        return;
    }

    if (display.value === "0" && number !== ".") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function chooseOperator(op) {
    if (display.value === "Error") return;

    if (operator !== null && !startNewNumber) {
        calculate();

        if (display.value === "Error") return;
    }

    firstNumber = Number(display.value);
    operator = op;
    startNewNumber = true;
}

function calculate() {
    if (
        operator === null ||
        firstNumber === null ||
        startNewNumber ||
        display.value === "Error"
    ) {
        return;
    }

    const secondNumber = Number(display.value);
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                display.value = "Error";
                firstNumber = null;
                operator = null;
                startNewNumber = true;
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    if (!Number.isFinite(result)) {
        display.value = "Error";
    } else {
        display.value = String(Number(result.toPrecision(12)));
    }

    firstNumber = null;
    operator = null;
    startNewNumber = true;
}

function clearDisplay() {
    display.value = "0";
    startNewNumber = true;
}

function resetCalculator() {
    display.value = "0";
    firstNumber = null;
    operator = null;
    startNewNumber = true;
}
