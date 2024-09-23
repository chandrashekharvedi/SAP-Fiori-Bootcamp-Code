sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/xml/XMLModel",
    "sap/ui/model/resource/ResourceModel"
], function(JSONModel, XMLModel, ResourceModel) {
    return {
        createJSONModel: function(sFilename) {
            // Step 1: Create a new model object
            let oModel = new JSONModel();
            // Step 2: Set or load the data in the model
            // Set Data method
            // oModel.setData({
            //     "empStr": {
            //         "empId": "10011",
            //         "empName": "Black Panther",
            //         "salary": 60000,
            //         "currency": "USD",
            //         "smoker": true
            //     },
            //     "empTab": []
            // });

            // Load data method
            oModel.loadData(`model/data/${sFilename}`);

            // oModel.setDefaultBindingMode("OneWay");
            // oModel.setDefaultBindingMode("OneTime");


            return oModel;
        },
        createXMLModel: function(sFilename) {
            // Step 1: Create XML Model Object
            let oModel = new XMLModel();
            // Step 2: Load data in the Model
            oModel.loadData(`model/data/${sFilename}`);

            // Step 3: Return the model
            return oModel;
        },
        createResourceModel: function() {
            let oResource = new ResourceModel({
                bundleUrl: "i18n/i18n.properties"
            });
            return oResource;
        }
    }
})