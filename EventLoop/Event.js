// 1） 引入 events 模块
var events = require('events');


// 2）创建 eventEmitter 事件发射器，这是第一步，然后再开始创建这个发射器的
// 处理函数
var eventEmitter = new events.EventEmitter();


// 3.1）首先创建处理程序-A
// 要先定义这个函数，否则下面在绑定的时候，会找不到
var connectHandler = function connected() {
    console.log('连接成功。');

    // 触发 data_received 事件
    eventEmitter.emit('data_received');
};

// 3.2)再创建一个处理程序-B
var closeHandler = function close() {
    console.log('数据发射成功，关闭连接');
};


// 4.1) 绑定一个事件名叫connection,以及将其绑定到一个处理程序A上
eventEmitter.on('connection', connectHandler);


// 4.2) 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', closeHandler);
/*
 下面的方式使用的匿名函数的方式，我替换掉成上面的closehandler了，这个closehandler需要先定义，否则后面绑定的时候找不到
 总之：需要使用的函数，在使用或者绑定前要先与调用点被定义
 eventEmitter.on('data_received', function(){
 console.log('数据接收成功。');
 });*/


// 5) 触发 connection 事件，咯，可以看到下面一行的输出并没有被立即执行。
eventEmitter.emit('connection');

console.log("程序执行完毕。");