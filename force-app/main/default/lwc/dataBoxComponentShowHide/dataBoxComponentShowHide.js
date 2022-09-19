import { LightningElement , track, api} from 'lwc';
import accountData from '@salesforce/apex/accountDataClass.accountData';
export default class DataBoxComponentShowHide extends LightningElement {
    @track accountData=[];
    @track classList;
    @api columnToShow;
    @track dataLength;
    divGrid;
    renderedCallback(){ 
        accountData()
            .then(res=>{ 
                this.accountData = res;
                console.log('ACCDATA1jh2hb1:::', this.accountData);
                console.log('LENGTHDATA::', this.accountData.length);
                this.dataLength = this.accountData.length;
            })
        console.log('COLUMNS:::', this.columnToShow);
        //this.showData = true;
        this.classList = 'slds-size_1-of-'+this.columnToShow;
        console.log('CLAssLIST11::', this.classList);
        this.divGrid = this.template.querySelector('div');
        console.log("DIVGRID:::", this.divGrid); 
        console.log('LENGHTDATA::', this.dataLength);
        for(let i=0; i < 10; i++){
            if(i<this.columnToShow) {
            console.log("ENTERED LOOP");
            let newDiv = document.createElement('div');
            console.log("NEWDIV::", newDiv);
            newDiv.classList.add('slds-size_1-of-'+this.columnToShow);
            console.log('CLASSLIST:::', newDiv);
            let innerDiv = document.createElement('div');
            innerDiv.style.border="2px solid rgb(189 194 219)";
            innerDiv.style.height = "200px";
            innerDiv.style.width = "200px";
            innerDiv.style.backgroundColor="rgb(189 194 219)";
            innerDiv.style.borderRadius="20px";
            innerDiv.style.marginTop="20px";
            let text = document.createTextNode("This just got added");
            innerDiv.appendChild(text);
            newDiv.appendChild(innerDiv);
            this.divGrid.appendChild(newDiv);
            console.log('DIVGRID:::', this.divGrid);
            }
            else{ 
                if(this.showData){ 
                    
                }
            }
        }
        let buttonClass = this.template.querySelector('.buttonClass');
        this.divGrid.appendChild(buttonClass);
    }
    showMoreData(){ 

    }
}