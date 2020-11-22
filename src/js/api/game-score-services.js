export default class GameTableResult {
    constructor(name,score) {
    this.name = name;
    this.score = score;
    this.place = 1;
    this.recordString = [];
    }

    setScore(name, score) {
        return {
            name: name,
            score: score
        }
    }

    get newSore () {
        return this.recordString;
    }
    set newSore (newResult) {
        this.recordString = newResult;
    }
    
    setNewRecord(name, score) {
        this.recordString.push(this.setScore(name, score));
    }
}