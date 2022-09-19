public with sharing class dargAndDropDataClass {
    @AuraEnabled 
    public static list<String> dargAndDropDataClass1(Integer inputValue) {
        Contact con = [SELECT FirstName,LastName ,  Phone FROM Contact where LastName = 'kumar'];
        System.debug(con);
        list<String> strlist1 = new list<String>();
        String s = con.FirstName;
        strlist1.add(s);
        String s1 = con.LastName;
        strlist1.add(s1);
        String s2 = con.Phone;
        strlist1.add(s2);
        System.debug(strlist1);
        list<String> dragDropData = new list<String>();
        for(Integer i=0; i<inputValue; i++){ 
            String data = strlist1.get(i);
            dragDropData.add(data);
        }
        return dragDropData;
        
       
       
    }
}