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
    button.addEventListener('click', display);
});
operatorButtons.forEach((button) => {
    button.addEventListener('click', displayNew);
});
equalButton.addEventListener('click',function (e) {
    if (calculate.equal === '') {
        calculate.equal = e.target.textContent;
        displayOperations();
    }
});
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNum);
decimalButton.addEventListener('click', addDecimal);
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
function display(e) {
    if (calculate.equal === '=') {
        calculate.previousNum = calculate.currentNum;
        calculate.currentNum = '';
        calculate.equal = '';
        calculate.operator = '';
    }
    calculate.currentNum += e.target.textContent;
    displayCurrent.textContent = calculate.currentNum;
    console.log(calculate.currentNum);
    console.log(calculate);
}
function displayNew(e){
    if (calculate.currentNum !== '' && calculate.equal !== '=') {
        displayOperations();
    }
    if (calculate.operator === '' || (calculate.currentNum !== '' && calculate.operator !== '')) {
        calculate.operator = e.target.textContent;
        calculate.previousNum = calculate.currentNum;
        calculate.currentNum = '';
        calculate.equal = '';
        displayCurrent.textContent = calculate.previousNum;
        console.log(calculate);
    }
    displayPrevious.textContent = `${calculate.previousNum} ${e.target.textContent}`;
    calculate.operator = e.target.textContent;
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