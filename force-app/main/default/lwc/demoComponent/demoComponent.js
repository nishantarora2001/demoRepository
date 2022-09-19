import { LightningElement, wire , api, track} from 'lwc';
import abc from '@salesforce/apex/NewClass.NewClass1';
import abc2 from '@salesforce/apex/NewClass.NewClass1'
import ACCOUNT_OBJECT from '@salesforce/schema/Account';



const columns = [
    { label:"Name", fieldName:"Name" },
    {label: "Account ID", fieldName:"Id"}
]
const column2 =[
    {label:"firstName", fieldName:"firstName"},
    {label:"lastName", fieldName:"lastName"},
    {label:"Phone", filedName:"Phone"},
    {label:"Email", filedName:"Email"}
]
export default class DemoComponent extends LightningElement {
    obj=ACCOUNT_OBJECT;
    @api obj2;
    @track eventList = [];
    @track columns = columns;
    @track data=[];
    @wire(abc)
    wiredAccount({data , error})
    { 
        if(data != undefined){
            
        console.log(data);
            this.eventList=data;
        }
        else {
            console.log("Error occured", error);
        }
       
    }
    data={ label: "Object", value: "Account" }

    @api obj3;
    @track eventList2=[];
    @track column2 = column2;
    @wire(abc2)
    wiredAccount({data , error})
    { 
        if(data != undefined){
            
        console.log(data);
            this.eventList2=data;
        }
        else {
            console.log("Error occured", error);
        }
       
    }
    data={ label: "Object", value: "Contact" }
    

}