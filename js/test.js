$(document).ready(function() {
    var $cr = $('#cr');
    $cr.click(function () {
        if($cr.is(':checked')) {
            alert('感谢你的支持，可以进行下一步操作');
        }
    });
});