var varVariable = "This is var";

console.log(varVariable);
if (true) {
  var varVariable = "This is var again";
}

console.log(varVariable);

if (true) {
  let letVariable = "This is let";
  letVariable = "This is let agin";
  console.log(letVariable);
}

if (true) {
  const constVariable = {
    name: "JavaScript",
    age: "25 years",
  };
  constVariable.name = "js";
  console.log(constVariable);
}

var a = 10;
function f() {
  // var a = 5;
  console.log(a);
}
console.log(a);
f();
