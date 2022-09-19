import { LightningElement } from 'lwc';


export default class PdfMessageChannel extends LightningElement {
    
    
      message;
    
    handleSwipe() {
      // define the minimum distance to trigger the action
      const minDistance = 80;
      const container = this.template.querySelector('.swipe-container');
      const output = this.template.querySelector('.output');
      // get the distance the user swiped
      console.log(container.scrollLeft)
      const swipeDistance = container.scrollLeft - container.clientWidth;
      if (swipeDistance < minDistance * -1) {
        this.message = 'swiped left';
      } else if (swipeDistance > minDistance) {
        this.message = 'swiped right';
      } else {
        this.message = `did not swipe ${minDistance}px`;
      }
    }
    
      
}