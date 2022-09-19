public with sharing class InsertData {
    @AuraEnabled
    public static void InsertData1(Account newAccount , Contact newContact, string sc , string sc1, string sc2) {
        newAccount.shippingCity=sc;
        newAccount.shippingCountry=sc1;
        newAccount.shippingstate = sc2;
        
        insert newAccount;
        string accId = newAccount.Id;
        newContact.AccountId=accId;
        Insert newContact;
    }
}