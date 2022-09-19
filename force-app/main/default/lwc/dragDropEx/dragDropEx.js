import { LightningElement } from 'lwc';

export default class DragDropEx extends LightningElement {
    drag(event){
        event.dataTransfer.setData("divId", event.target.id);
        var i =event.dataTransfer.setData("text/plain", event.target.Id);
        console.log('I::', i);
    }
    allowDrop(event){
        event.preventDefault();
    }
    drop(event){
        event.preventDefault();
        var divId = event.dataTransfer.getData("divId");
        console.log("DIVID::::", divId);
        var draggedElement = this.template.querySelector('#' +divId);
        console.log('dragELEMENT:::',draggedElement);
        draggedElement.classList.add('completed'); 
        event.target.appendChild(draggedElement);
    }
}