import { LightningElement, api, wire , track } from 'lwc';
 import DynamicCss from '@salesforce/resourceUrl/DynamicCss';
 import { loadStyle } from 'lightning/platformResourceLoader'; 
import getRelatedFilesByRecordId from '@salesforce/apex/preViewPdf.getRelatedFilesByRecordId'
import {NavigationMixin} from 'lightning/navigation'
export default class FilePreviewAndDownloads extends NavigationMixin(LightningElement) {

    @api recordId;
    filesList =[];
    
    url;
        
    
    
    connectedCallback(){ 
        getRelatedFilesByRecordId({recordId: this.recordId})
            .then(data=>{
                this.filesList = data;
                console.log("FILELIST:::", this.filesList);
                this.filesList.forEach(element=>{ 
                    this.url = "/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId=" +
                    element.Id +
                    "&operationContext=CHATTER&contentId=" +
                    element.ContentDocumentId
                })
                console.log("URL:::", this.url);
                
                
            })
    }
    async previewHandler(){
     
         
         this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            
            attributes:{ 
                pageName:'filePreview'
               
            },
            state:{ 
                selectedRecordId: this.recordId,
                action : this.template.querySelector('.staticActionButton')
                    
                
                
            }
            
            
        })
        
        this.handleIcon();
        this.handleButton();
    
        // setTimeout (()=>{
        //     let action = this.template.querySelector('.staticActionButton')
        //     console.log("ACTION::", action);
        // } , 100);
       
        
        // let action = this.template.qyerySelector('.staticActionButton')
        // console.log("ACTION:::", JSON.stringify(action));        
        
        // action.addEventListener("click", event => {
        //     console.log("clicked element" , event);
        
     //})
        
         
         
        
    }

    async handleIcon(){ 
        Promise.all([loadStyle(this, DynamicCss)]);
        //  let act = document.querySelector('.staticActionButton')
        //   console.log("ACTION::", JSON.stringify(act));
         
        //   act.addEventListener('click',this.closeTab); 
           
        
    }
    handleButton(){ 
        let act = document.getElementsByClassName('.staticActionButton')
        console.log("ACTION:::", JSON.stringify(act));
    }
    
}