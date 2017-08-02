/**
 * Created by apple on 2017/7/31.
 */
//	Getting some 'http' power
var http=require('http');
var kafka = require('kafka-node');

//	Setting where we are expecting the request to arrive.
//	http://localhost:8125/upload
var request = {
    hostname: 'localhost',
    port: 8125,
    method: 'GET'
};

//	Lets create a server to wait for request.;
http.createServer(function(request, response)
{
    //	Making sure we are waiting for a JSON.
    response.writeHeader(200, {"Content-Type": "text/html"});

    //	request.on waiting for data to arrive.
    request.on('data', function (chunk)
    {

        //console.log(chunk.toString('utf8'));
        //define a message object for incoming message from SMS Gateway
        var tbox_message_obj = JSON.parse(chunk);

        if(typeof(tbox_message_obj.device_id) == 'undefined'){
            //Invalid message
            response.end('Missing message');
            console.log('没有定义');


        }else{
            //Valided message
            console.log(tbox_message_obj.device_id);

            var Producer = kafka.Producer,
                client = new kafka.Client('localhost:2181'),
                producer = new Producer(client);
            payloads = [
                { topic: 'test3', messages: chunk.toString('utf8'), partition: 0 },
            ];
            producer.on('ready', function(){
                producer.send(payloads, function(err, data){
                    console.log(JSON.stringify(data) + ': Return from Kafka');
                });
            });
            producer.on('error', function(err){
                console.log('Sending Message failed!');
            })
        }

    });
    response.write('<h1>Server is running 8125....</h1>');
    response.end();
}).listen(8125);
console.log('We are listen 8125 port');