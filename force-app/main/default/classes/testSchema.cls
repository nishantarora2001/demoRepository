@istest
public class testSchema {
	@testSetup
    private static void setup(){ 
    	List<Video_Recommend__c> recomndList = new list<Video_Recommend__c>();
        for(Integer i=0; i<7; i++){ 
        	Video_Recommend__c rec = new Video_Recommend__c();
            rec.Video_Types__c = 'HollyWood';
            rec.Links__c='https//www.priyadarshni.com';
            rec.Name='Scene33'+i;
            recomndList.add(rec);
        }
        insert recomndList;
        System.debug('RECOMMENDLIST:::'+recomndList);
	}
    @istest
    private static void method1(){ 
    	test.startTest();
        pickListValues.linkTypes show = pickListValues.pickListValues1();
        test.stopTest();
        System.debug('SHOWLENGTH:::'+(show.xyz).size());
        System.assertEquals(7,(show.xyz).size() );
    }
}