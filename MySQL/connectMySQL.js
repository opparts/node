var mysql   = require('mysql');
var client = mysql.createConnection({
    host   : 'www.xxx.com',
    user   : 'xxx',
    password : 'xxx',
    database : 'xxxxx'
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
