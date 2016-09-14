define(function (require) {
    var mod = require('./lib/jquery-3.1.0.min');

    var test = function () {
        $(document).ready(function() {
            var $cr = $('#cr');
            var cr = $cr[0];
            $cr.click(function () {
                if(cr.checked) {
                    alert('感谢你的支持，可以进行下一步操作');
                }
            });
        });
    };

    return function () {
        test();
    };
});