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

const linearSearch = (arr, key)=>{
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] === key) {
            return i
        }
    }
    return -1
}

const s1 = linearSearch(arr, 9);
console.log(s1);


const linearSearchCB = (arr, cb) => {
  for (let i = 0; i < arr.length; i++) {
    if (cb(arr[i])) {
      return i;
    }
  }
  return -1;
};

const s3 = linearSearchCB(team,(item)=> item.name === 'Sadat');
console.log(s3);