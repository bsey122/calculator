function add(num1, num2) {
    return +num1 + +num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
}
let calculate = {
    currentNum: '',
    previousNum: '',
    operator: '',
    equal: null,
};
const numButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.op');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const decimalButton = document.querySelector('.decimal');
const current = document.querySelector('.current-display');
const previous = document.querySelector('.previous-display');
let displayCurrent = document.createTextNode('');
let displayPrevious = document.createTextNode('');
previous.appendChild(displayPrevious);
current.appendChild(displayCurrent);
numButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        display(e.target);
        e.preventDefault();
    });
});
operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        displayNew(e.target);
        e.preventDefault();
    });
});
equalButton.addEventListener('click', (e) => {
    evaluate(e.target);
    e.preventDefault();
});
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNum);
decimalButton.addEventListener('click', addDecimal);
window.addEventListener('keydown', function (e) {
    const numKey = document.querySelector(`.num[data-key="${e.key}"]`);
    if (!numKey) return;
    display(numKey);
    e.preventDefault();
    console.log(numKey);
});
window.addEventListener('keydown', function (e) {
    const opKey = document.querySelector(`.op[data-key="${e.key}"]`);
    if (!opKey) return;
    displayNew(opKey);
    e.preventDefault();
});
window.addEventListener('keydown', function (e) {
    const equalKey = document.querySelector(`.equal[data-key="${e.key}"]`);
    if (!equalKey) return;
    evaluate(equalKey);
    e.preventDefault();
});
window.addEventListener('keydown', function (e) {
    const decimalKey = document.querySelector(`.decimal[data-key="${e.key}"]`);
    if (!decimalKey) return;
    addDecimal();
    e.preventDefault();
});
window.addEventListener('keydown', function (e) {
    const delKey = document.querySelector(`.delete[data-key="${e.key}"]`);
    if (!delKey) return;
    deleteNum();
    e.preventDefault();
});
function operate(operator, num1, num2) {
    const choice = operator;
    switch (choice) {
        case '\u002b':
            return add(num1, num2);
        case '\u2212':
            return subtract(num1, num2);
        case '\u00d7':
            return multiply(num1, num2);
        case '\u00f7':
            return divide(num1, num2);
    
        default:
            break;
    }
}
function display(key) {
    if (calculate.equal === '=') {
        calculate.previousNum = calculate.currentNum;
        calculate.currentNum = '';
        calculate.equal = '';
        calculate.operator = '';
    }
    calculate.currentNum += key.textContent;
    displayCurrent.textContent = calculate.currentNum;
    console.log(calculate.currentNum);
    console.log(calculate);
}
function displayNew(key){
    if (calculate.currentNum !== '' && calculate.equal !== '=') {
        displayOperations();
    }
    if (calculate.operator === '' || (calculate.currentNum !== '' && calculate.operator !== '')) {
        calculate.operator = key.textContent;
        calculate.previousNum = calculate.currentNum;
        calculate.currentNum = '';
        calculate.equal = '';
        displayCurrent.textContent = calculate.previousNum;
        console.log(calculate);
    }
    displayPrevious.textContent = `${calculate.previousNum} ${key.textContent}`;
    calculate.operator = key.textContent;
}
function displayOperations() {
    if (calculate.operator !== '' && calculate.currentNum !== '' && calculate.previousNum !== '' ) {
        let newCal = operate(calculate.operator, calculate.previousNum, calculate.currentNum);
        displayPrevious.textContent = `${calculate.previousNum} ${calculate.operator} ${calculate.currentNum} =`;
        calculate.currentNum = newCal;
        displayCurrent.textContent = newCal;
        console.log(calculate);
    }
}
function evaluate(key) {
    if (calculate.equal === '') {
        calculate.equal = key.textContent;
        displayOperations();
    }
}
function clear() {
    for (const key in calculate) {
        calculate[key] = '';
    }
    displayCurrent.textContent = calculate.currentNum;
    displayPrevious.textContent = calculate.previousNum;
    console.log(calculate);
}
function deleteNum() {
    calculate.currentNum = calculate.currentNum.toString();
    numLength = calculate.currentNum.length;
    calculate.currentNum = calculate.currentNum.substring(0, numLength - 1);
    displayCurrent.textContent = calculate.currentNum;
    console.log(numLength);
    console.log(calculate.currentNum);
    console.log(calculate);
}
function addDecimal() {
    if (!calculate.currentNum.toString().includes('.')) {
        calculate.currentNum = calculate.currentNum.toString();
        calculate.currentNum += '.';
        displayCurrent.textContent = calculate.currentNum;
    }
}