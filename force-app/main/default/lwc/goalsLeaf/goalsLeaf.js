import { LightningElement, api } from 'lwc';

export default class GoalsLeaf extends LightningElement {
    @api repId;
    @api repTitle; 
    loaded
    info;
    mon
    qty = 0 
    prod; 
    connectedCallback(){
        this.loaded = true;
        this.info = true;
        console.log('api', this.repTitle)
    }
    get selectMonth(){
        return [
            {label: 'July', value:'2022-07-01'},
            {label: 'Aug', value:'2022-08-01'},
            {label: 'Sept', value:'2022-09-01'}
        ]
    }

    selectingMonth(m){
        let newValue = this.template.querySelector('.slds-select').value;
        this.mon = newValue; 
    }
    selectProduct(x){
        let newProd = this.template.querySelector('.slds-selecttwo').value; 
        this.prod = newProd; 
    }

    newQty(numb){
        this.qty = numb.detail.value
    }

    get products(){
        return [
            {label:'ATS 22-3-11 50% XCU w/ZN-B' , value:'a0A41000007TsiiEAC'},
            {label:'ATS 22-0-4 w/ZnB 50% XCU' , value:'a0A41000007U27mEAC'},
            {label:'ATS 30-0-4 30% XCU w/ZN-B' , value:'a0A41000007Ts9mEAC'},
            {label:'ATS 25-0-3 25% XCU' , value:'a0A41000007TtnIEAS'},
            {label:'ATS 16-28-12 50% w/ZN-B 30% PSCU' , value:'a0A41000007TsMTEA0'},
            {label:'ATS 25-0-5 w/ZNB 40% Bio/50%ULTRA-N-220' , value:'a0A4100000GipqcEAB'},
            {label:'ATS 30-0-6 W/ZnB 50% XCU' , value:'a0A41000007TtnLEAS'},
            {label:'Other', value:'Other'}
        ]
    }
    handleNewGoal(month, product, qty, rep){
        let Sales_Rep__c = rep
        let Qty_Forecast__c = qty; 
        let Date__c = month
        let Product__c = product
        let Name = `${this.repTitle} NPK forecast 22`
        let Budget_Type__c = 'Product Forecast'
        const fields = {Sales_Rep__c, Qty_Forecast__c, Date__c, Product__c, Name, Budget_Type__c}
        return {fields}
    }
    save(){
        console.log(1,this.mon, 2, this.prod, 3,this.qty )
    }
    
    saveNew(){

    }

    cancel(){

    }
}