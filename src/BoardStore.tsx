import { action, observable, autorun } from 'mobx';
import util from './util/util';
import config from './config/config';

export default class BoardStore {
    // reference to the beep interval
    @observable beepIntervalID: NodeJS.Timer;
    // whether or not the beep interval is currently running
    @observable isBeepIntervalRunning: boolean = false;
    // whether or not the second beep has been triggered yet 
    @observable hasSecondBeepTriggered: boolean = false;
    // whether or not the start button has been clicked already 
    @observable hasStartButtonBeenClicked: boolean = false;
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

    // autorun is usually for debugging, updating the view, or persistence 
    // in our case, we will use it to log the score to the console 
    // as well as updating the score on the page
    logger = autorun(() => {
        console.log('score', this.score);
    });

    /**
     * Use the contructor to take care of setting up your 
     * application, such as setting variables.
     */
    constructor() {
        // save possible beep durations 
        for (let i = config.MIN_TIME_BETWEEN_BEEPS; i <= config.MAX_TIME_BETWEEN_BEEPS; i+=100) {
            this.beepDurations.push(i);
        }
    }

    /**
     * Starts the beep ticking function.
     */
    @action
    startTick() {
        this.isBeepIntervalRunning = true;

        // the time between beeps chosen randomly each time the second beep plays 
        this.timeBetweenBeeps = util.getRandomNumber(0, this.beepDurations.length - 1);

        this.beepIntervalID = setInterval(() => {
            let rand = util.getRandomNumber(config.RANDOM_MIN, config.RANDOM_MAX);
            if (this.randomNumber === rand) {
                this.hasSecondBeepTriggered = true;
                this.initialReactionTime = performance.now();
                util.playSound(2);
                this.numberBeepsPlayed++;
                this.endTick();
            } else {
                util.playSound(1);
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
        // check that interval is not currently running 
        if (this.isBeepIntervalRunning) { return; }
        // start button has been clicked 
        this.hasStartButtonBeenClicked = true;
        // reset the score
        this.score = 0;
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
        // reset booleans 
        this.endTick();
        this.hasSecondBeepTriggered = false;
        this.hasStartButtonBeenClicked = false;
    }

    calculateScore() {
        this.score += (this.actualReactionTime - this.initialReactionTime) / config.SCORE_DIVISOR;
    }

    /**
     * 
     * @param {React.KeyboardEvent<HTMLDivElement>} key event 
     */
    handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        // end the game if the user clicks a button before the second beep 
        if (this.hasSecondBeepTriggered !== true) { 
            // Do nothing if start button has not been clicked at beginning of round 
            if (this.hasStartButtonBeenClicked !== true) {
                return;
            }
            this.endRound();
            console.log('game over');
            return;
        } 

        this.hasSecondBeepTriggered = false;
        this.actualReactionTime = performance.now();
        this.calculateScore();

        // check if player has won that round 
        if (this.numberBeepsPlayed === this.roundLength) {
            console.log('numberBeepsPlayed', this.numberBeepsPlayed, 'roundLength', this.roundLength);
            this.startRound();
            return;
        }

        this.startTick();
    }
}