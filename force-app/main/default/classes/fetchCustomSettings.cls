public class fetchCustomSettings {
     public static void fetchCustomSettings(){ 
    		list<CountryPhoneCodes__c> phoneList = 	CountryPhoneCodes__c.getall().values();
       		System.debug(phoneList);
    }
}