public with sharing class chatterFileUploadClass{

    public Id parentId {get; set;}
    public String baseURL {get; set;}
    public static final String FILE_FEED_TYPE = 'ContentPost';

    public chatterFileUploadClass(){
      parentId = userInfo.getUserId(); //this is dummy account record or any object where you want attach file.
      baseURL = URL.getSalesforceBaseUrl().toExternalForm();
    }

    public PageReference attachFile() {
      
       
        FeedItem feedItem = [SELECT CreatedDate, Id, ParentId, RelatedRecordId, Title, Type FROM FeedItem
                            WHERE Type=:FILE_FEED_TYPE 
                            AND ParentId=:parentId ORDER BY CreatedDate DESC LIMIT 1];
                            return null;

   

      
    }

}