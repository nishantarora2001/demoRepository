import { LightningElement ,track  } from 'lwc';
// import HelloForEach from '../nishantPage2/nishantPage2';

export default class TouchSlide extends LightningElement {
    

  slider = this.template.querySelector('.slider-container');
    
  slides = Array.from(this.template.querySelectorAll('.slide'));
    
  
  // set up our state
    isDragging = false;
    startPos = 0;
    currentTranslate = 0;
    prevTranslate = 0;
    animationID;
    currentIndex = 0;
    movedBy;


      
  // add our event listeners
  renderedCallback(){
    
    
    this.slides.forEach((slide , index) => {
   slideImage = this.template.querySelectorAll('img')
    // disable default image drag
    slideImage.addEventListener('dragstart', (e)=>e.preventDefault())
    // touch events
    slide.addEventListener('touchstart', this.touchStart(index))
    slide.addEventListener('touchend',this.touchEnd())
    slide.addEventListener('touchmove', this.touchMove())
    // mouse events
    slide.addEventListener('mousedown', this.touchStart(index))
    slide.addEventListener('mouseup', this.touchEnd())
    slide.addEventListener('mousemove', this.touchMove())
    slide.addEventListener('mouseleave', this.touchEnd())
    })

  
  // make responsive to viewport changes
  this.template.addEventListener('resize', this.setPositionByIndex())
  
  // prevent menu popup on long press
  this.template.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    // return false
  }
}
  
 getPositionX(event) {
    event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
  }
  
  // use a HOF so we have index in a closure
 touchStart(index) {
      this.currentIndex = 1
      console.log("THIS IS::", this.currentIndex);
      this.startPos = this.getPositionX(this.currentIndex)
      console.log("THAT WAS" , this.startPos);
      this.isDragging = true
      this.animationID = requestAnimationFrame(animation)
      this.slider.classList.add('grabbing')
    
  }
  
   touchMove(event) {
    if (isDragging) {
      const currentPosition = this.getPositionX(event)
      this.currentTranslate = this.prevTranslate + this.currentPosition - this.startPos
    }
  }
  
 touchEnd() {
    
    this.isDragging = false
     movedBy = currentTranslate - prevTranslate
  
    // if moved enough negative then snap to next slide if there is one
    if (this.movedBy < -100 && this.currentIndex < this.slides.length - 1) this.currentIndex += 1
  
    // if moved enough positive then snap to previous slide if there is one
    if (this.movedBy > 100 && this.currentIndex > 0) this.currentIndex -= 1
  
    this.setPositionByIndex()
  
    this.slider.classList.remove('grabbing')
  }
  
   animation() {
    this.setSliderPosition()
    if (this.isDragging){
      this.requestAnimationFrame(animation)
    }
  }
  
setPositionByIndex() {
    this.currentTranslate = this.currentIndex * -this.template.innerHTML;
    this.prevTranslate = this.currentTranslate
    this.setSliderPosition()
  }
  
   setSliderPosition() {
    this.slider.style.transform = `translateX(${this.currentTranslate}px)`
  }


}