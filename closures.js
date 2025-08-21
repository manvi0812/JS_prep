function find(index) {
    let arr = [];
    for (let i = 0; i < 1000000; i++) {
        arr[i] = i * i;
    }

    console.log(arr[index]);
}

console.time("6");
find(6);
console.timeEnd("6");


console.time("50");
find(50);
console.timeEnd("50");


//-----------------------------
// OPTIMIZATION - CLOSURES
//-----------------------------

/*
The array is created once when find() is called, computing 1,000,000 squares (O(n) where n = 1,000,000).
*/

function find() {
    let arr = [];
    for (let i = 0; i < 1000000; i++) {
        arr[i] = i * i;
    }
    return function (index) {
        console.log(arr[index]);
    }
}

let closure = find();

console.time("6");
closure(6);
console.timeEnd("6");


console.time("50");
closure(50);
console.timeEnd("50");

//-----------------------------------------------
//  QUESTION 2 - how do print 012 using var only
//-----------------------------------------------

/*

for (var i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
} -> 3 3 3

*/

for (var i = 0; i < 3; i++) {
    function inner(i) {
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
    }
    inner(i)
}

//----------------------------------------------------------------------
//  QUESTION 3 - how would you use closure to create a private counter
//----------------------------------------------------------------------

function counter() {
    let _counter = 0;

    function add(increment) {
        _counter += increment;
    }

    function retrieve() {
        console.log("Counter = " + _counter);
    }

    return {
        add, retrieve
    }
};

let c = counter();
c.add(10);
c.add(90);

c.retrieve();

//----------------------------------------------------------------------
//  QUESTION 4 - make the fn run only once
//----------------------------------------------------------------------

let view;
function likeTheVideo() {
    let called = 0;

    return function () {
        if (called > 0) {
            console.log("Already subscribe to Randomass yt channel, leave me alone!!");
        } else {
            view = "Some RandomAss Youtube Channel";
            console.log("Subscribe to" + view);
            called++;
        }
    }
}

let killmenow = likeTheVideo();
killmenow();
killmenow();
killmenow();
killmenow();

//----------------------------------------------------------------------
//  QUESTION 5 - Once polyfill
//----------------------------------------------------------------------

function once(fn, context) {
    let ran;

    return function () {
        if (fn) {
            ran = fn.apply(context ?? this, arguments);
            fn = null;
        }

        return ran;
    }
};

// const hello = function () {
//     console.log("hello");
// }

// hello();
// hello(); hello(); hello(); hello(); 

const hello = once(function () {
    console.log("hello");
});

hello(); hello(); hello(); hello();

//----------------------------------------------------------------------
//  QUESTION 6 - Memoize polyfill
//----------------------------------------------------------------------

function findProduct(num1, num2) {
    for (let i = 0; i < 100000000; i++) { }
    return num1 * num2;
}

function myMemoized(fn, context) {
    let cachedResult = [];

    return function (...args) {
        let key = JSON.stringify(args);
        if (!cachedResult[key]) {
            cachedResult[key] = fn.call(context ?? this, ...args);
        }

        return cachedResult[key];
    }
}


const memoizedFindProduct = myMemoized(findProduct);

console.time("6");
memoizedFindProduct(6767, 8705);
console.timeEnd("6");


console.time("50");
memoizedFindProduct(6767, 8705);
console.timeEnd("50");