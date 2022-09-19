import { LightningElement } from 'lwc';
import sendChatterFeed from '@salesforce/apex/sendChatterFeedClass.sendChatterFeed'
export default class ChatterFeedComponent extends LightningElement {
    sendMessage(){ 
        sendChatterFeed()
        console.log('MESSAGE SENT');
    }
}