function solve(input) {
    function listProcessorBuilder() {
        let list = [];

        return {
            add: text => list.push(text),
            remove: text => list.splice(list.indexOf(text), 1),
            print: () => console.log(list.join(', '))
        };
    }

    let listProcessor = listProcessorBuilder();

    return input.map(x => x.split(' '))
        .forEach(([command, argument]) => listProcessor[command](argument));
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print'])