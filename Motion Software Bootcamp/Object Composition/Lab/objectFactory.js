function solve(input) {
    let propList = JSON.parse(input);

    return propList.reduce((key, value) => ({ ...key, ...value }), {});
}


console.log(solve(`[{"canFly": true},{"canMove":true, "doors": 4},{"capacity": 255},{"canFly":true, "canLand": true}]`));