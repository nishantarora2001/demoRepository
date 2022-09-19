import {
    LightningElement,
    track,
  } from "lwc";
  
  export default class App extends LightningElement {
    @track data = [];
    ContactFirstName;
    ContactLastName;
    ContactEmail;
    ContactPhone;

    key = 0;
  
    connectedCallback() {
      this.data = [{
        id: 0,
        FirstName: "",
        LastName: "",
        Phone: "",
        Email:""
      }];
    }
  
    handleChange(event) {
      this[event.target.name] = event.target.value;
    }
   
    // add row
    handleAdd() {
      this.saveRecord();
      this.data = [this.data, {
        id: this.key + 1,
        FirstName: "",
        LastName: "",
        Email: "",
        Phone:""
      }];
    }
  
    // save data in an array
    saveRecord() {
      if (this.data.length>= 2) {
        this.data = [{
          id: 0,
          Firstname: this.ContactFirstName,
          Email: this.ContactEmail,
          LastName: this.ContactLastName,
          Phone:this.ContactPhone
        }];
      } else {
        this.key++;
        this.data.splice(this.data.length - 1, 1);
        this.data = [
          this.data,
          {
            id: this.key,
            FirstName: this.ContactFirstName,
            LastName: this.ContactLastName,
            Phone: this.ContactPhone,
            Email:this.ContactEmail
          }
        ];
      }
    }
  
    // delete row
    handleRemove(event) {
      this.data = this.data.filter(val => {
        return parseInt(val.id) !== parseInt(event.target.accessKey)
      });
    }
  
    // Saving last row data and Commiting to database
    handleSubmit() {
      this.data[this.data.length - 1].FirstName = this.ContactFirstName;
      this.data[this.data.length - 1].LastName = this.ContactLastName;
      this.data[this.data.length - 1].Email = this.ContactEmail;
      this.data[this.data.length - 1].Phone = this.ContactPhone;
    
  
      // TODO -- save records to database
    }
  }