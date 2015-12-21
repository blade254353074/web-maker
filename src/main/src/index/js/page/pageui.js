var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global'),
    loading = require('../public/loading');

module.exports = function() {

    var site_config = {
        "siteId": "1575888791", // 项目ID
        "publish": false,
        "name": "Project Name", // 项目名称
        "pageId": "157524328721",
        "pageNav": "site",
        "pages": [{
            "id": "157524328721", //  page_id 页面ID
            "name": "首页",
            "active": true
        }, {
            "id": "187489327432",
            "name": "页面一"
        }, {
            "id": "116289723542",
            "name": "页面二"
        }, {
            "id": "158920374543",
            "name": "页面三"
        }, {
            "id": "154336542453",
            "name": "页面四"
        }],
        "modules": [{
            "name": "内容",
            "list": [{
                "id": "148095289422242", // 控件ID
                "cname": "文章列表",
                "name": "article-list"
            }, {
                "id": "148954239754303",
                "cname": "图集",
                "name": "photo-list"
            }]
        }, {
            "name": "排版",
            "list": [{
                "id": "148954239754303",
                "cname": "图集",
                "name": "photo-list"
            }, {
                "id": "148095289422242", // 控件ID
                "cname": "文章列表",
                "name": "article-list"
            }]
        }, {
            "name": "营销",
            "list": [{
                "id": "148095289422242", // 控件ID
                "cname": "文章列表",
                "name": "article-list"
            }, {
                "id": "148954239754303",
                "cname": "图集",
                "name": "photo-list"
            }]
        }, {
            "name": "第三方",
            "list": [{
                "id": "148954239754303",
                "cname": "图集",
                "name": "photo-list"
            }, {
                "id": "148095289422242", // 控件ID
                "cname": "文章列表",
                "name": "article-list"
            }]
        }],
        "user": {
            "id": "14235323454234",
            "name": "Sebastian Blade"
        }
    };

    global.$app.html(template('./page/index', site_config));

    // 模块选项卡
    var $dragBox = $('#dragBox'),
        $dragPanel = $dragBox.children('ul');

    var $dragBar = $('#dragBar').on('mouseenter', 'li', function() {
        var $this = $(this),
            idx;
        if ($this.hasClass('active')) {
            return;
        }
        idx  = $this.index();
        $this.addClass('active').siblings('.active').removeClass('active');
        $dragPanel.eq(idx).addClass('active').siblings('.active').removeClass('active');
    });

    // 模块对象 bundle
    var moduleBundle = require('../module/bundle');

    /* 拖动模块组件 */
    $dragBox.on('dragstart', '.drag-item', function(event) {
        var $this = $(this),
            path = $this.data('path'),
            name = $this.data('name');
        var dt = event.originalEvent.dataTransfer;
        dt.effectAllowed = 'all';
        dt.setDragImage($this.children('.drag-icon')[0], 30, 22);
        dt.setData('text/path', moduleBundle[name].config.path);
        dt.setData('text/name', name);
    });

    // $dragBox.html(template('./common/module', dragModuleData));

    /* 阻止iframe滚动 */
    var $browserFrame = $('#browserFrame');
    $browserFrame.on('mousewheel', function(event) {
        event.preventDefault();
    });

    /* 模块设置组件 */
    var $optionContent = $('#optionContent'),
        $styleContent = $('#styleContent');

    function sendMessage(data) {
        $browserFrame[0].contentWindow.postMessage(data, '/');
    }
    $(window).on('message', function(event) {

        var e = event.originalEvent,
            data = e.data;
        if (e.origin !== location.origin) {
            return;
        }
        switch (data.action) {
            case 'getConfig':
                // action, name, path
                sendMessage({
                    action: data.action,
                    config: moduleBundle[data.name].config
                });
                break;
            case 'setConfig':
                // action, name, id, config
                var cfg = data.config;
                $optionContent.html(template('./components/' + cfg.name + '/content', cfg.value));
                $styleContent.html(template('./components/' + cfg.name + '/style', cfg.value));

                moduleBundle[cfg.name].func(data.id, cfg); // 为模块配置View绑定模块Controller
                break;
            default:
                break;
        }
    });

    loading.stop();
};
