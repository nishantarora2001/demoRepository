import { LightningElement, api } from 'lwc';
export default class TodoItem extends LightningElement {
    uppercaseItemName = "vishvas";

    @api
    get itemName() {
        return this.uppercaseItemName;
    }

    set itemName(value) {
       this.uppercaseItemName = value.toUpperCase();
    }

}