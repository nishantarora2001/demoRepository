import { LightningElement , track} from 'lwc';

export default class CustomCarousal extends LightningElement {

    @track counter=1;
    // setInterval(function(){
    //   document.getElementById('radio' + counter).checked = true;
    //   counter++;
    //   if(counter > 4){
    //     counter = 1;
    //   }
    // }, 5000);
    renderedCallback(){
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setInterval(()=>{
        
        console.log('NISHANT');
        console.log('RADIO::', this.template.querySelector('.radio'+this.counter));
        this.template.querySelector('.radio'+this.counter).checked = true;
        this.counter++;
        if(this.counter>3){
            this.counter = 1;
            this.template.querySelector('.radio'+this.counter).checked = true;
            
        }
    },3500);
}
}