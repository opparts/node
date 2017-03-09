/**
 * Created by apple on 17/3/9.
 */

//将函数作为参数传入

/*test*/

function test(test){
    console.log(test);
};

function calltest(testFunction, value){
    testFunction(value);

};

calltest(test,'这是我传入的');

