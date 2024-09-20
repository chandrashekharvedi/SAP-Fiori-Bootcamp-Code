sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
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
        }
    }
})