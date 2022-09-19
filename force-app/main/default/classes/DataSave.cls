public with sharing class DataSave {
    @AuraEnabled
    
    public static List<Contact> DataSave1(Contact newContact , Id acc) {
        
        newContact.AccountId=acc;    
        System.debug(newContact);
        insert newContact;
        return [SELECT Id , firstName , lastName , Email, Phone FROM Contact WHERE AccountId=:acc];
        
    }
    @AuraEnabled
    
    public static List<Contact> DataSave2( Id acc) {
        
        List<Contact> conList =[SELECT Id , firstName , lastName , Email, Phone FROM Contact WHERE AccountId=:acc];
        return conList;
    }
    
    
    
}