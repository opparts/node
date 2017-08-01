var mysql   = require('mysql');
var client = mysql.createConnection({
<<<<<<< HEAD
    host   : 'www.xxxx.com',
    user   : 'xxxx',
    password : 'Sap12345',
    database : 'node'
=======
    host   : 'www.xxx.com',
    user   : 'xxx',
    password : 'xxx',
    database : 'xxxxx'
>>>>>>> origin/master
});

client.connect();

// 查询记录
client.query("select id, name, city from test" , function selectTable(err, rows, fields){
    if (err){
        throw err;
    }
    if (rows){
        for(var i = 0 ; i < rows.length ; i++){
            console.log("%d\t%s\t%s", rows[i].id,rows[i].name,rows[i].city);

        }
    }
});



client.end();
