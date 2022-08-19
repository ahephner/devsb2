import { LightningElement, api, track } from 'lwc';
import userId from '@salesforce/user/Id';
import getGoals from '@salesforce/apex/forecasts.threeLo';
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
    newGoal = false; 
    rep;
    repName; 
    direction = 'asc'
    hoverIcon = 'utility:chevrondown'
    prev; 
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
      if (data) {
        this.allData = [...data]
        //set for the color of background
        this.prev = this.allData[0].Product__c;
        this.allData = data.map(x=>{ 
          
          let Product_Name = x.Product__r.Product_Name__c ? x.Product__r.Product_Name__c : 'Rep Entered Other';
          let changed = false;
         
          return {...x,Product_Name, changed}
        });
        //different helper functions like sitting back ground color or grouping 
        //this.handleData(this.allData)
        //this.allData = await this.setColors(this.allData); 
        if(this.allData.length>0){
          this.rep = this.allData[0].Sales_Rep__c;
          this.repName = this.allData[0].Sales_Rep__r.Name; 
        }
        this.loaded = true; 
        //console.log('new data ' +JSON.stringify(this.allData))
        
        
      } else if (!this.allData) {
         console.error('Error:');
      }
    }
    setColors(data){
      let bgColor = 'background: white';
      
      for(let i=0; i<data.length; i++){
        if(data[i].Product__c != this.prev){
            this.prev = data[i].Product__c;
            bgColor = bgColor === 'background: white' ? 'background: rgb(255, 255, 204)' : 'background: white';
        }
        data[i].color = bgColor; 
      }
      return data; 
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
     handleClose(){
      console.log('handle close')
      this.loadGoals();
      this.newGoal = false; 
     }
     handleCancel(){
       this.newGoal = false; 
     }
     handleNew(){
      this.newGoal= true; 
     }

     sort(event){
      
      let parseData = JSON.parse(JSON.stringify(this.allData));

          // Return the value stored in the field
    let keyValue = (a) => {
      return a['Product_Name'];
  };

    let isReverse = this.direction === 'asc'? 1:-1
    this.direction = this.direction === 'asc'? 'desc' : 'asc';
    this.hoverIcon = this.hoverIcon === 'utility:chevrondown' ? 'utility:chevronup': 'utility:chevrondown'
    parseData.sort((x, y)=>{
      x = keyValue(x) ? keyValue(x) : ''; // handling null values
      y = keyValue(y) ? keyValue(y) : '';

      // sorting values based on direction
      return isReverse * ((x > y) - (y > x));
    })

    this.allData = parseData; 
     }
}
//grouping info
// var groupBy = function(out1, out2) {
//   let c = 1
//   return out1.reduce(function(x, y) {
    
//     (x[y[out2]] = x[y[out2]] || []).push(5);
//     console.log(1,c,'a', x,'b', y)
//    // console.log(2,c, x[y[out2]])
//     c++
//     return x;
  
//   }, {});
// };


// console.log(groupBy(['one', 'two','three', 'four'], 'length'));

// items = [1,2,3].reduce((x,y)=>{
//  //console.log('x', x, 'y', y)
//   return x + y; 
// },0)

// //console.log(items)

// let loop = 1;
// let prev = data[0].Product__c;
// let bgColor = 'lightgray'; 
// let x = data.map(x => {

//   let style

//   return { ...x, style }
// })
// let change = 0;
// for (i = 0; i < x.length; i++) {
//   if (x[i].Product__c != prev) {
//     let prodName = x[i].Product__r.Name;
//     prev = x[i].Product__c
//     change++;
//     console.log(`change ${change} ${prodName}`)
//     bgColor = bgColor === 'lightgray' ? 'lightgoldenrodyellow' : 'lightgray';
//   }
//     console.log(x[i].Product__r.Name)
//   x[i].style = bgColor
//  // console.log(data[i].Product__r.Name)
// }

