public with sharing class PspdfController {
    @AuraEnabled(cacheable = true)
    public static string getVisualforceOrigin() {
        string visualOrigin = '';
        string baseUrl = URL.getOrgDomainUrl().toExternalForm();
        visualOrigin = baseUrl.split('.my.')[0] + '--c.' + 'visualforce.com';
        return visualOrigin;
    }
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
    public static String versionData(){
        
        ContentVersion contentVrsn = [SELECT  versionData FROM ContentVersion WHERE ContentDocumentId =:'0695j00000AYyf0AAD'];
        String contents = EncodingUtil.Base64Encode(contentVrsn.VersionData);
        return contents;

    }
 
}