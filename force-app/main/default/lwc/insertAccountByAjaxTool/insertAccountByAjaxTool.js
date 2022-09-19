import { LightningElement , api} from 'lwc';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ContactMobile from '@salesforce/schema/Case.ContactMobile';


export default class InsertAccountByAjaxTool extends LightningElement {
    @api recordId
    rec={
        NAME : NAME_FIELD,
        PHONE : PHONE_FIELD
    }

    handleclick(event){ 
        if(event.target.label=='NAME'){
            this.rec.NAME = event.target.value;
            console.log(this.NAME);
        }
        if(event.target.label=='PHONE'){ 
            this.rec.PHONE = event.target.value;
            console.log(this.PHONE);
        }
    }
    

    GetFile(){
        
        this.SetFile(this.rec);
    }

    SetFile(message){
        this.template.querySelector('iframe').contentWindow.postMessage(message, '*');
    }
}