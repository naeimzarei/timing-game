import config from '../config/config';
import { Howl } from 'howler';
export default class util {
    /**
     * Returns a random number between min and
     * max, inclusive.
     * @param min 
     * @param max 
     */
    static getRandomNumber(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.ceil(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Plays either beep1.mp3 or beep2.mp3
     * @param {number} index 
     */
    static playSound(index: number) {
        let sound = new Howl({
            src: [`${config.BEEP_URL}/beep${index}.mp3`],
            autoplay: false,
            volume: config.VOLUME
        });
        sound.play();
    }
}