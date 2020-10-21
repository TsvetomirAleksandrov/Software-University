class VeterinaryClinic {
    constructor(clinicName, capacity) {
        this.clinicName = clinicName;
        this.capacity = capacity;
        this.clients = [];
        this.totalProfit = 0;
        this.currentWorkload = 0;
        this.pets = 0;
    }

    newCustomer(ownerName, petName, kind, procedures) {
        if(this.clients.length === this.capacity) {
            throw new Error('Sorry, we are not able to accept more patients!');
        }

        let clientChecker = this.clients.find(c => c.name === ownerName);

        if(!clientChecker) {
            clientChecker = { name: ownerName, pets: [] }
            this.clients.push(clientChecker);
        }

        let petChecker = clientChecker.pets.find(p => p.petName === petName);

        if(petChecker && petChecker.procedures.length > 0) {
            throw new Error(`This pet is already registered under ${ownerName} name! ${petName} is on our lists, waiting for ${petChecker.procedures.join(', ')}.`);
        }

        if(!petChecker) {
            petChecker = { petName, kind, procedures };
            clientChecker.pets.push(petChecker);
        }
        
        this.pets++;
        this.currentWorkload = (this.pets/this.capacity)*100;

        return `Welcome ${petName}!`
    }

    onLeaving(ownerName, petName) {
        let client = this.clients.find(c => c.name === ownerName);

        if(!client) {
            throw new Error(`Sorry, there is no such client!`);
        }

        let pet = client.pets.find(p => p.petName === petName);

        if(!pet || pet.procedures.length === 0) {
            throw new Error(`Sorry, there are no procedures for ${petName}!`);
        }

        this.totalProfit += (pet.procedures.length * 500);
        pet.procedures = [];
        this.pets--;
        this.currentWorkload = (this.pets/this.capacity)*100;

        return `Goodbye ${petName}. Stay safe!`;
    }

    toString() {
        let result = [`${this.clinicName} is ${Math.floor(this.currentWorkload)}% busy today!`,
        `Total profit: ${this.totalProfit.toFixed(2)}$`
        ];

        for(let client of this.clients.sort((a, b) => a.name.localeCompare(b.name))) {
            result.push(`${client.name} with:`);

            for(let pet of client.pets.sort((a, b) => a.petName.localeCompare(b.petName))) {
                result.push(`---${pet.petName} - a ${pet.kind.toLowerCase()} that needs: ${pet.procedures.join(', ')}`)
            }
        }

        return result.join('\n');
    }
}