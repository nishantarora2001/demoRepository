@RestResource(urlMapping='/Accounts/*')
global with sharing class accountIntegrationSalesforce {
    @HttpGet
    global static list<Account> getaccounts() {
        RestRequest request = RestContext.request;
        // grab the caseId from the end of the URL
        
        list<Account> result =  [SELECT Name,Phone
                        FROM Account
                         LIMIT 10];
        return result;
    }
    @HttpPost
    global static ID createAccount(String Name, string Phone) {
        Account acc = new Account(
            Name=Name,
            Phone=Phone);
        insert acc;
        return acc.Id;
    }   
    @HttpDelete
    global static void deleteCase() {
        RestRequest request = RestContext.request;
        String accountId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        Account acc = [SELECT Id FROM Account WHERE Id = :accountId];
        delete acc;
    }     
    @HttpPut
    global static ID upsertCase(String Name, String Phone,
         String id) {
        Account acc = new Account(
                Id=id,
                Name=Name,
                Phone=Phone);
        // Match case by Id, if present.
        // Otherwise, create new case.
        upsert acc;
        // Return the case ID.
        return acc.Id;
    }
   /* @HttpPatch
    global static ID updateCaseFields() {
        RestRequest request = RestContext.request;
        String caseId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId];
        // Deserialize the JSON string into name-value pairs
        Map<String, Object> params = (Map<String, Object>)JSON.deserializeUntyped(request.requestbody.tostring());
        // Iterate through each parameter field and value
        for(String fieldName : params.keySet()) {
            // Set the field and value on the Case sObject
            thisCase.put(fieldName, params.get(fieldName));
        }
        update thisCase;
        return thisCase.Id;
    }    */

}