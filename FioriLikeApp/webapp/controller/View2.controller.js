sap.ui.define([
    "ey/sd/products/controller/BaseController",
    "sap/m/Column",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter"
], function(Controller, Column, MessageToast, MessageBox, Fragment, Filter) {
    'use strict';
    return Controller.extend("ey.sd.products.controller.View2", {
        // Controllers Constructor method
        onInit: function() {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("fruits").attachMatched(this.ironman, this);
        },
        ironman: function(oEvent) {
            // Extract the Fruit Id from the route arguments
            let sFruitId = oEvent.getParameter("arguments").fruitId;
            // Build the path for element binding using the fruit ex:- '/fruits/3'
            let sPath = "/fruits/" + sFruitId;
            // Bind the current view (view2) object directly with the model path
            this.getView().bindElement(sPath);

            // Read the query arguments
            let oQuery = oEvent.getParameter("arguments")["?query"];
            this.getView().getModel("UIprops").setProperty("/selectedIconTab", (oQuery?.area || "moreDetails"))
        },
        handleGoBack: function() {
            // // user case: to navigate to View1
            // let oView = this.getView();
            // let oAppCon = oView.getParent();
            // oAppCon.to("idView1");
            this.oRouter.navTo("spiderman");
        },

        onAddNewCol: function() {
            // Step 1: Get/Construct the Object of Column
            let oColumn = new Column({
                header: new sap.m.Label({
                    text: "Email"
                })
            });

            // Step 2: get the table object and add column  to the table
            let oTable = this.getView().byId("idSupplierTab");
            oTable.addColumn(oColumn);

            // Step 3: Modify the items aggregation of the table and add the email data
            oTable.bindAggregation("items", {
                path: "/suppliers",
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({text: '{name}'}),
                        new sap.m.Input({value: '{city}'}),
                        new sap.m.Text({text: '{sinceWhen}'}),
                        new sap.m.Text({text: '{contactPerson}'}),
                        new sap.m.Text({text: '{email}'})
                    ]
                })
            })
        },

        onSupplierSelect: function(oEvent) {
            // Get the selected item
            let oSelectedSupplier = oEvent.getParameter("listItem");
            // Get the binding context path
            let sPath = oSelectedSupplier.getBindingContextPath();
            
            this.oRouter.navTo("supplier", {
                supplierId: sPath.split("/")[2]
            });
        },

        onSave: function() {
            // Message Toast
            // MessageToast.show("This is the message from the server to the user in a message toast");

            // Message Box
            // 1. Confirmation Message Box
            // MessageBox.confirm("Are you sure you want save the data?", {
            //     // onClose: function(sAction) {
            //     //     MessageToast.show("Pressed " + sAction);
            //     // }   
            //     onClose: this.onCloseMessageBox.bind(this)
            // });

            // 2. Error Message Box
            // MessageBox.error("You cannot save this data");

            // 3. Information Message Box
            // MessageBox.information("You can save the data only after filling all the required fields.", {
            //     title: "Custom Info Title"
            // });

            // 4. Warning Message Box
            MessageBox.warning("If you go back you will loose all the data", {
                // actions: [MessageBox.Action.IGNORE, MessageBox.Action.RETRY],
                // emphasizedAction: MessageBox.Action.RETRY,
                actions: ["Proceed", "Let me check"],
                emphasizedAction: "Proceed",
                onClose: this.onCloseMessageBox
            });
        },

        onCloseMessageBox: function(sAction) {
            debugger;
            MessageToast.show("Pressed " + sAction);
            // this.getView().setBusy(true);

            // setTimeout(() => {
            //     this.getView().setBusy(false);
            // }, 3000);
            // setTimeout(function () {
            //     this.getView().setBusy(false);
            // }, 3000);
        },
        citiesPopup: null,
        handleValueHelpRequest: function() {
            // There 3 methods to load a fragment in JS (Controller)
            // 1. Synchronous Method
            // let oPopup = sap.ui.xmlfragment("ey.sd.products.view.fragments.popup");
            // this.getView().addDependent(oPopup);
            // oPopup.setTitle("Select Citites");
            // oPopup.bindAggregation("items", {
            //     path: "/cities",
            //     template: new sap.m.DisplayListItem({
            //         label: "{name}",
            //         value: "{city}"
            //     })
            // });
            // oPopup.open();

            // 2. Method 2 using core Fragment class (Asynchronous method)
            // Fragment.load({
            //     name: "ey.sd.products.view.fragments.popup",
            //     controller: this
            // }).then(
            //     (oDialog) => {
            //         this.getView().addDependent(oDialog);
            //         oDialog.setTitle("Select Citites");
            //         oDialog.bindAggregation("items", {
            //             path: "/cities",
            //             template: new sap.m.DisplayListItem({
            //                 label: "{name}",
            //                 value: "{city}"
            //             })
            //         });
            //         oDialog.open();
            //     }
            // )

            // 3. Using the loadFragment method of controller
            if (!this.citiesPopup) {
                this.loadFragment({
                    name: "ey.sd.products.view.fragments.popup"
                }).then(
                    (oDialog) => {
                        
                        oDialog.setTitle("Select Citites");
                        oDialog.bindAggregation("items", {
                            path: "/cities",
                            template: new sap.m.DisplayListItem({
                                label: "{name}",
                                value: "{state}"
                            })
                        });
                        oDialog.open();
                    }
                )
            } else {
                this.citiesPopup.open();
            }
            
        },
        SupplierFrag: null,
        F4ValueHelpPopup: null,
        oInputField: null,
        onF4HelpRequest: function(oEvent, sField) {
            // if (!this.SupplierFrag) {
            //     this.loadFragment({
            //         name: "ey.sd.products.view.fragments.popup"
            //     }).then(
            //         (oDialog) => {
            //             this.SupplierFrag = oDialog;
            //             oDialog.setTitle("Select Supplier");
            //             oDialog.bindAggregation("items", {
            //                 path: "/suppliers",
            //                 template: new sap.m.DisplayListItem({
            //                     label: "{name}",
            //                     value: "{city}"
            //                 })
            //             });
            //             oDialog.open();
            //         }
            //     )
            // } else {
            //     this.SupplierFrag.open();
            // }

            const fnBindValueHelp = (oDialog, sField) => {
                switch (sField) {
                    case 'Supplier':
                        oDialog.setTitle("Select Supplier");
                        oDialog.bindAggregation("items", {
                            path: "/suppliers",
                            template: new sap.m.DisplayListItem({
                                label: "{name}",
                                value: "{city}"
                            })
                        });
                        oDialog.open();
                        
                        break;
                    case 'City':
                        oDialog.setTitle("Select Citites");
                        oDialog.bindAggregation("items", {
                            path: "/cities",
                            template: new sap.m.DisplayListItem({
                                label: "{name}",
                                value: "{state}"
                            })
                        });
                        oDialog.open();
                        break;
                }
            }

            this.oInputField = oEvent.getSource();


            if (!this.F4ValueHelpPopup) {
                this.loadFragment({
                    name: "ey.sd.products.view.fragments.popup"
                }).then(
                    (oDialog) => {
                        this.F4ValueHelpPopup = oDialog;
                        fnBindValueHelp(oDialog, sField);
                    }
                )
            } else {
                fnBindValueHelp(this.F4ValueHelpPopup, sField);
            }
        },
        onF4Search: function(oEvent) {
            // Get the value of search query
            let sValue = oEvent.getParameter("value");
            // Get the source object (Select Dialog)
            let oSource = oEvent.getSource();
            
            // Counstruct the filter to apply it on the binding
            let oFilter = new Filter("name", "Contains", sValue);
            // Get the items binding of select dialog
            let oBinding = oSource.getBinding("items");
            // Apply the filter on binding
            oBinding.filter([oFilter]);
        },

        onF4Confirm: function(oEvent) {
            // Get the selected item
            let oSelectedItem = oEvent.getParameter("selectedItem");
            // Get the data of selected item
            let oSelectedItemData = oSelectedItem.getBindingContext().getObject();
            // Set the name of the selected item in the input field
            this.oInputField.setValue(oSelectedItemData.name);
        }
    });
})