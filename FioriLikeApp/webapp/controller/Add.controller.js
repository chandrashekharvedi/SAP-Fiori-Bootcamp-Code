sap.ui.define([
    "ey/sd/products/controller/BaseController",
    "ey/sd/products/model/models",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
], function (Controller, models, History, MessageBox, MessageToast) {
    'use strict';
    return Controller.extend("ey.sd.products.controller.Add", {
        // Controllers Constructor method
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("addProd").attachMatched(this.fnAddPrdRouteMatched, this);
            this.oRouter.getRoute("edit").attachMatched(this.fnEditPrdRouteMatched, this);
        },
        fnAddPrdRouteMatched: function (oEvent) {
            // Step 1: Get the odata model object
            let oDataModel = this.getView().getModel();
            
            oDataModel.resetChanges(true);
            // Step 2: Construct the context for new reccord 
            let oNewProductCtxt, oInitialData = this.getInitialData();
            try {
                oNewProductCtxt = oDataModel.createEntry("/ProductSet");
                if (!oNewProductCtxt) {
                    throw Error("Metadata Not Loaded Yet");
                }
                // Step 3: Loop over the initial data and set properties in the new context
                for (const sPropName in oInitialData) {
                    const sValue = oInitialData[sPropName];
                    oDataModel.setProperty(sPropName, sValue, oNewProductCtxt);
                }

                // Step 4: Bind the context path with view
                this.getView().bindElement(oNewProductCtxt.getPath());
            } catch (error) {
                oDataModel.attachMetadataLoaded(function () {
                    oNewProductCtxt = oDataModel.createEntry("/ProductSet");
                    // Step 3: Loop over the initial data and set properties in the new context
                    for (const sPropName in oInitialData) {
                        const sValue = oInitialData[sPropName];
                        oDataModel.setProperty(sPropName, sValue, oNewProductCtxt);
                    }

                    // Step 4: Bind the context path with view
                    this.getView().bindElement(oNewProductCtxt.getPath());
                }.bind(this), this)
            }

            this.setMode("Create");

        },
        fnEditPrdRouteMatched: function (oEvent) {
            // Step 1: get the product id
            let sProductId = oEvent.getParameter("arguments").productId;
            this.productId = sProductId;

            if (!sProductId) {
                return "";
            }
            this.getView().getModel().resetChanges(true);
            // Step 3: Construct the path of product set
            let sProdPath;
            try {
                sProdPath = this.getView().getModel().createKey("/ProductSet", {
                    PRODUCT_ID: sProductId
                });
            } catch (error) {
                sProdPath = `/ProductSet('${sProductId}')`;
            }
            this.getView().bindElement(sProdPath);

            this.setMode("Update")
        },
        // fnAddPrdRouteMatched: function(oEvent) {
        //     debugger;
        //     let oAddProdModel = models.createJSONModel();

        //     oAddProdModel.setData(this.getInitialData());

        //     this.getView().setModel(oAddProdModel, "add");
        //     this.setMode("Create");
        // },
        // productId: null,
        // fnEditPrdRouteMatched: function(oEvent) {
        //     debugger;
        //     // create the add model
        //     let oAddProdModel = models.createJSONModel();
        //     this.getView().setModel(oAddProdModel, "add")

        //     // Step 1: get the product id
        //     let sProductId = oEvent.getParameter("arguments").productId;
        //     this.productId = sProductId;

        //     if (!sProductId) {
        //         return "";
        //     }

        //     // Step 2: Load our odata model
        //     let oDataModel = this.getView().getModel();
        //     // Step 3: Construct the path of product set
        //     let sProdPath;
        //     try {
        //         sProdPath = this.getView().getModel().createKey("/ProductSet", {
        //             PRODUCT_ID: sProductId
        //         });
        //     } catch (error) {
        //         sProdPath = `/ProductSet('${sProductId}')`;
        //     }
        //     let that = this;
        //     // Fire a GET(Read Call) request to get the data of selected product
        //     oDataModel.read(sProdPath, {
        //         // Step 4: Handle the response - Success or error and map the data to local(add) model
        //         success: (data) => {
        //             // 'this' pointer is available in this function
        //             let oAddModel = this.getView().getModel("add");
        //             oAddModel.setData(data);
        //             this.setMode("Update");
        //         },
        //         error: function(oError) {
        //             // 'this' pointer is not available here
        //             that.setMode("Create");
        //             that.fnAddPrdRouteMatched();
        //         }
        //     })

        // },
        mode: "Create",
        setMode: function (sMode) {
            let oView = this.getView();
            if (sMode === "Create") {
                this.mode = "Create";
                // Page Title
                oView.byId("idAddUpdatePrdPage").setTitle("Add Product");
                // Form Title
                oView.byId("idProductSimpleForm").setTitle("");
                // Enable the Product Id Field
                oView.byId("idProductIDInput").setEnabled(true);
                // Delete Button
                oView.byId("idDeleteButton").setVisible(false);

            } else {
                this.mode = "Update";
                // Page Title
                oView.byId("idAddUpdatePrdPage").setTitle("Update Product");
                // Form Title
                oView.byId("idProductSimpleForm").setTitle("");
                // Enable the Product Id Field
                oView.byId("idProductIDInput").setEnabled(false);
                // Delete Button
                oView.byId("idDeleteButton").setVisible(true);
            }
        },
        getInitialData: function () {
            return {
                PRODUCT_ID: "",
                TYPE_CODE: "PR",
                CATEGORY: "",
                NAME: "New Product",
                DESCRIPTION: "",
                SUPPLIER_ID: "0100000046",
                SUPPLIER_NAME: "SAP",
                TAX_TARIF_CODE: "1",
                MEASURE_UNIT: "EA",
                PRICE: "",
                CURRENCY_CODE: "",
                DIM_UNIT: "CM",
            }
        },

        onBack: function () {
            var oHistory, sPreviousHash;

            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.oRouter.navTo("spiderman", {}, true);
            }
        },
        onSupplierSelect: function (oEvent) {
            let oSource = oEvent.getSource();
            let oSrcBinidingCtxt = oSource.getBindingContext();
            let oModel = oSource.getModel();
            let oSelectedItem = oEvent.getParameter("selectedItem");
            let sSupplierName = oSelectedItem.getBindingContext().getProperty("COMPANY_NAME");

            // this.getView().getModel("add").setProperty("/SUPPLIER_NAME", sSupplierName );
            oModel.setProperty("SUPPLIER_NAME", sSupplierName, oSrcBinidingCtxt);
        },

        handelOnSave: function () {
            debugger;
            // Step 1: Get the data from add model
            let oView = this.getView();
            // let payload = oView.getModel("add").getData();
            // Step 2: Get the object of Default Model and make a create request
            let oDefaultModel = oView.getModel();

            // Step 3: Call the submit changes method to save the data in backend side
            if (oDefaultModel.hasPendingChanges()) {
                oDefaultModel.submitChanges({
                    success: function () {
                        MessageBox.success("Data Saved Successfully");
                    },
                    error: function () {
                        MessageBox.success("Action failed");
                    }
                })
            }


            // if (this.mode === "Create") {
            //     oDefaultModel.create("/ProductSet", payload, {
            //         success: function(oResponse) {
            //             MessageBox.success("Product Successfully Added to the List");
            //         },
            //         error: function(oError) {
            //             try {
            //                 let aErrors = JSON.parse(oError.responseText).error.innererror.errordetails;
            //                 let aMessage = [];
            //                 aErrors.forEach(oMessage => {
            //                     aMessage.push(oMessage.message);
            //                 })
            //                 MessageBox.error(aMessage.join("\n"));
            //             } catch (error) {
            //                 MessageBox.error("Failed to Add new product.");
            //             }

            //         }
            //     })
            // }else {
            //     oDefaultModel.update(`/ProductSet('${payload.PRODUCT_ID}')`, payload, {
            //         success: function(oResponse) {
            //             MessageBox.success(`Hurry! you have successfully update the product ${payload.PRODUCT_ID} - ${payload.NAME}`);
            //         },
            //         error: function(oError) {
            //             try {
            //                 let aErrors = JSON.parse(oError.responseText).error.innererror.errordetails;
            //                 let aMessage = [];
            //                 aErrors.forEach(oMessage => {
            //                     aMessage.push(oMessage.message);
            //                 })
            //                 MessageBox.error(aMessage.join("\n"));
            //             } catch (error) {
            //                 MessageBox.error("Failed to Add new product.");
            //             }

            //         }
            //     })
            // }
        },
        handelOnDelete: function () {
            MessageBox.confirm("Do you really want to delete this product", {
                onClose: this.onDeleteConfirm.bind(this)
            })
        },
        onDeleteConfirm: function (status) {
            let that = this;
            if (status === "OK") {
                let oDataModel = this.getView().getModel();
                let sProdId = this.productId;
                oDataModel.remove(`/ProductSet('${sProdId}')`, {
                    success: function () {
                        MessageToast.show("Product removed successfully");
                        that.clearForm();

                    },
                    error: function () {
                        MessageToast.show("Action Failed");
                    }
                })
            } else {
                MessageToast.show("Action was cancelled");
            }
        },

        clearForm: function () {
            let oAddModel = this.getView().getModel("add");
            oAddModel.setData(this.getInitialData());
            this.setMode("Create");
        },

        onLoadExpProduct: function () {
            // Step 1: First Get the selected category
            let sCategory = this.getView().byId("idCategorySelect").getSelectedKey() || "Notebooks";
            // Step 2: Get the oData Model Object
            let oDataModel = this.getView().getModel();
            let that = this;

            // Step 3: Call function to load most expensive product as per category
            oDataModel.callFunction("/GetMostExpensiveProduct", {
                urlParameters: {
                    I_CATEGORY: sCategory
                },
                // Step 4: Handle the response and set the data in local model
                success: function (data) {
                    let oAddModel = that.getView().getModel("add");
                    oAddModel.setData(data);
                    that.setMode("Update");
                }
            })
        }
    });
})