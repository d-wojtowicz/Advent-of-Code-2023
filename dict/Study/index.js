"use strict";
var _a;
let sales = 123456789;
let course = "TypeScript";
let is_published = true;
let level;
level = 1;
level = 'Test';
let numbers1 = [1, 2, 3];
let numbers2 = [];
let numbers3 = [];
let user = [1, 'Dominik'];
;
let mySize = 2;
console.log(mySize);
function calculateTax(income, taxYear = 2022) {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.5;
}
let myTax1 = calculateTax(50000, 2021);
let myTax2 = calculateTax(50000);
console.log(myTax1);
console.log(myTax2);
let employee = {
    id: 1,
    name: 'Dominik',
    retire: (date) => {
        console.log(date);
    }
};
function kgToLbs(weight) {
    if (typeof (weight) === 'number')
        return weight * 2.25;
    else {
        return parseInt(weight) * 2.25;
    }
}
kgToLbs(10);
kgToLbs('10kg');
let textBox = {
    drag: () => { },
    resize: () => { }
};
let quantity = 100;
function greet(name) {
    if (name)
        console.log(name.toUpperCase());
    else
        console.log('Hola!');
}
greet('Dominik');
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(1);
console.log((_a = customer === null || customer === void 0 ? void 0 : customer.birthday) === null || _a === void 0 ? void 0 : _a.getFullYear());
let log = null;
console.log(log === null || log === void 0 ? void 0 : log('a'));
//# sourceMappingURL=index.js.map