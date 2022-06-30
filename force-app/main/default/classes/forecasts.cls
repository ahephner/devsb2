public class forecasts {
	@AuraEnabled
    public static list<Sales_Goal__c> mc1Forecasts(id userId){
        system.debug(userId);
        list<Sales_Goal__c> findGoals = [select id,Sales_Rep__c, month_name__c, Percent_Change__c, Prev_Qty__c, actual_amount__c,name,Qty_Forecast__c,
                                        product__r.name, product__r.Product_Name__c, date__c from Sales_Goal__c where Budget_Type__c = 'Product Forecast' and 
                                        Sales_Rep__r.Salesforce_User__c =: userId ORDER BY date__c ASC];
        
        return findGoals;
    }
}