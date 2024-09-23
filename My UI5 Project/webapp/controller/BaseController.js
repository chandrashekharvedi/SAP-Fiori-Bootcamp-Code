sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    'use strict';
    return Controller.extend("shekhar.controller.BaseController", {
        // Reusable Global Variables and Function will be declared here and available for other controller
        x: "Shekhar",

        // Reusable Function
        myReuseFunction: function() {
            alert('This global function called and value is ' + this.x);
        }
    })
});