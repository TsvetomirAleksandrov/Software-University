class Movie {
    constructor(movieName, ticketPrice) {
        this.movieName = movieName;
        this.ticketPrice = Number(ticketPrice);
        this.screenings = [];
        this.totalSoldTickets = 0;
        this.totalProfit = 0;
    }
 
    newScreening(date, hall, description) {
        let screening = this.screenings.find(s => s.date === date && s.hall === hall);
        if(screening) {
            throw new Error(`Sorry, ${hall} hall is not available on ${date}`)
        }
 
        screening = {
            date,
            hall,
            description,
            profit: 0
        }
 
        this.screenings.push(screening);
 
        return `New screening of ${this.movieName} is added.`;
    }
 
    endScreening(date, hall, soldTickets) {
        const screening = this.screenings.find(s => s.date === date && s.hall === hall);
        if(!screening) {
            throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`);
        }
 
        screening.profit = +soldTickets * this.ticketPrice;
        this.totalSoldTickets += +soldTickets;
        this.totalProfit += +soldTickets * this.ticketPrice;
 
        this.screenings = this.screenings.filter(s => s.date !== date || s.hall !== hall);
 
        return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${screening.profit}`;
    }
 
    toString() {
        const result = [
            `${this.movieName} full information:`, 
            `Total profit: ${this.totalProfit.toFixed(0)}$`,
            `Sold Tickets: ${this.totalSoldTickets.toFixed(0)}`
        ];
 
        if(this.screenings.length > 0) {
            result.push(`Remaining film screenings:`);
            const sortedScreenings = this.screenings.sort((a, b) => a.hall.localeCompare(b.hall));
 
            sortedScreenings.forEach(sc => {
                result.push(`${sc.hall} - ${sc.date} - ${sc.description}`);
            });
        } else {
            result.push("No more screenings!");
        }
 
        return result.join('\n');
    }
}