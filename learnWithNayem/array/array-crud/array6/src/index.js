const { argv } = require("yargs");
const path = require("path");
const Todo = require("./Todo");
const { saveFile, readFile } = require("./utils");
const { ADD, UPDATE, NEXT, DONE, FIND, LIST } = require("./commands");

const fileName = "../data.json";
const filePath = path.resolve(__dirname, fileName);

(function init() {
  const data = readFile(filePath) || [];
  const todo = new Todo(data);
  const { _: baseCommand } = argv;


  switch (baseCommand[0]){
      case ADD: {
          todo.addItem(argv.text)
          console.log('Todo Added')
          
      }
  }



  console.log(argv);
})();
