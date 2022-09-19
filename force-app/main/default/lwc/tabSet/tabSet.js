import { LightningElement , track , api } from 'lwc';
import InsertData1 from '@salesforce/apex/InsertData.InsertData1';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNTNUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';
import NUMBEROFEMPLOYEE_FIELD from '@salesforce/schema/Account.NumberOfEmployees';
import SHIPPINGCITY_FIELD from '@salesforce/schema/Account.ShippingCity';
import SHIPPINGCOUNTRY_FIELD from '@salesforce/schema/Account.ShippingCountry';
import SHIPPINGSTATE_FIELD from '@salesforce/schema/Order.ShippingState';
// import SHIPPINGSTREET_FIELD from '@salesforce/schema/Account.ShippingStreet';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD1 from '@salesforce/schema/Account.Phone';
// import ShippingCountry from '@salesforce/schema/Account.ShippingCountry';
export default class TabSet extends LightningElement {
    @api recordId;
    
    @api colRecord=[];
    @track colRecord2 =[];
     @track colRecord3 = [];
    // @track disableKey =true;
    @track event2;
    @track event1;
    @track event3;
    @track event;
    // @track event2;
    // @track event3;
    @track eventholder='1';

    rec ={ 
        FirstName  : FIRSTNAME_FIELD,
        LastName :LASTNAME_FIELD,
        Phone : PHONE_FIELD,
        Email : EMAIL_FIELD,

    }
    rec1 ={ 
        Name : NAME_FIELD,
        AccountNumber : ACCOUNTNUMBER_FIELD,
        NumberOfEmployee : NUMBEROFEMPLOYEE_FIELD,
        Phone : PHONE_FIELD1

    }
    rec2 ={ 
        ShippingCity: SHIPPINGCITY_FIELD,
        ShippingCountry: SHIPPINGCOUNTRY_FIELD,
        ShippingState: SHIPPINGSTATE_FIELD,
        // ShippingStreet: SHIPPINGSTREET_FIELD
    }
    handleEvent(event)
    {
        if(event.target.value!='')
        { 
            this.event1=true;
        
        if(event.target.label == 'FirstName')
        {
            this.rec.FirstName = event.target.value;
            console.log(this.rec.FirstName);
        }
        if(event.target.label=='LastName')
        {
            this.rec.LastName = event.target.value;
            console.log(this.rec.LastName);
        }
        
        if(event.target.label =='Phone')
        {
            this.rec.Phone =event.target.value;
            console.log(this.rec.Phone);
        }
        
        if(event.target.label =='Email')
        {
            this.rec.Email =event.target.value;
            console.log(this.rec.Email);
        }

    }
    else{ 
        this.event1= false;
    }

}
    
   
    handleStore(){ 
        console.log(this.rec);
        if(this.event1==true){ 
            
        this.colRecord = this.rec;
        console.log(JSON.stringify(this.colRecord));
        alert("Record Insert");
        
        }
        else{ 
            alert("Fill the Fields First");
        }
        
        
       
        
    }
    handleEvent2(event){ 
        if(event.target.value!=''){ 
            this.event2=true;
            if(event.target.label == 'Name')
        {
            this.rec1.Name = event.target.value;
            console.log(this.rec1.Name);
        }
        if(event.target.label=='AccountNumber')
        {
            this.rec1.AccountNumber = event.target.value;
            console.log(this.rec1.AccountNumber);
        }
        
        if(event.target.label =='Phone')
        {
            this.rec1.Phone =event.target.value;
            console.log(this.rec1.Phone);
        }
        
        if(event.target.label =='NumberOfEmployee')
        {
            this.rec1.NumberOfEmployee =event.target.value;
            console.log(this.rec1.NumberOfEmployee);
        }
        }
        else{ 
            this.event2=false;
        }

        
    }
    handleStore2(){ 
        console.log(this.rec1);
        if(this.event2==true){
            
        this.colRecord2 = this.rec1;
        console.log(JSON.stringify(this.colRecord2));
        alert("Record Saved");
        }
        else{ 
            alert("Empty Fields Can't procede");
        }
    }
    handleEvent3(event){ 
        if(event.target.value!=''){ 
            this.event3=true;
            if(event.target.label == 'ShippingCity')
        {
            this.rec2.ShippingCity = event.target.value;
            console.log(this.rec2.ShippingCity);
        }
        if(event.target.label=='ShippingCountry')
        {
            this.rec2.ShippingCountry = event.target.value;
            console.log(this.rec2.ShippingCountry);
        }
        
        if(event.target.label =='ShippingState')
        {
            this.rec2.ShippingState =event.target.value;
            console.log(this.rec2.ShippingState);
        }
        
        // if(event.target.label =='ShhippingStreet')
        // {
        //     this.rec2.ShippingStreet =event.target.value;
        //     console.log(this.rec2.ShippingStreet);
        // }
        }
        else{ 
            this.event3=false;
        }

        
    }
    handleStore3(){ 
        console.log(this.rec2);
        if(this.event3==true){ 
            this.colRecord3 = this.rec2;
            console.log(JSON.stringify(this.colRecord3));
            alert("Record Saved");
        }
        else{ 
            alert("fill the after fields");
        }
    }
    
    handleclicksave(){
        InsertData1({newContact : this.colRecord, newAccount : this.colRecord2, sc:this.colRecord3.ShippingCity,
                            sc1:this.colRecord3.ShippingCountry, sc2:this.colRecord3.ShippingState})
        .then(result=>{
            this.message = result;
            this.colRecord ={};
            this.colRecord2 ={};
            // this.colRecord3={};

            
        })
    }
    handleContactDetails(){ 
        if(this.colRecord.length == 0){ 
            this.template.querySelector('lightning-tabSet').activeTabValue='1';
            
            alert("Fill The Contact Details First");
        
        }
        else{ 
            this.template.querySelector('lightning-tabSet').activeTabValue='2';
            this.event=true;
            this.eventholder='2';
        }
    }
    handleAccountDetails(){ 
        if(this.colRecord2.length == 0){ 
            this.template.querySelector('lightning-tabSet').activeTabValue='2';
            
            alert("Fill The Account Details First");
        }
        else{ 
            this.template.querySelector('lightning-tabSet').activeTabValue='3';
            this.eventholder='3';

        }
    }
    handleAddressDetails(){ 
        if(this.colRecord3.length == 0){ 
            this.template.querySelector('lightning-tabSet').activeTabValue='3';
            
            alert("Fill The Address Details First");
        }
        else{ 
            this.template.querySelector('lightning-tabSet').activeTabValue='4';
            this.eventholder='4';
        }
    }
    
    
    handleclick(event){ 
        if(event.target.value>1){ 
            this.handleContactDetails();

        }
        if(event.target.value>2){ 
            this.handleContactDetails();
            this.handleAccountDetails();
        }
        if(event.target.value>3){ 
            this.handleContactDetails();
            this.handleAccountDetails();
            this.handleAddressDetails();
        }
        
    } 
    
    
    goNext(){
        
        this.handleContactDetails();
      }
    goNext2(){ 
        this.handleAccountDetails();
    }
    goNext3(){ 
        this.handleAddressDetails();
    }
    goBack(){
        
        this.template.querySelector('lightning-tabSet').activeTabValue='1';
        
        
      }
      goBack1(){
        
        this.template.querySelector('lightning-tabSet').activeTabValue='2';
        
        
      }
      goBack3(){
        
        this.template.querySelector('lightning-tabSet').activeTabValue='3';
        
        
      }

      handleReset(){
       
            
            this.template.querySelector('lightning-tabSet').activeTabValue='1';
                this.colRecord='';
                this.colRecord2='';
                this.colRecord3='';
            const inputFields = this.template.querySelectorAll(
                'lightning-input'
            );
            if (inputFields) {
                inputFields.forEach(element=> {
                    element.value='';
                
                   
                });
               
            }

           
                    
                
            
         
    }

    

    

}