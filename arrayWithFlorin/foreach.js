const numbers = [1,2,3,4,5];
// numbers.forEach((item, index, arr)=>{
//     console.log(`a[${index}] = ${item}`);
//     console.log(arr);
// });

// function consoleItem(item, index, arr){
//     console.log(item);
//     console.log(index);
//     console.log(arr);
// }
// let sum = 0;
// numbers.forEach(item =>{
//     sum += item;
// });
// console.log(sum);
let count = [];
const letters = ['a','b','c','d','a','c','a','b'];

letters.forEach((item)=>{
    if(count[item]){
        count[item]++;
    }else{
        count[item] = 1;
    }
})

console.log(count);

