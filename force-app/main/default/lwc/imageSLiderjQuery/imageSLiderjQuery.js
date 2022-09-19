import { LightningElement } from 'lwc';
import jQuerySLider from '@salesforce/resourceUrl/jQuerySLider';
import { loadScript } from 'lightning/platformResourceLoader';
export default class ImageSLiderjQuery extends LightningElement {
    width = 720;
    animationSpeed = 1000;
    pause = 3000;
    currentSlide = 1;
    slider;
    slideContainer;
    slides;
    interval;
    transition = '2s';

    renderedCallback(){ 
        Promise.all([
            loadScript(this, jQuerySLider ),
           
        ])
        .then(() => { 
            console.log('JQUERY LOADED');
        
        
            //cache DOM elements
            // eslint-disable-next-line no-undef
            this.slider = this.template.querySelector('.slider');
            console.log("SLIDER::", this.slider);
            //let $slider = $('#slider');
            
            // eslint-disable-next-line no-undef
            this.slideContainer =  this.template.querySelector('.slides');
            console.log('SLIDECONTAINER::', this.slideContainer);
            //let $slideContainer = $('.slides', $slider);
           
            this.slides = this.template.querySelectorAll('.slide');
            console.log('SIDES::', this.slides.length);
            //let $slides = $('.slide', $slider);
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            
            this.slideContainer
            .on('mouseenter', this.pauseSlider())
            .on('mouseleave', this.startSlider());
    
            this.startSlider();
         
        
            

                //settings for slider
                
            
        })
    }
    startSlider() {
        let that = this;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
         this.interval = setInterval(function() {
            this.slideContainer.animate({'margin-left': '-='+that.width}, that.animationSpeed, that.transition , function() {
                if (++that.currentSlide === that.slides.length) {
                    that.currentSlide = 1;
                    that.slideContainer.css('margin-left', 0);
                }
            });
        }, that.pause);
    }
    pauseSlider() {
        clearInterval(this.interval);
    }
}

// let slides = this.template.querySelector('.slides').animate({'margin-left': '-='+width},
            // console.log('SLIDESS::', slides);