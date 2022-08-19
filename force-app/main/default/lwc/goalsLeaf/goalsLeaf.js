import { LightningElement, api } from 'lwc';
import REP from '@salesforce/schema/Sales_Goal__c.Sales_Rep__c'
import QTY from '@salesforce/schema/Sales_Goal__c.Qty_Forecast__c'
import START from '@salesforce/schema/Sales_Goal__c.Date__c'
import PRODUCT from '@salesforce/schema/Sales_Goal__c.Product__c'
import NAME from '@salesforce/schema/Sales_Goal__c.Name'
import BT from '@salesforce/schema/Sales_Goal__c.Budget_Type__c'
import PREV from '@salesforce/schema/Sales_Goal__c.actual_amount__c';
import PQTY from '@salesforce/schema/Sales_Goal__c.Prev_Qty__c'
import SG_OBJECT from '@salesforce/schema/Sales_Goal__c';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class GoalsLeaf extends LightningElement {
    @api repId;
    @api repTitle; 
    loaded
    info;
    mon
    qty = 0 
    prod; 
    startingProd = false;
    startingMonth = false; 
    monthLabel
    prodLabel; 
    connectedCallback(){
        this.loaded = true;
        this.info = true;

    }
    get selectMonth(){
        return [
            {label: 'July', value:'2022-07-01'},
            {label: 'Aug', value:'2022-08-01'},
            {label: 'Sept', value:'2022-09-01'}
        ]
    }

    selectingMonth(){
        let index = this.template.querySelector('.slds-select').selectedIndex -1;
        this.monthLabel = this.selectMonth[index].label;
        this.mon = this.selectMonth[index].value; 
        console.log(1, this.monthLabel, 2, this.mon);
        
    }
    selectProduct(x){ 
        let index = this.template.querySelector('.selecttwo').selectedIndex - 1; 
        this.prod = this.products[index].value; 
        this.prodLabel = this.products[index].label;  
    }

    newQty(numb){
        this.qty = numb.detail.value
        console.log(this.prod)
    }
    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.valAdd');

       
        inputFields.forEach(inputField => {
            if(inputField.label === 'Qty' && inputField.value === '0'){
                isValid = false;
                alert('make sure you enter a postive QTY')
            }
            // }else if(inputField.value === '' || inputField.value === undefined){
            //     isValid = false;
            //     alert('make sure you have selected a product or month')
            // }
        });
        return isValid;
    }
    get products(){
        return [
            {label: 'ARMORTECH 3LO - 2.5 GL', value:'a0A6T00000f7XhDUAU'},
            {label:'ARMORTECH 3LO - 30 GL', value:'a0A6T00000f7XhXUAU'},
            {label:'ARMORTECH 3LO - 55 GL' , value:'a0A6T00000f7XhNUAU'},
            {label:'ARMORTECH 3LO - 250 GL' , value:'a0A6T00000f7XhIUAU'},
            

        ]
    }
    handleSingleNew(){
        let ok = this.isInputValid()
        if(ok){
        this.loaded = false; 
        const fields = {}
        fields[REP.fieldApiName] = this.repId
        fields[QTY.fieldApiName] = this.qty; 
        fields[START.fieldApiName] = '2022-10-01'
        fields[PRODUCT.fieldApiName] = this.prod
        fields[NAME.fieldApiName] = `${this.repTitle} (${this.prodLabel}) FY 23`
        fields[PREV.fieldApiName] = 0 
        fields[PQTY.fieldApiName] = 0
        fields[BT.fieldApiName] = 'Product Forecast'
       
        const recordInput = { apiName: SG_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(goal => {
                console.log(goal.id)
                this.loaded = true; 
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Forecast created',
                        variant: 'success',
                    }),
                );
            }).then(()=>{
                const closeEvent = new CustomEvent('close');
                this.dispatchEvent(closeEvent);
                this.loaded = true; 
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                this.loaded = true; 
            });
        }
    }

    handleAddMore(){
        let ok = this.isInputValid()
        if(ok){
        this.loaded = false; 
        const fields = {}
        fields[REP.fieldApiName] = this.repId
        fields[QTY.fieldApiName] = this.qty; 
        fields[START.fieldApiName] = '2022-10-01'
        fields[PRODUCT.fieldApiName] = this.prod
        fields[NAME.fieldApiName] = `${this.repTitle} (${this.prodLabel}) FY 23`
        fields[PREV.fieldApiName] = 0 
        fields[PQTY.fieldApiName] = 0
        fields[BT.fieldApiName] = 'Product Forecast'
       
        const recordInput = { apiName: SG_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(goal => {
                this.loaded = true; 
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Forecast Created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
            this.qty = 0;
            this.prod = ''; 
            this.template.querySelector('.slds-selecttwo').value = ''; 
            this.loaded = true; 
        }
    }


    cancel(){
        const cancel = new CustomEvent('cancel')
        this.dispatchEvent(cancel)
    }
}