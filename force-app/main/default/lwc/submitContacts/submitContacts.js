import { LightningElement , api , track } from 'lwc';


export default class SubmitContacts extends LightningElement {
    @api recordId;
     keyIndex = 1;
   
    @track itemList = [
        {
            id: 1
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

}