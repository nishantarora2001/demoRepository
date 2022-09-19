import { LightningElement , track } from 'lwc';
export default class AccessCamera extends LightningElement {
@track video;
@track canvas;

// capture() {
//     this.video = this.template.querySelector('.videoelement');
//     console.log('VIDE:::', this.video);
//     let camera = navigator.mediaDevices;
//     console.log("CAMERA:::", camera);

//     if (navigator.mediaDevices )

//     {
//         console.log("ENTERED");
//         // access the web cam
//         navigator.mediaDevices.getUserMedia( { video: true } )

//             .then( function ( stream ) {

//                 this.video.srcObject = stream
//             } )

//             .catch( function ( error ) {
//                 document.body.textContent = 'Could not access the camera. Error: ' + error.name;
//             } );
//     }
// }
capture() {
    const cam = this.template.querySelector('.videoelement');
    console.log('CAM::', cam);
    const canvas = this.template.querySelector('.canvas');
    console.log('CANVAS::', canvas);
    let webCam = WebCam.
    webCam.start();
    console.log(webCam);
}
}

