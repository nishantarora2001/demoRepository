@istest
public class testpickListValues {
	@testSetup
    static void method(){ 
    	list<Video_Recommend__c> videoTypeList = new list<Video_Recommend__c>();
        for(integer i=0; i<5; i++){ 
        	Video_Recommend__c vcr = new Video_Recommend__c();
            vcr.Links__c= 'www.janatar.com';
            vcr.Video_Types__c='Hollywood';
            vcr.Name='Scene'+i;
            videoTypeList.add(vcr);
        }
        Insert videoTypeList;
    }
    @istest
    static void mathod2(){ 
    	test.startTest();
        pickListValues.linkTypes result = pickListValues.pickListValues1();
        System.assertEquals(5, result.xyz.size());
        test.stopTest();
    }
}