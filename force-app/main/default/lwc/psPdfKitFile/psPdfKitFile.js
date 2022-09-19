import { LightningElement , api , track} from 'lwc';

export default class PsPdfKitFile extends LightningElement {
    @api recordId;
    @track newWindow

    viewandEditButton(){ 
        console.log('RECORDID:::', this.recordId);
        this.newWindow = window.open('/apex/PspdfWebViewer?id='+this.recordId,'_blank');
        console.log('NEWWINDOW:::', JSON.stringify(this.newWindow));

    }
}