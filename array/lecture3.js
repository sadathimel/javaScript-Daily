
/**
 * Traversing an array
 * **/

const arr = [41, 22, 73, 24, 95];

// //simple for loop
// let sum = 0;
// for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
//     // console.log('inside of loop' + sum);
// }
// console.log('outside of loop' + sum)


//largest number from array
// let largestNumber = arr[0];
// for (let i = 0; i < arr.length; i++) {
//     if(arr[i] > largestNumber){
//         largestNumber = arr[i];
//     }
// }
// console.log('LargestNumber = ' + largestNumber);

// smallest number from array
let smallestNumber = arr[0];

for (let i = 0; i < arr.length; i++) {
    if(arr[i] < smallestNumber){
        smallestNumber = arr[i];
    }
}

console.log('SmallestNumber = ' + smallestNumber);