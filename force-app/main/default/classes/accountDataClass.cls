public with sharing class accountDataClass {
    @AuraEnabled
    public static list<Account> accountData() {
        list<Account> accountList = [SELECT Name, Phone, AccountNumber FROM Account LIMIT 10];
        return accountList;
    }
}
