// var element = document.getElementById('btn');

function changeImage(){
    var name = document.getElementById("name").value;
    var image = document.getElementById("img");

    image.src = `https://joeschmoe.io/api/v1/${name}`;
}