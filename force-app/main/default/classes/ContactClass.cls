public with sharing class ContactClass {
    @AuraEnabled
    
    public static void DataSave1(Contact newContact , Id acc) {
        try{
           
        newContact.AccountId=acc;    
        System.debug(newContact);
            insert newContact;
        }
        catch(exception ex)
        {
            System.debug(ex.getmessage());
        }
    }
    @AuraEnabled
    public static List<Contact> getContact(string recordID){
        try {
            List<Contact> conList = [SELECT Id , firstName , lastName , Email, Phone FROM Contact where AccountId =:recordId];
            return conList;

            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}