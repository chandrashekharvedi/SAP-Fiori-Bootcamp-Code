sap.ui.define([
    "ey/sd/products/controller/BaseController"
], function(Controller) {
    'use strict';
    return Controller.extend("ey.sd.products.controller.View2", {
        // Controllers Constructor method
        onInit: function() {

        },
        handleGoBack: function() {
            // user case: to navigate to View1
            let oView = this.getView();
            let oAppCon = oView.getParent();
            oAppCon.to("idView1");
        }
    });
})