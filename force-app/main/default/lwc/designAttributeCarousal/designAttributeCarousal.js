import { LightningElement, api , track} from 'lwc';
export default class DesignAttributeCarousal extends LightningElement {
    @track sliderZerothIndex=[];
    @track translation;
    @track imageSliding = [
         { transform: 'translate(0%)'},
         { transform: 'translate(-100%)'},
         { transform: 'translate(-200%)'},
         { transform: 'translate(100%)'},
         { transform: 'translate(0%)'} 
    ];
    @track imageSliding1 = [
      { transform: 'translate(0%)'},
      { transform: 'translate(-100%)'},
      { transform: 'translate(-200%)'},
      { transform: 'translate(-300%)'},
      { transform: 'translate(-400%)'}  
 ];
      @track imageSliding2 = [
        { transform: 'translate(0%)'},
        { transform: 'translate(-100%)'},
        { transform: 'translate(-200%)'},
        { transform: 'translate(-300%)'},
        { transform: 'translate(-400%)'} 
      ];
      @track imageSliding3 = [
        { transform: 'translate(0%)'},
        { transform: 'translate(-100%)'},
        { transform: 'translate(-200%)'},
        { transform: 'translate(-300%)'},
        { transform: 'translate(-400%)'}
      ];
    @track slider=[];
      @track imageSlideTimimg = {
        duration : 5000,
        delay : 1000,
        iterations: 1,
      }
      @track image=0;
    @api numberOfSlides;
    @track images =["https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
    "https://images.pexels.com/photos/52961/antelope-nature-flowers-meadow-52961.jpeg?cs=srgb&dl=pexels-pixabay-52961.jpg&fm=jpg",
    "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-85120553-scaled.jpg?fit=696,466", "https://i.pinimg.com/736x/cf/59/82/cf59821eabc77942bc0100ebfd3551d4.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLvbO5AzzVxLbjH06JiIV9ObTEPlB3u3LncA&usqp=CAU","https://thumbs.dreamstime.com/b/natural-seen-river-side-time-beauty-146637214.jpg",
    "https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg"];
        renderedCallback(){
        console.log("SLIDES::", this.numberOfSlides);
        console.log("IMAGES:::", JSON.stringify(this.images));
        let width = 200*this.numberOfSlides;
        console.log("WIDTH:::", width);
        let containerClass= this.template.querySelector('.container');
        console.log("ContainerClass::", containerClass);
        containerClass.style.height="200px";
        containerClass.style.width = width+'px';
        containerClass.style.background="Yellow";
        containerClass.style.overflow="hidden";
        let div = document.createElement('div');
        div.style.width="800%";
        div.style.display="flex";
        div.style.position="relative";
        console.log("DIV:::", div);
        console.log("STYLEDIV:::", div);
        let slides = this.images.length/this.numberOfSlides;
        console.log(slides);
        for(let i=0; i<this.images.length/this.numberOfSlides; i++){
            let innerdiv = document.createElement('div');
            innerdiv.classList.add('slidable');               
            for(let j=0; j<this.numberOfSlides; j++){
               let demoImage = document.createElement('img');          
               demoImage.src=this.images[this.image];
               demoImage.style.height="200px";
               demoImage.style.width="200px";
               console.log('IMAGESOURCE:::', demoImage);
               innerdiv.appendChild(demoImage); 
               this.image++;       
            }
            console.log(innerdiv);
            div.appendChild(innerdiv);
        }       
        // console.log("DIV::", div);
        containerClass.appendChild(div);
        console.log("containerClass:::", containerClass);      
        let slidableClasses = this.template.querySelectorAll('.slidable');
        console.log('LENGTH::', slidableClasses.length);       
        // for(let i=0; i<slides; i++){ 
        //   let slideproperty=[];
        //   for(let j=0; j<slides; j++){ 
        //     let translation = -100*j;          
        //     slideproperty.push({transform:`translateX(${translation+'%'})`});
        //     console.log('SLIDERPROPERTY:::', slideproperty);
        //   }
        //   this.slider.push(slideproperty);
        //   console.log("SLIDIN PROPERTIES::::", JSON.stringify(this.slider));
        // }
        for(let i=0; i<slides; i++){ 
          let translation = -100*i;
          this.slider.push({transform:`translateX(${translation+'%'})`});


        }
        console.log("SLIDER PROPERTY::::", JSON.stringify(this.slider));
        slidableClasses[1].style.animation = "nameNew 5s infinite";  
        
      }
      
      startSliding(){
        let slidableClasses = this.template.querySelectorAll('.slidable');
        console.log('LENGTH::', slidableClasses.length);        
        // slidableClasses[0].animate(this.imageSliding, this.imageSlideTimimg);
        // slidableClasses[1].animate(this.imageSliding1, this.imageSlideTimimg);
        // slidableClasses[2].animate(this.imageSliding2, this.imageSlideTimimg);
        // slidableClasses[3].animate(this.imageSliding3, this.imageSlideTimimg);
        // slidableClasses[0].style.animation="this.slider[0] 3s infinite";
        // let styleSheet = document.createElement('style');
        //  styleSheet.insertRule(`@keyframes myAnimation{0% {left : 0;} 50%{left : 100px} 100%{left : -100%}}`,styleSheet.styleSheetRules.length);
        // console.log("STYLESHEET:::", styleSheet);


        let cssKeyframe
        cssKeyframe = {
          0: { transform: 'translateX(0%)'},
          100: { transform: 'translateX(-100%)'},
         
        }
        console.log("CSSKEYFRAMESS:::", JSON.stringify(cssKeyframe));
        

        // // let keyframeObj = createKeyframe(cssKeyframe)
        slidableClasses[1].style.animation = "nameNew 5s infinite";  
        console.log(slidableClasses[0].style.animation = "cssKeyframe 5s infinite");
        let div = this.template.querySelector('.container');
        console.log('DIV:::', div);
        console.log("NISHANT ARORA"); 
        
      
      }
      
}