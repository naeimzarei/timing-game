import { action } from 'mobx';
import {Howl} from 'howler';

export default class BoardStore {
    /**
     * Given an index of 1 or 2, plays either beep1.mp3 or beep2.mp3
     * @param {number} index 
     */
    @action.bound
    playSound(index: number) {
        let sound = new Howl({
            src: [require(`../public/audio/beep${index}.mp3`)],
            autoplay: true
        });
        sound.play();
    }
}