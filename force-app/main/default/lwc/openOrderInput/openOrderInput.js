import { LightningElement, api , wire, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ID_Field from '@salesforce/schema/Open_Order__c.Id';
import LOC_ID from '@salesforce/schema/Open_Order__c.Location__c';
import ASSET from '@salesforce/schema/Open_Order__c.ATS_Asset__c'; 
import SP_ORDER from '@salesforce/schema/Open_Order__c.Special_Order__c'; 
import NOTES from '@salesforce/schema/Open_Order__c.Order_Note__c'; 
import INVOICE_AMOUNT from '@salesforce/schema/Open_Order__c.Expected_to_Inv__c'; 
import SHIP_DATE from '@salesforce/schema/Open_Order__c.Est_Ship_Date__c'; 
import getTrucks from '@salesforce/apex/openOrderController.getTrucks';
import { getFieldValue, getRecord, updateRecord } from 'lightning/uiRecordApi';

export default class OpenOrderInput extends LightningElement {
    @api recordId; 
    locationID; 
    selected;
    specialOrder;
    notes; 
    expInvoice; 
    shipDate; 
    loaded = false; 
    canSave = false; 
    @track options; 
    @wire(getRecord, {recordId: '$recordId', fields:[LOC_ID, ASSET, NOTES, SP_ORDER,INVOICE_AMOUNT, SHIP_DATE ]})
    loadFields({data, error}){
        if(data){
            this.locationID = getFieldValue(data, LOC_ID);
            this.selected = getFieldValue(data, ASSET);
            this.specialOrder = getFieldValue(data, SP_ORDER);
            this.notes = getFieldValue(data, NOTES);
            this.expInvoice = getFieldValue(data, INVOICE_AMOUNT);
            this.shipDate = getFieldValue(data, SHIP_DATE)
            this.loadTrucks(this.locationID);  
            this.loaded = true;     
        }else if(error){
            console.log('error '+JSON.stringify(error));
            
        }
    }
    loadTrucks(id){
        getTrucks({locId: id})
            .then((rec)=>{
                this.options = rec.map(item=>({
                    ...item,
                    label: item.Name + ' - '+item.Asset_Type__c,
                    value: item.Id
            }))
                }).catch((err)=>{
                    console.log(err);
                    
                })
    }
    get selectedObj(){
        let label;
            if(this.options && this.selected){
                label = this.options.find((x)=>x.value===this.selected)
            }
            
            return label;   
    }
    handleInputFocus(event) {
        // modify parent to properly highlight visually
        const classList = event.target.parentNode.classList;
        classList.add('lgc-highlight');
    }

    handleInputBlur(event) {
        // modify parent to properly remove highlight
        const classList = event.target.parentNode.classList;
        classList.remove('lgc-highlight');
    }
    selectChange(e){
        this.canSave = true;
        this.selected = this.template.querySelector('.slds-select').value;
        console.log(this.selected);
        
    }
    handleOrder(evt){
        this.canSave = true;
        this.notes = evt.detail.value; 
    }
    invoiceAmount(evt){
        this.canSave = true;
        this.expInvoice = evt.detail.value; 
    }
    handleSpOrder(evt){
        this.canSave = true;
        this.specialOrder = evt.target.checked; 
        console.log(this.specialOrder);
        
    }
    newShipDate(evt){
        this.canSave = true;
        this.shipDate = evt.detail.value; 
    }

    handleClick(){
        this.loaded = false; 
        const fields = {};
        fields[ASSET.fieldApiName] = this.selected;
        fields[NOTES.fieldApiName] = this.notes;
        fields[SP_ORDER.fieldApiName] = this.specialOrder
        fields[INVOICE_AMOUNT.fieldApiName] = this.expInvoice
        fields[SHIP_DATE.fieldApiName] = this.shipDate; 
        fields[ID_Field.fieldApiName] = this.recordId;

        const order = {fields}
        updateRecord(order)
        .then(()=>{
            this.loaded = true; 
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Submitted',
                    message: 'Order Updated!',
                    variant: 'success'
                })
            )
        }).catch(error=>{ 
            console.log(JSON.stringify(error));
            this.loaded = true; 
            this.dispatchEvent(
                new ShowToastEvent({ 
                    title: 'Error Updating',
                    message: error.body.message,
                    variant:'error'
                })
            )
            
        })
        
    }

}