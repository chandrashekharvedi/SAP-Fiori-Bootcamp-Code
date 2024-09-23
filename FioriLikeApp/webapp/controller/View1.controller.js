sap.ui.define([
    "ey/sd/products/controller/BaseController"
], function(Controller) {
    'use strict';
    return Controller.extend("ey.sd.products.controller.View1", {
        // Controllers Constructor method
        onInit: function() {

        },
        handleGoNext: function() {
            // user case: to navigate to View2
            let oView = this.getView();
            let oAppCon = oView.getParent();
            oAppCon.to("idView2");
        }
    });
})