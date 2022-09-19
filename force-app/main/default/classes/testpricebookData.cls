@istest
public class testpricebookData {
	@testSetup
    static void method(){ 
       	Id pbc = Test.getStandardPricebookId();
    	Pricebook2 pb = new Pricebook2();
        pb.name = 'ankur stalll';
        pb.IsActive=true;
        insert pb;
        System.debug(pb);
        //string prc = pb.Id;
    	Opportunity opp = new Opportunity();
        opp.name = 'newOpportunity';
        opp.StageName='closed won';
        opp.CloseDate=date.today();
       	//opp.Pricebook2Id = pb.Id;
        insert opp;
        System.debug(opp);
        String oppIs = opp.Id;
        list<Product2> proList = new list<Product2>();
        for(Integer i=0; i<3; i++){ 
			Product2 prod = new Product2();
            prod.name='bisquit'+i;
            prod.ProductCode='Bis';
            proList.add(prod);     
        }
        Insert proList;
        System.debug(proList);
        
        list<pricebookEntry> standardpbeList = new list<pricebookEntry>();
        for(product2 pro: proList){ 
        	pricebookEntry pbe1 = new pricebookEntry();
            pbe1.Pricebook2Id = pbc;
            pbe1.Product2Id = pro.Id;
            pbe1.UnitPrice=35;
            pbe1.IsActive=true;
    
            
            
            standardpbeList.add(pbe1);
        }
        Insert standardpbeList;
        System.debug(standardpbeList);
        
        list<pricebookEntry> pbeList = new list<pricebookEntry>();
        for(product2 pro: proList){ 
        	pricebookEntry pbe = new pricebookEntry();
            pbe.Pricebook2Id = pb.Id;
            pbe.Product2Id = pro.Id;
            pbe.UnitPrice=35;
            pbeList.add(pbe);
            pbe.IsActive=true;
        }
        Insert pbeList;
        System.debug(pbeList);
        
        /*list<Product2> productList = new list<Product2>();
        for(Integer i=0; i<3; i++){ 
        	Product2 product1 = new Product2();
            product1.Name='ProductBisquit';
            product1.ProductCode='prodB';
            product1.Family='Bisquit Family';
            productList.add(product1);
        }
        Insert productList;
        
        Pricebook2 prb2 = new Pricebook2();
        prb2.Name = 'Gaurav Dhaba';
        prb2.IsActive = true;
        Insert prb2;
        
        list<PricebookEntry> prbEntryList = new list<PricebookEntry>();
        for(Product2 prd: productList){ 
        	PricebookEntry pbentry = new PricebookEntry();
            pbentry.Pricebook2Id = pbc;
            pbentry.Product2Id = prd.Id;
            pbentry.UnitPrice=45;
            pbentry.IsActive=true;
            prbEntryList.add(pbentry);
        }
        Insert prbEntryList;
        
         list<PricebookEntry> prbEntryList1 = new list<PricebookEntry>();
        for(Product2 prd1 : productList){ 
        	PricebookEntry pbentry1 = new PricebookEntry();
            pbentry1.Pricebook2Id = prb2.Id;
            pbentry1.Product2Id = prd1.Id;
            pbentry1.UnitPrice=45;
            pbentry1.IsActive=true;
            prbEntryList1.add(pbentry1);
        }
        Insert prbEntryList1;
        
        list<OpportunitylineItem> oliList = new list<OpportunitylineItem>();
        for(Product2 productnew : productList){
            for(pricebookEntry pre : prbEntryList1){
            OpportunitylineItem oli = new OpportunitylineItem();
            oli.Product2Id = productnew.Id;
            oli.PricebookEntryId = pre.Id;
            oli.OpportunityId = opp.Id;
            oli.TotalPrice=23434;
            oli.Quantity=365;
            oliList.add(oli);
          }
            
        }
        Insert oliList;*/
        
    }
    @istest
    static void methodMy(){
        Opportunity op = [SELECT Id FROM Opportunity];
    	test.startTest();
        pricebookData.currentData result = pricebookData.pricebookDetailsAndCurrentPricebookProducts(op.Id);
        test.stopTest();
        System.assertEquals(1, result.pricebookOptions.size());
    }
    @istest
    static void methodMy2(){ 
		Opportunity op = [SELECT Id FROM Opportunity];
        Pricebook2 pbook = [SELECT Id FROM Pricebook2 where name = 'ankur stalll'];
        list<pricebookEntry> pbe = [SELECT Name , product2Id, ProductCode , UnitPrice , Pricebook2Id FROM pricebookEntry where pricebook2.isStandard=false];
        test.startTest();
        list<pricebookEntry> pbl = pricebookData.verifyPricebookChange(pbook.Id,op.Id);
        test.stopTest();
        System.assertEquals(pbe.size(), pbl.size());
       
        
    }
    
    
    @istest
    static void methodMy3(){ 
        Opportunity op = [SELECT Id FROM Opportunity where name='newOpportunity'];
    	list<pricebookEntry> prodList = [SELECT Id ,productcode, product2Id ,unitPrice FROM pricebookEntry where product2.name like '%bisquit%' and pricebook2.isStandard=false and pricebook2.name='ankur stalll' ];
        String jsonstring = Json.serialize(prodList); 
        System.debug('JSONSTRING:::'+jsonstring);
        list<wrapper> wrList = new list<wrapper>();
        for(pricebookEntry pe: prodList){ 
        	wrapper wr = new wrapper();
            wr.Quantity = 546;
            wr.Product2Id = pe.Product2Id;
            wr.ProductCode = pe.ProductCode;
            wr.unitPrice = pe.unitPrice;
            wr.serviceDate = Date.today();
            wr.Description = 'THESE ARE PRODUCT';
            wr.Id =pe.Id;
            wrList.add(wr);
            
        }
        System.debug('WRLIST:::'+wrList);
        String wrappJson = json.serialize(wrlist);
        test.startTest();
        pricebookData.saveOpportunityLineItem(op.Id, wrappJson);
        test.stopTest();
    }
    /*@istest
    static void deleteMethod(){ 
    	Opportunity op = [SELECT Id FROM Opportunity where name ='newOpportunity'];
        Pricebook2 pbook = [SELECT Id FROM Pricebook2 where name like '%ankur stalll%'];
        test.startTest();
        pricebookData.deleteData(op.Id, pbook.Id);
        test.stopTest();
    }*/
    public class wrapper{ 
        @AuraEnabled 
        public integer Quantity{get; set;}
        @AuraEnabled
        public String Product2Id{get; set;}
        @AuraEnabled 
        public String ProductCode{get; set;}
        @AuraEnabled
        public decimal unitPrice{get; set;}
        @AuraEnabled
        public Date serviceDate{get; set;}
        @AuraEnabled
        public String Description{get; set;}
        @Auraenabled
        public Id Id{get; set;}
    }
}