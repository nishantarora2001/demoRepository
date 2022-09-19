public with sharing class PutData {
    @AuraEnabled
    public static void PutData1(Contact newContact , Id acc) {
        newContact.AccountId = acc;
        insert newContact;
        System.debug(newContact);

    }
    