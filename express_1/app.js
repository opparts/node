/**
 * Created by apple on 17/3/9.
 */

var express = require('express');
var http = require('http');
var path = require('path');


var app = express();

//app.set('port',process.evn.PORT || 3000);
app.set('port',3000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade');


app.all('*',function(req,res){
    res.render('index',{
        msg:'Welcome'

    });

});

http.createServer(app).listen(app.get('port'),function () {
    console.log('Express.js server listening on port:' + app.get('port'));
});


