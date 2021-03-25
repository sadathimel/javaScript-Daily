$("button").click(function(){
    var text = $(this).text();
console.log("You clicked " + text);
});

$("button").on("mouseenter", function(){
    $(this).css("font-weight","bold");
})

$("button").on("mouseleave", function(){
    $(this).css("font-weight","normal");
})

$("input").on("keypress",function(){
    console.log("keypressed!");
});

$("h1").on("click", function(){
    $("h1").css("color","red");
});
$("h1").on("click", function(){
    $(this).css("color","blue");
});
