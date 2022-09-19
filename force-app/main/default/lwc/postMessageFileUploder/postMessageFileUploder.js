import { LightningElement, api } from 'lwc';

export default class postMessageFileUploader extends LightningElement {
    @api recordId ;
    fileName;   
    connectedCallback(){
        window.addEventListener('message', (message)=>{
            console.log(message.data);
        });
    }

    toBase64 = file => new Promise((resolve, reject) => {
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

    async handleFilesChange(event){
        if (event.target.files.length > 0) {
            this.fileName = event.target.files[0].name;
            console.log("File::::", this.fileName);
            this.file = {
                // parentRec : this.recordId,
                fileName : event.target.files[0].name,
                fileContent : await this.toBase64(event.target.files[0])
            
            }
            console.log("THHISFILE:::", this.file);
        }
    }

    fireToVF(){
        console.log("CONTENT:::");
        this.fireToComponent(this.file);
    }

    fireToComponent(message){
        this.template.querySelector('iframe').contentWindow.postMessage(message, '*');
    }
}