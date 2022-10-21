@isTest
public class test_OpenOrderPDF {
    static testMethod void test_OpenOrderPDF(){
        
        list<open_order__c> oplist = new list<open_order__c>();
        
        Account cust = new Account();
        cust.Name = 'Test123456';
        cust.RecordTypeId = '01241000001Dy64AAC'; 
        cust.Customer_Name__c = 'Test Customer 123456';
        insert cust;
        
        Open_Order__c op = new open_order__c(Open_Doc__c = '1234', Customer__c = cust.Id, name='1234');
        oplist.add(op);
        
        insert oplist; 
        
        test.startTest();
        	 PageReference pageRef = Page.massEditOpenOrderNotes;
        	Test.setCurrentPage(pageRef);
        	ApexPages.StandardSetController stdSetController = new ApexPages.StandardSetController(oplist);
        	stdSetController.setSelected(oplist);
        	openorderController ext = new openorderController(stdSetController);
        	ext.saveTwo(); 
        test.stopTest(); 
    }
    //open order quick info
    static testMethod void test_getTrucks(){
        
        Account parent = new Account();
        parent.Name = 'Warehouse';
        parent.RecordTypeId = '01241000001Dy5zAAC'; 
        parent.Customer_Name__c = 'Warehouse';
        insert parent;
        
        Account cust = new Account();
        cust.Name = 'Customer';
        cust.RecordTypeId = '01241000001Dy64AAC'; 
        cust.Customer_Name__c = 'Customer';
        insert cust;
        
        Location__c warehouse = new Location__c(Name='warehouse shipping', 
                                               Account__c=parent.id);
        insert warehouse;
        
         
        
        ATS_Asset__c truck = new ATS_Asset__c(Name= 'alex truck', 
                                             Asset_Type__c='Sales Rep Pickup (SRPU)',
                                             ATS_Location__c=warehouse.id, 
                                             recordtypeId = '0122M000001cvI6QAI',
                                             Status__c= 'Active');
        insert truck; 
        
      Open_Order__c order = new Open_Order__c(Open_Doc__c = 'SO122',
                                             Customer__c = cust.Id,
                                             Name = 'SO122', 
                                             Location__c = warehouse.Id);  
        insert order; 
        

        test.startTest();
        	list<ATS_Asset__c> hasTrucks = openOrderController.getTrucks(warehouse.Id);
        test.stopTest();
        
        system.assertEquals(1, hasTrucks.size()); 
    }
}