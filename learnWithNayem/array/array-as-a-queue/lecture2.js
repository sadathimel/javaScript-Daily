const Queue = require('./lecture1');

// const queue = new Queue();
// queue.enqueue('Task One');
// queue.enqueue('Task Two');
// queue.enqueue('Task Three');
// queue.showQueue();
// queue.dequeue();
// queue.showQueue();


const q = [];
q.push('Item One');
q.push('Item Two');
q.push('Item Three');
console.log(q);
q.shift();
q.shift();
console.log(q);