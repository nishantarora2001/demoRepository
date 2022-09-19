import { LightningElement } from 'lwc';

export default class CustomCarousal2 extends LightningElement {
     imageSlide=0;
      renderedCallback(){
          let images = this.template.querySelectorAll('img');
          console.log(images.length);
          // eslint-disable-next-line @lwc/lwc/no-async-operation
          setInterval(()=>{
               images[this.imageSlide].classList.add('paudes');
               this.imageSlide++;
          }, 50000)
      }
}