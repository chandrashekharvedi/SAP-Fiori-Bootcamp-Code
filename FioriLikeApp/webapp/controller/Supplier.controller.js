sap.ui.define([
    "ey/sd/products/controller/BaseController",
    "sap/ui/core/routing/History"
], function(Controller, History) {
    'use strict';
    return Controller.extend("ey.sd.products.controller.Supplier", {
        // Controllers Constructor method
        onInit: function() {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("supplier").attachMatched(this.fnSupplierRouteMatched, this);
        },
        fnSupplierRouteMatched: function(oEvent) {
            // Extract the Fruit Id from the route arguments
            let sSupplierId = oEvent.getParameter("arguments").supplierId;
            // Build the path for element binding using the fruit ex:- '/suppliers/3'
            let sPath = "/suppliers/" + sSupplierId;
            // Bind the current view (view2) object directly with the model path
            this.getView().bindElement(sPath);
        },

        onBack: function() {
            var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.oRouter.navTo("spiderman", {}, true);
			}
        }
    });
})