const numbers = [1,2,3,4,5];

const even =  numbers.filter(isEven);

function isEven(value){
    return value % 2 === 0;
}
console.log(even);