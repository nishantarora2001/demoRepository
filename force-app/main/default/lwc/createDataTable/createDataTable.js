import { LightningElement,track, api } from 'lwc';
import DataSave1 from '@salesforce/apex/DataSave.DataSave1';
import getContact from '@salesforce/apex/DataSave.DataSave2';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CONTACT_OBJ from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';


import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';


const columns = [
    {label : 'FirstName', fieldName : 'FirstName'},
    {label: 'LastName', fieldName :'LastName'},
    
    {label: 'Phone', fieldName :'Phone'},
    
    {label: 'Email', fieldName :'Email'}
];

export default class CreateDataTable extends LightningElement {
    columns =columns;
    @api recordId;
    conList=[];
    obj = CONTACT_OBJ;
    rec = {
        FirstName : FIRSTNAME_FIELD,
        LastName :LASTNAME_FIELD,
        
        Phone : PHONE_FIELD,
        
        Email : EMAIL_FIELD
    }
    handleEvent(event)
    {
        if(event.target.label == 'FirstName')
        {
            this.rec.FirstName = event.target.value;
            console.log(this.rec.FirstName);
        }
        if(event.target.label=='LastName')
        {
            this.rec.LastName = event.target.value;
        }
        
        if(event.target.label =='Phone')
        {
            this.rec.Phone =event.target.value;
        }
        
        if(event.target.label =='Email')
        {
            this.rec.Email =event.target.value;
        }
    }
    
    handleClick() {
        console.log(this.rec);
        DataSave1({ con : this.rec, acc : this.recordId})  
            .then(result => {
                this.conList =result;
            
                    this.rec.FirstName = '';
                    this.rec.LastName = '';
                    
                    this.rec.Phone ='';
                    
                    this.rec.Email='';

                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Contact created',
                            variant: 'success',
                        })
                    );
                
                
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                
            });
             getContact({acc : this.recordId})
            
                 .then(response => {
                    this.conList=response;
                 })
             .catch(error=>{
                     console.log(error);
                 });
            
    }
    
    
}