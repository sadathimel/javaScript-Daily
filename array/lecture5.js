const arr = [10, 'Ten', true, getTen, {ten:10}, [10, 10]];
console.log(arr)

function getTen(){
    return 10;
}

// Array of Objects
const favChannels = [
    { name: 'Stack Learner', url: 'https://www.youtube.com/stacklearner'},
    { name: 'Js Bangladesh', url: 'https://www.youtube.com/jsbangladesh'},
    { name: 'Traversy Media', url: 'https://www.youtube.com/techguyweb'},
    { name: 'Wes Bos', url: 'https://www.youtube.com/wesbos'},
];

// Array of Functions
const sum = (a,b) => a + b;
const sub = (a,b) => a - b;
const times = (a,b) => a * b;
const div = (a,b) => a / b;
const mod = (a,b) => a % b;

const funcs = [sum, sub, times, div, mod];
const a = 10;
    b = 20;

    for (let i = 0; i < funcs.length; i++){
        const result = funcs[i](a,b);
        console.log(result);
    }