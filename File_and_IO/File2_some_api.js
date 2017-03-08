var file = require("fs");
var events = require('events');

/**
 * Created by I034171 on 2017/3/8.
 * 异步读取文件，不等待磁盘IO的操作
 */

var eventEmitter = new events.EventEmitter();

var eventHandler = function (){
    console.log('-------done----');
};

eventEmitter.on('done', eventHandler);

console.log('----------开始异步读取文件-------内容');
file.readFile('test.csv', function(err, data){
    console.log(data.toString());
    eventEmitter.emit('done');
});

/*
* 学习如何使用file.stat函数
*
* */

var printMetaData =


console.log('----------开始异步读取文件-------Meta信息');
file.stat('test.csv', function (err, stats) {
    if(err){
        return console.err(err.toString());
    };

    console.log(stats);
    console.log('-------done----');
});




