public with sharing class getAllObjectsFromOrg {
    @AuraEnabled 
    public static list<labelAndValue> getAllObjectsFromOrg1() {
        list<labelAndValue> labelValueList = new list<labelAndValue>();
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
       // Set<String> standardObjects = new Set<String>();
        list<String> orgObjects = new list<String>();
        for(Schema.SObjectType d : gd.values())
        {
            
            Schema.DescribeSObjectResult ds = d.getDescribe();
            
            labelAndValue lb = new labelAndValue();
            if(ds.isQueryable()){
                lb.label = ds.getLabel();
                lb.value = ds.getName();
                labelValueList.add(lb);
            }
            
            
        }
        System.debug('STAN OBJ:::'+labelValueList);
        return labelValueList;
        //System.debug('cust OBJ:::'+customObjects );
        
    }
    @AuraEnabled
    public static list<labelAndValue> getAllRelatedFields( String objectSelected){ 
        list<labelAndValue> labelValueListForFields = new list<labelAndValue>();
        Schema.SObjectType targetType = Schema.getGlobalDescribe().get(objectSelected);
        Map<String, Schema.SObjectField> fieldMap = targetType.getDescribe().fields.getMap();
        for (Schema.SObjectField field : fieldMap.values()) {
            labelAndValue lbValue = new labelAndValue();
            lbValue.label = field.getDescribe().getLabel();
            lbValue.value = field.getDescribe().getName();
            labelValueListForFields.add(lbValue);
        }
        return labelValueListForFields;
    }
    @AuraEnabled
    public static list<Sobject> getDataOfRelatedFields(list<String> fieldsSelected , String objectSelected){ 
        System.debug('FIELDSELECTED:::'+ fieldsSelected);
        String qr = 'SELECT Id';
        for(String str : fieldsSelected){ 
        	qr += ', '+str;
        }
        qr += ' FROM '+objectSelected;
        System.debug('QUERY::'+qr);
        return Database.query(qr);
        
    }


    public class labelAndValue{ 
        @AuraEnabled
        public string label{get; set;}
        @AuraEnabled
        public string value{get; set;}
    }
    
}
