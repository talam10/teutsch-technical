import calc from "./calcLogo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [val, setInput] = useState('');
  const operators = ['+', '-', '*', '/', '%', '.'];
  
  // function that handles with button clicking
  const buttonClick = (userInput: string) => {
    // prevent typing the operators more than once in a row
    if (operators.includes(userInput) && val === '' ||
        operators.includes(userInput) && operators.includes(val.slice(-1))) {
          return;
        }
    // Have C button that only deletes one input
    switch (userInput) {
      case 'C':
        setInput((prev) => prev.slice(0, -1));
        break;

    // Have AC button that will clear everything
      case 'AC':
        setInput('');
        break;
      case '=':
        try {
          setInput(eval(val).toString());
        } catch (error) {
          // If a user tries to put an input that's not compatible and hit enter, 
          // it will show an error on the input screen
          setInput('Error with the input. Please try again!')
        }
        break;
      default:
        setInput((prev) => prev + userInput);
        break;
    }
  };

  // function that handles with keyboard pressing
  useEffect(() => {
    const keyBoardPress = (event: { key: any; }) => {
      const userInput = event.key;
      // This if-else parts deal with the essential first
      // like typing digits and operators and making sure
      // the operators are not repeated
      if (/[0-9]/.test(userInput) || operators.includes(userInput)) {
        buttonClick(userInput);
      } else if (operators.includes(userInput) || userInput === '.') {
        buttonClick(userInput);
      } else {
        // Now we have our other essentials that we grouped together
        switch (userInput) {
          case 'Enter':
          case 'Return':
            buttonClick('=');
            break;
          case 'Backspace':
          case 'Delete':
            buttonClick('C');
            break;
          default:
            break;
        }
      }
    };
    document.addEventListener("keydown", keyBoardPress);
    return () => {
      document.removeEventListener("keydown", keyBoardPress);
    };
  }, [val]);

  return (
    <div className="main">
      <section className="calculator-body">
        <div>
          <img src={calc} className="calc-logo" alt="logo" />
          <header className="calcHeading"> React Calculator </header>
        </div>

        <input type="text" value={val} id="calculator-input"/>

        <div className="c-ac-equals">
          <button className="c-button" onClick={() => buttonClick('C')}>C</button>
          <button className="ac-button" onClick={() => buttonClick('AC')}>AC</button>
          <button className="equals" onClick={() => buttonClick('=')}>=</button>      
        </div>

        <div>
          <button className="calculator-button" onClick={() => buttonClick('7')}>7</button>
          <button className="calculator-button" onClick={() => buttonClick('8')}>8</button>
          <button className="calculator-button" onClick={() => buttonClick('9')}>9</button>
          <button className="operator" onClick={() => buttonClick('/')}>/</button>
        </div>

        <div>
          <button className="calculator-button" onClick={() => buttonClick('4')}>4</button>
          <button className="calculator-button" onClick={() => buttonClick('5')}>5</button>
          <button className="calculator-button" onClick={() => buttonClick('6')}>6</button>
          <button className="operator" onClick={() => buttonClick('*')}>X</button>
        </div>

        <div>
          <button className="calculator-button" onClick={() => buttonClick('1')}>1</button>
          <button className="calculator-button" onClick={() => buttonClick('2')}>2</button>
          <button className="calculator-button" onClick={() => buttonClick('3')}>3</button>
          <button className="operator" onClick={() => buttonClick('+')}>+</button>
        </div>
        
        <div>
          <button className="calculator-button" onClick={() => buttonClick('0')}>0</button>
          <button className="calculator-button" onClick={() => buttonClick('.')}>.</button>
          <button className="operator" onClick={() => buttonClick('%')}>%</button>
          <button className="operator" onClick={() => buttonClick('-')}>-</button>
        </div>      
      </section>
    </div>
  );
}

export default App;
