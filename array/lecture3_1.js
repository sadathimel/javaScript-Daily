/**
 *@Title : Add New Elements to an Array 
 **/

 // Use push to insert at the end of an array

 const arrP1 = [1, 2, 3];

 const arrP2 = [8,9,10];

 arrP1[arrP1.length] = 4;

 arrP1.push(5);
 arrP1.push(6,7);
//  arrP1.push(arrP2);
// arrP1.push(...arrP2);
Array.prototype.push.apply(arrP1, arrP2);
// console.log(arrP1);
//  console.log(arrP1);

const arrU1 = [5, 6, 7];
const arrU2 = [2, 3, 4];
arrU1.unshift(4);
arrU1.unshift(...arrU2);
console.log(arrU1);