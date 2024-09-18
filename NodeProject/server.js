// console.log("Welcome to NodeJS - How can i help you?");

// function calculator (a, b, opr) {
//     switch (opr) {
//         case "+":
//             return a + b;
//         case "-":
//             return a - b;
//         case "*":
//             return a * b;
//         case "/":
//             if (b === 0) {
//                 return new Error("Are you joking.");
//             }
//             return a / b;
    
//         default:
//             break;
//     }
// }

const obj = require('./utils/reuse.js');

// var p = obj.calculator(20, 3, "-");
// var x = obj.calculator(20, 3, "*");
// var y = obj.calculator(20, 3, "+");

try {
    var z = obj.calculator(20, 10, "/");
} catch (error) {
    console.log(error);
}

// console.log(x);
// console.log(y);
// console.log(z);
// console.log(p);

let oStudent = {
    "studentId": 10,
    "marks": 100,
    "rollNo": 55888,
    "name": "Ananya"
};

let aFruits = ["Apple", "Banana", "Cherry"];

obj.printArrSize(aFruits);
console.log("==========================");
obj.printObject(oStudent);