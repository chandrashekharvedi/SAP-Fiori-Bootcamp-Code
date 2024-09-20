sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "shekhar/model/models"
], function(Controller, models) {
    "use strict"
    return Controller.extend("shekhar.controller.Main", {

        // HOOK Methods of the controller

        // This method is used to initialize the controller - it will be executed only once
        onInit: function() {
            // // Step 1: Create a new model object
            // let oModel = new sap.ui.model.json.JSONModel();
            // // Step 2: Set or load the data in the model
            // oModel.setData({
            //     "empStr": {
            //         "empId": "1001",
            //         "empName": "Ironman",
            //         "salary": 60000,
            //         "currency": "USD",
            //         "smoker": true
            //     },
            //     "empTab": []
            // });


            // Step 1: get the model object from the models.js
            let oModel = models.createJSONModel("dataset.json");

            let oAvenger = models.createJSONModel("EmployeeData.json");

            // Step 3: Make the model aware to the application / view / controller
            // sap.ui.getCore().setModel(oModel);  // to set the model on application level
            this.getView().setModel(oAvenger, "Avenger"); // to set the model on view level
            this.getView().setModel(oModel);


            // Different Binding Syntax
            // Method 1:
            this.getView().byId("idEmpSalary").bindValue('salary');

            // Method 2:
            this.getView().byId("idEmpCurr").bindProperty('value', 'currency');
        },

        // onBeforeRendering: function() {
        //     // alert("This alert is shown from Before Rendering Hook Method");

        //     // Step 1: Get the salary value from the model
        //     let sSalary = this.getView().getModel().getProperty("/empStr/salary");
        //     // Step 2: check if salary > 10000
        //     if (sSalary > 10000) {
        //         // Step 3: make the salary field grey out (disable)
        //         this.getView().byId('idEmpSalary').setEnabled(false);
        //     }

        // },

        // onAfterRendering: function() {
        //     // alert("This alert is shown from After Rendering Hook Method");
        //     $("#idMainXMLView--idSimpleForm").fadeOut(3000, function() {
        //         $("#idMainXMLView--idSimpleForm").fadeIn(3000);
        //     });
        // },

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
        },

        onChangeData: function() {
            // // New Approach - Using Model
            // // Step 1: get the model object from app or view (in onInit the is set at view level)
            // let oModel = this.getView().getModel();
            // // Step 2: set the new data on Model
            // oModel.setProperty("/empStr", {
            //     "empId": "1002",
            //     "empName": "Hulk",
            //     "salary": 40000,
            //     "currency": "EUR",
            //     "smoker": false
            // });


            // Switch the data bound to the Simple form between the models

            let oDefaultModel = this.getView().getModel(); 
            let oAvengerModel = this.getView().getModel("Avenger");

            // method 1 
            // let oDefaultModelData = JSON.parse(JSON.stringify(oDefaultModel.getData()));
            // let oAvengerModelData = JSON.parse(JSON.stringify(oAvengerModel.getData()));

            // oDefaultModel.setData(oAvengerModelData);

            // oAvengerModel.setData(oDefaultModelData);

            // method 2
            this.getView().setModel(oAvengerModel);
            this.getView().setModel(oDefaultModel, 'Avenger');

        },

        onItemPress: function(oEvent) {
            // Step 1: Get the selected list Item from the Event Object
            let oSelectedItem = oEvent.getParameter("listItem");
            // Step 2: Get the binding context of the selected item for default model (model with no name)
            let oSelItemContext = oSelectedItem.getBindingContext();
            // Step 3: Get the path of the selected items binding context
            let sPath = oSelItemContext.getPath();
            debugger;

            // Step 4: Get the simple form control object
            let oSimpleForm = this.getView().byId("idSimpleForm");

            // Step 5: Bind simple form with the selected items path
            oSimpleForm.bindElement(sPath);
        
        }
    })
})