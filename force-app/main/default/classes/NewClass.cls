public with sharing class NewClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> NewClass1() {
        List<Account> accountList = [SELECT Id, Name FROM Account];
        return accountList;

    }

   
}