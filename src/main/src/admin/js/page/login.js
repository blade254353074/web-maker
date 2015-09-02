var $ = require('jquery'),
    template = require('../public/helper'),
    cookie = require('../public/cookie'),
    global = require('../public/global'),
    loading = require('../public/loading');

module.exports = function() {
    global.frameLoad = false;
    global.$app.html(template('./login', {}));
    loading.stop();
    var $loginForm = $('#loginForm'),
        $tip = $('#tip');
    $('#login').on('click', function(event) {
        event.preventDefault();
        var $this = $(this),
            dataStr = $loginForm.serialize()
            dataArr = $loginForm.serializeArray(),
            dataBool = true;
        for (var idx in dataArr) {
            if (dataArr[idx].value.trim() === '') {
                dataBool = false;
                break;
            }
        }
        if (!dataBool) {
            $tip.text('用户名、密码不能为空').show();
            return;
        }
        $tip.hide();
        $this.prop('disabled', true);
        loading.start();
        $.ajax({
            url: '/api/memberAction!memLog.action',
            dataType: 'json',
            data: dataStr,
        }).done(function(data) {
            if (!data.state) {
                $tip.text('用户名或密码错误').show();
                $this.prop('disabled', false);
                return;
            }
            // 登录成功 添加用户数据到全局
            cookie.setCookie('un', data.username);
            global.userData = data;
            global.namespace = '/api/' + data.auth;
            loading.stop();
            location.hash = '#/page';
        }).always(function() {
            $this.prop('disabled', false);
            loading.stop();
        });
    });
}
