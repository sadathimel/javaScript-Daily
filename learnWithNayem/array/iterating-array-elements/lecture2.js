let names = [
  "Stack Learner",
  "Stack School",
  "Stack Consulrancy",
  "Stack Solution",
];

// function reuse(arr, logic) {
//   for (let i = 0; i < arr.length; i++) {
//     logic(arr[i], i, arr);
//   }
// }

// Example One
// const result1 = [];
// reuse(names, (value) => {
//   result1.push(value.length);
// });

// console.log(result1);

// const result2 = [];
// reuse(names, (value) => {
//   result2.push(value.toUpperCase());
// });

// console.log(result2);

// const result3 = [];
// reuse(names, (value) => {
//   result3.push(value.substr(6));
// });

// console.log(result3);

function reuseAndMap(arr, name) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(name(arr[i], i, arr));
  }
  return result;
}

const length = reuseAndMap(names, (value) => value.laength);
const uppers = reuseAndMap(names, (value) => value.toUpperCase());
const sliced = reuseAndMap(names, (value) => value.substr(6));

// console.log(length);
// console.log(uppers);
// console.log(sliced);

const length1 = names.map((value) => value.length);
const uppers1 = names.map((value) => value.toUpperCase());
const sliced1 = names.map((value) => value.substr(6));

// console.log(length1);
// console.log(uppers1);
// console.log(sliced1);

const studentArray = [
  { id: 1, name: "Sadat Himel", gpa: 3.99, email: "sadat.himel@gmail.com" },
  { id: 2, name: "Tanvir ahmed opel", gpa: 3.87, email: "tanvir@gmail.com" },
  { id: 3, name: "Saidul hasan", gpa: 3.09, email: "saidulhasan@gmail.com" },
  { id: 4, name: "pronoy sorkar", gpa: 3.8, email: "pronoysorkar@gmail.com" },
  { id: 5, name: "Sheik Nazmul", gpa: 3.19, email: "nazmulsheik@gmail.com" },
];

const mappedStudent = studentArray.map((value) => {
  return {
    ...value,
    title: `Hello ${value.name} - Your result has been published`,
    msg: `Hello ${
      value.name
    } , Your result has been published and you have got ${
      value.gpa
    }. Your have ${value.gpa >= 3 ? "Passed" : "Failed"}`,
  };
});


console.log(mappedStudent);