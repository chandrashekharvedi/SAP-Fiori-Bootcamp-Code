sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict";
    return UIComponent.extend("ey.sd.products.Component", {
        metadata: {
            manifest: "json"
        },
        init: function() {
            //Baseclass.prototype.constructorName.apply(this);
            UIComponent.prototype.init.apply(this);

            // Step 1: get the router object from base or UIComponent Class
            let oRouter = this.getRouter();
            // Step 2: intialize the router - SAPUI5 will scan the manifest to check the routing configuration
            oRouter.initialize();
        },
        // createContent: function() {
        //     // App view - Root view which has a container Control
        //     let oAppView = new sap.ui.view({
        //         viewName: "ey.sd.products.view.App",
        //         type: sap.ui.core.mvc.ViewType.XML
        //     });

        //     // Get the App container control with the id = appCon
        //     let oAppContainer = oAppView.byId("appCon");

        //     // Create the views
        //     let oView1 = new sap.ui.view({
        //         viewName: "ey.sd.products.view.View1",
        //         type: "XML",
        //         id: "idView1"
        //     });

        //     let oView2 = new sap.ui.view({
        //         viewName: "ey.sd.products.view.View2",
        //         type: "XML",
        //         id: "idView2"
        //     });

        //     let oEmptyView = new sap.ui.view({
        //         viewName: "ey.sd.products.view.Empty",
        //         type: "XML",
        //         id: "idEmptyView"
        //     })


        //     // Add the views to the App Container Control
        //     // oAppContainer.addPage(oView1).addPage(oView2);
        //     oAppContainer.addMasterPage(oView1).addDetailPage(oEmptyView).addDetailPage(oView2);

        //     return oAppView;
        // },
        destroy: function() {

        }
    })
})