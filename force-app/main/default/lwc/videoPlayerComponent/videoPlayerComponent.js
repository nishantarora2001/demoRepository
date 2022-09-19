import { LightningElement , track, wire } from 'lwc';
import pickListValues1 from '@salesforce/apex/pickListValues.pickListValues1';
//import showVideo from '@salesforce/apex/pickListValues.showVideo';

export default class VideoPlayerComponent extends LightningElement {
     pickListElements=[];
     pickLinks=[];
     valuesSelected=[];
     
    connectedCallback(){ 
        pickListValues1()
            .then(result=>{ 
                this.pickListElements=result.xyz;
                this.visibleData = this.pickListElements;
                this.pickLinks= result.linktoShow;
                console.log("PICKLISTENTRIS::", this.pickListElements);
                console.log("pickLinks::",this.pickLinks);
            });
            
    }
    visibleData=[];
    values=[];
    value;
    
    get Options(){
        return this.pickLinks;
    }

    handleChange(event){ 
        this.values=event.detail.value;
        if(this.values.length!=0){
        var typeOfData=[];
        
        var show=[];
        console.log("VALUE::", this.values);
        this.pickListElements.forEach(element=>{ 
            typeOfData = element.Video_Types__c.split(';').toString().replace(/,/g,'');
            
            console.log("VIDETYPES::", typeOfData);
            var type = this.values.toString().replace(/,/g,'');
            console.log("VAR:::", type);
            var bool = typeOfData.includes(type);
            console.log("BOOL:::", bool);

            if(bool==true){ 
                console.log("NISHANT ARORA");
                
                show.push(element);
                console.log("VISIBLELELELLE:::;", this.visibleData);
            }     
            
        })
        this.visibleData =show;
        console.log("SHOW LOG:::", this.visibleData);
    }
    else{ 
        this.visibleData = this.pickListElements;
    }
    
        // this.pickListElements.forEach(element=>{ 
        //     console.log("VIISISKS:::", element);
        //     if(this.values == element.Video_Types__c){ 
            
        //     this.visibleData = element;
        //     console.log("VISISBLE DATA::", this.visibleData);
        //     }
        // })

        // this.pickListElements.forEach(element=>{ 
        //     var typeofData = element.Video_Types__c.split(':');
        //     console.log("VIDEOTYPE::",typeofData);
        // })
    }  
        
    handleSearch(event){
        if(event.target.value!=null){ 
            this.visibleData = this.pickListElements.filter(obj => obj.Name.startsWith(event.target.value))
            
            console.log("PICKELEMENEE:::", this.visibleData);
        }
        
        // this.values=event.target.value; 
        // if(this.values==null){ 
        //     this.visibleData = this.pickListElements;
        //     console.log("PICKLEMENEE2:::", this.visibleData);
        // }
        
        // else{
        // this.visibleData = this.pickListElements.filter(obj => obj.Name.startsWith(this.values))
        // console.log("VISIBLEDATA:::", this.visibleData);
        // // this.pickListElements = [];
        // // console.log("PICKELEMENEE:::", this.pickListElements);
        // this.pickListElements = this.visibleData;
        // console.log("PICKELEMENEE:::", this.pickListElements);
        // }
        
        
        
        // console.log("pickListElements is::::", this.pickListElements);
        // this.pickListElements.forEach(element=>{ 
        //     if(element.Name==this.value){ 
        //         this.visibleData =  this.pickListElements.filter(obj => obj.Name.startsWith(this.values));
        //         
        //     }
            
            
        // })
        


    }   
    
        
        
        


    

   
    


    



     
    
}