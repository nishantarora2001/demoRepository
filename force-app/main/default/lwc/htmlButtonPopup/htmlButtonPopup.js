import { LightningElement , track} from 'lwc';

export default class HtmlButtonPopup extends LightningElement {
    @track showPopup = false;
    openPopup(){
        this.showPopup = true;
    }
}