import { LightningElement } from 'lwc';

export default class CommunityExample extends LightningElement {
    count = 0

    handleAdd(){
        this.count ++; 
    }

    handleMinus(){
        if(this.count > 0){
            this.count --; 
        }
    }
}

