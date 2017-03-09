/**
 * Created by apple on 17/3/9.
 */

// 创建一个服务器，以及相应的路由
var http = require('http');
var url = require('url');


/*
ULR这个模块专门是用来解析用户传入的URL请求的。
 */
function server() {

    this.start = function(route) {
        function on_request(request, response) {
            var income_pathname = url.parse(request.url).pathname;
            console.log('后端服务器，对您的请求' + income_pathname + '已经收到啦！');

            route(income_pathname);

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("Hello World - come from on_request<p>");
            response.write("income_pathname="+income_pathname);
            response.end();
        };


        // 将on_request 作为createServer的回调函数
        http.createServer(on_request).listen(3300);
        console.log('服务已经开始啦');
        console.log('Server running at http://127.0.0.1:3300/');
    };

}

module.exports = server;


