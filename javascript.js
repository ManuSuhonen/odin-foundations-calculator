/*
var element = document.querySelector(' … ');
var styles = window.getComputedStyle(element, ':after')
var content = styles['content'];

window.getComputedStyle(
    document.querySelector('somedivId'), ':after'
);

window.getSelection().toString()


[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((accumulator, currentValue) => {
    return accumulator + currentValue
});


let callback = (x, y) => {
    return x + y;
}

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((accumulator, currentValue) => {
    return accumulator + currentValue
    //return "error"
}, 1);

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce(callback, 0);

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((pv, cv, ci, []) => {
    return pv + cv;
});


// Since we only consider letters and numbers, create a variable containing all valid characters
const alphanumerical = '+-/*0123456789';

// Convert to lowercase, split to array of individual characters, filter only valid characters, then rejoin as new string
const cleanedString = string
    .toLowerCase()
    .split('')
    .filter((character) => alphanumerical.includes(character))
    .join()

// Create a new reversed string for comparison
const reversedString = cleanedString.split('').reverse().join('');

// Return the outcome of the comparison which will either be true or false
//return cleanedString === reversedString;


let tt = parseInt(
    "asd"
);

let ttt = Number("asd")
Number.parseFloat("asd")

isNaN(number)

console.log(`${tt} ${ttt}`);


let getCount = () => {
    return outputStack.map(x => {
        let count = 0;
        if (operators.includes(x)) {
            count = count + 1;
        }
        return count;
    }).reduce((x, y) => { return x + y })
}

    const numerical = '0123456789';
    const operators = '-+/*'
    let ops = {
        "*":4,
        "/":3,
        "+":2,
        "-":1,
    }

    function operate(lhs, rhs, operator) {
        switch (operator) {
            case '*': return lhs * rhs;
            case '/': return lhs / rhs;
            case '+': return lhs + rhs;
            case '-': return lhs - rhs;
        }
    }

    let simpArr = "1+2*4-3";

    let holdingStack = [];

    let outputStack = [];

    [...(simpArr)].forEach(x => {
        if (numerical.includes(x)) {
            outputStack.push(x);
        } else {
            while (ops[holdingStack.at(-1)] > ops[x]){
                outputStack.push(holdingStack.pop());
            }
            holdingStack.push(x);
        }
    })

    outputStack.push(holdingStack.pop());

    console.log(holdingStack,outputStack);

    let getCount = () => {
        return outputStack.map(x => {
            let count = 0;
            if (operators.includes(x)) {
                count = count + 1;
            }
            return count;
        }).reduce((x, y) => { return x + y })
    }

    console.log(getCount());

    for (let idx = 0; idx < outputStack.length; idx++) {
        value = outputStack[idx];
        if (operators.includes(value)) {
            let lhs = outputStack[idx-2];
            let rhs = outputStack[idx-1];
            lhs = Number(lhs);
            rhs = Number(rhs);
            let res = operate(lhs,rhs,value);
            outputStack[idx] = res;
            outputStack[idx-2] = undefined;
            outputStack[idx-1] = undefined;
            break;
        }
    }

    console.log(getCount());
    console.log("asasdasdADS");
*/

let buttons = document.querySelectorAll('div[id="digits"]')
let screen = document.querySelector('div[id="screen"]');

buttons.forEach( x=> {
    x.style.cursor = "pointer";

    x.addEventListener("mouseenter", (event) => {
        event.target.style.opacity = "0.6";
    });
    
    x.addEventListener("mouseleave", (event) => {
        event.target.style.opacity = "";
    });    

    x.addEventListener("click", (event) => {
        event.target.style.opacity = "";
        screen.textContent = screen.textContent + event.target.textContent;
    });  
});


