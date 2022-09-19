public class TestJSON {
    public static void jsonMethod(){ 
    	 JSONGenerator gen = JSON.createGenerator(true);
        gen.writeStartObject();
        gen.writeFieldName('PolicyTransaction');
        gen.writeStartArray();
        gen.writeStartObject();
        gen.writeStringField('PolicyNumber','S003712566');
        gen.writeStringField('TransactionType','Submission');
        gen.writeStringField('PolicyType','Landlords Insurance');
        gen.writeStringField('PolicyWording','GLD102550 v10/2021');
        gen.writeStringField('PeriodOfCover','2022-05-03 to 2023-05-03');
       	gen.writeNumberField('BasePremium',2210.52);
        gen.writeNumberField('FireServiceLevy',273.32);
        gen.writeNumberField('gst',248.39);
        gen.writeNumberField('StampDuty',245.91);
        gen.writeBooleanField('LandlordsBuilding',true);
        gen.writeBooleanField('Landlords', true);
        gen.writeBooleanField('TenantDefault', true);
        gen.writeBooleanField('LossOfRent', true);
        gen.writeNumberField('BuildingSumInsured',10000);
        gen.writeNumberField('BuildingSumInsured',1000000);
        gen.writeNumberField('AuthorityFeesLimit',100000);
        gen.writeNumberField('MortgageDischargeCosts',5000);
        gen.writeNumberField('StandardContentsSumInsured',60000);
        gen.writeNumberField('AdditionalContentsSumInsured',0);
        gen.writeNumberField('TotalContentsSumInsured',60000);
        gen.writeNumberField('RemovalOfDebrisLimit',6000);
        gen.writeBooleanField('LandlordsFloodCover',true);
        gen.writeNumberField('MaximumWeeklyRent',1600);
        gen.writeStringField('LossOfRentNoOfWeeks','52 weeks');
        gen.writeNumberField('LossOfRentLimit',83200);
        gen.writeStringField('TenantRentDefaultNoOfWeeks','20 weeks');
        gen.writeStringField('TenantRentDefaultLimit','10000');
        gen.writeStringField('TenantRefusalToVacateNoOfWeeks','20 weeks');
        gen.writeNumberField('TenantRefusalToVacateLimit',10000);
        gen.writeNumberField('LegalExpensesLimit',5000);
        gen.writeStringField('LiabilitySumInsured','20000000');
        gen.writeNumberField('LegalLiabilityExcess',0);
        gen.writeStringField('BrokerPolicyReference','00698000002L95LAAS');
        gen.writeStringField('BrokerClientId','00698000002L95LAAS');
        gen.writeStringField('QuoteStatus', 'Accepted');

        
        gen.writeEndObject();
        gen.writeEndArray();
        gen.writeEndObject();
        string JSONTEST = gen.getAsString();
        System.debug('JSONTEST:::'+JSONTEST);
        
       
        String JsonMsg=JSON.serialize(JSONTEST);
        System.debug('JSONMSG:::'+JsonMsg);
    
    }

}