const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'webapp')));

const aEmployees = [
    {
        "empId": 1000,
        "empName": "Shekhar",
        "salary": 50000,
        "currency": "JPY"
    },
    {
        "empId": 1001,
        "empName": "Raghav",
        "salary": 10000,
        "currency": "JPY"
    },
    {
        "empId": 1002,
        "empName": "Syed",
        "salary": 60000,
        "currency": "JPY"
    },
    {
        "empId": 1003,
        "empName": "Sneha",
        "salary": 40000,
        "currency": "JPY"
    },
    {
        "empId": 1004,
        "empName": "Sakshi",
        "salary": 20000,
        "currency": "JPY"
    },

];

app.get("/", function (req, res) {
    // res.send("Hello World");

    res.sendFile(path.join(__dirname, 'webapp', 'index.html'));
})

app.get("/employees", function(req, res) {
   
    res.send(aEmployees);
});

app.get("/employees/:id", function(req, res) {
    let sId = req.params.id;

    let oResult = aEmployees.find(oEmp => {
        if (oEmp.empId == sId) {
            return oEmp;
        }
    });
    res.send(oResult || {});
})

app.listen(5000);
console.log("This webserver is running at:- https://localhost:5000");