//member add
var $ = require('jquery'),
    template = require('../../public/helper'),
    global = require('../../public/global'),
    loading = require('../../public/loading');
var modal = require('../../public/modal');
module.exports = function(id, data, callback) {
    var idData = $.extend({
        id: id
    }, data);
    modal.show({
        title: '修改「' + data.name + '」的详细信息',
        content: template('./page/member/add', idData),
        type: 'confirm',
        confirm: function() {
            var $form = $('#form'),
                $fieldset = $form.closest('fieldset');
            var dataArr = $form.serializeArray(),
                dataBool = true,
                dataUpdate = $form.serialize();
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
                url: global.namespace + '/memberAction!updateMemA.action',
                dataType: 'json',
                data: dataUpdate
            }).done(function(data) {
                if (data.state === false) {
                    modal.show({
                        title: '警告',
                        content: '修改失败',
                        type: 'info',
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
                    confirm: function() {
                        $form.trigger('reset');
                        $fieldset.prop('disabled', false);
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
}
