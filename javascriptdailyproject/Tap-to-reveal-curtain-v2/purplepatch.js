		
let dragger_one = $(".slide_1 .element_3 ")[0];
var click_macro = "{CLICK_MACRO}";

// slide_1_show();
// function slide_1_show(){
// 	$(".slide_1").removeClass("hidden");
//     $(".slide_1 .drag").addClass("shake");
// }

// function slide_2_show(){
	
// 	$(".slide_1 .element_2").removeClass("pulse");
//   	$(".slide_1 .element").filter((id,div)=>!$(div).hasClass("hidden")).addClass('hideZoomOut');
//   // $("[class^='dragger_']").addClass('hideZoomOut');
//   setTimeout(function() {
//   	$(".slide_2").removeClass('hidden').addClass('showZoomIn');
//   	$(".slide_2 .element_6").addClass('pulse');

//     setTimeout(function(){
//      	$(".slide_2 .element_3").addClass("rightToLeft");
//       setTimeout(function(){
//         $(".slide_2 .element_5").css('opacity','1');
//       },1000)
//     }, 1000);
//   }, 500);
//   $(".pp_wrapper").click(function(){
//     window.open(click_macro);
//   });
// }

if (typeof window.orientation !== 'undefined'){
  dragElementMobile(dragger_one);
}else{
  dragElement(dragger_one);
}


function dragElement( elmnt ) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) 
  {
    // $(".slide_1 .element_6").removeClass("shake").addClass("hidden");
    // $(".slide_1 .element_5").removeClass("shake");
    // $(".slide_1 .element_4").addClass("hideZoomOut");

    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }

  function elementDrag(e) {    
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    topSpace = elmnt.offsetTop - pos2;
    // leftSpace = elmnt.offsetLeft - pos1;

    console.log(topSpace)
    x=topSpace;
    // $(".slide_1 .element_5").css('transform','perspective(500px) rotateY(' + -x + 'deg) rotateZ(-15deg)');
    if(topSpace<107)
    {
       $(".element_7").addClass("leftR");
       $(".element_8").addClass("rightR");
       $(".element_5").addClass("leftL");
       $(".element_6").addClass("rightL");
       setTimeout(function(){
      //   $(".element_7").addClass("hidden");
      //  $(".element_8").addClass("hidden");
      //  $(".element_5").addClass("hidden");
      //  $(".element_6").addClass("hidden");
      //  $(".element_9").addClass("hidden");
      //  $(".element_3").addClass("hidden");
      //  $(".slide_1").addClass("hidden");
       $(".slide_1").css("opacity","0.1");

       },1000)
      // $(".element_8").addClass("hidden");
      // $(".element_7").css("left","-300px");
      // $(".element_8").css("hidden");
      // $(".slide_1 .element_5 .element_5_1").css("opacity","0");
      // $(".slide_1 .element_5 .element_5_2").css("opacity","1");
    }
    if(topSpace>147){
      // $(".element_7").addClass("hidden");
      // $(".element_8").addClass("hidden");
      // setTimeout(slide_2_show, 600);
      closeDragElement();
    }
    // if(leftSpace>175) leftSpace=175;
    // if(leftSpace<20) leftSpace=25;
    if(topSpace>147) topSpace=147;
    if(topSpace<108) topSpace=108;

    elmnt.style.top = topSpace + "px";
    // elmnt.style.left = leftSpace + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function dragElementMobile(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, pos5=0, pos6=0;
  elmnt.ontouchstart = dragMouseDown;
  
  function dragMouseDown(e) {
    // $(".slide_1 .element_6").removeClass("shake").addClass("hidden");
    // $(".slide_1 .element_5").removeClass("shake");
    // $(".slide_1 .element_4").addClass("hideZoomOut");
    e.preventDefault();

    e = e.touches[0] || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e.touches[0] || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    topSpace = elmnt.offsetTop - pos2;
    // leftSpace = elmnt.offsetLeft - pos1;

    x=topSpace;
    // $(".slide_1 .element_5").css('transform','perspective(500px) rotateY(' + -x + 'deg) rotateZ(-15deg)');
    if(topSpace>85)
    {
      $(".slide_1 .element_5 .element_5_1").css("opacity","0");
      $(".slide_1 .element_5 .element_5_2").css("opacity","1");
    }else{
      $(".slide_1 .element_5 .element_5_1").css("opacity","1");
      $(".slide_1 .element_5 .element_5_2").css("opacity","0");
    }

    if(topSpace>170){
      $(".slide_1 .element_5").addClass("hideZoomOut");
      setTimeout(slide_2_show, 600);
      closeDragElement();
    }
    // if(leftSpace>175) leftSpace=175;
    // if(leftSpace<20) leftSpace=25;
    if(topSpace>147) topSpace=147;
    if(topSpace<30) topSpace=35;

    elmnt.style.top = topSpace + "px";
    // elmnt.style.left = leftSpace + "px";   
  }
  function closeDragElement() {
    document.ontouchend = null;
    document.touchmove = null;
  }
}























// function slide_1_show(){
//   $(".slide_1").removeClass("hidden");
//   $(".slide_1").on('click',function(){
//   $(".element_1").addClass("hidden");
//   $(".element_2").addClass("hidden");
//   // $(".element_4").addClass("hidden");
//   $(".element_5").addClass("hidden");
//   $(".element_6").addClass("hidden");
//   $(".slide_2").removeClass("hidden");
//   $(".element_0").addClass("fadeIn");
//   $('.element_3').css({'top':'-250px','transition': '2s ease-in-out'});
//   setTimeout(() => {
//     $(".slide_1").addClass("hidden");
//   }, 2000);

//   }
//   )

// }

// slide_1_show()



