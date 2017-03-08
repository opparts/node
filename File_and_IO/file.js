/**
 * Created by I034171 on 2017/3/8.
 * 同步读取文件
 */

var fs = require("fs");
var events = require('events');


var file = fs.readFileSync('test.csv');
console.log('----------开始同步读取文件-------');
console.log(file.toString());


/**
 * Created by I034171 on 2017/3/8.
 * 异步读取文件，不等待磁盘IO的操作
 */

var eventEmitter = new events.EventEmitter();

var eventHandler = function (){
    console.log('end')
};

eventEmitter.on('done', eventHandler);

console.log('----------开始异步读取文件-------');
fs.readFile('test.csv', function(err, data){
    console.log('start');
    console.log(data.toString());
    eventEmitter.emit('done');
});

console.log('读文件的code早于本行代码 - 但是缺被后输出，因为异步！');




