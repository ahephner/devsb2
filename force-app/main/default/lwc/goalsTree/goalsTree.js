import { LightningElement, api, track } from 'lwc';
import userId from '@salesforce/user/Id';
import getGoals from '@salesforce/apex/forecasts.mc1Forecasts';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FORM_FACTOR from '@salesforce/client/formFactor';
export default class GoalsTree extends LightningElement {
   @api flexipageRegionWidth;
    user = userId;
    @track july = []
    @track aug = []
    @track sept = []
    @track allData= [];
    loaded = false;
    formSize;
    connectedCallback(){
      this.formSize = this.screenSize(FORM_FACTOR)
      this.loadGoals();
    }
        //check screen size to show table on desktop and cards on mobile
    screenSize = (screen) => {
        return screen === 'Large'? true : false
    }
    async loadGoals(){
      let data = await getGoals({userId: this.user})
      console.log(this.allData)
      if (data) {
        this.allData = [...data]
        this.allData = data.map(x=>{
          let changed = false;
          let color = x.Month_Name__c === 'August' ? 'red' : 'black'
          return {...x, changed,color}
        }); 
        this.handleData(this.allData)
        console.log(this.allData)
        this.loaded = true; 
        console.log(typeof this.allData)
      } else if (!this.allData) {
         console.error('Error:');
      }
    }

    handleData(goals){
      goals.forEach(x=>{
        switch(x.Month_Name__c){
          case 'July':
            this.july.push(x);
            break;
          case 'August':
            this.aug.push(x);
            break;
          case 'September':
            this.sept.push(x);
            break
          default:
            break;
        }
      })
    }
    roundRate = (numb, places) =>{
      return +(Math.round(numb + `e+${places}`) + `e-${places}`)
  }
    handlePercentChange(e){
        let index = this.allData.findIndex(x => x.Id === e.target.name)
        // console.log(Number(e.target.value)/100);
        
        // console.log(this.allData[index].Percent_Change__c)
        this.allData[index].Percent_Change__c =  Number(e.target.value)
        this.allData[index].Qty_Forecast__c = this.roundRate(Number(((this.allData[index].Percent_Change__c/100) * this.allData[index].Prev_Qty__c ) + this.allData[index].Prev_Qty__c),2)
        this.allData[index].changed = true;
        
    }

    handleForecast(e){
      let index = this.allData.findIndex(x =>x.Id ===e.target.name);
      this.allData[index].Qty_Forecast__c = Number(e.target.value);
      this.allData[index].Percent_Change__c = this.roundRate(Number((this.allData[index].Qty_Forecast__c - this.allData[index].Prev_Qty__c)/this.allData[index].Prev_Qty__c) *100,2)
      this.allData[index].changed = true;
    }

    handleSave(){
      this.loaded = false;
      const toSave = this.allData.filter(x=> x.changed === true).slice().map(draft=>{
        let Id = draft.Id;
        let Qty_Forecast__c = draft.Qty_Forecast__c;
        let Percent_Change__c = draft.Percent_Change__c;
        const fields = {Id, Qty_Forecast__c, Percent_Change__c}
        return {fields}
      });
      console.log(toSave)
      const promises = toSave.map(recordInput => updateRecord(recordInput));
      Promise.all(promises).then(prod=>{
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Success',
            message: 'Saved Forecast',
            variant: 'success'
          })
        )
      }).then(()=>{
        this.loadGoals();
        this.loaded = true; 
      }).catch(error => {
        console.log(error);
        
        // Handle error
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Margin Error',
                message: error.body.output.errors[0].message,
                variant: 'error'
            })
        )
    })
     }
}