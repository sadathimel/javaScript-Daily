const team = [
  { id: 2, name: "Shegufa" },
  { id: 4, name: "Sadat" },
  { id: 10, name: "Nayem" },
  { id: 1, name: "Salvy" },
  { id: 8, name: "Badhon" },
  { id: 5, name: "Asief" },
  { id: 6, name: "Sakib" },
  { id: 7, name: "Tamim" },
  { id: 9, name: "Tanvir" },
  { id: 3, name: "Salma" },
];

const todo = team.find((item)=>item.name === 'Badhon');
todo.name = "abul"
// console.log(team)

const result = [
  { score: 68, name: "Shegufa" },
  { score: 84, name: "Sadat" },
  { score: 10, name: "Nayem" },
  { score: 61, name: "Salvy" },

];

const highest = 84;
const student = result.find((item)=>item.score === highest);
// console.log(student);

const ourFind = (array,cb)=>{
    for (let i = 0; i < array.length; i++) {
        if(cb(array[i])){
            return array[i];
        }
        
    }
    return undefined;
}

const lowest = 10;
const student2 = ourFind(result,(item)=> item.score === lowest);
console.log(student2)