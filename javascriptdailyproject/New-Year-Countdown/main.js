var newYear = new Date('Jan 1, 2022 00:00:00').getTime();

function counter(){
    let dateCurrent = new Date().getTime(),
        timeLeft = newYear - dateCurrent;
    
        let second = 1000;
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        let dayLeft = Math.floor(timeLeft / day),    
        let hourLeft = Math.floor(timeLeft / day),    
}