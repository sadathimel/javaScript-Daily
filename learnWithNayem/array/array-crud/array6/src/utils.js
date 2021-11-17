

const fs = require('fs');

module.exports.saveFile = (date, fileName) => {
    try{
        fs.writeFileSync(fileName, JSON.stringify(data));
    }catch(e) {
        console.log(e.message);
        throw new Error(e);
    }
};

module.exports.readFile = (fileName) => {
  try {
    fs.readFileSync(fileName, 'utf-8');
  } catch (e) {
    console.log(e.message);
    throw new Error(e);
  }
};
