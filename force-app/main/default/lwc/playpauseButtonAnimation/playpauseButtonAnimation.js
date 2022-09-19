import { LightningElement, track } from 'lwc';

export default class PlaypauseButtonAnimation extends LightningElement {
    @track playButtonEnable = true;
    @track pauseButtonEnable = false;
    changebuttonToPause(){ 
        this.playButtonEnable = false;
        this.pauseButtonEnable = true;
    }
    changebuttonToPlay(){
        this.playButtonEnable = true;
        this.pauseButtonEnable = false;
    }
}