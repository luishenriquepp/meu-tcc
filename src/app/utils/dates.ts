export class Dates {
    private _date: Date;

    constructor(date: Date) {
        this._date = new Date(date.getFullYear(), date.getMonth());
    }
    
    get Date(): Date {
        return this._date;
    }

    set Date(date: Date) {
        this._date = date;
    }

    GetIdade(): number {
        var now = new Date();
        var diff = now.getTime()-this._date.getTime();        
        var numero = 1000*60*60*24*365.25;
        return Math.floor(diff/numero);
    }
}
