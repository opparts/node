var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // 解析 url 参数
    // 只包含了两个参数 一个是name,一个是url，没有实现自动解析全部的参数
    var params = url.parse(req.url, true).query;
    res.write("webname：" + params.name);
    res.write("\n");
    res.write("url：" + params.url);
    res.end();

}).listen(3000);/**
 * Created by apple on 17/3/3.
 */
