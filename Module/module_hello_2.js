/**
 * Created by apple on 17/3/9.
 * 有时候我们只是想把一个对象封装到模块中，格式如下：
 */

function world (){


    var name;
    var sex;
    var city;

    this.setName = function(in_name){
        name = in_name;
    };

    this.sayHello = function(){
      console.log('say hello to world:' + name);
    };

};

module.exports = world;
