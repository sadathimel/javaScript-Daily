// "use strict"
var x;
// parent er dunia
function myFunc() {
    // myFunc er dunia
   var x = 10
    console.log(`${x} from myFunc()`);
    // myFunc er dunia er value parent ar dunia excess kora jayna
    var y = 10;
}
myFunc();
console.log(x);
console.log(y)
