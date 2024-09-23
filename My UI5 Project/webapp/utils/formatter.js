sap.ui.define([
"sap/ui/core/format/NumberFormat"
], 
    function(NumberFormat) {
        return {
            // Formatter Function
            convertToUpperCase: function(sEmpName) {
                // if (sEmpName) {
                //     return sEmpName.toUpperCase();
                // }else {
                //     return "";
                // }

                return sEmpName?.toUpperCase() || "";
            },

            getFormattedAmount: function(sSalary, sCurrency) {
                var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                    // we don't want currency code
                    currencyCode: false
                });

                return oCurrencyFormat.format(sSalary, sCurrency);
            }
        }
    }
)