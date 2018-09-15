import { action, observable } from 'mobx';
import { Howl } from 'howler';
import util from './util/util';
import config from './config/config';

export default class BoardStore {
    // reference to the interval
    @observable intervalID: NodeJS.Timer;
    // whether or not the beep interval is currently running
    @observable isRunning: boolean = false;
    // the random number if chosen plays the second sound
    @observable randomNumber: number = 0;
    // the length of the round measured in the number of times the
    // second beep occurs 
    @observable roundLength: number = 0;
    // the number of times the second beep has played 
    @observable numberBeepsPlayed: number = 0;

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
            let rand = util.getRandomNumber(config.RANDOM_MIN, config.RANDOM_MAX);
            console.log('rand', rand, 'randomNumber', this.randomNumber);
            if (this.randomNumber === rand) {
                this.playSound(2);
                this.numberBeepsPlayed++;
                this.endTick();
            } else {
                this.playSound(1);
            }
        }, time_between_beeps[random_time_between_beeps]);
    }

    /**
     * Ends the beep ticking function if random number 
     * is triggered.
     */
    @action.bound
    endTick() {
        clearInterval(this.intervalID);
        this.isRunning = false;
    }

    /**
     * A number is chosen in between two random numbers. If
     * the random number is triggered, then the second sound
     * plays.
     */
    setRandomNumber() {
        this.randomNumber = util.getRandomNumber(config.RANDOM_MIN, config.RANDOM_MAX);
    }

    /**
     * Sets the length of the round in number of times the second
     * beep appears.
     */
    setRoundLength() {
        this.roundLength = util.getRandomNumber(config.MIN_ROUND_LENGTH, config.MAX_ROUND_LENGTH);
    }

    /**
     * Starts the round.
     */
    @action.bound
    startRound() {
        // set length of round
        this.setRoundLength();
        // set random number
        this.setRandomNumber();
        // start the beep tick function
        this.startTick();
    }

    /**
     * Ends the round.
     */
    endRound() {

    }
}