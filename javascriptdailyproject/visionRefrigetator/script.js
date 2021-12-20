
    var status 		= 1;
    let meat 		= $(".slide_1 .element_1")[0];
    let vegetable 	= $(".slide_1 .element_2")[0];
    let fruits 		= $(".slide_1 .element_3")[0];
    let readyfood 	= $(".slide_1 .element_4")[0];
    let drag_text 	= $(".slide_1 .element_5");
    let placed_item = 0;

if (typeof window.orientation !== 'undefined'){
	dragElementMobile(meat, 1);
	dragElementMobile(vegetable, 2);
	dragElementMobile(fruits, 3);
	dragElementMobile(readyfood, 4);
}else{
	dragElement(meat, 1);
	dragElement(vegetable, 2);
	dragElement(fruits, 3);
	dragElement(readyfood, 4);
}

function dragElement( elmnt, item ) {
  var pos1 = 0, pos3 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {  
  	$(elmnt).removeClass('shake');
  	$(elmnt).css('zIndex',99);

    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }

  function elementDrag(e) {    
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    leftSpace = elmnt.offsetLeft - pos1;

    draggedResult( elmnt, leftSpace, item );     
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function dragElementMobile(elmnt, item) {
  var pos1 = 0, pos3 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
  } else {
    elmnt.ontouchstart = dragMouseDown;
  }

  function dragMouseDown(e) {
    $(elmnt).removeClass('shake');
  	$(elmnt).css('zIndex',99);

    e.preventDefault();

    e = e.touches[0] || window.event;
    pos3 = e.clientX;
    
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e.touches[0] || window.event;
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    leftSpace = elmnt.offsetLeft - pos1;

    draggedResult(elmnt,leftSpace, item);   
  }
  function closeDragElement() {
    document.ontouchend = null;
    document.touchmove = null;
  }
}

function draggedResult(elmnt, leftSpace, item){

  	if(leftSpace>109){

  		switch (item) {
  			case 1:
  				placed_item += 1;
  				$(elmnt).addClass("slide_1_anim").removeClass('element_1');
  				break;
  			case 2:
  				placed_item += 1;
  				$(elmnt).addClass("slide_2_anim").removeClass('element_2');
  				break;
  			case 3:
  				placed_item += 1;
  				$(elmnt).addClass("slide_3_anim").removeClass('element_3');
  				break;
  			case 4:
  				placed_item += 1;
  				$(elmnt).addClass("slide_4_anim").removeClass('element_4');
  				break;
  		}

  		if ( $(".slide_1 [class^='element_']").length < 2 && status ==1 ) {
  			status = 0;
  			drag_text.addClass("hideZoomOut");
  			setTimeout(close_fridge, 1000);
  		}
      
    }
    if (leftSpace<18) {leftSpace=18}
    if (leftSpace>120) {leftSpace=120}

    elmnt.style.left = leftSpace + "px";
}


function close_fridge ( ) {
	console.log('status');
	$(".slide_2 .element_7").addClass('door_rotate');
	setTimeout(function(){
		$(".slide_2 .element_7").addClass('hidden');
		$(".slide_2 .element_fridge").removeClass('hidden');
		$(".slide_2 .element_fridge").addClass('fridge_rotate');
		setTimeout(function(){
			$(".slide_1").addClass('hidden');
			$(".slide_2").css({'right':'90px','transition': 'right .5s'});
			setTimeout(function(){
				$(".slide_2 .element_6").addClass('hidden');
				$(".slide_2 .element_fridge").addClass('hidden');
				$(".slide_3").removeClass('hidden').addClass('showZoomIn');
				setTimeout(function(){
				$(".slide_3 .element_10").addClass('pulse');
				},600)
			}, 800);
		}, 500);
	}, 1200);
}

$(document).ready(function(){
    $(".pp_wrapper").click(function(){
        if ($(".slide_3 .element_10").hasClass("pulse")) {
            window.open("{CLICK_MACRO}");
        }
    });
});


