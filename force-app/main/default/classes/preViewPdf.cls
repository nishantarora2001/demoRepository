public with sharing class preViewPdf {
    @AuraEnabled(cacheable=true)
        public static list<contentVersion> getRelatedFilesByRecordId(String recordId) {
        //     // Get record file IDs      
        //     string s='0695j000009VOtzAAG';  
        //     List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :s];
        //     set<ID> fileIDs = new set<ID>();
        //     for (ContentDocumentLink docLink : files) {
        //         fileIDs.add(docLink.ContentDocumentId);
        //     }
     
            List<ContentVersion> docs = [SELECT ContentDocumentId, Id , FileExtension, Title 
                FROM ContentVersion where ContentDocumentId=:recordId];
            return docs;
        }
}