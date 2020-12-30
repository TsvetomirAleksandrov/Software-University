class Company {
    constructor() {
        this.departments = [];
    }

    addEmployee(username, salary, position, department) {
        if (!username || !salary || !position || !department) {
            throw new Error('Invalid input!')
        }
        if (salary < 0) {
            throw new Error(' Invalid input!');
        }
        let depWithName = this.departments.find(el => el.name === department);
        if (depWithName !== undefined) {
            depWithName.employees.push({ username, position, salary });
            depWithName.avgSalary += salary;
        } else {
            this.departments.push({ name: department, employees: [{ username, position, salary }], avgSalary: salary });
        }
        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment() {
        let max = Number.MIN_SAFE_INTEGER;
        for (const dep of this.departments) {
            if (max < dep.avgSalary / dep.employees.length) {
                max = dep.avgSalary / dep.employees.length;
            }
        }
        let bestDep = this.departments.find(el => el.avgSalary / el.employees.length === max);
        bestDep.avgSalary = max.toFixed(2);
        let employees = '';
        let sorted = bestDep.employees.sort((a, b) => {
            if (b.salary - a.salary === 0) {
                return (a.username).localeCompare(b.username);
            }
            return b.salary - a.salary;
        });

        for (const emp of sorted) {
            employees += `\n${emp.username} ${emp.salary} ${emp.position}`;
        }
        return `Best Department is: ${bestDep.name}\nAverage salary: ${bestDep.avgSalary}${employees}`;
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());