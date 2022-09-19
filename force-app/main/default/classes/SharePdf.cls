public with sharing class SharePdf {
    @AuraEnabled
    public static string SharePdfDoc(string base64 , string recordId, string fileName) {
        ContentVersion ctv = showversion(base64 , fileName);
        contentDocumentLink ctl  = showLink(ctv.Id, recordId);
        
            return ctl.Id;
        
    }
    public static ContentVersion showversion(string base64 , string fileName){ 
        ContentVersion ctv1 = new ContentVersion();
        ctv1.versionData = EncodingUtil.base64Decode(base64);
        ctv1.title=fileName;
        ctv1.PathOnClient = fileName;
        insert ctv1;
        return ctv1;
    }
    public static ContentDocumentLink showLink(string ContentVersionId , string recordId){ 
        
            contentDocumentLink ctl = new contentDocumentLink();
            ctl.ContentDocumentId = [SELECT ContentDocumentId FROM ContentVersion where Id =:ContentVersionId].ContentDocumentId;
            ctl.LinkedEntityId = recordId;
            ctl.ShareType='C';
            insert ctl; 
            return ctl;
        
    }
}