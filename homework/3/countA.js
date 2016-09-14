(function (argument) {
    'use strict';

    /**
     * 判断是否为字符‘a’
     * @param
     * @return {Boolean}      [description]
     */
    function isA(element) {
        return element === 'a';
    }

    var testArray1 = ['a', 'b', 'j', 'f', 'i', 'a', 'b', 'd', 'a', 'a'];
    var testArray2 = [1, 5, 6, 14, 2, 7, 3, 14, 64, 12];
    var testString = 'The Quick Brown Fox Jumps Over The Lazy Dog';

    /**
     * 第一题
     * 统计一维字符数组中共有多少个‘a’字符
     * @param  {String} array [description]
     * @return {Number}       [number of a in array]
     */
    function countA (array) {
        var result = array.filter(isA);
        return result.length;
    }

    /**
     * 第二题
     * 累加的方法计算整个数组的总和
     * @param  {Number} array [description]
     * @return {Number}       [sum result]
     */
    function sum (array) {
        var result = array.reduce(function (a, b) {
            return a + b;
        });
        return result;
    }

    /**
     * 第三题
     * 正则匹配的方法交换字符串的开始末尾单词
     * @param  {String} testString [要交换的字符串]
     * @return {String}            [交换完成的字符串]
     */
    function exchange (testString) {
        var re1 = /\S\w*/i;
        var re2 = /(\S*)$/i;
        var result1 = re1.exec(testString);
        var result2 = re2.exec(testString);

        var resultTemp = testString.replace(re1, result2[1]);
        var resultLast = resultTemp.replace(re2, result1[0]);
        return  resultLast;
    }

    console.log(countA(testArray1));    //第一题
    console.log(sum(testArray2));       //第二题
    console.log(exchange(testString));  //第三题
})();