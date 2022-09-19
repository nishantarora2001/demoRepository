public with sharing class TakeRecords {
   
    @AuraEnabled(cacheable=true)
    public static void TakeRecords1(Account acc) {
        //sytem.debug('acc'+acc);
        insert acc;
        

    }
}