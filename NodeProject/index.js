var fs = require('fs');


// Reading the file Asynchronously
fs.readFile("./sample.txt", 'utf-8', function(err, content){
    console.log("Async","\n", content);
});

console.log("--------------------------------");

// Reading the file Synchronously
let micky = fs.readFileSync("./sample.txt", "utf-8");
console.log("Sync","\n", micky);