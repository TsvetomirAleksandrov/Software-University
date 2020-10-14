function solve(input) {
    let propList = JSON.parse(input);
 
    let result = propList.reduce((a, x) => ({...a, ...x}), {});
    // let result = propList.reduce((a, x) => Object.assign({}, a, x), {});
 
    console.log(result);
}
 
solve(`[{"canFly": true},{"canMove":true, "doors": 4},{"capacity": 255},{"canFly":true, "canLand": true}]`);