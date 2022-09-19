({
    Init: function(component , event , helper){ 
       var action = component.get('c.giveContact');
        action.setCallback(this, function(response){ 
         	var allValues = response.getReturnValue();
            console.log("ALL VALUES::", allValues);
            component.set("v.UserNames", allValues);
            
        });
       $A.enqueueAction(action);
    }
})