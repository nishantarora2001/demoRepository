({
    fetchPickListVal: function(component, fieldName, elementId) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "obj": component.get("v.objInfo"),
            "fld": fieldName
        });
        var opts = [];
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                var allValues = response.getReturnValue();
                 
                opts.push({
                    class: "optionClass",
                    label: "--- None ---",
                    value: ""
                });
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.find(elementId).set("v.options", opts);
            }
        });
        $A.enqueueAction(action);
    },
})