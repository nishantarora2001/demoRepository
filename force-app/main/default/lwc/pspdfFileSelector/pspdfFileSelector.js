import { LightningElement,track, wire , api} from 'lwc';
import getVisualforceOrigin from '@salesforce/apex/PspdfController.getVisualforceOrigin';
import getAttacmentDetails from '@salesforce/apex/PspdfController.getAttacmentDetails';
import versionData from '@salesforce/apex/PspdfController.versionData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PspdfFileSelector extends LightningElement {
    @track visualForce;
    @track showpdf;
    @track rowSelected;
    @track buttonClicked;
    @track getDetails=[];
    @track versionData;
    fileContents;
    @wire(getVisualforceOrigin) visualForceOrigin;
    @track isModalOpen;
    @track fileDetails=[];
    @api recordId;
    

    async handleFile(file)
    {
        if(file.dataTransfer) {
            this.file= file.dataTransfer.files[0];
            if(this.file.type == 'application/pdf' || this.file.type == 'image/png'
            || this.file.type == 'image/jpg'){
                this.fileContents = await this.getBase64(this.file);
            }
        } 
        else if(file.target) {
            this.file=file.target.files[0];
            if(this.file.type == 'application/pdf' || this.file.type == 'image/png'
            || this.file.type == 'image/jpg'){
                this.fileContents = await this.getBase64(this.file);
            }  
        }
        if(this.fileContents == undefined || this.fileContents == null || this.fileContents == ''){
            const evt = new ShowToastEvent({
                title: 'Error',
                message: 'Only pdf, png, jpg and jpeg files are supported.',
                variant: 'error',
            });
            this.dispatchEvent(evt);
        }
        else{
            let visualForce = this.template.querySelector("iframe");
            if( visualForce ){
                visualForce.contentWindow.postMessage(this.fileContents, this.visualForceOrigin.data);
                this.fileContents = null;
            }
        }
    }
    handleDragover(event)
    {
        event.stopPropagation();
        event.preventDefault();
    }
    handleDrop(event)
    {
        event.stopPropagation();
        event.preventDefault();
        this.handleFile(event);
    }
    handleClick()
    {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('multiple', true);
        input.setAttribute('accept', '.png, .jpg, .jpeg, .pdf')
        input.style.display = 'none';
        input.click();
        input.addEventListener('change', file => {
            this.handleFile(file);
        });
        var dropzone = this.template.querySelector('div[data-id=file]');
        dropzone.appendChild(input);
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let result = reader.result;
            let base64 = 'base64,';
            let content = result.indexOf(base64) + base64.length;
            let fileContents = result.substring(content);
            resolve(fileContents);
        }
        reader.onerror = error => reject(error);
        });
    }
    showPopUp(){ 
        this.isModalOpen=true;
        getAttacmentDetails({recordName: this.recordId})
            .then(data=>{ 
                this.fileDetails = data;
                console.log('FILEDETAIL::', this.fileDetails);
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
        versionData({selectedId:this.rowSelected})
            .then(data=>{ 
                this.versionData = data;
               
                let visualForce = this.template.querySelector("iframe");
                   
                    console.log('NEWWINDOW::',newWindow);
                console.log('VISUALFORCE::', visualForce);
                if(visualForce){
                    console.log('ENTERD IF CONDITION');
                    visualForce.contentWindow.postMessage(this.versionData, this.visualForceOrigin.data);
                    let newWindow = window.open('/apex/PspdfWebViewer');
                    console.log('NEWWINDOW::', newWindow);
                    newWindow.document.write(visualForce);
                    this.fileContents = null;
                    this.isModalOpen = false;
                }
            
                console.log("VersionData:::", this.versionData);
            })

    }
   
    
    
}