import { LightningElement , track  , wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAttacmentDetails from '@salesforce/apex/PspdfController.getAttacmentDetails';
import getVisualforceOrigin from '@salesforce/apex/PspdfController.getVisualforceOrigin';
//mport versionData from '@salesforce/apex/PspdfController.versionData'; 
export default class PsPdfKitForAccount extends LightningElement {
    @track isModalOpen;
    recordId;
    @wire(getVisualforceOrigin) visualForceOrigin;
    @track fileDetails=[];

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.recordId = currentPageReference.state.recordId;
        }
    }
    connectedCallback(){      
        getAttacmentDetails({recordName: this.recordId}).then(data=>{ 
            this.fileDetails = data;
            console.log('FILEDETAIL::', JSON.stringify(this.fileDetails));
        })
            
    }
    closeModal(){ 
        this.isModalOpen=false;
    }
    viewButton(event){ 
        const itemIndex = event.currentTarget.dataset.index;
        console.log("ITEMINDEX::", itemIndex);
        this.rowSelected = this.fileDetails[itemIndex].Id;
        console.log("ROWSELECTED::", this.rowSelected);
        let newWindow = window.open('/apex/PspdfWebViewer?id='+this.rowSelected,'_blank');
        console.log('NEWWINDOW::', newWindow);
        
    }
}