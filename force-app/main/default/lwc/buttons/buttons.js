import { LightningElement } from 'lwc';
import {getTermOptions} from 'c/helper'
export default class Buttons extends LightningElement {
    termOptions = getTermOptions();
    term = 30;

    termChange(event){
        this.term = event.detail.value; 
    }
}