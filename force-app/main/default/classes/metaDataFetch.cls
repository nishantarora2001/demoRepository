public class metaDataFetch {
    public static void fetchMetaData(){ 
    	List<Support_Tier__mdt> spList = [SELECT Default_Discount__c, Minimum_Spending__c FROM  Support_Tier__mdt];
        System.debug(spList);
    }
}