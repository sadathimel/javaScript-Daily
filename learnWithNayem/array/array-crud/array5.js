// array slice in multiple array

const arr = [0,1,2,3,4,5,6];

const sliced = arr.slice(1, 3)
// console.log(sliced);

// clone Array
const cloned = arr.slice()
// console.log(cloned === arr);

// Array Like Objects to array
function toarray (){
    return Array.prototype.slice.call(arguments);
}
const argArray = toarray(1,2,3,4,'tast');
// console.log(argArray);
console.log(argArray.__proto__.constructor)

