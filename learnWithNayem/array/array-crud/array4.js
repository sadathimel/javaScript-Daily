// Concat Multiple Arrays
const arr1 = [1,2,3];
const arr2 = [4,5,6];

const arr3 = arr1.concat(arr2);
// console.log(arr3)

const arr4 = [...arr1, ...arr2];
// console.log(arr5)

const arr5 = [].concat(arr1,arr2, 7,8,arr4);
console.log(arr5);