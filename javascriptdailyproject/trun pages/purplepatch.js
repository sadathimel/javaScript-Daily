// let dragable = $(".slide_1 .dragable")[0];
// slide_1_show();
// function slide_1_show(){
//   $(".slide_1").removeClass("hidden");
//   $(".slide_1 .drag").addClass("shake");
// }

// function slide_2_show(){
//   $(".slide_2").removeClass("hidden");
//   setTimeout(function() {
//     $(".slide_2 .healthyhair").removeClass("hidden").addClass("showZoomIn");
//     setTimeout(function() {
//       $(".slide_2").removeClass("showZoomIn").addClass("flyingMove");
//     }, 202);
//   }, 200);

// }

// function slide_3_show(){
    
//     setTimeout(function() {
//         $(".slide_2").addClass("hidden");
//         $(".slide_3").removeClass("hidden");
//       $(".slide_2").removeClass("showZoomIn").addClass("flyingMove");
//     }, 2000);
// }

// if (typeof window.orientation !== 'undefined'){
//     dragElementMobile(dragable);
// }else{
//     dragElement(dragable);
// }

// function dragElement(elmnt) {
//   var pos1 = 0, pos3 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     $(".slide_1 .drag").removeClass("shake").addClass("hidden");


//     e = e || window.event;
//     e.preventDefault();
//     pos3 = e.clientX;

//     document.onmousemove = elementDrag;
//     document.onmouseup = closeDragElement;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     pos1 = pos3 - e.clientX;
//     pos3 = e.clientX;
//     leftSpace = elmnt.offsetLeft - pos1;

//     draggedResult(elmnt,leftSpace);
//   }

//   function closeDragElement() {
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }

// function dragElementMobile(elmnt) {
//   var pos1 = 0, pos3 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
//   } else {
//     elmnt.ontouchstart = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     $(".slide_1 .drag").removeClass("shake").addClass("hidden");
//     e.preventDefault();

//     e = e.touches[0] || window.event;
//     pos3 = e.clientX;

//     document.ontouchmove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e.touches[0] || window.event;
//     pos1 = pos3 - e.clientX;
//     pos3 = e.clientX;
//     leftSpace = elmnt.offsetLeft - pos1;

//     draggedResult(elmnt,leftSpace);
//   }
//   function closeDragElement() {
//     document.ontouchend = null;
//     document.touchmove = null;
//   }
// }

// function draggedResult(elmnt, leftSpace){
//     if(leftSpace<80){
//     //   $(".hair").css('background','');
//       $(".slide_1 .hair img").addClass("hideZoomOut");
//       $(".slide_1 .drag_output img").addClass("hideZoomOut");
//     //   $(".slide_1 .hair").addClass("fadeInZoom");
//       $(elmnt).addClass("hideZoomOut");
//     //   $(".slide_1 .drag_output").removeClass("hidden").addClass("fadeInZoom");
//       $(".slide_1 .drag_text ").removeClass("zoomInOut").addClass("hideZoomOut");
//       slide_2_show();
//       slide_3_show();
      
//     }

//     if (leftSpace<40) {leftSpace=40}
//     if (leftSpace>230) {leftSpace=230}

//     // elmnt.style.top = "100px";
//     // elmnt.style.bottom = "35px";
//     elmnt.style.left = leftSpace + "px";
// }


    
  
// function slide_2_show(){
//   $(".slide_2 .btn").removeClass("hidden"); 
//       setTimeout(function() {
//         $(".slide_2 .btn").addClass("hidden");
//         $(".slide_3 .etn").removeClass("hidden");
//         setTimeout(function(){
//             $(".slide_2 .btn").addClass("hidden");
//             $(".slide_2 .btn").removeClass("hidden");
//         },2002)
//       }, 2002);
//     }
//     slide_2_show()

setTimeout(slide_2_show, false);

function slide_2_show(){
  $(" .btn").removeClass("hidden"); 
//   $(" .etn").addClass("hidden"); 
      setTimeout(function() {
        $(" .btn").addClass("hidden"); 
        $(".etn").removeClass("hidden");
            setTimeout(() => {
                $(" .etn").addClass("hidden"); 
                slide_2_show();
            }, 2000);
      }, 2000);
    }

  