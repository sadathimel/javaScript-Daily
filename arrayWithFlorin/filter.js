// const numbers = [1,2,3,4,5];

// const even =  numbers.filter(isEven);

// function isEven(value){
//     return value % 2 === 0;
// }
// console.log(even);

// const even = numbers.filter((value)=>{
//     return value % 2 === 0;
// });
// console.log(even);

// const people = [
//     {
//         name: 'John',
//         age: 20,
//         city: 'New York',
//     },
//     {
//         name: 'Himel',
//         age: 27,
//         city: 'Dhaka',
//     },
//     {
//         name: 'Saidul',
//         age: 26,
//         city: 'Cumilla',
//     }
// ];

// const adults = people.filter(person=>person.age >= 18);
// console.log(adults);



const numbers = [1,2,3,4,5,2,3,1,4,3,4,5,6,8];

 const num = numbers.filter((value, index, arr)=>{
        return arr.indexOf(value) === index;
 })
 console.log(num);