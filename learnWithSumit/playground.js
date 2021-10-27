// let number = (a, b) => {
//     return a + b;
// };
// console.log(number(10,5))

// ES6 fat arrow function 

var javaScript = {
    name : "JavaScript",
    libraries: ["React", "Angular", "vue"],
    printLibraries: function () {
        this.libraries.forEach(function(e){
            console.log(`${this.name} loves ${e}`);
        })
    }
}

javaScript.printLibraries();