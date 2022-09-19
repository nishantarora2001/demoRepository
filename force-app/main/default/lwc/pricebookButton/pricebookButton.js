import { LightningElement , track , api} from 'lwc';
import verifyPricebookChange from '@salesforce/apex/pricebookData.verifyPricebookChange';
import deleteData from '@salesforce/apex/pricebookData.deleteData';
import pricebookDetailsAndCurrentPricebookProducts from '@salesforce/apex/pricebookData.pricebookDetailsAndCurrentPricebookProducts';
// import { deleteRecord } from 'lightning/uiRecordApi';
import saveOpportunityLineItem from '@salesforce/apex/pricebookData.saveOpportunityLineItem';
const column=[
    {label:"ProductName", fieldName:"Name" },
    {label:"ProductCode",fieldName:"ProductCode"},
    {label:"List Price" , fieldName:"UnitPrice"},
    {label:"Family", fieldName:"Family"},
    {label:"Description" , fieldName:"Description"}

]
const column2 =[
    {label:"Product" , fieldName:"Name"},
    {label:"Quantity" , fieldName:"Quantity"},
    {label:"List Price" , fieldName:"UnitPrice"},
    {label:"Sales Price" , fieldName:"ListPrice"},
    {label:"Date" , fieldName:"ServiceDate"}
]
export default class PricebookButton extends LightningElement {
    @track detailSubmission=[];
    @api recordId;
    @track selectedData;
    @track takeSelected;
    @track selectPricebook;
    @track selectProduct;
    @track cols = column;
    @track cols2 = column2;
    @track values=[];
    @track takeValues=[];
    @track selectedRecords=[];
    @track dataWatch;
    visibleData =[];
    options = [];
    showData;
    @track headerModal="SELECT PRICEBOOK";
    
    @track show = {
        modalPopup : false,
        pricebookPopup : false,
        productDetails : false,
        productEdit : false,
        showPricebookChangePopup : false,
    }
    @track currentPricebook;
    @track deleteData=[];
    
    connectedCallback(){ 
        pricebookDetailsAndCurrentPricebookProducts({recordId:this.recordId})
            .then(data=>{
                this.selectedData=data.currentPricebookId;
                this.options = data.pricebookOptions;
                this.visibleData = data.currentPricebookProducts;
                this.showData =this.visibleData;
                console.log("DATASHOWING:::", this.showData);
                console.log("VISIBLEDATA:::", this.visibleData);
            })
    }
    

    get options() {
        return this.options;
    }

    fetchRelated(event){ 
        
        this.selectedData = event.detail.value;
        this.nextButton=false;
        console.log("SELECTED:::", this.selectedData);
    }
    
    
    

    handleClick(event){ 
        if(event.target.label === 'Information')
        {
            this.show.modalPopup = true;
            this.show.pricebookPopup = true;
        }
        else if(event.target.title === 'Next')
        {
            if(this.show.pricebookPopup === true)
            {
               
                
                verifyPricebookChange({pricebookId: this.selectedData , recordId :this.recordId})
                    .then(data=>{ 
                        this.showData = data;
                        console.log("VALUES:::", JSON.stringify(this.showData));
                        this.show.showPricebookChangePopup = false;
                        this.show.pricebookPopup=false;
                        this.show.productDetails = true;
                        this.headerModal="PRODUCT DETAILS"
                    })
                    .catch(error=>{ 
                        this.show.showPricebookChangePopup = true;
                        this.show.pricebookPopup=true;
                    
                    })
                    
                }
                else if(this.show.productDetails===true){ 
                    this.show.productDetails = false;
                    this.show.productEdit = true;
                    this.selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
                    console.log("UnITPRICEE:::::",this.selectedRecords.UnitPrice);
                    console.log("SELECTEDRECORDS:::", JSON.stringify(this.selectedRecords));
                    this.dataWatch=true;
                    this.headerModal = "FILL OPPORTUNITYLINEITEM DETAILS TO SUBMIT";

                }
                else if(this.show.productEdit===true){
                    
                    
                    saveOpportunityLineItem({recordId : this.recordId , recordDetailtoSave: this.detailSubmission});
                    this.show.modalPopup=false;
                       
                }
                
                
            }
        else if(event.target.title == 'Previous')
        {
            if(this.show.productDetails == true)
            {
                this.show.pricebookPopup = true;
                this.headerModal="PRODUCT DETAILS"
                this.show.productEdit= false;
                this.show.productDetails = false;
            }
            if(this.show.productEdit == true)
            {
                this.headerModal="SELECT PRICEBOOK"
                this.show.pricebookPopup =false;
                this.show.productDetails = true;
                this.show.productEdit = false;

            }
        }
        else if(event.target.title == 'Yes')
        {
            deleteData({recordId: this.recordId , prcbookId: this.selectedData })
            .then(data=>{ 
                    this.showData = data;
                    
                    console.log("DELETEDDATA:::", this.showData);
                    this.show.showPricebookChangePopup = false;
                    this.show.pricebookPopup = true;

            })

        }
        else if(event.target.title =='No')
        {
            this.show.showPricebookChangePopup = false;
            this.show.pricebookPopup = true;
        }
        // else if(event.target.title == 'Cancel' || event.target.title == 'Close')
        // {
        //     this.show.modalPopup =false;
        // }
        else if(event.target.name=='Delete'){
         
            // deleteIndex= this.selectedRecords;
            let index = event.target.dataset.index; 
            console.log("INDEXREMOVAL:::", index);       
            // console.log("DELETEINDEX:::", JSON.stringify(deleteIndex));
            // this.deleteIndex.splice(index , 1);
            try{
                let index = this.selectedRecords;
                this.selectedRecords=[];
                index.splice(index,1);
                index.forEach(element=>{ 
                    this.selectedRecords.push(element);
                })
                console.log("BEFOREDELETE::::", JSON.stringify(index));
                console.log("AFTERDELETE::::", JSON.stringify(this.selectedRecords));
            }
            catch(err){ 
                console.log("ERROR:::",err);
            }
            console.log("RECORDAFTERDELETE:::", JSON.stringify(this.selectedRecords));
        }



        
    }
    handleChange(event){ 

        if(this.show.productEdit == true)
        {
            let detailData = this.selectedRecords;
            let index = event.target.dataset.index;
            if(event.target.name=='date'){ 
                detailData[index].Date = event.target.value;
            }
            else if(event.target.name=='Quantity'){
                detailData[index].Quantity = event.target.value;
            }
            else if(event.target.name=='UnitPrice'){
                detailData[index].UnitPrice = event.target.value;
             }
            else if(event.target.name=='Description'){
                detailData[index].Description = event.target.value;
            }
            this.detailSubmission = JSON.stringify(detailData);
            console.log("detaiSUbmission:::", this.detailSubmission);
        }
        
        
    }
    handleCancel(){
        this.show.modalPopup = false;
        this.show.pricebookPopup=false;
        this.show.productDetails=false;
        this.show.productEdit=false;
        this.show.showPricebookChangePopup=false;

    }
    handleSearch(event){ 
        console.log("HANDLESEARCHENTER");
        if(event.target.value!=null){ 
            this.showData = this.visibleData.filter(obj => obj.Name.startsWith(event.target.value))
            console.log("DATATOSHOW:::", this.showData);
            
            console.log("AFTERSEARCHDAT:::", this.visibleData);
            // dataShow.forEach(element=>{ 
            //     this.visibleData.push(element);
            // })
            // console.log("clearSearch::", this.visibleData);
        }
        
    }
    handleCancel2(){ 
        console.log("POPUPCLOSEACTION");
        this.show.pricebookPopup=true;
        this.show.showPricebookChangePopup=false;
        
    }
   
}