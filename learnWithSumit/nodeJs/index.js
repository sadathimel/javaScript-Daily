// const fs = require('fs'); // file system

// fs.writeFileSync('myfile.txt', 'Hello Programmers');
// // fs.appendFileSync('myfile.txt', ' Hello There', (err) => {
// //     if (err) throw err;
// //     console.log('Successfully written to file');
// // });

// fs.readFile('myfile.txt', (err, read) => {
//     if (err) throw err;
//     console.log(read.toString());
// });
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('message', () => {
    console.log('Hello');
});

emitter.emit('message');
