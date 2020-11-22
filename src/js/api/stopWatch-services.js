export default class StopWatch {
    constructor({onTick}) {
        this.startTime =60;
        this.intervalId = null;
        this.onTick = onTick;
    }

    start() {
        this.isActive = true;
        this.intervalId = setInterval(()=>{
        this.startTime = this.startTime - 1; 
        const time = this.pad(this.startTime);
        this.onTick(time)
        }, 1000) 
    }

    stop() {
        clearTimeout(this.intervalId);
        this.isActive = false;
    }

    pause() {
        clearTimeout(this.intervalId);
        this.isActive = false;
    }

    get () {
       return this.time;
    }

    set (newTime) {
        this.time = newTime;
    }
    pad(value) {
        return String(value).padStart(2,'0');
      }
}