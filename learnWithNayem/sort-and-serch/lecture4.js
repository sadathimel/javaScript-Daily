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

let strings1 = ["Cat", "Ball", "Apple", "apple","ant"];
strings1.sort((a, b) => {
  
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
});
console.log(strings1);


const team = [
    {id: 2, name: 'Shegufa'},
    {id: 4, name: 'Sadat'},
    {id: 10, name: 'Nayem'},
    {id: 1, name: 'Salvy'},
    {id: 8, name: 'Badhon'},
    {id: 5, name: 'Asief'},
    {id: 6, name: 'Sakib'},
    {id: 7, name: 'Tamim'},
    {id: 9, name: 'Tanvir'},
    {id: 3, name: 'Salma'},
];

// team.sort((a, b) => {
//     if (a.id > b.id) return 1; 
//     if (a.id < b.id) return -1;
//     return 0;
// }
// )
team.sort((a, b) => {
    if (a.name > b.name) return 1; 
    if (a.name < b.name) return -1;
    return 0;
}
)
console.log(team)