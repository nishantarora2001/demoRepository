import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigationExampleLWC extends NavigationMixin(LightningElement) {
    @api recordId;
    // Navigate to New Account Page
   
    // Navigate to View Account Page
    
    // Navigate to Edit Account Page
    navigateToEditContactPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectpage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Contact',
                actionName: 'edit'
            },
        });
    }
    // Navigation to Account List view(recent)
    
    // Navigation to Contact related list of account
    
    //Navigate to home page
    
    // Navigation to contant object home page
    
    //Navigate to chatter
    
    //Navigate to Reports
    
    //Navigate to Files home
    
    // Navigation to Custom Tab
    
}