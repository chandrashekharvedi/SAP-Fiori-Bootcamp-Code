sap.ui.jsview("shekhar.view.Main", {

    getControllerName: function() {
        return "shekhar.controller.Main";
    },

    createContent: function(oController) {
        // create the object of button control
        let oButton = new sap.m.Button("idThor", {
            text: "Thor",
            press: oController.clickMe
        });

        let oInput = new sap.m.Input("idSpiderman", {
            value: "Wow!",
            width: "20%"
        })

        // return the control object 
        return [oInput, oButton];
    }
})