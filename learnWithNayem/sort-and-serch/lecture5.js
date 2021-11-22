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


const bubbleSort = (array,cb)=> {
    for (let i = 0; i < array.length -1 ; i++) {
        for (let j = 0; j < array.length -1; j++) {
             if(cb(array[j], array[j+1]) > 0){
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;

             }
        }
        
    }
};

const arr = [14, 2, 7, 4, 55, 9, 20, 34];
bubbleSort(arr,(a,b)=>b-a);
// console.log(arr);
bubbleSort(team, (a,b)=>a.id - b.id);
console.log(team);

bubbleSort(team, (a,b)=>{
    if(a.name > b.name) return 1;
    if(a.name > b.name) return -1;
    return 0;
});

console.log(team)



