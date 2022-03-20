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

emitter.on('message', ({ period, text }) => {
    console.log(`Hello ${period} ${text}`);
});
setTimeout(() => {
    emitter.emit('message', {
        period: 'first',
        text: 'period ended',
    });
}, 2000);
