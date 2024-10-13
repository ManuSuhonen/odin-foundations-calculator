const TokenTypes = {
    NUMBER: 'NUMBER',
    IDENTIFIER: 'IDENTIFIER', // New token type!
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/',
    EXPONENTIATION: '^',
    PARENTHESIS_LEFT: '(',
    PARENTHESIS_RIGHT: ')'
  };
  
  const TokenSpec = [
    [/^\s+/, null],
    [/^(?:\d+(?:\.\d*)?|\.\d+)/, TokenTypes.NUMBER],
    [/^[a-z]+/, TokenTypes.IDENTIFIER], // Now we can understand letters!
    [/^\+/, TokenTypes.ADDITION],
    [/^\-/, TokenTypes.SUBTRACTION],
    [/^\*/, TokenTypes.MULTIPLICATION],
    [/^\//, TokenTypes.DIVISION],
    [/^\^/, TokenTypes.EXPONENTIATION],
    [/^\(/, TokenTypes.PARENTHESIS_LEFT],
    [/^\)/, TokenTypes.PARENTHESIS_RIGHT]
  ];
  
  class Tokenizer {
    constructor(input) {
      this.input = input;
      this.cursor = 0;
    }
  
    hasMoreTokens() {
      return this.cursor < this.input.length;
    }
  
    match(regex, inputSlice) {
      const matched = regex.exec(inputSlice);
      if (matched === null) {
        return null;
      }
  
      this.cursor += matched[0].length;
      return matched[0];
    }
  
    getNextToken() {
      if (!this.hasMoreTokens()) {
        return null;
      }
  
      const inputSlice = this.input.slice(this.cursor);
  
      for (let [regex, type] of TokenSpec) {
        const tokenValue = this.match(regex, inputSlice);
  
        if (tokenValue === null) {
          continue;
        }
  
        if (type === null) {
          return this.getNextToken();
        }
  
        return {
          type,
          value: tokenValue,
        };
      }
  
      throw new SyntaxError(`Unexpected token: "${inputSlice[0]}"`);
    }
  }
  
  const operators = {
    '^': {
      prec: 4,
      assoc: 'right',
    },
    '*': {
      prec: 3,
      assoc: 'left',
    },
    '/': {
      prec: 3,
      assoc: 'left',
    },
    '+': {
      prec: 2,
      assoc: 'left',
    },
    '-': {
      prec: 2,
      assoc: 'left',
    },
  };
  
  const functionList = ['sin', 'cos', 'tan'];
  
  const isFunction = (token) => {
    return functionList.includes(token.toLowerCase());
  };
  
  const assert = (predicate) => {
    if (predicate) return;
    throw new Error('Assertion failed due to invalid token');
  };
  
  const evaluate = (input) => {
    const opSymbols = Object.keys(operators);
    const stack = [];
    let output = [];
  
    const peek = () => {
      return stack.at(-1);
    };
  
    const addToOutput = (token) => {
      output.push(token);
    };
  
    const handlePop = () => {
      const op = stack.pop();
  
      if (op === '(') return;
  
      if (isFunction(op)) {
        const poppedValue = output.pop();
        switch (op) {
          case 'sin':
            return Math.sin(poppedValue);
          case 'cos':
            return Math.cos(poppedValue);
          case 'tan':
            return Math.tan(poppedValue);
        }
      }
  
      const right = parseFloat(output.pop());
      const left = parseFloat(output.pop());
  
      switch (op) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return left / right;
        case '^':
          return left ** right;
        default:
          throw new Error(`Invalid operation: ${op}`);
      }
    };
  
    const handleToken = (token) => {
      switch (true) {
        case !isNaN(parseFloat(token)):
          addToOutput(token);
          break;
        case isFunction(token):
          stack.push(token);
          break;
        case opSymbols.includes(token):
          const o1 = token;
          let o2 = peek();
  
          while (
            o2 !== undefined &&
            o2 !== '(' &&
            (operators[o2].prec > operators[o1].prec ||
              (operators[o2].prec === operators[o1].prec &&
                operators[o1].assoc === 'left'))
          ) {
            addToOutput(handlePop());
            o2 = peek();
          }
          stack.push(o1);
          break;
        case token === '(':
          stack.push(token);
          break;
        case token === ')':
          let topOfStack = peek();
          while (topOfStack !== '(') {
            assert(stack.length !== 0);
            addToOutput(handlePop());
            topOfStack = peek();
          }
          assert(peek() === '(');
          handlePop();
          if (isFunction(peek())) {
            addToOutput(handlePop());
          }
          break;
        default:
          throw new Error(`Invalid token: ${token}`);
      }
    };
  
    const tokenizer = new Tokenizer(input);
    let token;
    while ((token = tokenizer.getNextToken())) {
      handleToken(token.value);
    }
  
    while (stack.length !== 0) {
      assert(peek() !== '(');
      addToOutput(handlePop());
    }
  
    return output[0];
  };

let screen = document.querySelector('div[id="screen"]');
let buttons = document.querySelectorAll('div .button');

buttons.forEach(x => {
    x.style.cursor = "pointer";

    x.addEventListener("mouseenter", (event) => {
        event.target.style.opacity = "0.6";
    });

    x.addEventListener("mouseleave", (event) => {
        event.target.style.opacity = "";
    });

});

let symbols = document.querySelectorAll('div .symbol');

symbols.forEach(x => {
    x.addEventListener("click", (event) => {

        screen.textContent = screen.textContent + event.target.textContent;
    });
});

let clearBtn = document.querySelector('div .clear');

clearBtn.addEventListener("click", (event) => {
    screen.textContent = "";
});

let equalBtn = document.querySelector('div .equal');

equalBtn.addEventListener("click", (event) => {
    let input = screen.textContent;
    console.log(input);

    let answer = evaluate(input);
    console.log(answer);

    screen.textContent = String(answer);
});