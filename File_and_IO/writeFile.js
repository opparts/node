
/**
 * Created by I034171 on 2017/3/8.
 *
 */
var file = require("fs");

console.log("准备写入文件");

// writeFile是创建一个新文件，如果该文件已经存在，会直接覆盖旧的文件的内容
//

file.appendFile('test.csv', '德国, DE',  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------")
    console.log("读取写入的数据！");
    file.readFile('test.csv', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("异步读取文件数据: " + data.toString());
    });
});
