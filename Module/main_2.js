/**
 * Created by apple on 17/3/9.
 */

// 这里引用的是一个对象了

var hello = require('./module_hello_2');

hello = new hello();

hello.setName('我是谁！');
hello.sayHello();
