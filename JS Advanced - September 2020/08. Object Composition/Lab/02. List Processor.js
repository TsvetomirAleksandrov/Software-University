function solve(input) {
    const listProcessorBuilder = function () {
        let list = [];

        return {
            add: text => list.push(text),
            remove: text => list.splice(list.indexOf(text), 1),
            print: () => console.log(list.join(',')),
        };
    }

    let listProcessor = listProcessorBuilder();

    input.map(x => x.split(' '))
        .forEach(([command, argument]) => listProcessor[command](argument));
}


solve()