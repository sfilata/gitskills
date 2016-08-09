window.onload = function () {
    showTime();
};

/**
 * 显示还有多长时间高考
 * @return null
 */
function showTime () {
    var nowTime = new Date();//当前时间
    var nextTimeYear = nowTime.getFullYear();
    var endTime = new Date(nextTimeYear + "/6/8,9:30:00");//结束时间
    var leftTime = parseInt((
            endTime.getTime() - nowTime.getTime()) / 1000); // 取得一共还剩多少秒

    /**
     * 检测是否已过今年高考日期
     * @param  {} leftTime < 0 [已过今天高考日期]
     * @return {[type]} [离下一次高考正确时间]
     */
    if (leftTime < 0) {
        nextTimeYear++;
        endTime = new Date(nextTimeYear + "/6/8,9:30:00");
        leftTime = parseInt((
                endTime.getTime() - nowTime.getTime()) / 1000);
    }

    var d =  parseInt(leftTime / (24 * 60 * 60));
    var h =  parseInt(leftTime / (60 * 60) % 24);
    var m =  parseInt(leftTime / 60 % 60);
    var s =  parseInt(leftTime % 60);

    document.getElementById("show").innerHTML =
    "距高考开场时间还有: <br />"+d + "天 " + h + " 小时 " + m + " 分 " + s + " 秒";

    setTimeout("showTime()", 500);
}


