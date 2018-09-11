import { action, observable } from 'mobx';
import { Howl } from 'howler';
import util from './util/util';
import config from './config/config';

export default class BoardStore {
    // reference to the interval
    @observable intervalID: NodeJS.Timer;
    // whether or not the interval is currently running
    @observable isRunning: boolean = false;

    /**
     * Plays either beep1.mp3 or beep2.mp3
     */
    @action.bound
    playSound(index: number) {
        let sound = new Howl({
            src: [require(`../public/audios/beep${index}.mp3`)],
            autoplay: true,
            volume: config.VOLUME
        });
        sound.play();
    }

    /**
     * Starts the beep ticking function.
     */
    @action.bound
    startTick() {
        if (this.isRunning) { return; }

        this.isRunning = true;
        let time_between_beeps = [];
        
        for (let i = config.MIN_TIME_BETWEEN_BEEPS; i <= config.MAX_TIME_BETWEEN_BEEPS; i+=100) {
            time_between_beeps.push(i);
        }

        let random_time_between_beeps = util.getRandomNumber(0, time_between_beeps.length - 1);

        this.intervalID = setInterval(() => {
            this.playSound(1);
        }, time_between_beeps[random_time_between_beeps]);
    }

    /**
     * Ends the beep ticking function.
     */
    endTick() {
        clearInterval(this.intervalID);
        this.isRunning = false;
    }
}