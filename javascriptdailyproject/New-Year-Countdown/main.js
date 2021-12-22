var newYear = new Date('Jan 1, 2022 00:00:00').getTime();

function counter(){
    let dateCurrent = new Date().getTime(),
        timeLeft = newYear - dateCurrent;
}