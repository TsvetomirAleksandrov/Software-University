(() => {
    function add(first, sec) {
        return [first[0] + sec[0], first[1] + sec[1]];
    }

    function multiply(vector, multiplyBy) {
        return [vector[0] * multiplyBy, vector[1] * multiplyBy];
    }

    function length(vector) {
        return Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
    }

    function dot(first, sec) {
        return (first[0] * sec[0] + first[1] * sec[1]);
    }

    function cross(first, sec) {
        return (first[0] * sec[1] - first[1] * sec[0]);
    }

    return {
        add,
        multiply,
        length,
        dot,
        cross
    }
})();