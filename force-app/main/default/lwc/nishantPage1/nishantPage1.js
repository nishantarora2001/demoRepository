import { LightningElement } from 'lwc';

export default class NishantPage1 extends LightningElement {
    detailvisible=true;
    name="versha";
    handleEvent(){
        this.detailvisiblem = false;
    }
    handleEvent2(event){
        this.name = event.target.value;
    }
}