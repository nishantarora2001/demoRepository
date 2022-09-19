public class LeadController {

    @AuraEnabled
    public static List<Contact> getAllContactsById(String accountId){
        try {
            return [SELECT Id, FirstName, LastName FROM Contact WHERE AccountId =:accountId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}