const display = document.querySelector('.display');
let displayValue = '0';
let firstNumber = null;
let operator = null;
let secondNumber = null;

function updateDisplayValue(num) {
    if (displayValue === '0' && num !== '.') {
      displayValue = num;
    } else {
      displayValue += num;
    }
  
    if (operator === null) {
      firstNumber = parseFloat(displayValue);
    } else {
      secondNumber = parseFloat(displayValue);
    }
  
    display.textContent = displayValue;
  }

function calculate() {
  let result = firstNumber;
  switch (operator) {
    case '+':
      result += secondNumber;
      break;
    case '-':
      result -= secondNumber;
      break;
    case '*':
      result *= secondNumber;
      break;
    case '/':
      if (secondNumber === 0) {
        displayValue = 'Error: divide by zero';
        firstNumber = null;
        operator = null;
        secondNumber = null;
        return;
      } else {
        result /= secondNumber;
      }
      break;
  }
  if (result.toString().length > 10) {
    result = result.toFixed(10);
  }
  displayValue = result.toString();
  firstNumber = result;
  operator = null;
  secondNumber = null;
  display.textContent = displayValue;
}

const numberButtons = document.querySelectorAll('.button:not([data-operator], .equal)');

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    updateDisplayValue(button.textContent);
  });
});

const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (operator === null) {
        firstNumber = parseFloat(displayValue);
        operator = button.getAttribute('data-operator');
        displayValue = '0';
        display.textContent = displayValue;
      } else {
        // Check if secondNumber is already set
        if (secondNumber !== null) {
          calculate();
        }
        operator = button.getAttribute('data-operator');
        displayValue = '0';
        display.textContent = displayValue;
      }
    });
  });

const equalButton = document.querySelector('.equal');

equalButton.addEventListener('click', () => {
  if (operator !== null && displayValue !== '') {
    secondNumber = parseFloat(displayValue);
    calculate();
  }
});

const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
  displayValue = '0';
  firstNumber = null;
  operator = null;
  secondNumber = null;
  display.textContent = displayValue;
});

