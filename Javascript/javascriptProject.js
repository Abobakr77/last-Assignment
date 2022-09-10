function add(num1, num2){
    return  num1 + num2;
  
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num2 === 0? "can not divide by zero": (num1 / num2).toFixed(3);
}

function operate(operator, num1, num2){
     num1 = parseInt(num1);
     num2 = parseInt(num2);

    switch(operator){
        case "add":
            return add(num1, num2);
            break;
        case "subtract":
            return subtract(num1, num2);
            break;
        case "multiply":
            return multiply(num1, num2);
            break;
        case "divide":
            return  divide(num1, num2);
            break;
    }
    
}

// write this event to get number from calculator
// add Event Delegation to parent to call each child element of parent
// scond able to get value of ech element
const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator_display');
const keys = calculator.querySelector('.calculator_keys');
const operaterKeys = keys.querySelectorAll(`[data-type="operator"]`);
const numberKeys = keys.querySelectorAll(`[data-type="number"]`);
const num2 = 0;

keys.addEventListener('click', event =>{
    // we use closest method to prevent geting parent's children
    
    
    if(!event.target.closest('button')) return

    const key = event.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    const type = key.dataset.type;  // use dataset to get data-type 
    const previousKeyType = calculator.dataset.previousKeyType; // use it to get previous-key-type
    
    // first check if this is number key
    if(type === 'number'){
        if(displayValue === '0'){
            display.textContent = keyValue;
          }else if(previousKeyType === 'operator'){
            display.textContent = keyValue;
          }else{
            display.textContent = displayValue + keyValue;
          }
    }
      
      // second check if this operator key
    if(type === 'operator'){
        operaterKeys.forEach((element)=>{element.dataset.state=''});
        key.dataset.state = 'selected';  // allow operatoer button to be selected at one time 
        calculator.dataset.num1 = displayValue; // to save first number inside calculater
        calculator.dataset.operator = key.getAttribute('class');   // to save operation tpe    
    }

    // if type is equal perform calculation
    if(type === 'equal'){
        const num1 = calculator.dataset.num1;
        const num2 = displayValue;
        const operator = calculator.dataset.operator;
        display.textContent = operate(operator, num1, num2);   
    }

    if(type === 'clear'){
        display.textContent = '0';
        delete calculator.dataset.num1;
        delete calculator.dataset.operator;
    }

    calculator.dataset.previousKeyType = type; // to save and detect type in calculater div
   
})
    


