import { LightningElement, track ,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAllContactsById from '@salesforce/apex/LeadController.getAllContactsById';
const columns = [
    {label:'Id', field:"Id"},
    {label:'FirstName', field:"FirstName" },
    {label: "LastName", field:"LastName"},
    {label:"Phone", field:"Phone"},
    {label:"Email", field:"Email"},
]
export default class accountRecords extends NavigationMixin(LightningElement) {
    @api recordId;
     keyIndex = 1;
   
    @track itemList = [
        {
            id: 0
        }
    ];

    addRow() {
        ++this.keyIndex;
        var newItem = [{ id: this.keyIndex }];
        this.itemList = this.itemList.concat(newItem);
    }

    removeRow(event) {
        if (this.itemList.length >= 2) {
            this.itemList = this.itemList.filter(function (element) {
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
        }
    }

    handleSubmit() {
        var isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) {
            this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                element.submit();
            });
            getAllContactsById({accountId: this.recordId})
            .then(response => {
                console.log('response:: ', response);
                this.data = response;
            });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contacts successfully created',
                    variant: 'success',
                }),
            );
    
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: 'Please enter all the required fields',
                    variant: 'error',
                }),
            );
        }
    }
    handleReset(){
        this.template.querySelectorAll('lightning-input-field').forEach(element =>{
            element.reset();
        });
    }
    @track columns = columns;

}