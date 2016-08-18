requirejs.config({
    baseurl: 'js/lib',

    paths: {
        app: '../app'
    }
});

// start the main app logic
requirejs(['hquery', 'canvas', 'app/sub'],
    function ($, canvas, sub) {

});

define({
    color: 'black',
    size: 'unsize'
});

define(function (require) {
    var mod = require('./app');
});