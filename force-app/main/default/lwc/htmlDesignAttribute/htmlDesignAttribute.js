import { LightningElement, api} from 'lwc';

export default class HtmlDesignAttribute extends LightningElement {
    @api htmlProperty;
    connectedCallback(){ 
        console.log('HTMLPROPERTY:::', this.htmlProperty);
    }
}