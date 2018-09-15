let config = {};

// the minimum amount of time between beeps, in milliseconds 
config.MIN_TIME_BETWEEN_BEEPS = 200;
// the maximum amount of time between beeps, in milliseconds 
config.MAX_TIME_BETWEEN_BEEPS = 1000;
// once a number between RANDOM_MIN and RANDOM_MAX is chosen, 
// then the second sound is played
config.RANDOM_MIN = 2;
config.RANDOM_MAX = 10;
// the volume of beeps, between 0 and 1
config.VOLUME = 0.15;
// the minimum number of times the second beep must play
config.MIN_ROUND_LENGTH = 1;
// the maximum number of times the second beep must play
config.MAX_ROUND_LENGTH = 10;

export default config;