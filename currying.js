// Infinite Currying

function add(a) {
    return function (b) {
        if (b) return add(a + b);
        return a;
    }
}

console.log(add(6)(7)(8)(6)(8)());