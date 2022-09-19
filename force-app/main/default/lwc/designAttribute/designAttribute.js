import { LightningElement, api } from 'lwc';

 

export default class MigrateDesignAttributeToLWC extends LightningElement {
   @api apiName;
   @api listViewApiName;
   @api itemselected;
  }