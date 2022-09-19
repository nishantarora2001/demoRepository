import { LightningElement , wire} from 'lwc';
import contactList from '@salesforce/apex/getContactForWire.contactList';
export default class TestWireService extends LightningElement {
    @wire(contactList)
    contacts
    
    renderedCallback(){ 
        if(this.contacts && this.contacts.data){ 
            console.log(JSON.stringify(this.contacts));
        }
    }
}