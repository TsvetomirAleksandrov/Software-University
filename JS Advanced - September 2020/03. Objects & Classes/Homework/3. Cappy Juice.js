function cappyJuice(input) {
    let data = {};
    let output = {};

    input.forEach(element => {
        let [juices, quantity] = element.split(' => ');

        quantity = Number(quantity);

        if (data.hasOwnProperty(juices)) {
            data[juices] += quantity;
        } else {
            data[juices] = quantity;
        }


        if (data[juices] >= 1000) {
            if (output.hasOwnProperty(juices)) {
                output[juices] += quantity;
            } else {
                output[juices] = data[juices];
            }
        }
    });

    for (const key in output) {
        console.log(`${key} => ${parseInt(output[key] / 1000)}`);
    }
}

cappyJuice(['Orange =&gt; 2000', 'Peach =&gt; 1432', 'Banana =&gt; 450', 'Peach =&gt; 600', 'Strawberry =&gt; 549']);