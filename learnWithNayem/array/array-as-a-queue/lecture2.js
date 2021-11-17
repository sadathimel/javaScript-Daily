const Queue = require('./lecture1');

const queue = new Queue();
queue.enqueue('Task One');
queue.enqueue('Task Two');
queue.enqueue('Task Three');
queue.showQueue();
queue.dequeue();
queue.showQueue();