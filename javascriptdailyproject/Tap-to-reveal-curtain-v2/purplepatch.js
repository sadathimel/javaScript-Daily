		
let dragger_one = $(".slide_1 .element_3 ")[0];
var click_macro = "{CLICK_MACRO}";

slide_1_show();
function slide_1_show(){
  $(".element_3").on('click',function(){
    $(".element_3").removeClass("shake");
  });
}


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
  

    console.log(topSpace)
    x=topSpace;
    
    if(topSpace<107)
    {
       $(".element_7").addClass("leftR");
       $(".element_8").addClass("rightR");
       $(".element_5").addClass("leftL");
       $(".element_6").addClass("rightL");
       $(".element_9").addClass("hidden");
       $(".element_3").addClass("hidden");
      
     
       setTimeout(function(){
     
       $(".slide_1").addClass("InnerImage");
        setTimeout(function(){
          $(".slide_1").addClass("hidden");
        },0)
       },500)
     
    }
    if(topSpace>147){
      
      closeDragElement();
    }
   
    if(topSpace>147) topSpace=147;
    if(topSpace<108) topSpace=108;

    elmnt.style.top = topSpace + "px";
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
  
    e.preventDefault();

    e = e.touches[0] || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    document.ontouchmove = elementDrag;
    document.onmouseup = closeDragElement;
  }

  function elementDrag(e) {
    e = e.touches[0] || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    topSpace = elmnt.offsetTop - pos2;
   

    x=topSpace;
   
    if(topSpace<108)
    {
      $(".element_7").addClass("leftR");
      $(".element_8").addClass("rightR");
      $(".element_5").addClass("leftL");
      $(".element_6").addClass("rightL");
      $(".element_9").addClass("hidden");
      $(".element_3").addClass("hidden");
     
    
      setTimeout(function(){
    
      $(".slide_1").addClass("InnerImage");
       setTimeout(function(){
         $(".slide_1").addClass("hidden");
       },0)
      },500)
    
   }


    
    console.log(topSpace)
   
    if(topSpace>147) topSpace=147;
    if(topSpace<108) topSpace=108;

    elmnt.style.top = topSpace + "px";
  
  }
  function closeDragElement() {
    document.ontouchend = null;
    document.touchmove = null;
  }
}
























