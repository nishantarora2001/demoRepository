public with sharing class pickListValues{
    @AuraEnabled
    public static linkTypes pickListValues1() {
        
       

        list<Video_Recommend__c> videoTypeList = [SELECT Links__c,Video_Types__c ,Name FROM Video_Recommend__c];
      
        List<labelValue> pickListEntryValue = new List<labelValue>();
        
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.SObjectType objType = schemaMap.get('Video_Recommend__c');
       
        System.debug('OBJTYPE::'+objType);
        
        Schema.DescribeSObjectResult objResult = objType.getDescribe();
        
        Map<String, Schema.SObjectField> fieldMap = objResult.fields.getMap();
        Schema.SObjectField sch = fieldMap.get('Video_Types__c');
        System.debug('SCH::'+sch);
        String apiName1 = sch.getDescribe().getName();
        Schema.DescribeFieldResult dfr = fieldMap.get(apiName1).getDescribe();
        String DataType  = String.valueOf(sch.getDescribe().getType());
        System.debug('DATATYPE==>'+DataType);

            List<Schema.PicklistEntry> ple = dfr.getPicklistValues();
            for( Schema.PicklistEntry pickListVal : ple){ 
                	labelValue pickList = new labelValue();
                    
                    pickList.label  = pickListVal.getLabel();
                	pickList.value = pickListVal.getValue();	
                    pickListEntryValue.add(pickList);
                    
                }
        linkTypes lt = new linkTypes();   
        lt.xyz=videoTypeList;
        lt.linktoShow=pickListEntryValue;
        System.debug('LINKTOSHOW::'+lt);
        
        return lt;
        
    }
    
    public class labelValue{ 
    	@AuraEnabled
        public String label{get; set;}
        @AuraEnabled
        public String value{get; set;}
        
        
    }
   

    

    public class linkTypes{ 
        @AuraEnabled

        public List< Video_Recommend__c> xyz{get; set;}
        @AuraEnabled
        public list<labelValue> linktoShow{get; set;}


    }
   
 
    
}