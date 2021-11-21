const myArray = [1, 14, 2, 7, 4, 55, 9, 20, 34, 90, 657, 4];

// Ascending order
myArray.sort((a,b)=>{
    return a - b;
})
console.log(myArray);
// Desending order
myArray.sort((a,b)=>{
    return b - a;
})
// console.log(myArray);

let strings = ['Cat','Ball','Apple','apple'];
strings.sort((a,b)=>{
    a = a.toLocaleLowerCase();
    b = b.toLocaleLowerCase();
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
});
console.log(strings);
