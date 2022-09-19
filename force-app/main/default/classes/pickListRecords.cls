public with sharing class pickListRecords {
    @AuraEnabled
    public static list<Contact> giveContact(){ 
    	list<Contact> conList = [SELECT Name FROM Contact];
        System.debug(conList);
        return conList;
    }
}