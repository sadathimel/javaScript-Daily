var min = document.getElementById("min");
var sec = document.getElementById("sec");
var mili = document.getElementById("mili");
var lap = document.getElementById("perlap");



var startbutton = document.getElementById("start");
var stopbutton = document.getElementById("stop");
var resetbutton = document.getElementById("reset");
var lapbutton = document.getElementById("lap");

var time, countMili = 1, countSec = 0, countMin = 0;

startbutton.onclick = function(){
    time = setInterval(watchtime, 9);
    document.getElementById("num").className = "fade";
    
}
stopbutton.onclick = function () {
    clearInterval(time);
}
resetbutton.onclick = function(){
    clearInterval(time);
    countMili = 0;
    countSec = 0;
    countMin = 0;
    mili.innerHTML = "00";
    sec.innerHTML = "00";
    min.innerHTML = "00";
    lap.innerHTML = "";
    
    document.getElementById("num").className = "";
}
lapbutton.onclick = function(){
    countMin = (countMin.toString().length == 2) ? countMin : " 0 " + countMin;
    countSec = (countSec.toString().length == 2) ? countSec : " 0 " + countSec;
    countMili = (countMili.toString().length == 2) ? countMili : " 0 " + countMili;
    lap.innerHTML += "<i class='fa fa-flag'></i> " + countMin + " : " + countSec + " : " + countMili + "<br>";
}

function watchtime(){
    mili.innerHTML = (countMili > 9) ? countMili : "0" + countMili;
    if(countMili == 99 )
        countSec++;
    
    sec.innerHTML = (countSec > 9) ? countSec : "0" + countSec;
    countMili = (countMili < 99) ? countMili + 1 : 0;
    countSec = (countSec < 60) ? countSec : 0;
    if(countSec == 0 && countMili == 0){
        countMili++;
        min.innerHTML = (countMin > 9 ) ? countMin : "0" + countMin;
    }    
}
