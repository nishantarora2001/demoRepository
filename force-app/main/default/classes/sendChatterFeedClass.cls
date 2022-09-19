public with sharing class sendChatterFeedClass {
    @AuraEnabled 
    public static void sendChatterFeed(){
        ConnectApi.FeedItemInput feedItemInput = new ConnectApi.FeedItemInput();
        ConnectApi.TextSegmentInput textSegmentInput = new ConnectApi.TextSegmentInput();
        textSegmentInput.text = 'Thanks for attending my presentation test run this morning. Send me any feedback.'; 
        // The MessageBodyInput object holds the text in the post
        ConnectApi.MessageBodyInput messageBodyInput = new ConnectApi.MessageBodyInput();
        messageBodyInput.messageSegments = new List<ConnectApi.MessageSegmentInput>();
        messageBodyInput.messageSegments.add(textSegmentInput);
        feedItemInput.body = messageBodyInput;
        // The FeedElementCapabilitiesInput object holds the capabilities of the feed item.
        // For this feed item, we define a direct message capability to hold the member(s) and the subject.
        List<String> memberIds = new List<String>();
        memberIds.add('0055j000007HMpWAAW');
        // memberIds.add('0055j000005fFXeAAM');
        ConnectApi.DirectMessageCapabilityInput dmInput = new ConnectApi.DirectMessageCapabilityInput();
        dmInput.subject = 'Thank you!';
        dmInput.membersToAdd = memberIds;
        ConnectApi.FeedElementCapabilitiesInput feedElementCapabilitiesInput = new ConnectApi.FeedElementCapabilitiesInput();
        feedElementCapabilitiesInput.directMessage = dmInput; 
        feedItemInput.capabilities = feedElementCapabilitiesInput;
        //Post the feed item. 
        ConnectApi.FeedElement feedElement = ConnectApi.ChatterFeeds.postFeedElement(Network.getNetworkId(), feedItemInput);
    }
}
