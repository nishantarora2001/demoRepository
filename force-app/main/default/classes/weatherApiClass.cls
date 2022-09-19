public with sharing class weatherApiClass {
    @AuraEnabled
    public static wrapperclass weatherApiClass1(string cityName) {
        object temp;
        wrapperclass wr = new wrapperclass();
        Http http = new Http();
        list<wrapperclass> wrList = new list<wrapperclass>();
       
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=261fa4cf29040a73cbcc43d17fc9a2d0&units=metric');
        req.setMethod('GET');

        HttpResponse resp = http.send(req);
        System.debug(resp);
        System.debug('RESPONSE CODE::'+ resp.getStatusCode());
        if(resp.getStatusCode()==200){ 
            
        System.debug('BODY:::'+ resp.getbody());
        Map<String, object> results = (Map<String , Object>) JSON.deserializeUntyped(resp.getbody());
        System.debug('RESULT:::'+results);
        map<string , object> tempreature =(Map<String , Object>) results.get('main');
        System.debug('TEMPREATURE:::'+tempreature.get('temp'));
        // temp = tempreature.get('temp');
        // System.debug('TEMP::::'+temp);
        wr.tempreature = tempreature.get('temp');
        wr.pressure = tempreature.get('pressure');
        wr.humidity = tempreature.get('humidity');
        
        
        
   
   
}
return wr;

}

    public class wrapperclass{ 
        @AuraEnabled 
        public object tempreature;
        @AuraEnabled 
        public object pressure;
        @AuraEnabled 
        public object humidity;

    }
}