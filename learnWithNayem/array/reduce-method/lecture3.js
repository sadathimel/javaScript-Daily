let numbers = [1,2,3,4,5];

function sumFunc(accumulator, currentValue, index){
    console.log(`Index ${index} - Acc ${accumulator} - Cur ${currentValue}`);
    return accumulator + currentValue;
}

const sum = numbers.reduce(sumFunc,11);
console.log(sum)