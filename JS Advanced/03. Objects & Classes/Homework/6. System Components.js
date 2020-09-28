function x(input = []) {
    let obj = new Map;
 
    input.forEach(line => {
        let [systemName, componentName, subcomponentName] = line.split(' | ');
 
        if (!obj.has(systemName)) {
            obj.set(systemName, new Map);
        }
 
        if (!obj.get(systemName).has(componentName)) {
            obj.get(systemName).set(componentName, [])
        }
 
        obj.get(systemName).get(componentName).push(subcomponentName);
 
    });
 
    return [...obj.keys()]
        .sort((a, b) => systemSort(a, b, obj))
        .forEach((systemName) => {
            console.log(systemName);
 
            const components = [...obj.get(systemName).keys()]
                .sort((a, b) => obj.get(systemName).get(b).length - obj.get(systemName).get(a).length)
                .forEach(componentName => {
                    console.log(`|||${componentName}`);
                    for (const subcomponent of obj.get(systemName).get(componentName)) {
                        console.log(`||||||${subcomponent}`);
                    };
                });
        });
 
    function systemSort(sysA, sysB, obj) {
 
        let aComponents = obj.get(sysA).size;
        let bComponents = obj.get(sysB).size;
 
        if (aComponents > bComponents) {
            return -1;
        };
 
        if (aComponents < bComponents) {
            return 1;
        };
 
        return sysA.toLowerCase().localeCompare(sysB.toLocaleLowerCase());
    }
}
 
console.log(x(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security']))