public with sharing class QueryBuilderLightning {
    @AuraEnabled
    public static List<String> getObjectName(){
        List<String> objects=new List<String>();
        List<Schema.SObjectType> objMap= Schema.getGlobalDescribe().values();
        for(SObjectType s: objMap){
            if(s.getDescribe().getName()=='Account' || s.getDescribe().getName()=='Contact'){ 
                objects.add(s.getDescribe().getName());
            }
            
        }
        system.debug(objects);
        return objects;
    }
    @AuraEnabled
    public static List<String> takeFields(String ObjectName){
        List<String> names = new List<String>();
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Map<String, Schema.SObjectField> fieldMap = schemaMap.get(ObjectName).getDescribe().fields.getMap();
        for(String fieldName : fieldMap.keyset() )
        {
           
         
            names.add(String.valueof(fieldName));
        }
        System.debug(names);
        return names;
        
        
        
    }
    @AuraEnabled
    public static dataController getFieldData(List<String> selectedFields , string objectName){ 
        System.debug(selectedFields);
        System.debug(objectName);
        List<wrapperClass> wrpList = new List<wrapperClass>();
        List<labelValue> pickListWrapperList = new List<labelValue>();
        dataController dc = new dataController();
        
        List<Schema.SObjectField> sobjectField = new List<Schema.SObjectField>();
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.sobjectType objType = schemaMap.get(objectName);
        Schema.DescribeSObjectResult objResult = objType.getDescribe();

        Map<String, Schema.SObjectField> fieldMap = objResult.fields.getMap();
        for(String  field : selectedFields){ 
            System.debug('FIELD::'+field);
            Schema.SObjectField sch = fieldMap.get(field);
            System.debug('SCH::'+sch);
            sobjectField.add(sch);
        }
        System.debug(sobjectField);
        for(Schema.SObjectField sobjf : sobjectField ){
            String apiName1 = sobjf.getDescribe().getName();
            Schema.DescribeFieldResult dfr = fieldMap.get(apiName1).getDescribe();
           
            
            
             
            wrapperClass wr = new wrapperClass();
            Schema.DescribeFieldResult F = sobjf.getDescribe();
            wr.bool = !(f.isNillable());
            wr.DataType  = String.valueOf(sobjf.getDescribe().getType());
            System.debug(wr.DataType);
            wr.label = sobjf.getDescribe().getlabel();
            wr.apiName = sobjf.getDescribe().getName();
            
            
       		if(wr.DataType=='PICKLIST'){
                List<Schema.PicklistEntry> ple = dfr.getPicklistValues();
                List<labelValue> pickListEntryValue = new List<labelValue>();
                for( Schema.PicklistEntry pickListVal : ple){ 
                	labelValue pickList = new labelValue();
                    pickList.value = pickListVal.getValue();
                    pickList.label  = pickListVal.getLabel();
                    pickListEntryValue.add(pickList);
                    System.debug('Nishant Khanna::'+pickListEntryValue);
                }
                wr.picklists=pickListEntryValue;
                
            }
            wrpList.add(wr);
            System.debug(wrpList); 
            
            
        } 
        dc.wrapFields=wrpList;
        System.debug(dc);
        return dc;
    }
    
    
   
    public class wrapperClass{  
       @AuraEnabled
        public string label {get; set;}
         @AuraEnabled
        public string apiName {get; set;}
         @AuraEnabled
        public string DataType{get; set;}
        @AuraEnabled
        public boolean bool{get; set;}
        @AuraEnabled
        public List<labelValue> picklists;
        
       
        
    }
    public class labelValue{ 
    	@AuraEnabled
        public String label {get; set;}
        @AuraEnabled
        public String value {get ; set;}
    }
    
   
   
    
    public class dataController{ 
    	@AuraEnabled
        public List<wrapperClass> wrapFields;
        
        
    } 
    
    @AuraEnabled
    public static void saveRecord(string customObjectName, String fieldMap){ 
    	
    System.debug('OBJECTNAME'+customObjectName);
        System.debug('FIELDDETAILS::'+fieldMap);
        sObject sObj = Schema.getGlobalDescribe().get(customObjectName).newSObject();
        if(fieldMap!=null && customObjectName!=null){ 
        	List<JSON2Apex> jsonStringList = (List<JSON2Apex>)System.JSON.deserialize(fieldMap, List<JSON2Apex>.class);
            System.debug('jsonStringList:::::'+jsonStringList);
             for(JSON2Apex newList : jsonStringList)
                {
                    System.debug('NEWLIST LABEL:::'+newList.apiName);
                    sObj.put(newList.apiName , newList.value);
                    
                }
            	System.debug(sObj);
            try{
            insert sobj;
            }
            catch(exception ex){ 
            	System.debug(ex.getLineNumber());
                System.debug(ex.getMessage());
            }
        }
        
    }
    
    public class JSON2Apex {
            @AuraEnabled
            public String apiName;
            @AuraEnabled
            public String value;
        }
    
    
}