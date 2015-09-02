var $ = require('jquery'),
    template = require('../../public/helper'),
    global = require('../../public/global'),
    loading = require('../../public/loading');
var modal = require('../../public/modal');

var upload = require('../../public/fileUpload');

module.exports = function() {
    if (global.userData.auth === 'admin') {
        location.hash = '#/page';
        return false;
    }
    loading.start();
    $.ajax({
        url: global.namespace + '/memberAction!getMem.action',
        dataType: 'json'
    }).done(function(data) {
        global.$page.html(template('./page/user/profile', data));
        var $fileBtn = $('.file-btn input[type="file"]');
        $fileBtn.ajaxfileupload({
            action: '/api/imageAction!imageUpload.action',
            onComplete: function(data) {
                var $this = $(this),
                    $btn = $this.closest('.file-btn'),
                    $span = $btn.children('span');
                $span.text('上传文件');
                $btn.removeClass('disabled');
                if (!data.state) {
                    modal({
                        title: '提示',
                        content: '上传失败',
                        type: 'info'
                    });
                    return;
                }
                var $wrapper = $this.closest('.file-wrapper'),
                    $img = $wrapper.children('.img-thumbnail'),
                    $input = $wrapper.children('input[type="hidden"]');
                $img.attr('src', data.url);
                $input.val(data.url);
            },
            onStart: function() {
                var $this = $(this),
                    $btn = $this.closest('.file-btn'),
                    $span = $btn.children('span');
                $span.text('正在上传');
                $btn.addClass('disabled');
            }
        });
        var $submit = $('#submit'),
            $form = $('#form'),
            $fieldset = $form.closest('fieldset');
        $submit.on('click', function(event) {
            event.preventDefault();
            var data = $form.serialize();
            $fieldset.prop('disabled', true);
            $.ajax({
                url: global.namespace + '/memberAction!updateMemM.action',
                dataType: 'json',
                data: data
            }).done(function(data) {
                if (data.state === false) {
                    modal.show({
                        title: '警告',
                        content: '修改失败，数据格式可能不正确',
                        type: 'info',
                        size: 'sm',
                        confirm: function() {
                            $fieldset.prop('disabled', false);
                        }
                    });
                    return;
                }
                modal.show({
                    title: '提示',
                    content: '修改成功',
                    type: 'info',
                    size: 'sm',
                    after: function() {
                        $fieldset.prop('disabled', false);
                    }
                });
            }).fail(function() {
                $fieldset.prop('disabled', false);
            });
        });
    }).always(function() {
        loading.stop();
    });
}
