public class classDynamicQuery {
    public static void queryList(){ 
    	user us= [SELECT Id FROM User limit 1];
        System.debug('USER:::'+us);
        
        String userAccountRelationship = User.ContactId.AccountId.getDescribe().getRelationshipName() + '.';
        String userContactRelationship = User.ContactId.getDescribe().getRelationshipName() + '.';
    }

}