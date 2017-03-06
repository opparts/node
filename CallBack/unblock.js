var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) {
        return console.error(err);
    } else {
        console.log(data.toString());
    }
});

console.log("程序执行结束!");/**
 * Created by I034171 on 2017/3/6.
 */
