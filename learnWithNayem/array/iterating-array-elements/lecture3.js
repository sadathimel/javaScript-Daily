const studentArray = [
  { id: 1, name: "Sadat Himel", gpa: 3.99, email: "sadat.himel@gmail.com" ,due:true, dueAmount:3000 },
  { id: 2, name: "Tanvir ahmed opel", gpa: 3.87, email: "tanvir@gmail.com",due:false, dueAmount:0 },
  { id: 3, name: "Saidul hasan", gpa: 2.09, email: "saidulhasan@gmail.com",due:true, dueAmount:12000 },
  { id: 4, name: "pronoy sorkar", gpa: 3.8, email: "pronoysorkar@gmail.com",due:false, dueAmount:0 },
  { id: 5, name: "Sheik Nazmul", gpa: 2.19, email: "nazmulsheik@gmail.com" ,due:false, dueAmount:0},
];

// const lowGpa = studentArray.filter((value)=>value.gpa < 3);
const lowGpa = studentArray.filter((value)=>value.dueAmount  > 0 ).map((value)=>{
    return{
        ...value,
        inspiringMessage: `hi, ${value.name} , ${value.dueAmount > 0 ? "your have a due" : "thanks you don't due "} ${value.dueAmount} ` 
    }
});
console.log(lowGpa);