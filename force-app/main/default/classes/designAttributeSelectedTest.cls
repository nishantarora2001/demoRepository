@isTest
public class designAttributeSelectedTest {
	@istest
    static void method(){ 
        String objectName = 'Account';
        String fields = 'Name,Phone';
        List<Account> accList = new List<Account>();
        for(Integer i=0; i<5; i++){ 
			Account acc = new Account();
            acc.name='Nishant'+i;
            accList.add(acc);
        }
        insert accList;
    	test.startTest();
        list<sobject> result = designAttributeSelectedFieldData.designAttributeSelectedFieldData1(objectName, fields);
        System.assertEquals(accList.size(), result.size());
        test.stopTest();
      
        
    }
}