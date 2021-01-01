tickets = (data = [], criteria = '') => {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    const statuses = { available: 0, departed: 1, sold: 2 };
    const sortTickets = {
        price: (a, b) => a.price - b.price,
        status: (a, b) => statuses[a.status] - statuses[b.status],
        destination: (a, b) => a.destination.localeCompare(b.destination)
    };

    return data.map((str) => new Ticket(...str.split('|'))).sort(sortTickets[criteria]);
}

console.log(tickets(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'destination'
));