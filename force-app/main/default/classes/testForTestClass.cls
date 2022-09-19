public class testForTestClass {
    public static void test(){
        pricebook2 pbc = [select id FROM Pricebook2 where isStandard = true];
        
    	Pricebook2 pb = new Pricebook2();
        pb.name = 'ankur stalll';
        insert pb;
        System.debug(pb);
        string prc = pb.Id;
        Pricebook2 prb2 = new Pricebook2();
        prb2.Name = 'Gaurav Dhaba';
        prb2.IsActive = true;
        Insert prb2;
        System.debug('PRB2:::'+prb2);
        
    	Opportunity opp = new Opportunity();
        opp.name = 'newOpportunity';
        opp.StageName='closed won';
        opp.CloseDate=date.today();
        opp.Pricebook2Id = prb2.Id;
        insert opp;
        System.debug(opp);
        String oppIs = opp.Id;
        list<Product2> proList = new list<Product2>();
        for(Integer i=0; i<3; i++){ 
			Product2 prod = new Product2();
            prod.name='bisquit'+i;
            proList.add(prod);     
        }
        Insert proList;
        System.debug(proList);
        
        list<pricebookEntry> standardpbeList = new list<pricebookEntry>();
        for(product2 pro: proList){ 
        	pricebookEntry pbe1 = new pricebookEntry();
            pbe1.Pricebook2Id = pbc.Id;
            pbe1.Product2Id = pro.Id;
            pbe1.UnitPrice=35;
            standardpbeList.add(pbe1);
        }
        Insert standardpbeList;
        System.debug(standardpbeList);
        
        
        list<Product2> productList = new list<Product2>();
        for(Integer i=0; i<3; i++){ 
        	Product2 product1 = new Product2();
            product1.Name='ProductBisquit';
            product1.ProductCode='prodB';
            product1.Family='Bisquit Family';
            productList.add(product1);
        }
        Insert productList;
        System.debug('PRODUCTLIST2:::'+productList);
        
        
        
        list<PricebookEntry> prbEntryList = new list<PricebookEntry>();
        for(Product2 prd: productList){ 
        	PricebookEntry pbentry = new PricebookEntry();
            pbentry.Pricebook2Id = pbc.Id;
            pbentry.Product2Id = prd.Id;
            pbentry.UnitPrice=45;
            pbentry.IsActive=true;
            prbEntryList.add(pbentry);
        }
        Insert prbEntryList;
        System.debug('PRBENTRYLIST:::'+prbEntryList);
        
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
        System.debug('prbEntryList1:::'+prbEntryList1);
        
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
        Insert oliList;
        System.debug('oliList::'+oliList);
        
        
        
        
        
        
        
        list<pricebookEntry> pbeList = new list<pricebookEntry>();
        for(product2 pro: proList){ 
        	pricebookEntry pbe = new pricebookEntry();
            pbe.Pricebook2Id = prc;
            pbe.Product2Id = pro.Id;
            pbe.UnitPrice=35;
            pbeList.add(pbe);
        }
        Insert pbeList;
        System.debug(pbeList);
      	String Quantity = '50';
        String integerJson = json.serialize(Quantity); 
        System.debug(integerJson);
        
        list<pricebookEntry> prodList = [SELECT Id ,productcode, product2Id ,unitPrice FROM pricebookEntry where product2.name like '%bisquit%' ];
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
        System.debug('WRAPPJASON::'+wrappJson);
        
        

        
        
    }
    
    
    
    
    
    
    
    
    
    
    
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