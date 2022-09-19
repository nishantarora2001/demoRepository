import { LightningElement , track } from 'lwc';

export default class TrackRecords extends LightningElement {
    @track fullName={firstName:'', lastName:''};
    handleChane(event){
        const field = event.target.name;
        window.alert(field)
        if(field=='firstName'){
            this.fullName.firstName = event.target.value;

        }
        else if(field =='lastName'){
            this.fullName.lastName = event.target.value;
        }
    }
}