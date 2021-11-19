const numbers = [1,2,3,4,5];

// Mapped
const squares = numbers.reduce((acc,cur)=>{
    acc.push(cur * cur);
    return acc
},[]);
console.log(squares);

// Filter
const odds = numbers.reduce((acc,cur)=>{
    if(cur % 2 === 1){
        acc.push(cur);
    }
    return acc;
},[])
console.log(odds)