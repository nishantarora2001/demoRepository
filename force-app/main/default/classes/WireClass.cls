public class WireClass {
    @AuraEnabled(cacheable=True)
    public static Account getAccount()
    {
        Account acc= [SELECT Id, Name FROM Account];
        return acc;
    }

}