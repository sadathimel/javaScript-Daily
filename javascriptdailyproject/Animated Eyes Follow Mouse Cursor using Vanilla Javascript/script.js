document.querySelector("body").addEventListener('mousemove', eyeball);

function eyeball(){
    var eye = document.querySelectorAll('.eye');
    eye.forEach(function(eye){
        let x = (eye.getBoundingClientRect().right) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().bottom) + (eye.clientHeight / 2);
        let radian = Math.atan2(event.pageX - x, event.pageY -y);
        let rot = (radian * (180 / Math.PI) * -1) + 270;
        eye.style.transform = "rotate("+ rot + "deg)";
    })
}