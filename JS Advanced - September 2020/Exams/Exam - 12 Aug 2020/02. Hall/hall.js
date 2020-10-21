function solveClasses() {
    class Hall {
        constructor(capacity, name) {
            this.capacity = capacity;
            this.name = name;
            this.events = [];
        }
 
        hallEvent(title) {
            if (this.events.includes(title)) {
                throw new Error("This event is already added!");
            }
 
            this.events.push(title);
            return "Event is added.";
        }
 
        close() {
            this.events = [];
            return `${this.name} hall is closed.`
        }
 
        toString() {
            const result = [`${this.name} hall - ${this.capacity}`];
 
            if (this.events.length > 0) {
                result.push(`Events: ${this.events.join(', ')}`);
            }
 
            return result.join('\n');
        }
    }
 
    class MovieTheater extends Hall {
        constructor(capacity, name, screenSize) {
            super(capacity, name);
            this.events = [];
 
            this.screenSize = screenSize;
        }
 
        close() {
            return super.close() + "Аll screenings are over.";
        }
 
        toString() {
            const result = [super.toString()];
 
            result.push(`${this.name} is a movie theater with ${this.screenSize} screensize and ${this.capacity} seats capacity.`);
 
            return result.join('\n');
        }
    }
 
    class ConcertHall extends Hall {
        constructor(capacity, name) {
            super(capacity, name);
            this.events = [];
            this.performers = []
        }
 
        hallEvent(title, performers) {
            if (this.events.includes(title)) {
                throw new Error("This event is already added!");
            }
 
            this.events.push(title);
            this.performers.push(...performers);
 
            return "Event is added.";
        }
 
        close() {
            this.performers = [];
            return super.close() + "Аll performances are over.";
        }
 
        toString() {
            const result = [super.toString()];
 
            if (this.performers.length > 0) {
                result.push(`Performers: ${this.performers.join(', ')}.`);
            }
 
            return result.join('\n');
        }
    }
 
    return {
        Hall,
        MovieTheater,
        ConcertHall
    }
}