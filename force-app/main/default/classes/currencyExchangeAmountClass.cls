public with sharing class currencyExchangeAmountClass {
    @AuraEnabled (cacheable=true)
    public static double currencyExchangeAmountClass1(String recordId) {
        opportunity opp = [SELECT Id , Amount FROM Opportunity where id=:recordId];
        double amnt = opp.Amount;
        return amnt;
    }

    @AuraEnabled (cacheable=true)
    public static object httpRequest(double amount , string currencyselected){ 
        System.debug('Amount::'+amount);
        System.debug('CURRENCYSELECTED::::'+ currencyselected);
        Http http = new Http();
        object curncy;
       
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://v6.exchangerate-api.com/v6/13aa2190f30ada9522768cf6/pair/USD/'+currencyselected+'/1000');
                        req.setMethod('GET');

        HttpResponse resp = http.send(req);
        System.debug(resp);
        System.debug('RESPONSE CODE::'+ resp.getStatusCode());
        if(resp.getStatusCode()==200){ 
        System.debug('BODY:::'+ resp.getbody());
        
        Map<String, object> results = (Map<String , Object>) JSON.deserializeUntyped(resp.getbody());
        System.debug('RESULT:::'+results);
        curncy = results.get('conversion_result');
        System.debug('CURRENCY:::'+curncy);
        
        }
        return curncy;
    }
}