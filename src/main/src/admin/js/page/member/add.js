//member add
var $ = require('jquery'),
    template = require('../../public/helper'),
    global = require('../../public/global'),
    loading = require('../../public/loading');
var modal = require('../../public/modal');
module.exports = function() {
    loading.start();
    global.$page.html(template('./page/member/add', {}));
    var $submit = $('#submit'),
        $form = $('#form'),
        $fieldset = $form.closest('fieldset');
    $submit.on('click', function(event) {
        event.preventDefault();
        var dataArr = $form.serializeArray(),
            dataBool = true,
            data = $form.serialize();
        if (dataArr.length === 0) {
            return;
        }
        for (var idx in dataArr) {
            if (dataArr[idx].value.trim() === '') {
                dataBool = false;
                break;
            }
        }
        if (!dataBool) {
            modal.show({
                title: '警告',
                content: '信息未填写完整',
                type: 'info'
            });
            return;
        }
        $fieldset.prop('disabled', true);
        $.ajax({
            url: global.namespace + '/memberAction!memSave.action',
            dataType: 'json',
            data: data
        }).done(function(data) {
            if (data.state === false) {
                modal.show({
                    title: '警告',
                    content: '添加失败',
                    type: 'info',
                    confirm: function() {
                        $fieldset.prop('disabled', false);
                    }
                });
                return;
            }
            modal.show({
                title: '提示',
                content: '添加成功',
                type: 'info',
                confirm: function() {
                    $form.trigger('reset');
                    $fieldset.prop('disabled', false);
                }
            });
        }).fail(function() {
            $form.trigger('reset');
            $fieldset.prop('disabled', false);
        });
    });
    loading.stop();
}
