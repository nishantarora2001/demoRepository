global with sharing class designAttributeDataClass extends VisualEditor.DynamicPickList{
    // @AuraEnabled 
    // public static list<wrappField> designAttributeDataClass1(){ 
    // 	List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();
    //     list<WrappField> wrList = new list<wrappField>();
	// 	List<String> strList = new List<String>();        
    //     for(SObjectType s: gd){
    //         if(s.getDescribe().getName()=='Account' || s.getDescribe().getName()=='Contact'){ 
    //             wrappField wr = new wrappField();
    //             wr.label = s.getDescribe().getLabel();
    //             wr.value = s.getDescribe().getName();
    //             wrList.add(wr);
    //             System.debug('WRLIST:::'+wrList);
    //         }
            
    //     }
    //     System.debug('STRLIST:::'+strList);
    //     return wrList;
        
    
    // }
  
    // public class wrappField{ 
    // 	@AuraEnabled 
    //     public String label;
    //     @AuraEnabled 
    //     public String value; 
    // }
    @AuraEnabled  
    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('red', 'RED');
        System.debug('DATAROW:::'+defaultValue);
        return defaultValue;
    }
    global override VisualEditor.DynamicPickListRows getValues() {
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();
        VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();
        for(SObjectType s: gd){
            if(s.getDescribe().getName()=='Account' || s.getDescribe().getName()=='Contact'){
        VisualEditor.DataRow value1 = new VisualEditor.DataRow(s.getDescribe().getLabel(), s.getDescribe().getName());
            
            myValues.addRow(value1);
            }
        }
        
        
        
        
        System.debug('MY VALUES:::'+myValues);
        return myValues;
    }
}