//Extension of singleSalesDocPdf.vfp. Contains all the logic to get pdf
//sales doc fields. The links are copies of formula fields on the sales doc Pay_Link_ACH__c and Pay_Link_CC__c
public class singleSalesDocController {
    public list<Sales_Document__c> head;
    public List<Sales_Doc_Detail__c> detail;
    public object q;
    public string feeLinkTotal {get;set;}
    public string linkTotal {get;set;}
    public string addrStreet {get;set;}
    public string addrCityState {get;set;}
  
    public singleSalesDocController(ApexPages.StandardController controller ) {}
    //Used for testing. Grad an ID with products on it uncover/cover line below   
    	//ID id = 'a0E170000065DsPEAU'; 
        String id = apexpages.currentpage().getparameters().get('id');
        public list<Sales_Doc_Detail__c> getdetail(){ 
                    detail =   [select Product_Name__c, Qty__c, Unit_Price__c,Extended_Price__c,
                                Product__r.name from Sales_Doc_Detail__c where Sales_Document__c = :id];
	
            		return detail;
            //don't use this anymore but if we need to look over certain line item details and do something
            //or flag something
            //for(Sales_Doc_Detail__c y:detail){
              //  if(y.Product__r.name.startsWith('JDT')){
                   // y.Qty__c = 0;
                //    y.Unit_Price__c = y.Extended_Price__c; 
                //}
            //} 
        }
        //get the head document. Set the links address
    public list<Sales_Document__c> gethead(){ 
                  head= [select Doc_Date__c, Sales_Rep__r.name, Sales_Rep__r.Email__c, Sales_Rep__r.Mobile__c, name, Doc_Type__c, Number_of_Payments__c,
                         		customer__r.S_Account__c, Line_Total__c,Replaced_by_Credit_Rebill_Num__c,Replaced_by_Credit_Rebill__c,Due_Date__c,
                         		Tax_Amount__c, Freight_Amount__c, Doc_Amount__c, Payment_Terms__c, Billing_Company__c, Customer__r.Customer__c, Customer__r.Class__c, 
                         	    Billing_Street__c, Billing_State__c, Billing_Zip_Code__c, Billing_City__c, Ship_Type__c,Cust_PO_Num__c, Pay_Link_ACH__c, Pay_Link_CC__c
                         		from Sales_Document__c where id = :id limit 1]; 
        
        if(head.size()> 0){
        		//total amount with 2% added in for paying by credit card 	
            	double cardCharge = ((head[0].Doc_Amount__c *.02) + head[0].Doc_Amount__c);
            	//convenience fee
            	double conFee = (head[0].Doc_Amount__c *.02);
            	//non charge link
            	double noCharge = head[0].Doc_Amount__c; 	
        		//fee link
        		//feeLinkTotal = 'https://advancedturf.securepayments.cardpointe.com/pay?total='+cardCharge+'&paymentType=cc&invoice='+head[0].name+'&customerId=' +head[0].Customer__r.Customer__c; 
                feeLinkTotal = 'https://advancedturf.securepayments.cardpointe.com/pay?cf_Subtotal='+noCharge+'&total='+cardCharge+'&cf_Convenience_Charge_Credit_Card_Only='+conFee+'&invoice=' +head[0].name+'&customerId=' +head[0].Customer__r.Customer__c; 
        		//feeLinkTotal = head[0].Pay_Link_CC__c;
            	//free link
        		linkTotal = 'https://advancedturf.securepayments.cardpointe.com/pay?cf_Subtotal='+noCharge+'&total=' +noCharge+ '&cf_Convenience_Charge_Credit_Card_Only=0.00&paymentType=ach&invoice='+head[0].name+'&customerId=' +head[0].Customer__r.Customer__c;
            	//Corporate Address Illinois for Progro, Fishers for all others
            	if(head[0].Customer__r.Class__c == 'PROGRO'){
                 	addrStreet = 'P.O. Box 678';
            		addrCityState = 'Mendota, IL  61342';               
                } else {
                	addrStreet = '12955 Ford Drive';
            		addrCityState = 'Fishers, IN  46038';
                }
                    
                return head; 	
        } else{
            //ApexPages.addMessage(new ApexPages.message(ApexPages.severity.ERROR, 'An error occured please contact IT')); 
            return null; 
        }
        		 
    }
    //get the summary of qty
    public object getq(){
        AggregateResult [] result = [select sum(qty__c)ttt from Sales_Doc_Detail__c where Sales_Document__c = :id];
       q = result[0].get('ttt');   
       return q;
    }

}