//member add
var $ = require('jquery'),
    template = require('../../public/helper'),
    global = require('../../public/global'),
    loading = require('../../public/loading');
var modal = require('../../public/modal');

var upload = require('../../public/fileUpload');
module.exports = function() {
    loading.start();
    window.jQuery = window.$ = $;
    $.ajax({
        url: '/assets/admin/js/editor/editor.js',
        dataType: 'script',
        cache: true
    }).done(function() {
        global.$page.html(template('./page/product/add', {}));
        var $cover = $('#cover'),
            $imgUpload = $('#image'),
            $imgWrap = $imgUpload.parent('.file-btn'),
            $imgSpan = $imgWrap.children('span'),
            $field = $('#field');
        var um = UM.getEditor('ueditor');
        $imgUpload.ajaxfileupload({
            'action': '/api/imageAction!imageUpload.action',
            'onComplete': function(data) {
                $imgWrap.removeClass('disabled');
                $imgUpload.prop('disabled', false);
                $imgSpan.text('重新上传');
                if (data.state) {
                    $cover.attr('src', data.url);
                }
            },
            'onStart': function() {
                $imgWrap.addClass('disabled');
                $imgSpan.text('正在上传');
            },
            'onCancel': function() {
                console.log('no file selected');
            }
        });
        $('#submit').on('click', function(event) {
            var $this = $(this),
                dataObj = {},
                dataBool = true,
                dataTip = '';
            $('.data-upload').each(function(index, el) {
                var $el = $(el),
                    name = $el.attr('name'),
                    value = $el.val().trim();
                if (typeof name === undefined) {
                    return;
                }
                if (value === '') {
                    dataTip += name + '内容未填写<br>';
                    dataBool = false;
                    return;
                }
                dataObj[name] = value;
            });
            var content = um.getContent();
            if (content === '') {
                dataTip += '项目内容未填写<br>';
                dataBool = false;
            } else {
                dataObj['content'] = content;
            }
            var imgUrl = $('.img-upload').attr('src');
            if (imgUrl === '') {
                dataTip += '封面未上传';
                dataBool = false;
            } else {
                dataObj['cover'] = imgUrl;
            }
            if (!dataBool) {
                modal.show({
                    title: '提示',
                    content: dataTip,
                    type: 'info'
                });
                return;
            }
            $field.prop('disabled', true);
            $.ajax({
                url: global.namespace + '/proedAction!proedSave.action',
                type: 'post',
                dataType: 'json',
                data: dataObj,
            }).done(function(data) {
                if (!data.state) {
                    modal.show({
                        title: '警告',
                        content: '提交失败，数据格式可能有误',
                        type: 'info'
                    });
                    return;
                }
                modal.show({
                    content: '<p>提交成功</p>' +
                        '<p>点击访问产品链接:<a href="/#/product/detail/' + data.id + '" target="_blank" class="btn-link">「' + dataObj.name + '」</a></p>',
                    type: 'info'
                });
            }).always(function() {
                $field.prop('disabled', false);
            });

        });
    }).always(function() {
        loading.stop();
    });
}
