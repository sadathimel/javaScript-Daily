var i1 = document.getElementById("i1");
var i2 = document.getElementById("i2");
var i3 = document.getElementById("i3");
var i4 = document.getElementById("i4");
var i5 = document.getElementById("i5");
var i6 = document.getElementById("i6");
var i7 = document.getElementById("i7");
var i8 = document.getElementById("i8");
var i9 = document.getElementById("i9");
var p1 = document.getElementById("p1");

document.getElementById('b1').onclick = function(){
    location.reload();
}

var x = "0";
var count = 0;



function check(l){
    if (x == "0") {
        x = "X";
    }else {
        x = "0";
    }
    count++;
    console.log(x)
    if(p1.innerHTML == "" && count == 9){
        p1.innerHTML = "Draw !";
        // goBack();
    }

    document.getElementById("i" + l).innerHTML = x;
    
// console.log(i)

    // function goBack(){
    //     b1.style.visibility = "visible"
    // }
}
