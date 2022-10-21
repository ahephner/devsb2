public with sharing class openOrderController {
   
    public ApexPages.StandardSetController setCon;
    
    public openorderController(ApexPages.StandardSetController controller){
    			setCon = controller;    
    }

    
    public Pagereference saveTwo(){
        system.debug('in save method');
        for(Open_order__c op: (List<Open_Order__c>) setCon.getSelected()){
            update op; 
        } 
        return Page.openOrdersPDF; 
    }
    
    @AuraEnabled
    public static list<ATS_Asset__c> getTrucks(string locId){
        //string locId = [select ]
        list<ATS_Asset__c> trucks = [select id, name, Asset_Type__c from ATS_Asset__c where ATS_Location__c =: locId AND Status__c= 'Active' ];

        return trucks; 
    }
}