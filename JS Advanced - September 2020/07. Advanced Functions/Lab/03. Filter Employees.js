function filterEmployees(inputJSON, filterCriteria) {
    let arrayOfEmployees = JSON.parse(inputJSON);
    let [property, value] = filterCriteria.split('-');

    arrayOfEmployees = arrayOfEmployees.filter(employee => employee[property] === value);
    let counter = 0;
    for (const employee of arrayOfEmployees) {
            console.log(`${counter}. ${employee.first_name + ' ' + employee.last_name} - ${employee.email}`);
            counter++;   
    }
}

