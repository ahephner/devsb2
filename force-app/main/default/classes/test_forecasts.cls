@isTest
public class test_forecasts {
@isTest
    static void getForecasts(){
        date clock = system.today();
        //create 
 		//get a user profile that is a community member so we can set the user to have access 
        Profile proId = [SELECT Id FROM Profile WHERE Name = 'ATS Sales User'];
        
 		User u1 = new User(
         ProfileId = proId.id,
        // UserRoleId = roleId.id,
         LastName = 'last',
         Email = 'puser000@amamama.com',
         Username = 'puser000@amamama.com' + System.currentTimeMillis(),
         CompanyName = 'TEST',
         Title = 'title',
         Alias = 'alias',
         TimeZoneSidKey = 'America/Los_Angeles',
         EmailEncodingKey = 'UTF-8',
         LanguageLocaleKey = 'en_US',
         LocaleSidKey = 'en_US'
         );
        insert u1; 
        
        Sales_Rep__c sr = new Sales_Rep__c(Name='Rep', Sales_Rep_Num__c='12', Active__c = true, email__c = 'ahephner+apextest@advancedturf.com', Salesforce_User__c = u1.id);
    	insert sr; 
        
        product__c p = new product__c(Name='xyz', Product_Name__c = 'product', Active__c=True);
        insert p; 
        Sales_Goal__c one = new Sales_Goal__c(Sales_Rep__c = sr.id, product__c = p.id, name='goal 1', date__c = clock, Prev_Qty__c =1, actual_amount__c = 1, Budget_Type__c = 'Product Forecast'); 
        insert one;
        Sales_Goal__c two = new Sales_Goal__c(Sales_Rep__c = sr.id, product__c = p.id, name='goal 2', date__c = clock, Prev_Qty__c =2, actual_amount__c = 2, Budget_Type__c = 'Product Forecast'); 
        insert two;
        
        Test.startTest();
        	list<sales_goal__c> back = forecasts.mc1Forecasts(u1.Id);
        test.stopTest(); 
    }
    
}