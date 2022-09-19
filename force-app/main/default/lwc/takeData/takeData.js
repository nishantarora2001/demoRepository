import { LightningElement,track, api } from 'lwc';
import insertContact from '@salesforce/apex/DataSave.DataSave1';
import contactDetailsLWC from '@salesforce/apex/DataSave.DataSave2';
// import getContactList from '@salesforce/apex/DataSave.getContactList';
// import {ShowToastEvent} from 'lightning/platformShowToastEvent';
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

export default class takeData extends LightningElement {
    get options() {
        return [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '30', value: 30 },
        ];
    }
    @track columns =columns;
    @track showRecords =[];
    @api recordId;
    conList=[];
    obj = CONTACT_OBJ;
    currentPage;
     size;
    recordsVisiblePerPage = 10;
    visibleRecords =[];
    prev_First_Button_Disable;
    next_Last_Button_Disable;
    @track event;
    totalPage;
    keyWord='';
    
    
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
    
    
    async handleClick() {
        console.log("recorded Data::",this.rec);
        await insertContact({ newContact : this.rec, acc : this.recordId})  
            .then(result => {
                this.conList =result;
                this.currentPage = this.currentPage;
                this.size = this.conList.length;
                this.visibleRecords = this.conList.slice(0, this.recordsVisiblePerPage);
                this.totalPage = Math.ceil(this.size / this.recordsVisiblePerPage);
                
                // if(this.currentPage==this.totalPage){
                //     this.currentPage=this.totalPage;
                // this.prev_First_Button_Disable =false;
                // this.next_Last_Button_Disable =true;
                // }
                this.rec.FirstName = '';
                this.rec.LastName = '';
                this.rec.Email = '';
                this.rec.Phone ='';
                

                // this.dispatchEvent(
                //         new ShowToastEvent({
                //             title: 'Success',
                //             message: 'Contact created',
                //             variant: 'success',
                //         })
                //     );    
            })
            // .catch(error => {
            //     this.dispatchEvent(
            //         new ShowToastEvent({
            //             title: 'Error creating record',
            //             message: error.body.message,
            //             variant: 'error',
            //         }),
            //     );
                
            // }); 
    }
    
    handleCombox(event)
    {

        this.recordsVisiblePerPage = event.target.value;
        this.value = event.target.value;
        this.size = this.conList.length;
        this.visibleRecords = this.conList.slice(0, this.recordsVisiblePerPage);
        this.currentPage = 1;
        this.totalPage = Math.ceil(this.size / this.recordsVisiblePerPage); 
    }
    // 
    handleKeyWordChange(event) {
        
        

        if(event.target.value!=null){ 
                this.showRecords = this.conList.filter(obj => obj.LastName.startsWith(event.target.value))
                 this.size = this.showRecords.length;
                 this.visibleRecords = this.showRecords.slice(0, this.recordsVisiblePerPage);
                 this.totalPage = Math.ceil(this.size / this.recordsVisiblePerPage);
                 this.currentPage=1;
                 this.event=true;
        }
        else
        { 
            this.size = this.conList.length;
            this.visibleRecords = this.conList.slice(0, this.recordsVisiblePerPage);
            this.totalPage = Math.ceil(this.size / this.recordsVisiblePerPage);
        }
        if(this.currentPage == this.totalPage)
        {
            this.prev_First_Button_Disable= true;
            this.next_Last_Button_Disable =true;
        }
        else{
            this.next_Last_Button_Disable =false;
        }
    }
    firstButtonHandle()
    {
        if(this.event==true){ 
            this.next_Last_Button_Disable =false;
            this.prev_First_Button_Disable=true;
            this.currentPage = 1;
            this.paginationHandle();
        }
        else{
            this.next_Last_Button_Disable= false;
        this.prev_First_Button_Disable=true;
        this.currentPage = 1;
        this.paginationHandle();
        }
        
        
        
    }

    previousButtonHandle()
    {
        if(this.event==true){ 
            this.next_Last_Button_Disable=false;
            if(this.currentPage > 1)
        {
            this.currentPage = this.currentPage -1;
            this.paginationHandleshowRecords();
        }
        if(this.currentPage==1)
        {
            this.prev_First_Button_Disable=true;
        }
        }
        else{
        this.next_Last_Button_Disable=false;
        
        if(this.currentPage > 1)
        {
            this.currentPage = this.currentPage -1;
            this.paginationHandle();
        }
        if(this.currentPage==1)
        {
            this.prev_First_Button_Disable=true;
        }
    }
    }
    nextButtonHandle()
    {
        if(this.event==true){ 
        this.prev_First_Button_Disable=false;
        if(this.currentPage < this.totalPage)
        {
            this.currentPage = this.currentPage +1;
            this.paginationHandleshowRecords();
           
        }
        if(this.currentPage == this.totalPage)
        {
            this.next_Last_Button_Disable =true;   
        }
    }
    else{ 
        this.prev_First_Button_Disable=false;
        if(this.currentPage < this.totalPage)
        {
            this.currentPage = this.currentPage +1;
            this.paginationHandle();
           
        }
        if(this.currentPage == this.totalPage)
        {
            this.next_Last_Button_Disable =true;   
        }
    }
}
    lastButtonHandle()
    {
        if(this.event==true){ 
            this.prev_First_Button_Disable= false;
            this.next_Last_Button_Disable=true;
            this.currentPage = this.totalPage;
            this.paginationHandleshowRecords();
        }
        else{
            this.prev_First_Button_Disable= false;
        this.next_Last_Button_Disable=true;
        this.currentPage = this.totalPage;
        this.paginationHandle();
        }
    }
    paginationHandle()
    { 
        var begin = (this.currentPage-1) * parseInt(this.recordsVisiblePerPage);
        var end = parseInt(begin) + parseInt(this.recordsVisiblePerPage);
        this.visibleRecords = this.conList.slice(begin, end);
    }
    paginationHandleshowRecords(){ 
        var begin = (this.currentPage-1) * parseInt(this.recordsVisiblePerPage);
        var end = parseInt(begin) + parseInt(this.recordsVisiblePerPage);
        this.visibleRecords = this.showRecords.slice(begin, end);
    }
    connectedCallback()
    {
        contactDetailsLWC({acc : this.recordId})  
        .then(result => {
            this.conList =result;
            this.size = this.conList.length;
            this.visibleRecords = this.conList.slice(0, this.recordsVisiblePerPage);
            this.currentPage = 1;
            this.totalPage = Math.ceil(this.size / this.recordsVisiblePerPage);
            this.prev_First_Button_Disable=true;
            this.next_Last_Button_Disable=false;
        });
    }
    
    
}