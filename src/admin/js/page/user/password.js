//member add
var $ = require('jquery'),
    template = require('../../public/helper'),
    global = require('../../public/global'),
    loading = require('../../public/loading');
var modal = require('../../public/modal');

var upload = require('../../public/fileUpload');

module.exports = function() {
    global.$page.html(template('./page/user/password', {}));
    var $form = $('#form'),
        $field = $form.closest('fieldset');
    var $pass1 = $('#password'),
        $pass2 = $('#newPassword');
    $('#submit').on('click', function(event) {
        event.preventDefault();
        var data = $form.serialize(),
            dataArr = $form.serializeArray();
        for (var idx in dataArr) {
            if (dataArr[idx].value === '') {
                modal.show({
                    content: '请填写完整'
                });
                return;
            }
        }
        var pass1 = $pass1.val().trim(),
            pass2 = $pass2.val().trim();
        if (pass1 !== pass2) {
            modal.show({
                content: '两次输入的密码不一致',
                type: 'info',
                hide: function() {
                    $pass1.trigger('select');
                }
            });
            return;
        }
        $field.prop('disabled', true);
        $.ajax({
            url: global.namespace + '/memberAction!modifyPsw.action',
            dataType: 'json',
            data: data
        }).done(function(data) {
            if (!data.state) {
                modal.show({
                    content: '旧密码错误或新密码格式不正确',
                    type: 'info'
                });
                return;
            }
            modal.show({
                content: '密码修改成功',
                type: 'info',
                hide: function() {
                    $form.trigger('reset');
                }
            });
        }).always(function() {
            $field.prop('disabled', false);
        });

    });
};
