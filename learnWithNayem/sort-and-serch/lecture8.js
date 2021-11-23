const arr = [14, 2, 7, 4, 55, 9, 20, 34];

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

const index1 = arr.findIndex((item)=>item === 55);
console.log(index1);

const index2 = team.findIndex((item)=>item.name === 'Salma');
console.log(index2)