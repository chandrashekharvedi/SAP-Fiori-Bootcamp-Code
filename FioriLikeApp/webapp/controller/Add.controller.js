sap.ui.define([
    "ey/sd/products/controller/BaseController",
    "ey/sd/products/model/models",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
], function(Controller, models, History, MessageBox) {
    'use strict';
    return Controller.extend("ey.sd.products.controller.Add", {
        // Controllers Constructor method
        onInit: function() {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("addProd").attachMatched(this.fnAddPrdRouteMatched, this);
        },
        fnAddPrdRouteMatched: function(oEvent) {
            let oAddProdModel = models.createJSONModel();

            oAddProdModel.setData(this.getInitialData());

            this.getView().setModel(oAddProdModel, "add")
        },
        getInitialData: function() {
            return {
                PRODUCT_ID: "",
                TYPE_CODE: "PR",
                CATEGORY: "",
                NAME: "",
                DESCRIPTION: "",
                SUPPLIER_ID: "",
                SUPPLIER_NAME: "",
                TAX_TARIF_CODE: "1",
                MEASURE_UNIT: "EA",
                PRICE: "",
                CURRENCY_CODE: "",
                DIM_UNIT: "CM",
            }
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
        },
        onSupplierSelect: function(oEvent) {
            let oSelectedItem = oEvent.getParameter("selectedItem");
            let sSupplierName = oSelectedItem.getBindingContext().getProperty("COMPANY_NAME");

            this.getView().getModel("add").setProperty("/SUPPLIER_NAME", sSupplierName );
        },

        handelOnSave: function() {
            // Step 1: Get the data from add model
            let oView = this.getView();
            let oAddModelData = oView.getModel("add").getData();
            // Step 2: Get the object of Default Model and make a create request
            let oDefaultModel = oView.getModel();
            oDefaultModel.create("/ProductSet", oAddModelData, {
                success: function(oResponse) {
                    MessageBox.success("Product Successfully Added to the List");
                },
                error: function(oError) {
                    try {
                        let aErrors = JSON.parse(oError.responseText).error.innererror.errordetails;
                        let aMessage = [];
                        aErrors.forEach(oMessage => {
                            aMessage.push(oMessage.message);
                        })
                        MessageBox.error(aMessage.join("\n"));
                    } catch (error) {
                        MessageBox.error("Failed to Add new product.");
                    }
                    
                }
            })
            // MessageBox.show(JSON.stringify(oAddModelData));
        },

        clearForm: function() {
            let oAddModel = this.getView().getModel("add");
            oAddModel.setData(this.getInitialData());
        }
    });
})