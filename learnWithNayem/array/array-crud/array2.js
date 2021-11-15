// Update Existing Elements


// Easy One
const numbers = [1,2,3,7,5];

numbers[3] = 4;

// console.log(numbers)

// Array of object

const students = [
    {id:1, name: 'Sadat'},
    {id:2, name: 'Himel'},
    {id:3, name: 'salma'},
    {id:4, name: 'opel'}
];

const givenId = 3;
const updateName = 'Umme Salma';


for (let i = 0; i < students.length; i++) {
    if(students[i].id === givenId){
        students[i].name = updateName
         break;
    }
   
}
console.log(students)