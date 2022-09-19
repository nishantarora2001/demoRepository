import { LightningElement, track } from 'lwc';
import LionPic from '@salesforce/resourceUrl/LionPic';
export default class PuzzleImage extends LightningElement {
 @track   tiles = [];
 @track   cols = 2;
 @track    rows = 2;
 @track   w=100; 
 @track h=100;
 @track board=[];
 @track source = LionPic;
 @track canvas;
 @track width;
 @track heigth;
 imagePieces=[];
 @track img;
 @track index;

  handleClick() {
    console.log("SOURCE::", this.source);
    this.canvas = this.template.querySelector('canvas');
    console.log("CANVAS::", this.canvas);
     this.cutImage();
    
    
    
  
    
  }
  cutImage(){ 

    // console.log("CUTIMAGES:");
    // for(var x = 0; x < this.cols; x++) {
    //     for(var y = 0; y < this.rows; y++) {
    //       this.canvas = this.template.querySelector('canvas');
    //       console.log("Canvas:::", JSON.stringify(this.canvas));
    //         this.canvas.width = this.w;
    //         this.canvas.height = this.h;
    //         let img = createImageData(this.w, this.h);
    //         img.drawImage(this.source, x, y, this.w, this.h, 0, 0, this.w, this.h);
    //         // var context = this.canvas.getContext('2d');
    //         // context.drawImage(this.source, x * this.w, y * this.h, this.w, this.h, 0, 0, this.canvas.width, this.canvas.height);
    //         // this.imagePieces.push(this.canvas);
    //         let index = i + j * this.cols;
    //         this.imagePieces.push(index);
    //         let tile = new this.Tile(index, img);
    //         this.tiles.push(tile);
            
    //     }
    // }
    console.log("CUTIMAGE");
    
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.canvas.width = 100;
        this.canvas.height = 100;
        let x = i * this.w;
        let y = j * this.h;
        console.log("X:::",x);
        console.log("Y:::",y);
        var ctx = this.canvas.getContext('2d');
        console.log("CTX::", ctx);
        let img = ctx.createImageData(this.w, this.h);
        console.log("IMG:::", JSON.stringify(img));
        img.onload = img.drawImage(this.source, x, y ,this.w, this.h, 0, 0, this.w, this.h);
        console.log("DRAWIMAGE::", img);
        let index = i + j * this.cols;
        console.log("INDEXING::", index);
        this.board.push(index);
        let tile = this.Tile(index, img);
        tiles.push(tile);
      }
    }
    console.log("TILES:::",tiles);
    console.log(JSON.stringify(this.tiles));
  }

  Tile(index , img){ 
      this.index = index;
      this.img = img;
  }

//   setup() {
//     console.log("SETUP ENTERED");
//     this.canvas.height = 50;
//     this.canvas.width = 50;
//     // pixel dimensions of each tiles
//     this.w = this.canvas.width / this.cols;
//     this.h = this.canvas.height / this.rows;
    
//     // Chop up source image into tiles
//     for (let i = 0; i < this.cols; i++) {
//       for (let j = 0; j < this.rows; j++) {
//         let x = i * this.w;
//         let y = j * this.h;
//         let img = createImageData(w, h);
//         img.drawImage(this.source, x, y, this.w, this.h, 0, 0, this.w, this.h);
//         let index = i + j * this.cols;
//         this.board.push(index);
//         let tile = new this.Tile(index, img);
//         this.tiles.push(tile);
//       }
//     }
// }
}