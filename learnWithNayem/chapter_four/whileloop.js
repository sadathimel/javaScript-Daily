// var i = 0
// while(i < 10){
//     console.log(i + ' is greater than 10');
//     i++;
// }

var isRunning = true;
while(isRunning){
  var rand = Math.floor(Math.random() * 10 + 1)
  if(rand == 9){
      console.log('Winner Winner Chicken Dinner');
      isRunning = false;
  }else{
      console.log('You have hot ' + rand);
  }
}