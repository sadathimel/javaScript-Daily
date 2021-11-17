let names = [
    'Stack Learner',
    'Stack School',
    'Stack Consulrancy',
    'Stack Solution',
];


// How we do it on For loop
 for (let i = 0; i < names.length; i++) {
//    console.log(names);
 }

for (let i = 0; i < names.length; i++) {
    // console.log(`${i + 1}: ${names[i]}`);
    
}

// Iterating Logic -> Business Logic

// function reuse(arr,logic){
//     for (let i = 0; i < arr.length; i++) {
//       logic(arr[i],i,arr);
//     }
// }
// function log(value){
//     console.log(value)
// }

// function logic(value,index,arr){
//     console.log(value,index,arr);
// }

// // reuse([]);
// reuse([1,2],log);
// reuse(['one','two'],logic);

function myForeach(arr,cb){
    for (let i = 0; i < arr.length; i++) {
      cb(arr[i],i,arr);
    }
}

const nums = [1,2,3,4];
let sum = 0;

function sumFunc(v){
    sum += v
}

myForeach(nums,sumFunc)
// console.log(sum);

myForeach(names,(value,index)=>{
    console.log(`${index + 1}: ${value}`)
});

names.forEach((value, index)=>{
    console.log(`${index + 1}: ${value}`);
})