function log(message: string, userId?: string) {
    let time = new Date().toLocaleTimeString();
    console.log(time, message, userId || 'Not signed in')
}
log('Page loaded')
log('User signed in', '123')

type Log = (message: string, userId?: string) => void

let typedLog: Log = (message, userId = 'Not Signed In') => {
    let time = new Date().toLocaleTimeString();
    console.log(time, message, userId)
}
log('Page loaded')
log('User signed in', '123')


// ... => 'extra' arguments. Same as *args in python
function sumVariadicSafe(...numbers: number[]) {
    return numbers.reduce((a, b) => a + b, 0)
}
console.log(sumVariadicSafe(1, 2, 3))

// `this: any` is like `self` in python
function fancyDate(this: Date) {
    return `${this.getDate()}/${this.getMonth() + 1}/${this.getFullYear()}`
}
console.log(fancyDate.call(new Date()))

// Generator Function, need `function*` and `yield`
function* FibGenerator() {
    let a = 0, b = 1
    while (true) {
        yield a;
        [a, b] = [b, a + b]
    }
}
let fibgen = FibGenerator()
console.log(fibgen.next())
console.log(fibgen.next())
console.log(fibgen.next())

// Iterator
let numbers = {
    *[Symbol.iterator]() {
        for (let n = 1; n <= 5; n++) {
            yield n
        }
    }
}
for (let a of numbers) {
    console.log(a)
}
let allNumbers = [...numbers]
console.log(allNumbers)
let [one, two, ...rest] = numbers
console.log(one, two, rest)

function times(
    f: (index: number) => void,
    n: number
){
    for (let i = 0; i < n; i++) {
        f(i)
    }
}
times(console.log, 5)

// Polymporh
type Filter = {
    <T>(array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (array, f) => {
    let result = []
    for (let item of array) {
        if (f(item)) {
            result.push(item)
        }
    }
    return result
}
console.log(filter([1, 2, 3], _ => _ > 2))
console.log(filter(['a', 'b'], _ => _ !== 'b'))
let names = [
    {firstName: 'beth'},
    {firstName: 'caitlyn'},
    {firstName: 'xin'}
]
console.log(filter(names, _ => _.firstName.startsWith('b')))


// EXERCISES
// #3
// type Reservation = {
//     from: Date,
//     to: Date | null,
//     destination: string
// }
// type Reserve = {
//     (from: Date, to: Date, destination: string): Reservation
//     (from: Date, destination: string): Reservation
// }
// let reserve: Reserve = (
//     from: Date,
//     toOrDestination: Date | string,
//     destination: string
// ) => {
//     if (toOrDestination instanceof Date && destination != undefined) {
//         // book a one-way trip
//         return {from: from, to: toOrDestination, destination: destination}
//     } else if (typeof toOrDestination === 'string') {
//         // book a round trip
//         return {from: from, to: null, destination: toOrDestination}
//     }
// }

// #4
// function call<T extends unknown[], R>(
//     f: (arg1: T, arg2: string, ...args: T) => R,
//     arg1: T,
//     arg2: string,
//     ...args: T
// ): R {
//     return f(arg1, arg2, ...args)
// }
// function fill(length: number, value: string): string[] {
//     return Array.from({length}, () => value)
// }
// function mult(num1: number, num2: number): number {
//     return num1 * num2
// }

// let a = call(fill, 10, 'a')
// let b = call(mult, 10, 5)

// console.log(a)
// console.log(b)

// #5
type Compare = <T>(...args: T[]) => boolean
let is: Compare = (...args) => args[0] === args[1]
console.log(is('string', 'otherstring'))
console.log(is(true, false))
console.log(is(42, 42))
// console.log(is(10, 'foo')).
console.log(is([1], [1, 2], [1, 2, 3]))
