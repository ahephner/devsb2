@isTest
public class test_singleSalesDocPdf {
static testMethod void test_singleSalesDocPdf(){

        //account
       
        Account cust = new Account();
        cust.Name = 'Test123456';
        cust.RecordTypeId = '01241000001Dy64AAC';
        cust.Customer_Name__c = 'Test Customer 123456';
        	insert cust;
    	//Sales Rep
    	Sales_Rep__c sr = new Sales_Rep__c(Name='Rep', Sales_Rep_Num__c='12');
    	insert sr; 
        //contact
        contact person = new contact(lastname = 'test', AccountId = cust.Id);
        insert person; 
        //date and pricebook don't know if you need it just incase 
        Date myDate = Date.newInstance(2040, 1, 4);
        Date startdate = Date.newInstance(2040, 1, 3);
        Id pricebookId = Test.getStandardPricebookId();
        //sales doc
        Sales_Document__c head = new Sales_Document__c(name = 'test name', customer__c = cust.id, Doc_Type__c = 'Invoice', 
                                                       Sales_Doc_Num__c = '12345',Sales_Rep__c= sr.Id,
                                                       Doc_Date__c = myDate, Doc_Amount__c=1.00);
	
        insert head;
    system.debug(head); 
        //insert products 
        product__c p = new product__c(Name='xyz', Product_Name__c = 'product', Active__c=True);
        //product__c pr = new product__c(Name='jdt-12', ProductCode =  'xyz');
        insert p;
       // insert pr; 
        
    //doc detail
        Sales_Doc_Detail__c detail =  new Sales_Doc_Detail__c(name='test', Sales_Document__c=head.id, Product__c = p.Id, Quantity__c=1, Unit_Price__c=1);
         insert detail;       


       
        Test.startTest();
			//set page and controllers
	       	PageReference pref = Page.singleSalesDocPdf;         
        	Test.setCurrentPage(pref);         
			ApexPages.currentPage().getParameters().put('id', head.Id); 
         	ApexPages.StandardController sc = new ApexPages.StandardController(head);
        	singleSalesDocController ext = new singleSalesDocController(sc);
    			//call methods and assert 
        		list<Sales_Doc_Detail__c> product = ext.getdetail();   
        		system.assertNotEquals(product, null);
       			list<Sales_Document__c> c =  ext.gethead();
        		system.debug('here is con.getx  '+ c );
        		system.assertNotEquals(c, null);
				object z = ext.getq();
    			system.debug(z);
          Test.stopTest();

    }
}