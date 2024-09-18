module.exports = {
    calculator: function(a, b, opr) {
        switch (opr) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                if (b === 0) {
                    return new Error("Are you joking.");
                }
                return a / b;
        
            default:
                break;
        }
    },
    /**
     * 
     * @param {*} arr takes an array
     * @returns Returns a integer
     */
    printArrSize: function(arr) {
        console.log(arr.length);
    },
    /**
     * 
     * @param {*} object 
     * @param {*} obj1 
     * @param {*} obj2 
     */
    printObject: function(object, obj1, obj2) {
        for (const key in object) {
            const element = object[key];
            console.log(element);
        }
    }
}