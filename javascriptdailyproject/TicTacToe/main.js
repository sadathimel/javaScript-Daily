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
document.getElementById("b1").onclick = function() {
    location.reload();
}
var x = "O";
var count = 0;

function check(i) {
    if (x == "O") {
        x = "X";
    } else {
        x = "O";
    }
    count++;
    if (p1.innerHTML == "" && count == 9) {
        p1.innerHTML = "Draw !";
        goBack();
    }
    console.log(count)
    document.getElementById("i" + i).innerHTML = x;
    document.getElementById("i" + i).style.color = "black";
    if ((i1.innerHTML == i2.innerHTML && i2.innerHTML == i3.innerHTML) ||
        (i4.innerHTML == i5.innerHTML && i5.innerHTML == i6.innerHTML) ||
        (i7.innerHTML == i8.innerHTML && i8.innerHTML == i9.innerHTML) ||
        (i1.innerHTML == i4.innerHTML && i4.innerHTML == i7.innerHTML) ||
        (i2.innerHTML == i5.innerHTML && i5.innerHTML == i8.innerHTML) ||
        (i3.innerHTML == i6.innerHTML && i6.innerHTML == i9.innerHTML) ||
        (i1.innerHTML == i5.innerHTML && i5.innerHTML == i9.innerHTML) ||
        (i3.innerHTML == i5.innerHTML && i5.innerHTML == i7.innerHTML)) {
        p1.innerHTML = "'" + x + "' wins !";
        goBack();
    }
    function goBack() {
        b1.style.visibility = "visible";
    }
}