sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/xml/XMLModel",
    "sap/ui/model/resource/ResourceModel"
], function(JSONModel, XMLModel, ResourceModel) {
    return {
        createJSONModel: function(sFilename) {
            // Step 1: Create a new model object
            let oModel = new JSONModel();
            // Load data method
            if (sFilename) {
                oModel.loadData(`model/data/${sFilename}`);
            }
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