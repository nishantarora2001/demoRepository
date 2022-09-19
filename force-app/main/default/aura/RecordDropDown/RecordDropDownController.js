({
    init: function(component, event, helper) {
        var action = component.get('c.getObjectName');
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {           
                var allValues = response.getReturnValue();
                component.set("v.options", allValues);
                console.log('All Values::', allValues);
            }                    
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } 
                else {
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    handleChange: function(component , event , helper){  
        var action = component.get('c.takeFields');
        var value1 = component.find('onjId').get("v.value");
        console.log('VALUE :::::', value1);
        action.setParams({
            ObjectName: value1
            
        });
        action.setCallback(this,function(response){ 
            var allValues = response.getReturnValue();
            allValues.forEach
            console.log('RETURNED VALUES ::::::', allValues);
            var items = [];
            var item;
            for (var i = 0; i < allValues.length; i++) {
                item = {
                    label: allValues[i],
                    value: allValues[i]
                };
                items.push(item);
            }
            component.set("v.fields", items);
        });
        $A.enqueueAction(action);    
    }, 
    
    /* handleGenreChange: function(component , event , helper){ 
        var selectedValues = event.getParam("value");
        component.set('v.selectedGenreList', selectedValues);
        console.log('HANDLE CHANGE VALUE ::::', selectedValues);
    },*/
    
    handleClick: function(component , event , helper){ 
        var items = [];
        var item;
        var action = component.get('c.getFieldData');
        var value = component.get('v.selectedGenreList');
        console.log("THIS is Value Check :::::", value);
        var value1 = component.find('onjId').get("v.value");
        console.log("THIS1 :::::", value1);
        action.setParams({ selectedFields: value, objectName: value1 });
        action.setCallback(this,function(response){ 
            var allValues = response.getReturnValue();
            console.log("THESE ARE VALUES::", allValues);
            component.set("v.inputs", allValues.wrapFields);
           	var selectedFields =  component.get("v.inputs");
            selectedFields.forEach(element=> {
                item = {
                apiName : element.apiName,
                value : ''
            }
                items.push(item);
            console.log("ITEMEEMMEME:::", items);
            })
        component.set('v.inputValues', items);
        var item2=[];
        selectedFields.forEach(element=>{ 
            var item1={ 
            label: element.label,
            value:''
        }
                               item2.push(item1);
        console.log('ITEM2222:::',item2);
        })
    component.set('v.inputLabels', item2);
        
          
});
$A.enqueueAction(action);  
}, 
    
        
        handleInput: function(component , event , helper){
            var checkLabel= event.getSource().get("v.label");
            console.log("CHECKLABEL::", checkLabel);
    		var change2 = component.get('v.inputLabels');
            console.log("CHANGE2:::", change2);
            var change = component.get('v.inputValues');
            	var action = event.getSource().get("v.name");
            
            console.log("Action::",action);
            var action2 = event.getSource().get("v.value");
            console.log("Action2::", action2);
          
            change.forEach(element=>{ 
                if(action==element.apiName){ 
            	element.value= action2;
            }
                             
            });
              console.log("Change::::", change);
            change2.forEach(element=>{ 
                if(checkLabel ==element.label){ 
            		element.value=action2;
                
            }
                            console.log("CHANGE2222::::", change2);
            })
           
        
        }, 
            
            handleSaveRecord: function(component , event , helper){ 
                var action = component.get('c.saveRecord');
                var value1 = component.find('onjId').get("v.value");
                var value = JSON.stringify(component.get('v.inputValues'));
                
                console.log("Value::" , value);
                action.setParams({customObjectName: value1, fieldMap: value});
                
                $A.enqueueAction(action);
            }


})