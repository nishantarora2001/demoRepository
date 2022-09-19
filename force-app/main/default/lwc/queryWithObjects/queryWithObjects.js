import { LightningElement, track } from 'lwc';
import getAllObjectsFromOrg1 from '@salesforce/apex/getAllObjectsFromOrg.getAllObjectsFromOrg1';
import getAllRelatedFields from '@salesforce/apex/getAllObjectsFromOrg.getAllRelatedFields';
import getDataOfRelatedFields from '@salesforce/apex/getAllObjectsFromOrg.getDataOfRelatedFields';
// import getDataTableFields from '@salesforce/apex/getAllObjectsFromOrg.getDataTableFields';
export default class QueryWithObjects extends LightningElement {
    @track vlaues;
    @track pickListEnabled = false;
    @track showDataTable = false;
    @track dataTableValue =[];
    @track data=[];
    @track selectedField;
    @track allRelatedFields;
    @track objectsForCombobox =[];
    connectedCallback(){ 
        getAllObjectsFromOrg1()
            .then(response=>{
                this.objectsForCombobox = response;
                console.log('OBJECTFORCOMBOBOX::', this.objectsForCombobox);
            })
    }
    get dropDownOPtions(){ 
        return this.objectsForCombobox;
    }
    
    selectedValue(event){ 
        this.value = event.target.value;
        console.log("SELECTED VALUE::", this.value);
        this.pickListEnabled = true;
        getAllRelatedFields({objectSelected:this.value})
            .then(fields=>{
                this.allRelatedFields = fields;
                console.log("RELATED FIELDS:::", this.allRelatedFields);
            })
    }
    get pickListOptions(){ 
        return this.allRelatedFields;
    }
    selectedFields(event) {
        this.selectedField = event.detail.value;
        console.log('SELECTED FIELD:::', this.selectedField);
       
    }
    queryTheData(){ 
        console.log('FIELDS::', this.selectedField);
        getDataOfRelatedFields({fieldsSelected : this.selectedField , objectSelected: this.value})
        .then(fieldData=>{ 
            this.data=fieldData;
            console.log('QUERIED DATA::', this.data);
        })
        let j=0;
        for(let i=0; i<this.allRelatedFields.length; i++){ 
                console.log("J::::", j);
                console.log(this.selectedField[j]);
                if(j<this.selectedField.length){
                if(this.allRelatedFields[i].value === this.selectedField[j]){ 
                    this.dataTableValue.push({label : this.allRelatedFields[i].label,fieldName: this.allRelatedFields[i].value});
                    console.log(this.allRelatedFields[i]);
                   console.log("DATATABLEVALUE:::" , JSON.stringify(this.dataTableValue));                   
                    j++;
                }
            }
            
        }
        console.log("DATATABLEVALUE:::" , JSON.stringify(this.dataTableValue));   
        this.showDataTable = true;
        // console.log("DATATABLEFIELDS::", this.dataTableValue);
        
        // .getDataTableFields()
    }
    
}