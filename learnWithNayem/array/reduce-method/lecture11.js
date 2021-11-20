const numbers = [1,2,3,4,5];

// Mapped
const squares = numbers.reduce((acc,cur)=>{
    acc.push(cur * cur);
    return acc
},[]);
// console.log(squares);

// Filter
const odds = numbers.reduce((acc,cur)=>{
    if(cur % 2 === 1){
        acc.push(cur);
    }
    return acc;
},[])
// console.log(odds);

const bigArray = [];
for(let i = 0; i < 500000; i++){
    bigArray.push(i);
}

// Map and Filter
let big = bigArray.filter((v)=>v % 2 === 0).map((v)=>v*2);
console.log(big);

// Rrduce
let big1 = bigArray.reduce((acc, cur)=> {
    if(cur % 2 === 0) {
        acc.push(cur * 2);
    }
    return acc;
},[]);
console.log(big1);