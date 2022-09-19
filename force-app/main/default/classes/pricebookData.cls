public with sharing class pricebookData {
    public class My1Exception extends Exception {} 

    @AuraEnabled
    public static currentData pricebookDetailsAndCurrentPricebookProducts(string recordId) {
        
        
        opportunity currentPricebook = [SELECT Pricebook2Id FROM opportunity where Id=:recordId];
        

       list<wrapper> wrList = new list<wrapper>();
       list<priceBook2> pb = [SELECT Id, Name FROM priceBook2];
       for(priceBook2 p : pb){ 
           wrapper wr = new wrapper();
           wr.label=p.Name;
           wr.value=p.Id;
           wrList.add(wr);
       }
      

       currentData feedData = new currentData();
       feedData.currentPricebookId = currentPricebook.Pricebook2Id;
       feedData.currentPricebookProducts = getProducts(currentPricebook.pricebook2Id);
       feedData.pricebookOptions = wrList;

       return feedData;
    }
    
    @AuraEnabled 
    public static list<pricebookEntry> verifyPricebookChange(string pricebookId , string recordId){
        opportunity oppt = [SELECT pricebook2Id from Opportunity where Id=:recordId];
        if(oppt.pricebook2Id == null){ 
            oppt.pricebook2Id = pricebookId;
            update oppt;
            return getProducts(oppt.pricebook2Id);

        }
        else if(oppt.pricebook2Id == pricebookId){
            return getProducts(pricebookId);
        }
        else{ 
            return deleteData(pricebookId,recordId);  
            //throw new My1Exception('First exception'); 
            
        }
        

    }
    @AuraEnabled 
    public static list<pricebookEntry> getProducts(string pricbookId){ 
        list<pricebookEntry> pbe = [SELECT Name , product2Id, ProductCode , UnitPrice , Pricebook2Id FROM pricebookEntry WHERE Pricebook2Id=:pricbookId];
    return pbe;
    }

    @AuraEnabled 
    public static list<pricebookEntry> deleteData(string recordId , string prcbookId){ 
        list<opportunitylineItem> opl = [SELECT Id,PricebookEntryId, opportunityId, product2Id FROM opportunitylineItem where opportunityId=:recordId];
        database.delete(opl);
        opportunity opt = new opportunity();
        opt.Id= recordId;
        opt.pricebook2Id = prcbookId;
        update opt;
        return getProducts(prcbookId);

    }

    public class currentData
    {
        @AuraEnabled
        public String currentPricebookId;
        @AuraEnabled
        public List<PricebookEntry> currentPricebookProducts;
        @AuraEnabled
        public List<wrapper> pricebookOptions;
    }

    public class wrapper{ 
        @AuraEnabled
        public string label{get; set;}
        @AuraEnabled
        public string value{get; set;}


    }
    @AuraEnabled
    public static void saveOpportunityLineItem(string recordId ,  String recordDetailtoSave){
        list<wrapData> wrapList = (List<wrapData>)System.JSON.deserialize(recordDetailtoSave, List<wrapData>.class);
        // PricebookEntry pbe = [SELECT Id FROM pricebookEntry where pricebook2Id =:pricebookId limit 1];
        for(wrapData wr : wrapList){ 

            // PricebookEntry pbe = [SELECT Id FROM pricebookEntry where pricebook2Id =:wr.pricebook2Id limit 1];
            opportunitylineItem oli = new opportunitylineItem();
            //oli.Name = wr.Name;
            oli.Quantity = wr.Quantity;
            oli.ServiceDate = wr.ServiceDate;
            oli.PricebookEntryId = wr.Id;
            oli.Description = wr.Description;
            
            //oli.Description = Description;
            oli.UnitPrice = wr.UnitPrice;
            oli.opportunityId = recordId;
            insert oli;
        }
        // pricebookEntry pbe = [SELECT Id FROM PricebookEntry where pricebook2Id=:pricebookId LIMIT 1];
        // opportunitylineItem opl = new opportunitylineItem();
        // opl.opportunityId = recordId;
        // //opl.PricebookEntryId = pbe.Id;
        // //opl.pricebook2Id = pricebookId;
        // opl.Quantity = quantity;
        // opl.ServiceDate = date1;
        // opl.Description = description;
        // opl.unitPrice = unitPrice;
        // insert opl;
    } 
    public class wrapData{ 
        @AuraEnabled 
        public integer Quantity{get; set;}
        @AuraEnabled 
        public Date ServiceDate{get; set;}
        @AuraEnabled 
        public string Description{get; set;}
        @AuraEnabled 
        public decimal UnitPrice{get; set;}
        @AuraEnabled 
        public Id opportunityId{get; set;}
        @AuraEnabled 
        public Id Id{get; set;}
        @AuraEnabled 
        public Id pricebook2Id{get; set;} 
        @AuraEnabled 
        public Id product2Id{get; set;}
    }    
}