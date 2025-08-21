/*
Implement a function mergeObjects(obj1, obj2) that:
Deeply merges obj2 into obj1.
If a key exists in both objects and the values are objects, it should recursively merge them.
Otherwise, the value from obj2 should overwrite the one in obj1.
Return a new object without mutating obj1 or obj2.

🔹 Example:

const obj1 = { a: 1, b: { x: 10, y: 20 }, d: 4 };
const obj2 = { b: { y: 30, z: 40 }, c: 3 };

mergeObjects(obj1, obj2);
// Expected:
// { a: 1, b: { x: 10, y: 30, z: 40 }, d: 4, c: 3 }
 */

function mergeObjects(obj1, obj2) {
    let res = { ...obj1 };

    if (obj2 == null || typeof obj2 !== 'object' || Array.isArray(obj2)) {
        return res;
    }

    for (key in obj2) {
        let val1 = res[key];
        let val2 = obj2[key];
        if (obj1.hasOwnProperty.call(obj2, key)) {
            if (val1 && val2 && typeof val2 === 'object' && typeof val1 === 'object' && !Array.isArray(val1) && !Array.isArray(val2)) {
                res[key] = mergeObjects(val1, val2);
            } else {
                res[key] = val2;
            }
        }
    }

    return res;
}

const obj11 = { a: 1, b: { x: 10, y: 20 }, d: 4 };
const obj21 = { b: { y: 30, z: 40 }, c: 3 };

console.log(mergeObjects(obj11, obj21));