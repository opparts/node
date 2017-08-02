/**
 * Created by Alex Liu on 2017/7/31.
 */
var http=require('http');
var kafka = require('kafka-node');
var redis = require('redis');

//	Setting where we are expecting the request to arrive.
//	http://localhost:8125
var request = {
    hostname: 'localhost',
    port: 8125,
    method: 'GET'
};

//创建一个redis的链接client
//创建一个redis的链接client
var redis_client = redis.createClient();

//	Lets create a server to wait for request.;
http.createServer(function(request, response)
{
    //	Making sure we are waiting for a JSON.
    response.writeHeader(200, {"Content-Type": "text/html"});

    //	request.on waiting for data to arrive.
    request.on('data', function (chunk)
    {

        //第1层回调地狱
        //define a message object for incoming message from SMS Gateway
        var tbox_message_obj = JSON.parse(chunk);

        if(typeof(tbox_message_obj.device_id) == 'undefined'){
            //无效的消息 message
            response.end('Missing message, do nothing');

        }else{

            //校验消息的来源是否正确
            console.log(tbox_message_obj.device_id);
            redis_client.hgetall(tbox_message_obj.device_id, function(err, object) {

                if(err){
                    console.log(err);
                    return;
                }
                var obj_string = JSON.stringify(object);
                var json_obj = JSON.parse(obj_string);
                if(json_obj == null){
                    console.log('没有找到车牌号');
                    return;
                }

                //第2层回调地狱
                if(json_obj.device_id.length > 0 ){
                    //有效的消息
                    var Producer = kafka.Producer,
                        client = new kafka.Client('localhost:2181'),
                        producer = new Producer(client);
                    payloads = [
                        { topic: 'test3', messages: chunk.toString('utf8'), partition: 0 },
                    ];

                    producer.on('ready', function(){
                        //第3层回调地狱
                        producer.send(payloads, function(err, data){
                            console.log(JSON.stringify(data) + ': Return from Kafka');
                        });
                    });
                    producer.on('error', function(err){
                        //第3层回调地狱
                        console.log('Sending Message failed!');
                    })
                }else{
                    console.log('非我厂的车架号');
                }
            })
        }
    });
    response.write('<h1>Server is running 8125....</h1>');
    response.end();
}).listen(8125);
console.log('We are listen 8125 port');