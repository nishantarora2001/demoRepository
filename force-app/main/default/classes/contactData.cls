public class contactData {
    public static list<String> contactData(){ 
    	Contact con = [SELECT FirstName , LastName , Phone FROM Contact LIMIT 1];
       list<String> strList = new list<String>();
       strlist.add(con.FirstName);
       strList.add(con.LastName);
       strlist.add(con.Phone);
        System.debug(strList);
       return strList;
    }
}