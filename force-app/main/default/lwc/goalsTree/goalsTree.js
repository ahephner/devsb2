import { LightningElement, wire, track } from 'lwc';
import userId from '@salesforce/user/Id';
import getGoals from '@salesforce/apex/forecasts.mc1Forecasts';

export default class GoalsTree extends LightningElement {
    user = userId;
    @track july = []
    @track aug = []
    @track sept = []
    connectedCallback(){
        console.log(this.user)
    }
    @wire(getGoals, { userId: '$user' })
    wiredData({ error, data }) {
      if (data) {
        this.handleData(data)
      } else if (error) {
         console.error('Error:', error);
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
    check(){
      console.log(this.july)
    }
}