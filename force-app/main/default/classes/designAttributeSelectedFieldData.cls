public with sharing class designAttributeSelectedFieldData {
    @AuraEnabled(cacheable=true)
    public static list<sobject> designAttributeSelectedFieldData1(string objectName , string fields) {
        System.debug('OBJECTNAME'+objectName);
        System.debug('Fields::'+fields);   
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.sobjectType objType = schemaMap.get(objectName);
        System.debug('OBJTYPE:::'+objType);
        String Query = 'select '+fields+' from '+objType;
        list<sobject> projectList = Database.query(Query);
        System.debug('PROJECTLIST:::'+projectList);
        return(projectList);
    }



}