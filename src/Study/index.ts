//START: tsc && node dict/Study/index.js

/* Types */
let sales: number = 123_456_789;
let course: string = "TypeScript";
let is_published: boolean = true;
let level;      /* type: any */
level = 1;      /* type: any */
level = 'Test'; /* type: any */


/* Arrays */
let numbers1: number[] = [1,2,3];   /* number[] */
let numbers2: number[] = [];        /* number[] */
let numbers3 = [];                  /* any[] */


/* Tuples */
let user: [number, string] = [1, 'Dominik'];


/* Enums */
//const small = 1;
//const medium = 2;
//const large = 3;

const enum Size { Small = 1, Medium = 2, Large = 3 };
let mySize: Size = Size.Medium;
console.log(mySize);


/* Functions */
//function calculateTax(income: number, taxYear?: number): number {   // ? is optional parameter
//    if ((taxYear || 2022) < 2022)
function calculateTax(income: number, taxYear: number = 2022): number {   
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.5;
}
let myTax1: number = calculateTax(50_000, 2021);
let myTax2: number = calculateTax(50_000);
console.log(myTax1);
console.log(myTax2);


/* Aliases */
type Employee = {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void
}


/* Objects */
let employee: Employee = { 
    id: 1, 
    name: 'Dominik',
    retire: (date: Date) => {
        console.log(date);
    } 
};


/* Union types */
function kgToLbs(weight: number | string) : number {
    if (typeof(weight) === 'number')
        return weight * 2.25;
    else {
        return parseInt(weight) * 2.25;
    }
}
kgToLbs(10);
kgToLbs('10kg');


/* Intersection type */
type Draggable = {
    drag: () => void
};
type Resizable = {
    resize: () => void
};
type UIWidget = Draggable & Resizable
let textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
};


/* Literal type */
type Quantity = 50 | 100;
let quantity: Quantity = 100;
type Metric = 'cm' | 'inch';


/* Nullable type */
function greet(name: string | null | undefined) {
    if (name)
        console.log(name.toUpperCase());
    else
        console.log('Hola!');
}
greet('Dominik');


/* Optional chaining */
type Customer = {
    birthday?: Date
};
function getCustomer(id: number) : Customer | null {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(1);

//if (customer !== null && customer !== undefined)
//    console.log(customer.birthday) It is equality of:
console.log(customer?.birthday?.getFullYear());
let log: any = null;
console.log(log?.('a'));