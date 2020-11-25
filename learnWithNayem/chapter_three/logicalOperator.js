// && operator
// true && true = true
// true && false = false
// false && true = false
// false && false = false

// || operator
// true || true = true
// true || false = true
// false || true = true
// false || false = false

var a = 10;
var b = 20;
var c = 40;
var d = 40;
// and operator
if(a>b && c>d){
    console.log ('a is grater then b and c is grater then d')
}else {
    console.log('At lest one condition is false');
}
// or operator
if(a>b || c>d){
    console.log ('a is grater then b and c is grater then d')
}else {
    console.log('At lest one condition is false');
}

// Not operator
var notOperator = !!!(a>b)
console.log(notOperator);