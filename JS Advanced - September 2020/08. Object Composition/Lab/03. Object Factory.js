function solve(input){
    let propList = JSON.parse(input);

    let result = propList.reduce((a, x) => ({...a, ...x}), {});

    console.log(result);
}