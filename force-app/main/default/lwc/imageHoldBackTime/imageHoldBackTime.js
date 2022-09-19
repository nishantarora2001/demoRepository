import { LightningElement } from 'lwc';



export default class ImageHoldBackTime extends LightningElement {
    slides;
    slide =0;
    timer;
    openImages;
    renderedCallback(){ 
        this.openImages= true;
        // let slides = this.template.querySelectorAll('.numbertext');
        this.slides = this.template.querySelectorAll('.slide');
        console.log('slides::', this.slides.length);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setInterval(()=>{
            for(let i=0; i<this.slides.length; i++){ 
                this.slides[i].style.display = 'None';
                //this.slides[this.slide].style.animationPlayState= "paused";
            }
            this.slide++;
            if(this.slide> this.slides.length-1){ 
                this.slide =0;
            }
            
            this.slides[this.slide].style.display = "block";
            console.log('`divClass${this.slide}`',`divClass${this.slide}`);
            let childDiv = this.template.querySelector(`.divClass${this.slide}`);
            console.log('childDiv',childDiv.classList);
            childDiv.classList.add('positionStyle');
            childDiv.classList.add('cities-list-animation');
            
            // let childDiv = JSON.parse(JSON.stringify(this.slides[this.slide].children));
            // console.log('childDiv',childDiv.classList);
            // childDiv.classList.add('cities-list-animation');
            // console.log('this.slides[this.slide]',childDiv);
            // const sliding = this.slides[this.slide].classList.add('cities-list-animation');
            
            // const sliding = this.template.querySelector('.divClass');
            // console.log('SLIDING::', sliding);
            //this.slides[this.slide].style.animationPlayState= "running";
        }, 13000);
       
}

}