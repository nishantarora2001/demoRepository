public with sharing class psPdfKitForAccountclass {
    @AuraEnabled 
    public static list<ContentDocument> getAttacmentDetails(string recordName){ 
        list<ContentDocumentLink> doccontList = [SELECT contentDocumentId From ContentDocumentLink where LinkedEntityId=:recordName];
        System.debug(doccontList);
        set<Id> idSet = new set<Id>();
        for(ContentDocumentLink cd :doccontList ){ 
            idSet.add(cd.contentDocumentId);
        }
        list<ContentDocument> contvList= [SELECT Title, FileExtension, OwnerId From ContentDocument where id in:idSet];
        System.debug(contvList);
        return contvList;
    }
    @AuraEnabled 
    public static String versionData(String selectedId){
    ContentVersion contentVrsn = [SELECT  versionData FROM ContentVersion WHERE ContentDocumentId =:selectedId];
    String contents = EncodingUtil.Base64Encode(contentVrsn.VersionData);
    return contents;
 }
}
