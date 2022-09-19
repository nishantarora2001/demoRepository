public with sharing class getContactForWire {
    @AuraEnabled(cacheable=true)
    public static list<contact> contactList() { 
        list<contact> contactList = [SELECT Name FROM Contact];
        return contactList;
        
    }
    @AuraEnabled
    public static list<Account> accountList() { 
        list<Account> accountList = [SELECT Name FROM Account];
        return accountList;
        
    }
}
