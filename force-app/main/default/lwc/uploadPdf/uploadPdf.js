import { LightningElement, api ,track } from 'lwc';
// import {createMessageContext , publish} from 'lightning/messageService';
// import staticDownloader from '@salesforce/resourceUrl/staticDownloader';
// import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

// import {loadStyle} from  'lightning/platformResourceLoader';
// import StaticCss from '@salesforce/resourceUrl/StaticeCss';

export default class uploadPdf extends LightningElement {
    fileName;
    @api recordId;
    // @track files;
    // fileContents;
    // dropzone = this.template.querySelector('.dropzone');
    // async handleFile(event){ 
    //     if(event.dataTransfer){ 
    //         this.files = event.dataTransfer.files[0];
    //         console.log("If Condition", this.files);
    //         this.fileContents = await this.togetBase64(this.files);
    //         console.log("If Condition", this.fileContents);
    //     }
    //     else if(event.target){ 
    //         this.files = event.target.files[0];
    //         this.fileContents = await this.togetBase64(this.files);
    //         console.log("Else Condition", this.files);
    //     }
    // }
    // handleDrag(event){ 
    //     event.stopPropagation();
    //     event.preventDefault();
    // }
    // handleDrop(event){ 
    //     event.stopPropagation();
    //     event.preventDefault();
    //     this.handleFile(event);
    // }

    // handleCLick(){ 
    //     var input = document.createElement('input');
    //     input.setAttribute('type', 'file');
    //     input.setAttribute('multiple', true);
    //     input.style.display = 'none';
    //     input.click();
    //     input.addEventListener('change', file =>{
    //         this.handlefile(file);
    //       });
    //     this.dropzone.appendChild(input);
    // }
    togetBase64(file){ 
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
            return fileContents;
            reader.onerror = error => reject(error);
        });

     }
    // handlePublishData(){
    //     const payload = { 
    //        fileContent : this.fileContents,

    //    }
    //    publish()
    // }
    renderedCallback() {
        let dropzone = this.template.querySelector('div');
        console.log("DROPZONE::", JSON.stringify(dropzone));
        dropzone.addEventListener("dragover" , (e)=>{
            e.stopPropagation();
            e.preventDefault();
        });
        
        dropzone.addEventListener("drop", (e)=>{
            e.stopPropagation();
            e.preventDefault();
            let files = e.dataTransfer.files;
            let content = this.togetBase64(this.files);
            console.log("FIELSSSSSSS:::::", content);
            this.fileName = e.dataTransfer.files[0].name;
            console.log(files);
            this.fileContent2={ 
                fileName: this.fileName,
                parentRec: this.recordId
            }
            
            console.log("Holded Data",JSON.stringify(this.fileContent2));
            this.fileDetails = this.fileContent2;
            console.log('takeData::::',JSON.stringify(this.fileDetails));
    });


        function triggerCallback(e , callback){ 
            if(!callback || typeof callback !=='function'){ 
                 return;
             }
            var files;
            if(e.target){ 
                files = e.target.files;
                var fileName = e.target.files[0].name;
                console.log("FILENAME========>", JSON.stringify(fileName));
                
            }
            callback.call(null,files);
        }
        



        function makeDroppable(ele, callback) {
            console.log("Check here::", callback);
            let input = document.createElement('input');
             input.setAttribute('type', 'file');
             input.setAttribute('multiple' , true)
             input.style.display = 'none';
             input.addEventListener('change', function(e) {
               triggerCallback(e, callback);
             });
             ele.appendChild(input);
        
            ele.addEventListener('click',function(){ 
                input.value=null;
                input.click();
                console.log(files);

                
        
            });
        };

        
    
        makeDroppable(this.template.querySelector('.dropzone'), function(files) {
        
            console.log(files);
            this.fileName = files[0].name;
            console.log("FileName Here", this.fileName);
           
        
       
           
        }.bind(this));
    }

    sedMessagetoVisualForce(){ 

        let message = {
            
        fileName : this.fileDetails.fileName,
        contentId : this.fileDetails.recordId

        }
        console.log("MESSAGE:::", message)

    }
}