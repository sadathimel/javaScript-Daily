var newYear = new Date('Jan 1, 2022 00:00:00').getTime();

function counter(){
    let dateCurrent = new Date().getTime(),
        timeLeft = newYear - dateCurrent;
    
        let second = 1000;
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        let dayLeft = Math.floor(timeLeft / day),    
            hourLeft = Math.floor((timeLeft % day) / hour),    
            minuteLeft = Math.floor((timeLeft % hour) / minute),    
            secondLeft = Math.floor((timeLeft % minute) / second);
            
            
        document.getElementById('day').innerHTML = dayLeft;
        document.getElementById('hour').innerHTML = hourLeft;
        document.getElementById('minute').innerHTML = minuteLeft;
        document.getElementById('second').innerHTML = secondLeft;    
}
setInterval(()=>{
    
    counter();
})

