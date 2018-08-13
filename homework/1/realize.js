/**
 * @file
 * 一个生日倒计时显示器，显示下一场高考当天9:30距现在的时间
 * @author Shu Baiqiao(sfilata@hotmail.com)
 */
window.onload = function () {
    showTime();
};

/**
 * 显示还有多长时间到生日高考
 * @return null
 */
function showTime () {
    var nowTime = new Date();
    // 当前时间
    var nextTimeYear = nowTime.getFullYear();
    var endTime = new Date(nextTimeYear + '/1/9,00:00:00');
    // 结束时间
    var leftTime = +(endTime.getTime() - nowTime.getTime()) / 1000;
    // 取得一共还剩多少秒

    if (leftTime < 0) {
        nextTimeYear++;
        endTime = new Date(nextTimeYear + '/1/9,00:30:00');
        leftTime = +(endTime.getTime() - nowTime.getTime()) / 1000;
    }
    // 若今年已过，则时间改为下一年高考时间，重新计算剩余时间

    var d =  Math.ceil(leftTime / (24 * 60 * 60));
    var h =  Math.ceil(leftTime / (60 * 60) % 24);
    var m =  Math.ceil(leftTime / 60 % 60);
    var s =  Math.ceil(leftTime % 60);
    //计算倒计时的天，小时，分钟，秒

    document.getElementById('show').innerHTML =
    '距高考开场时间还有: <br />'+
    d + '天 ' + h + ' 小时 ' + m + ' 分 ' + s + ' 秒';

    setTimeout('showTime()', 500);
}
