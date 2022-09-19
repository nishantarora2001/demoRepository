({
    loadOptions: function (component, event, helper) {
        var opts = [
            { value: "R", label: "lastName" },
            { value: "G", label: "Email" },
            { value: "B", label: "Phone" }
         ];
         component.set("v.colors", opts);
    },
    onChangeColor: function (component, event, helper) {
        var myColor = event.getSource().get("v.value");
        var test;
    },
    onchangefield: function(component , event, helper){ 
        var opts1=[
            {value:'Name', label:"lastName"},
            {value:'Email', label:'Email'},
            {value:'Phone', label:'Phone'}
        ];
        component.set("v.colors",opts1);
}, 
    onField: function (component, event, helper) {
        var field = event.getSource().get("v.value");
        var test;
    }
})