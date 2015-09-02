//member add
var $ = require('jquery'),
    template = require('../../public/helper'),
    global = require('../../public/global'),
    loading = require('../../public/loading');
var modal = require('../../public/modal');

var upload = require('../../public/fileUpload');

module.exports = function(id, data, callback) {
    var idData = $.extend({
        id: id
    }, data);
    modal.show({
        title: '修改文章「' + data.title + '」的内容',
        content: template('./page/article/add', idData),
        type: 'confirm',
        size: 'lg',
        after: function() {
            loading.start();
            window.jQuery = window.$ = $;
            $.ajax({
                url: '/assets/admin/js/editor/editor.js',
                dataType: 'script',
                cache: true
            }).done(function() {
                var um = UM.getEditor('ueditor');
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
            }).always(function() {
                loading.stop();
            });
        },
        confirm: function() {
            var $form = $('#form'),
                $fieldset = $form.closest('fieldset');
            event.preventDefault();
            var data = $form.serialize(),
                dataArr = $form.serializeArray();

            for (var idx in dataArr) {
                if (dataArr[idx].value === '') {
                    modal.show({
                        content: '请将表单内容填写完整'
                    });
                    return;
                }
            }
            //beforeSend
            $fieldset.prop('disabled', true);
            $.ajax({
                url: global.namespace + '/artAction!updateArt.action',
                type: 'post',
                dataType: 'json',
                data: data
            }).done(function(data) {
                if (data.state === false) {
                    modal.show({
                        title: '警告',
                        content: '文章修改失败，数据格式可能不正确',
                        type: 'info',
                        confirm: function() {
                            $fieldset.prop('disabled', false);
                        }
                    });
                    return;
                }
                modal.show({
                    content: '<p>修改成功</p>' +
                        '<p>点击访问文章链接:<a href="/#/article/detail/' + data.id + '" target="_blank" class="btn-link">「' + data.title + '」</a></p>',
                    type: 'info',
                    after: function() {
                        $fieldset.prop('disabled', false);
                    },
                    hide: function() {
                        if (callback) {
                            try {
                                callback();
                            } catch (e) {}
                        }
                    }
                });
            }).fail(function() {
                $fieldset.prop('disabled', false);
            });
        }
    });
};
