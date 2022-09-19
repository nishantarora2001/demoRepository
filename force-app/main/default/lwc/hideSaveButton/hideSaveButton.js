import { LightningElement,track, api } from 'lwc';
import insertContact from '@salesforce/apex/PutData.PutData1';
// import contactDetailsLWC from '@salesforce/apex/DataSave.DataSave2';
import CONTACT_OBJ from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
// import { RecordFieldDataType } from 'lightning/uiRecordApi';

export default class HideSaveButton extends LightningElement {
    @api recordId;
    obj = CONTACT_OBJ;
    @track disablebutton ;
    rec = {
        FirstName : FIRSTNAME_FIELD,
        LastName : LASTNAME_FIELD, 
        Email : EMAIL_FIELD,
        Phone : PHONE_FIELD,

    }
   
    
    
    
    handleNameChange(event) {
        this.rec.FirstName = event.target.value;
        console.log("FirstName", this.rec.FirstName);
    }
    
    handleIndChange(event) {
        this.rec.LastName = event.target.value;
        console.log("LastName", this.rec.LastName);
    }
    
    handleEmailChange(event) {
        this.rec.Email= event.target.value;
        console.log("Email", this.rec.Email);
    }

    handlePhnChange(event) {
        this.rec.Phone= parseInt(event.target.value);
        console.log("Phone", this.rec.Phone);
    }

     handleClick() {
        console.log(this.rec);
        insertContact({newContact : this.rec, acc : this.recordId})
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.rec.FirstName = '';
                    this.rec.LastName = '';
                    this.rec.Email = '';
                    this.rec.Phone = parseInt('');
                    this.disablebutton=true;
                     this.dispatchEvent(
                      new ShowToastEvent({
                             title: 'Success',
                             message: 'Contact created successfully',
                            variant: 'success',
                         }),
                     );
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                 this.dispatchEvent(
                     new ShowToastEvent({
                         title: 'Error creating record',
                         message: error.body.message,
                         variant: 'error',
                     }),
                 );
                console.log("error", JSON.stringify(this.error));
                
            });
            
    
}
}