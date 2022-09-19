public with sharing class AccountCreationController {
    public AccountCreationController() {

    }
    @AuraEnabled
    public static Account createAccount(Account accountRecobj){
        try {
            insert accountRecobj;
            return accountRecobj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static list<Account> createAccounts(List<Account> accList){
        
            insert accList;
            return accList;
        
    }
}