// 1：事件对应N个事件监听对象


/**
 * Created by I034171 on 2017/3/7.
 */
// 所有的异步I/O操作在完成（例如读完文件了，读完数据库记录了）之后，都会发送一个事件到事件队列（event loop)
// 在NodeJS中，只提供了一个对象，即Event进行事件的“触发”和“监听”。

// 1） 引入 events 模块
var events = require('events');


// 2）创建 eventEmitter 事件发射器，这是第一步，然后再开始创建这个发射器的
// 处理函数
var eventEmitter = new events.EventEmitter();


// 3) 注册ABC时间到一个匿名函数中
eventEmitter.on('event_1', function () {
    console.log("event_1 被触发了！ - 第1个事件监听对象");
});
eventEmitter.on('event_1', function () {
    console.log("event_1 被触发了！ - 第2个事件监听对象");
});
eventEmitter.on('event_1', function () {
    console.log("event_1 被触发了！ - 第3个事件监听对象");
});


// 4）触发abc事件。
console.log("Start 触发-----");
eventEmitter.emit('event_1');
console.log("End   触发-----");



