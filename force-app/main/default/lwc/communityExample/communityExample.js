import { LightningElement } from 'lwc';

export default class CommunityExample extends LightningElement {
    count = 0

    handleAdd(){
        this.count ++; 
    }

    handleMinus(){
        this.count --; 
    }
}