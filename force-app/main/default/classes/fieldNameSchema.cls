public class fieldNameSchema {
    public static void method(){ 
        /*List<String> stList = new List<String>();
        String a = 'FirstName';
        stList.add(a);
        String b = 'LastName';
        StList.add(b);
        System.debug('STRLIST::'+stList);
        
        String objectName = 'Contact';
    	List<Schema.SObjectField> sobjectField = new List<Schema.SObjectField>();
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.sobjectType objType = schemaMap.get(objectName);
        System.debug('OBJTYPE:::'+objType);
        
        Schema.DescribeSObjectResult objResult = objType.getDescribe();
        Map<String, Schema.SObjectField> fieldMap = objResult.fields.getMap();
        List<String> names = new List<String>();
        System.debug('FIEDLMAP:::'+fieldMap);
        for(String  field : stList){ 
            System.debug('FIELD::'+field);
            Schema.SObjectField sch = fieldMap.get(field);
            System.debug('SCH::'+sch);
            sobjectField.add(sch);
            
        }
        for(Schema.SObjectField sobjf : sobjectField ){
            String label = sobjf.getDescribe().getlabel();
            string value = sobjf.getDescribe().getName();
            System.debug('LABEL:::'+label);
            System.debug('VALUE::'+value);
        }
        for(String fieldName : fieldMap.keyset()){ 
            for(String s: stList){ 
                if(fieldName == s){ 
                	System.debug('Nishant Arora');
                }
                else{ 
                	System.debug('Arora Nishant');
                }
            }
        }
        */
        /*string stList = 'FirstName,LastName';
        string sobjectName = 'Contact';
        String Query = 'select '+stList+' from '+sobjectName;
        System.debug(Database.query(Query));*/
        String objectName = 'Contact';
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.sobjectType objType = schemaMap.get(objectName);
        System.debug('OBJTYPE:::'+objType);
        string stList = 'FirstName,LastName';
        string sobjectName = 'Contact';
        String Query = 'select '+stList+' from '+objType;
        System.debug(Database.query(Query));
        
    }
}