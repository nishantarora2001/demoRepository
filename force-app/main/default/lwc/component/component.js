import { LightningElement,  api, track} from 'lwc';
import abc from '@salesforce/apex/NewClass.NewClass1';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';



const columns = [
    { label:"Name", fieldName:"Name" },
    {label: "Account ID", fieldName:"Id"}
]

export default class Component extends LightningElement {
    obj=ACCOUNT_OBJECT;
    @api obj2;
    
    @track columns = columns;
    @track data=[];
    connectedCallback(){
        abc()
        .then(result =>{
            this.data=result;
        })

        
    }

    
    

}