var emailF = /^(\w+([\.-]?)\w+@\w+\.\w+(\.\w+)?)$/ ;

document.getElementById("input").addEventListener("keyup", function(){
    email = document.getElementById('input').value;

    if(Boolean(email.match(emailF)))
        document.getElementById('p2').innerHTML = "Accepte Format";

    else

        document.getElementById('p2').innerHTML = "Invalid Format";    

});