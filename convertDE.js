<script runat="server">
   Platform.Load("core","1.1");
   // Deleting old data 
   var adjustedDE = "CUSTOMERS_WITH_FINANCIAL_ACCOUNTS_ADJUSTED";
   var api = new Script.Util.WSProxy();
   try {
       var properties = { "CustomerKey": adjustedDE };
       var action = "ClearData";
       var result = api.performItem("DataExtension", properties, action );
       Write("(+) All records were deleted.<br/>");     
   } catch(err) {
       Write("(!) No records were deleted: " + err + "<br/>");
   } 
   
   // Generating the Data Extension Adjusted normalizing the JSON Field
   var DE = "CUSTOMERS_WITH_FINANCIAL_ACCOUNTS";
   try {
      var api = new Script.Util.WSProxy();  
      var customersDE = DataExtension.Init(DE);
      var Rows = customersDE.Rows.Retrieve();
      var GeneratedRows = 0;
      if (Rows.length > 0) {
         for(var i in Rows) {
            var jsonObj = Platform.Function.ParseJSON(Rows[i]["FinancialAccount"]);
            if (jsonObj.length > 0) {
               for(var j = 0; j < jsonObj.length; j++ ) {
                  var item = jsonObj[j];
                  GeneratedRows += 1;
                  var result = api.createItem("DataExtensionObject", { 
                     CustomerKey: adjustedDE,
                     Properties: [
                        { Name: "SubscriberKey", Value: Rows[i]["SubscriberKey"] },
                        { Name: "Id", Value: Rows[i]["Id"]+"-"+j },
                        { Name: "EmailAddress", Value: Rows[i]["EmailAddress"] },
                        { Name: "OpenDate", Value: item["OpenDate"] },
                        { Name: "CloseDate", Value: item["CloseDate"] },
                        { Name: "Name", Value: item["Name"] },
                        { Name: "FinancialAccountType", Value: item["FinancialAccountType"] },
                        { Name: "FinancialAccountStatus", Value: item["FinancialAccountStatus"] }
                     ] 
                  });
               }
            }
         }
      }    
      Write("(+) " + Rows.length + " Retrieved Rows => " + GeneratedRows + " Generated Rows");
   } catch (err) {
      Write("(-) No data was retrieved." + err);
   }
</script>  