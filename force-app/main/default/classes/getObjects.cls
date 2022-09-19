global class getObjects extends VisualEditor.DynamicPickList{
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