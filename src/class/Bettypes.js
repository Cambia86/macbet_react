export class BetType {
    constructor(type) {
        this.type = type;
    }

    getTypes() {
        return [
            new BetType("singola"),
            new BetType("doppia"),
            new BetType("tripla"),
            new BetType("multipla"),
            new BetType("sistema"),
        ]
    }
}