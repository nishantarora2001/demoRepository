import { LightningElement, track} from 'lwc';
import accountList from '@salesforce/apex/getContactForWire.accountList';
export default class ImperitiveMethodTest extends LightningElement {
    @track accounts = [];

    handleAccounts(){ 
        accountList({}).then(data=>{ 
                this.accounts = data;
                console.log('ACCOUNTDATA::', JSON.stringify(this.accounts));
            })
            .catch((er)=>{
                console.log('errrr',er);
            })
    }
}