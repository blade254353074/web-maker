//member list
var $ = require('jquery'),
    template = require('../../public/helper'),
    global = require('../../public/global'),
    loading = require('../../public/loading');
var modal = require('../../public/modal');
module.exports = function(page) {
    function pageLoad() {
        loading.start();
        $.ajax({
            url: global.namespace + '/proedAction!getList.action',
            dataType: 'json',
            data: {
                page: page
            }
        }).done(function(data) {
            var $panel = $(template('./page/product/list', data));
            global.$page.html($panel);
            // 修改
            $panel.on('click', '.a-modify', function(event) {
                var $tr = $(this).closest('tr'),
                    id = $tr.data('id');
                loading.start();
                $.ajax({
                    url: global.namespace + '/proedAction!getProed.action',
                    dataType: 'json',
                    data: {
                        id: id
                    },
                }).done(function(data) {
                    var modify = require('./modify');
                    // 将id 和 局部页面刷新函数传入
                    modify(id, data, pageLoad);
                }).always(function() {
                    loading.stop();
                });
            });
            // 删除
            $panel.on('click', '.a-delete', function(event) {
                var $tr = $(this).closest('tr'),
                    id = $tr.data('id');
                modal.show({
                    title: '警告',
                    content: '<p>你现在正在进行<strong>产品项目删除</strong>操作</p>' +
                        '<p>请确认</p>',
                    type: 'warning',
                    confirm: function() {
                        event.preventDefault();
                        var $this = $(this);
                        $this.prop('disabled', true);
                        $.ajax({
                            url: global.namespace + '/proedAction!deleteProed.action',
                            dataType: 'json',
                            data: {
                                id: id
                            },
                        }).done(function(data) {
                            if (data.state === false) {
                                modal.show({
                                    title: '信息',
                                    content: '删除失败',
                                    type: 'info'
                                });
                            }
                            modal.show({
                                title: '信息',
                                content: '删除成功',
                                type: 'info',
                                hide: function() {
                                    // 重新加载当前页
                                    pageLoad();
                                },
                            });
                        }).fail(function() {
                            $this.prop('disabled', false);
                        });
                    }
                });
            });
        }).fail(function() {
            console.log("error");
        }).always(function() {
            loading.stop();
        });
    }
    pageLoad();
}
