// approach 1

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

// approach 2

function deepClone2(value) {

    if (typeof value !== 'object' || value === null) return value;

    if (Array.isArray(value)) {
        return value.map((item) => deepClone2(item));
    }

    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, deepClone2(val)]));
}


const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone2(obj1);

clonedObj1.user.role = 'guest'; // Change the cloned user's role to 'guest'.
console.log(
    clonedObj1.user.role // 'guest'
);
console.log(
    obj1.user.role
); // Should still be 'admin'.


