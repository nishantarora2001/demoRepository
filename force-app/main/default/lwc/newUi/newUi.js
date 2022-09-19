import { LightningElement , track} from 'lwc';
import StaticPic from '@salesforce/resourceUrl/StaticPic';
import StaticPic2 from '@salesforce/resourceUrl/StaticPic2';

export default class NewUi extends LightningElement 
{ 
    @track Image1 = StaticPic;
    @track Image2 = StaticPic2;
}