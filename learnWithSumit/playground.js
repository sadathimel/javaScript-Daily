// let number = (a, b) => {
//     return a + b;
// };
// console.log(number(10,5))

// ES6 fat arrow function 

var javaScript = {
    name : "JavaScript",
    libraries: ["React", "Angular", "vue"],
   
    printLibraries: function () {
        //use object this
        // var self = this;
        // console.log(this);
        // this.libraries.forEach(function(e){
            // console.log(this) //this forEach change this valu
            // console.log(`${this.name} loves ${e}`);

            // now this is a object this
            // console.log(`${self.name} loves ${e}`);
        // })

        // arrow function don't change this value
        this.libraries.forEach((e)=> console.log(`${this.name} loves ${e}`))
    }
}

javaScript.printLibraries();