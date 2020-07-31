let timo = null;
let intv = null;

$SD.on('com.streamdeck.timerfix.action.keyUp', (jsonObj) => {

    /**
     * 
     * Timerfix plugin
     * v 1.0.0
     * 2020-07-31
     * 
     * This shows how to fix wonky timers
     * 
     * 1. include 'timers.js'
     * 2. use timer-functions as usuas (setTimeout, setInterval, clearTimerout, clearInterval)
     * 3. there is no step 3
     * 
     * Just use your timing-functions as usual
     * 
     * 
     * Info:
     * Currently there's a shortcoming in StreamDeck's core, (which we unfortunately can't fix there at the time of this writing)
     * which fires Javascript timers inside a plugin irregularily. There's no control, if a 1000ms timer firest once a second or once in 3 seconds.
     * 
     * That's why we created this drop-in replacement for:
     * 
     * setTimeout
     * setInterval
     * clearTimeout
     * clearInterval
     * 
     * The fix simply overwrites Javascript's internal methods. So you can work with them as normal.
     * 
     * Note:
     * This is a very lightweight fix, which simply delegates the timers to a separate worker-thread (where the forementioned problem doesn't exist) 
     * It doesn't implement all variations (e.g. passing additional parameters of all kinds to the timer functions). 
     * If this is something you rely on (we don't know anyone who ever used it), just drop us a note and we will look into it.
     * 
     * If you find a bug or have an idea for an improvement, please don't hesitate contacting us.
     * 
     * Hopefully this will be helpful to everybody!
     * 
     */

    const logTime = (s) => console.log(`${s} : ${new Date().toLocaleTimeString()}`, timo, intv);

    if(timo) {
        console.log('clearing timeout...', timo);
        clearTimeout(timo);
        timo = null;
    } else {
        timo = setTimeout(() => logTime('timeout'), 1500);
        console.log('--- new timeout...', timo);
    }

    if(intv) {
        console.log('clearing interval...', intv);
        clearInterval(intv);
        intv = null;
    } else {
        intv = setInterval(() => logTime('interval'), 1000);
        console.log('--- new interval...', intv);
    };

});
