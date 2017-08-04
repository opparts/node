var mysql       = require('mysql');
var schedule    = require('node-schedule');
var redis       = require('redis');



// 秒、分、时、日、月、周几
// 3 2 1 * * *      每天1点2分3秒        执行
// 4 3 2 1 * *      每月1号2点3分4秒     执行
var j = schedule.scheduleJob('40 * * * * *', function(){
    console.log(new Date() + ': Copy data from Remote Mysql Server to Local Redis');
    copy_data_to_redis();
});

// 从Mysql读取全量车辆的数据，然后更新到Redis中
function copy_data_to_redis() {
    var client = mysql.createConnection({
        host   : 'www.hanapost.com',
        user   : 'node',
        password : 'Sap12345',
        database : 'node'
    });

    redis_client = redis.createClient();

    client.connect();

    // 暂时不是用ORM框架，后续再进行改进
    // 从Mysql的车联主数据表中，取出所需要的数据
    // 查询记录
    var query_string = 'select device_id, engine_id, plant, type, product_date from car_master_table';
    client.query(query_string , function selectTable(err, rows, fields){

        //第一层回调函数
        if (err){
            throw err;
            return;
        }
        if (rows){
            for(var i = 0 ; i < rows.length ; i++){
                console.log("%s\t%s\t%s", rows[i].device_id, rows[i].engine_id, rows[i].plant);

                //将数据写入Redis中
                redis_client.hmset(rows[i].device_id, {device_id:rows[i].device_id, engine_id:rows[i].engine_id, plant:rows[i].plant},
                    function(err){
                        if(err) throw err;
                });
            }
        }

    });

    client.end();
}



