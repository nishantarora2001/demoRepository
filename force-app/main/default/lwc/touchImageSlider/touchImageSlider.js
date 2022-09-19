import { LightningElement , track} from 'lwc';
import downloaderImage from '@salesforce/resourceUrl/downloaderImage';
import staticDownloader from '@salesforce/resourceUrl/staticDownloader';



export default class TouchImageSlider extends LightningElement {
  
    slides=[
        {
            image : downloaderImage,
            heading:'caption1',
            descripton:'This is Image1'
        },
        {
            image : staticDownloader,
            heading:'caption2',
            descripton:'This is Image2'
        }
        
    ]

   
}