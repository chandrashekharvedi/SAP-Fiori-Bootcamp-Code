sap.ui.define([
    "ey/sd/products/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator, MessageToast) {
    'use strict';
    return Controller.extend("ey.sd.products.controller.View1", {
        // Controllers Constructor method
        onInit: function() {
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        handleGoNext: function(sPath) {

            // routerObj.navTo("nameOfRoute", oOptions?)

            this.oRouter.navTo("edit", {
                productId: sPath
            });
            // this.oRouter.navTo("fruits", {
            //     productId: sPath
            // });

            // // user case: to navigate to View2
            // let oView = this.getView();
            // let oAppCon = oView.getParent();
            // // oAppCon.to("idView2");

            // if(sPath){
            //     // let oView2 = oAppCon.getPage("idView2");
            //     let oView2 = oAppCon.getParent().getDetailPages()[1];
            //     // bind the view 2 with the binding path using element binding
            //     oView2.bindElement(sPath);
            //     // Navigate to view 2
            //     // oAppCon.to("idView2");
            //     oAppCon.getParent().toDetail("idView2");
            // }
        },

        handleFruitsSearch: function(oEvent) {
            // Step 1: Get the query parameter from the event object
            let sQuery = oEvent.getParameter("query");
            // Step 2: Construct the filters
            let oFilter1 = new Filter("name", FilterOperator.Contains, sQuery);
            let oFilter2 = new Filter("name", FilterOperator.StartsWith, sQuery);
            let oFilter3 = new Filter("type", "Contains", sQuery);
            let oFilter4 = new Filter("type", "StartsWith", sQuery);
            // Step 3: Combine the filters
            let oFilter = new Filter({
                filters: [oFilter1, oFilter2, oFilter3, oFilter4],
                and: false
            });
            // Step 4: Get the list object using its id
            let oList = this.getView().byId("idFruitsList");
            // Step 5: Get the object of list items binding
            let oItemsBinding = oList.getBinding("items");
            // Step 6: apply the filter on the binding 
            oItemsBinding.filter([oFilter]);
        },

        handleFruitDelete: function(oEvent) {
            // First Get the path of the item
            let oItemToBeDeleted = oEvent.getParameter("listItem");
            //  get the source object of the list control
            let oListControl = oEvent.getSource();
            // Remove the item from the list
            oListControl.removeItem(oItemToBeDeleted);
        },

        handleDeleteSelected: function(oEvent) {
            // Step 1: Get the list object
            let oList = this.getView().byId("idFruitsList");
            // Step 2: Find out all the selected list items
            let aSelectedItems = oList.getSelectedItems();
            // Step 3: Loop over all the items and remove each item one by one from the list
            aSelectedItems.forEach(oItem => {
                oList.removeItem(oItem);
            });
        },

        onSave: function() {
            alert("Under Development");
        },

        handelAddNewProd: function() {
            this.oRouter.navTo("addProd");
        },

        handleItemPress: function(oEvent) {
            let oSelectedItem = oEvent.getParameter("listItem");
            // Get the selected elements path
            let sPath = oSelectedItem.getBindingContextPath();
            // Get the index of the item in the model
            // let sIndex = sPath.split("/")[2];
            let sProductId = oSelectedItem.getBindingContext().getProperty("PRODUCT_ID");
            // Call the Go to Next function navigate on view 2 with the path
            this.handleGoNext(sProductId);
        }
    });
})