var $ = require('jquery'),
    cookie = require('../public/cookie'),
    global = require('../public/global');
var modal = require('../public/modal'),
    loading = require('../public/loading');

module.exports = function() {
    loading.start();
    $.ajax({
        url: '/api/memberAction!memQuit.action',
        dataType: 'json'
    }).done(function(data) {
        if (data.state) {
            modal.show({
                title: '提示',
                content: '退出成功'
            });
            cookie.delCookie('un');
            global.$app.empty();
            location.hash = '#/login';
        }
    }).always(function() {
        loading.stop();
    });
}
