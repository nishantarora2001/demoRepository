import { LightningElement, api  , track} from 'lwc';
// import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
import Phone from '@salesforce/schema/Contact.Phone';
import DataSave1 from '@salesforce/apex/ContactClass.DataSave1';
import getContact from '@salesforce/apex/ContactClass.getContact';
import CONTACT_OBJ from '@salesforce/schema/Contact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
// import { RecordFieldDataType } from 'lightning/uiRecordApi';
// im
const columns = [
    { label:"firstName", fieldName:"FirstName" },
    {label: "lastName", fieldName:"LastName"},
    {label: "Email", fieldName:"Email"},
    {label: "Phone", fieldName:"Phone"}
]
export default class dataFetch extends LightningElement {
    @track currentPage=1;
    @track totalPageCount;
    // @track disablebutton;
    // @track disablebutton1;
    @track pageshow=5;

    @track columns = columns;
    @track data=[];
    @api recordId;
    @track recordsToDisplay = [];
    @track value="pages"; 

    get options() {
        return [
            { label: '5', value: '5' },
            { label: '15', value: '15' },
            { label: '20', value: '20' },
        ];
    }

    // handleEvent(event){
    //     // // this.pageshow = event.detail.value;
    //     // // this.value = event.target.value;
    //     // console.log('value', this.recordperPage);
        
    //     this.currentPage = 1;
    //     this.totalPage = Math.ceil(size / this.recordperPage);
    //     this.disableButton1 = true;
    //     this.disableButton = false;
    // }

    handleFirstPage() {
        // this.disableButton = false;
        // this.disableButton1 = true;
        this.currentPage = 1;
        this.preparePaginationList();
    }
    handlePrevPage() {
        // this.disableButton = false;
        // if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.preparePaginationList();
        // }
        // if (this.currentPage == 1) {
        //     this.disableButton1 = true;
        // }
    }
    handleNextPage() {
        // this.disableButton1 = false;
        // if (this.currentPage < this.totalPageCount) {
            this.currentPage += 1;
            this.preparePaginationList();
        // }
        // if (this.currentPage == this.totalPage) {

        //     this.disableButton = true;
        // }
    }
    handleLastPage() {
        // this.disableButton = true;
        // this.disableButton1 = false;
        this.currentPage = this.totalPageCount;
        this.preparePaginationList();
    }
    preparePaginationList() {
        let begin = (this.pageNo - 1) * parseInt(this.pageshow);
        let end = parseInt(begin) + parseInt(this.pageshow);
        this.recordsToDisplay = this.data.slice(begin, end);
    }
    obj = CONTACT_OBJ;
    //  @track FirstName = FirstName;
    //  @track LastName = LastName;
    //  @track Email = Email;
    //  @track Phone = Phone;
     rec = {
        FirstName : FirstName,
        LastName : LastName, 
        Email : Email,
        Phone : Phone,

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
        this.rec.Phone= event.target.value;
        console.log("Phone", this.rec.Phone);
    }

     handleClick() {
        console.log(this.rec);
        DataSave1({newContact : this.rec, acc : this.recordId})
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.rec.FirstName = '';
                    this.rec.LastName = '';
                    this.rec.Email = '';
                    this.rec.Phone = '';
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
           
                getContact({acc : this.recordId})
                .then(response => {
                    this.data=response;
                    let size = this.data.length;
                    this.currentPage=1;
                    this.recordsToDisplay = this.data.slice(0, this.pageshow);
                    this.totalPageCount = Math.ceil(size / this.pageshow);
                })
                .catch(error=>{
                    console.log(error);
                });

                

               

                
            
            
            
            
            
            
    }
    
    


    
    


}