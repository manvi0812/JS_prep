// create custom call fn

Function.prototype.myCall = function (context, ...thisArgs) {

    context = context ?? globalThis;

    context = Object(context);

    const uniqueProp = Symbol('tempFn');
    context[uniqueProp] = this;

    const result = context[uniqueProp](...thisArgs);

    delete context[uniqueProp];

    return result;
}

const name = {
    firstName: "M",
    lastName: "J",
    printName: function () {
        console.log(this.firstName + " " + this.lastName);
    }
}

const name2 = {
    firstName: "R",
    lastName: "V"
};

name.printName.myCall(name2);

// apply

Function.prototype.myApply = function (context, thisArgs) {
    context = context ?? globalThis;

    context = Object(context);

    const uniqueProp = Symbol('tempFn');

    context[uniqueProp] = this;

    const result = context[uniqueProp](...(thisArgs ?? []));

    delete context[uniqueProp];

    return result;
}

name.printName.myApply(name2);

// bind

Function.prototype.myBind = function (context, ...thisArgs) {

    const originalFn = this;
    context = context ?? globalThis;

    return function (...args) {

        context = Object(context);
        const uniqueProp = Symbol('tempFn');

        context[uniqueProp] = originalFn;

        const result = context[uniqueProp](...args, ...thisArgs);

        delete context[uniqueProp];

        return result;

    }
}

const fn = name.printName.myBind(name2);
fn();