sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict"
    return Controller.extend("shekhar.controller.Main", {
        // Here the functions will be written for the processing of data
        clickMe: function() {
            // Method 1: Getting the control object using App Object
            // Step 1: get the object of the app
            let oApp = sap.ui.getCore();
            // Step 2: From the 'App' Object get the control objet of input field
            let oInput = oApp.byId("idSpiderman");
            // Step 3: Call a ui5 method/fuction on the the input field to get the value property
            let sValue = oInput.getValue();

            // show the alert message with value
            alert(sValue);

        },

        runMyCode: function() {
            // Method 2: Getting the control object using this keyword
            // Step 1: Get the object of the view
            let oView = this.getView();
            // Step 2: Get the object of the input field control
            let oInput = oView.byId("idSpiderman2");
            // Step 3: Call a ui5 method/fuction on the the input field to get the value property
            let sValue = oInput.getValue();

            // show the alert message with value
            alert(sValue);
        },

        changeEmpName: function() {
            // Step 1: Get the object of Employee Name field
            let oEmpNameField = this.getView().byId("idEmpName");
            // Step 2: User setter function of value property of the control to change the value
            oEmpNameField.setValue("Jack");

            // Step 1: Get the object of Employee Name field
            let oSmokerField = this.getView().byId("idSmoker");
            // Step 2: User setter function of value property of the control to change the value
            oSmokerField.setSelected(false);
        }
    })
})