import { LightningElement, api, track , wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import designAttributeSelectedFieldData1 from '@salesforce/apex/designAttributeSelectedFieldData.designAttributeSelectedFieldData1';
//import Type from '@salesforce/schema/Account.Type';
//import CONTACT_OBJECT from '@salesforce/schema/Contact';
// import getDefaultValue from '@salesforce/apex/designAttributeDataClass.getDefaultValue';

export default class designAttribute22 extends LightningElement {
    @track dataforDataTable=[];
    @api Object ;
    @api fieldValues;
    @api fieldsName = 'Name,ID';
    @api apiName ;
    @api listViewApiName;
    @api itemselected;
    @track objectApiName;
    @track arrData=[];
    dataTableColumns=[];
    typeFields=[];
    columns=[];
    @track mapOfValues = [];
    @track mapOfValues1 = [];
    @track dataTableShow;
    connectedCallback(){ 
        console.log("CURRENTSTEP:::", this.Object);
        console.log("fieldValues:::", this.fieldValues);
    }
    getData(){ 
        designAttributeSelectedFieldData1({objectName : this.Object , fields : this.fieldValues})
        .then(data=>{ 
            this.dataforDataTable = data;
            console.log("DATAFORDATATABLE::", this.dataforDataTable);
        })     
    }
     @wire(getObjectInfo, { objectApiName : '$Object'})
    getObjectdata({ data, error }) {
        if (data) {
            this.getData();
            console.log("DATATA::", data);
            this.dataTypes = Object.values(data.fields).map((fld) => {
                this.COLUMNS = this.fieldValues.split(',');
                this.COLUMNS.forEach(ele =>{
                    
                    if(fld.apiName == ele){
                       this.dataTableColumns.push({label:fld.label , fieldName:fld.apiName , editable:fld.createable});
                       
                       
                       this.dataTableShow=true;
                    }
                })
                
                
            });

            console.log("DTATTABLECOLUMNS:::", this.dataTableColumns);
            
        } else if (error) {
            this.error = error;
        }
    }
    

  }