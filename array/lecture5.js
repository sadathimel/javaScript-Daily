const arr = [10, 'Ten', true, getTen, {ten:10}, [10, 10]];
// console.log(arr)

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

const names = [sum, sub, times, div, mod];

for(i = 0; i < names.length; i++){
    // console.log(names[i].name)
}


const funcs = [sum, sub, times, div, mod];
const a = 10;
    b = 20;

    for (let i = 0; i < funcs.length; i++){
        const result = funcs[i](a,b);
        // console.log(`${funcs[i].name}`);
    }
    
    //Array of Arrays - Multi Dimensional Array
    const pointTable = [
        [0, 1],
        [2, 3],
        [4, 5],
        [10, 23],
    ];

    //One Dimensional Traverse
    for (let i = 0; i < pointTable.length; i++){
        // console.log(`Point ${i} - X = ${pointTable[i][0]} and Y = ${pointTable[i][1]}`);
    }

    // Two Dimensional Traverse
    for (let i = 0; i < pointTable.length; i++){
        for(let j = 0; j < pointTable[i].length; j++){
            // console.log(`Points [${i} , ${j} ] = ${pointTable[i][j]}`);
        }
    }

    //Two Dimensional Traverse
    const numbers = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    // for (let j = 0; j < numbers[0].length; j++){
    //     console.log(numbers[0][j]);
    // }
    
    for(let i = 0; i< numbers.length; i++){
        for(j = 0; j < numbers[i].length; j++){
            // console.log(numbers[i][j]);
        }
    }



    // Matrix Example
    const matrixA = [
        [1, 3],
        [1, 0],
        [1, 2]
    ]
    const matrixB = [
        [0, 0],
        [7, 5],
        [2, 1]
    ];


    const matrixSum = (matrixA, matrixB) => {
        const result = [];
        for(let i = 0; i < matrixA.length; i++){
            const row = [];
            for(let j = 0; j < matrixA[i].length; j++){
                row.push(matrixA[i][j] + matrixB[i][j]); 
            }
            result.push(row);
        }
        return result;
    }
    const matrixC = matrixSum(matrixA, matrixB);
    console.log(matrixC);