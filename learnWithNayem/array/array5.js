// Array of Anything

const arr = [10, "Ten", true, getTen, { ten: 11 }, [10, 10]];
// console.log(arr);

function getTen() {
  return 10;
}

// Array of Objects
const favChannels = [
  { name: "Stack Learner", url: "https://youtube.com/stacklearner" },
  { name: "Js Bangladesh", url: "https://youtube.com/jsbangladesh" },
  { name: "Traversy Media", url: "https://youtube.com/techguyweb" },
  { name: "Wes Bos", url: "https://youtube.com/wesbos" },
];

// Array of function
const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const times = (a, b) => a * b;
const div = (a, b) => a / b;
const mod = (a, b) => a % b;

const funcs = [sum, sub, times, div, mod];

const a = 10,
  b = 20;

for (let i = 0; i < funcs.length; i++) {
  const result = funcs[i](a, b);
//   console.log(`[${funcs[i].name}] Result = ${result}`);
}

//   Array of Arraus - Multi Dimensional Array
const pointTable = [
  [0, 0],
  [3, 5],
  [5, 7],
  [10, 23],
];

// One Dimensional Traverse
for ( let i = 0; i < pointTable.length; i++){
    // console.log(`Point ${i} - x=${pointTable[i][0]} and y=${pointTable[i][1]}`);
}

for( let i = 0; i < pointTable.length; i++){
    for(let j = 0; j < pointTable[i].length; j++){
        // console.log(`Points [${i} , ${j}] = ${pointTable[i][j]} `)
    }
}

// Two Dimensional Traverse

const numbers = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
]
// console.log(numbers[2][0])
// for (let j = 0; j < numbers[2].length; j++){
//     console.log(numbers[2][j]);
// }


for(let i = 0; i < numbers.length; i++){
    for(let j = 0; j < numbers[i][j]; j++){
        // console.log(numbers[i][j]);
    }
}





/**
 * 
 **/