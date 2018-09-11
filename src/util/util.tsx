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
}