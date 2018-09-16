import { action, observable } from 'mobx';
import { Howl } from 'howler';
import util from './util/util';
import config from './config/config';

export default class BoardStore {
    // reference to the beep interval
    @observable beepIntervalID: NodeJS.Timer;
    // whether or not the beep interval is currently running
    @observable isBeepIntervalRunning: boolean = false;
    // whether or not the second beep has been triggered yet 
    @observable hasSecondBeepTriggered: boolean = false;
    // the random number if chosen plays the second sound
    @observable randomNumber: number = 0;
    // the length of the round measured in the number of times the
    // second beep occurs 
    @observable roundLength: number = 0;
    // the number of times the second beep has played 
    @observable numberBeepsPlayed: number = 0;
    // the list of all possible beep durations 
    @observable beepDurations: number[] = [];
    // the duration of time between beeps
    @observable timeBetweenBeeps: number = 0;
    // the score of the game, measured by how long the user 
    // had to wait divided by time took to notice change 
    @observable score: number = 0;
    // the initial time the user was expected to react to second beep
    @observable initialReactionTime: number = 0;
    // the actual time the user reacted to the second beep
    @observable actualReactionTime: number = 0;

    /**
     * Plays either beep1.mp3 or beep2.mp3
     * @param {number} index 
     */
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
    @action
    startTick() {
        if (this.isBeepIntervalRunning) { return; }

        this.isBeepIntervalRunning = true;

        this.beepIntervalID = setInterval(() => {
            let rand = util.getRandomNumber(config.RANDOM_MIN, config.RANDOM_MAX);
            if (this.randomNumber === rand) {
                this.hasSecondBeepTriggered = true;
                this.initialReactionTime = performance.now();
                this.playSound(2);
                this.numberBeepsPlayed++;
                this.endTick();
            } else {
                this.playSound(1);
            }
        }, this.beepDurations[this.timeBetweenBeeps]);
    }

    /**
     * Ends the beep ticking function if random number 
     * is triggered.
     */
    @action
    endTick() {
        clearInterval(this.beepIntervalID);
        this.isBeepIntervalRunning = false;
    }

    /**
     * A number is chosen in between two random numbers. If
     * the random number is triggered, then the second sound
     * plays.
     */
    setRandomNumber () {
        this.randomNumber = util.getRandomNumber(config.RANDOM_MIN, config.RANDOM_MAX);
    }

    /**
     * Sets the length of the round in number of times the second
     * beep appears.
     */
    @action
    setRoundLength() {
        this.roundLength = util.getRandomNumber(config.MIN_ROUND_LENGTH, config.MAX_ROUND_LENGTH);
    }

    /**
     * Starts the round.
     */
    startRound() {
        // Save all possible beep durations 
        for (let i = config.MIN_TIME_BETWEEN_BEEPS; i <= config.MAX_TIME_BETWEEN_BEEPS; i+=100) {
            this.beepDurations.push(i);
        }

        // the time between beeps chosen randomly 
        this.timeBetweenBeeps = util.getRandomNumber(0, this.beepDurations.length - 1);
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

    /**
     * Sets the score of the game as a function of reaction time 
     * over elapsed time of second beep.
     */
    @action
    calculateScore() {
        this.score += (this.actualReactionTime - this.initialReactionTime) / config.SCORE_DIVISOR;
        
    }

    /**
     * 
     * @param {React.KeyboardEvent<HTMLDivElement>} key event 
     */
    handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (this.hasSecondBeepTriggered !== true) { return; } 
        this.actualReactionTime = performance.now();
        this.calculateScore();
        this.hasSecondBeepTriggered = false;
        this.startTick();
    }
}