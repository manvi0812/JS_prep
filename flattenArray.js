
//_______________________________________
// via recursion
//_______________________________________

const flatten = (value) => {
    return value.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr), []);
}
console.log(flatten([1, [2, 3, [4, [5, 6, 7]]]]));


//_______________________________________
// w/o recursion
//_______________________________________

const flattenWithoutRecursion = (value) => {
    // Initialize result array and stack for iterative processing
    const result = [];
    const stack = [value];

    // Process until stack is empty
    while (stack.length > 0) {
        // Pop the last item from the stack
        const current = stack.pop();

        // If current is an array, push its elements to stack in reverse order
        if (Array.isArray(current)) {
            for (let i = current.length - 1; i >= 0; i--) {
                stack.push(current[i]);
            }
        } else {
            // If not an array, add to result
            result.push(current);
        }
    }

    const set = new Set(result);

    return Array.from(set);
}

console.log(flattenWithoutRecursion([1, [2, 3, [4, [5, 6, 7]]]]));
console.log(flattenWithoutRecursion([1, [2, 3, [2, 4]], 3, 5]));

//_______________________________________
// Flattening array "n" times
//_______________________________________

var flat = function (arr, n) {

    let res = [];
    let stack = [];
    stack.push({ item: arr, depth: n });

    while (stack.length > 0) {
        let { item, depth } = stack.pop();
        if (Array.isArray(item) && depth >= 0) {
            for (let i = item.length - 1; i >= 0; i--) {
                stack.push({ item: item[i], depth: depth - 1 });
            }
        } else {
            res.push(item);
        }
    }
    return res;
};

console.log(flat([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1));
