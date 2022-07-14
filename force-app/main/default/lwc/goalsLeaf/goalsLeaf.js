import { LightningElement, api } from 'lwc';
import REP from '@salesforce/schema/Sales_Goal__c.Sales_Rep__c'
import QTY from '@salesforce/schema/Sales_Goal__c.Qty_Forecast__c'
import START from '@salesforce/schema/Sales_Goal__c.Date__c'
import PRODUCT from '@salesforce/schema/Sales_Goal__c.Product__c'
import NAME from '@salesforce/schema/Sales_Goal__c.Name'
import BT from '@salesforce/schema/Sales_Goal__c.Budget_Type__c'
import PREV from '@salesforce/schema/Sales_Goal__c.actual_amount__c'
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
            }else if(inputField.value === '' || inputField.value === undefined){
                isValid = false;
                alert('make sure you have selected a product or month')
            }
        });
        return isValid;
    }
    get products(){
        return [
            {label: 'ATS 18-2-4 25%XCU 23%AMS w/ARMAMENT & BIOS', value:'a0A41000007TswjEAC'},
            {label:'ATS 16-0-2 25% XCU 20% AMS W/ZnB - 50LB', value:'a0A2M00000YgxoDUAR'},
            {label:'ATS 22-3-11 50% XCU w/ZN-B' , value:'a0A41000007TsiiEAC'},
            {label:'ATS 22-0-4 w/ZnB 50% XCU' , value:'a0A41000007U27mEAC'},
            {label:'ATS 30-0-4 30% XCU w/ZN-B' , value:'a0A41000007Ts9mEAC'},
            {label:'ATS 25-0-3 25% XCU' , value:'a0A41000007TtnIEAS'},
            {label:'ATS 16-28-12 50% w/ZN-B 30% PSCU' , value:'a0A41000007TsMTEA0'},
            {label:'ATS 30-0-6 W/ZnB 50% XCU' , value:'a0A41000007TtnLEAS'},
            {label:'ATS 25-0-5 w/ZNB 40% Bio/50%ULTRA-N-220' , value:'a0A4100000GipqcEAB'},
            {label:'MC 46-0-0 ULTRA-N PRILLED' , value:'a0A4100000GipqWEAR'},
            {label:'MC 25-0-3 20%XCU' , value:'a0A2M00000WScxvUAD'},
            {label:'ATS 34-0-4 ALL MINERAL' , value:'a0A41000007TsMREA0'},
            {label:'MC 46-0-0 PRILLED' , value:'a0A41000007Ts3qEAC'},
            {label:'MC 25-0-3 50%XCU' , value:'a0A4100000GipbeEAB'},
            {label:'MC 18-0-3 50% XCU, 50% BIOSOLIDS w/ZnB' , value:'a0A4100000GiposEAB'},
            {label:'MC 22-0-4 50%XCU - 50LB' , value:'a0A4100000QryZAEAZ'},
            {label:'MC 20-5-10 50%XCU w/ ZN-B ARMAMENT' , value:'a0A4100000GippiEAB'},
            {label:'MC 46-0-0 GRANULAR' , value:'a0A4100000GipiZEAR'},
            {label:'MC 28-0-3 20%PSCU  *NO IRON*' , value:'a0A4100000GipqCEAR'},
            {label:'MC 32-10-5 75%XCU 25% ULTRA -N W/ZNB' , value:'a0A4100000IVve0EAD'},
            {label:'MC 22-0-4 50% ULTRA-N' , value:'a0A4100000IVvdlEAD'},
            {label:'ATS 26-0-6 W/ZnB 33%AS 33%UREA 33%XCU' , value:'a0A41000007Ts3rEAC'},
            {label:'ATS 24-0-10 50% XCU w/ZNB /220 SGN' , value:'a0A4100000GippjEAB'},
            {label:'MC 32-0-5 75%XCU 25% ULTRA-N W/ARMAMENT - 50LB' , value:'a0A2M00000YB2QAUA1'},
            {label:'ATS 25-0-20 50% XCU w/ZNB / 220 SGN' , value:'a0A4100000GipidEAB'},
            {label:'MC 18-0-3 40% ULTRA-N - 50LB' , value:'a0A4100000O4PavEAF'},
            {label:'MC 10-0-20 AM W/ZN-B - 50LB' , value:'a0A2M00000VHlR0UAL'},
            {label:'MC 25-0-3 40% XCU 20% BIOS w/ZnB - 50 LB' , value:'a0A4100000Po8qIEAR'},
            {label:'MC 25-0-8 50% ULTRA-N - 50LB' , value:'a0A4100000KLfOnEAL'},
            {label:'MC 19-19-19 AM' , value:'a0A4100000GipUiEAJ'},
            {label:'4-3-0 NUTRIPEL W/1.5% FE (50LB)' , value:'a0A4100000GipmfEAB'},
            {label:'MC 26-2-3 70%XCU 35%BIOSOLIDS W/ ZN-B' , value:'a0A4100000Gipq7EAB'}

        ]
    }
    handleSingleNew(){
        let ok = this.isInputValid()
        if(ok){
        this.loaded = false; 
        const fields = {}
        fields[REP.fieldApiName] = this.repId
        fields[QTY.fieldApiName] = this.qty; 
        fields[START.fieldApiName] = this.mon
        fields[PRODUCT.fieldApiName] = this.prod === 'Other'? '' : this.prod
        fields[NAME.fieldApiName] = `${this.repTitle} (${this.prodLabel}) ${this.monthLabel} 22`
        fields[PREV.fieldApiName] = 0 
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
        fields[START.fieldApiName] = this.mon
        fields[PRODUCT.fieldApiName] = this.prod === 'Other'? '' : this.prod
        fields[PREV.fieldApiName] = 0 
        fields[NAME.fieldApiName] = `${this.repTitle} NPK forecast 22`
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