import { LightningElement , api , track , wire} from 'lwc';
import weatherApiClass1 from '@salesforce/apex/weatherApiClass.weatherApiClass1';
export default class WeatherApi extends LightningElement {
    @track City;
    @track data;
    temp;
    pressure;
    @track isShowable;
   handleCity(event){ 
        this.City = event.target.value;
        console.log("CITYNAME:::", this.City);
   }
   handleTempreature(){ 
    weatherApiClass1({cityName: this.City})
        .then(data=>{ 
            this.data=data;
            console.log("DATA::::", this.data);
            this.isShowable = true;
            // console.log("TEMPREATURE:::", JSON.stringify(this.data[0]['tempreature']));
            // this.temp =this.data.tempreature;
            // console.log("Pressure:::", JSON.stringify(this.data[0]['pressure']));
            // this.pressure =this.data[0]['pressure'];
        })
            
   }

}