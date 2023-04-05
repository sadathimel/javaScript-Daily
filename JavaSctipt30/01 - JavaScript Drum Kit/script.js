// function playSound(e){
//    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
//    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
//    // console.log(key);
//    if(!audio)return;
//    audio.currentTime = 0;
//    audio.play();
//    key.classList.add('playing');

// }

// function removeTransition(e){
//    if(e.propertyName !== 'transform') return;
//    this.classList.remove('playing');
// }

// window.addEventListener('keydown', playSound);

// const keys = document.querySelectorAll('.key');
// keys.forEach(key => key.addEventListener('transitionend',removeTransition));

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  console.log(audio);
  if (!audio) return;
  console.log("after return statement");
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

window.addEventListener("keydown", playSound);

function removeTransition(e) {
  //   console.log(e);
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
