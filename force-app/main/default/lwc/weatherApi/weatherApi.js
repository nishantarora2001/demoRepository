import { LightningElement , api , track , wire} from 'lwc';
import weatherApiClass1 from '@salesforce/apex/weatherApiClass.weatherApiClass1';
export default class WeatherApi extends LightningElement {
    @api City;
    @track cityTampreatture;

    connectedCallback(){ 
       console.log("CITYNAME IS:::", this.City);

    }
    getTempreature(){ 
        weatherApiClass1({cityName:'$City'})
        .then(data=>{ 
            this.cityTampreatture = data;
            console.log("CITYTEMPREATURE:::", this.cityTampreatture);
        })
    }

}