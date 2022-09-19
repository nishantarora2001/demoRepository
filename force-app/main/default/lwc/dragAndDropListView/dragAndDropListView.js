import { LightningElement , track, api} from 'lwc';
import accountData from '@salesforce/apex/accountDataClass.accountData';
import FORM_FACTOR from '@salesforce/client/formFactor';
export default class DragAndDropListView extends LightningElement {
    @track dataToshow=[];
    classList;
    @api currentRows =2;
    @track showmore = false;
    @track showLess = false;
    @track totalColumnRows;
    accountData=[];
    @api currentColumns = 3;
    connectedCallback(){ 
        console.log('FORMFCT::', FORM_FACTOR);
        // this.totalColumnRows = this.currentColumns * this.currentRows;git 
        accountData()
            .then(res=>{ 
                this.accountData = res;
                if(this.accountData.length < this.totalColumnRows){
                    let data = this.accountData.length-this.totalColumnRows;
                    for(let i=0; i<this.totalColumnRows+data; i++){   
                        this.dataToshow.push(this.accountData[i]);
                    }
                    this.showmore = false;
                    this.showLess = false;
                }
                else{
                for(let i=0; i<this.totalColumnRows; i++){   
                    this.dataToshow.push(this.accountData[i]);
                }
                this.showmore = true;  
            }
            })
        this.showData = true;
        this.classList = 'slds-size_1-of-'+this.currentColumns;
    }
    dataToShowMore(){ 
        this.dataToshow =[];
        this.dataToshow = this.accountData;
        this.showmore = false;
        this.showLess = true;
    }
    dataToShowLess(){ 
        this.dataToshow = [];
        for(let i=0; i<this.totalColumnRows; i++){ 
            let abc = this.accountData[i];
            this.dataToshow.push(this.accountData[i]);         
        }
        this.showmore = true;
        this.showLess = false;
    }
}