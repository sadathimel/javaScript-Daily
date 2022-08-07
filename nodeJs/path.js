// console.log(__filename);
const path = require('path');
const myCurrentPath = __filename;
console.log(path.basename(__dirname));
console.log(path.extname(myCurrentPath));

let patObj = {
    dir: 'usr/local',
    name: 'textFile',
    ext: '.js'
}

console.log(path.format(patObj));

console.log(path.isAbsolute(myCurrentPath));

console.log(path.isAbsolute('./math.js'));

console.log(path.join('user', 'local', 'textFile.js'));


console.log(path.resolve(__dirname, 'scripts', 'test.js'));

console.log(path.parse(myCurrentPath));
