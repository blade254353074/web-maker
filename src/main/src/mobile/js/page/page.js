var $ = require('jquery'),
    template = require('../public/helper'),
    util = require('../public/util');

module.exports = function() {
    util.global.$app.html(template('./page/index', {}));
    // 初始化DropArea
    var $dropArea = $('#dropArea'),
        $pl = $(template('./common/module-placeholder', {}));
    var firstDrop = false;
    $dropArea.on({
        dragover: function(event) {
            if (event.originalEvent.dataTransfer.types[0] !== 'text/name') {
                event.originalEvent.dataTransfer.dropEffect = 'none';
                return false;
            } else {
                event.preventDefault();

            }
            // 针对拖放的目标元素，必须在dragend或dragover事件内调用 event.preventDefault() 方法。因为默认情况下，拖放的目标元素是不允许接受元素的，为了把元素拖放到其中，必须把默认处理关闭。
        },
        dragleave: function(event) {
            var clientX = event.originalEvent.clientX,
                $module;
            if (clientX < 0 || clientX > $dropArea.width()) {
                $module = $(event.target);
                var $dropModule = $module.closest('.drop-module');
                if ($dropModule.length) {
                    $dropModule.removeData('add');
                } else if ($module.hasClass('module-placeholder')) {
                    var add = $module.data('add');
                    if (add === 'before') {
                        $module.next('.drop-module').removeData('add');
                    } else if (add === 'after') {
                        $module.prev('.drop-module').removeData('add');
                    }
                }
                $pl.remove();
            }
        },
        dragenter: function(event) {
            if (event.originalEvent.dataTransfer.types[0] !== 'text/name') {
                return false;
            }
            if (firstDrop) {
                return;
            }
            $dropArea.append($pl);
        },
        drop: function(event) {
            if (event.originalEvent.dataTransfer.types[0] !== 'text/name') {
                return false;
            }
            event.preventDefault();

            var dt = event.originalEvent.dataTransfer,
                name = dt.getData('text/name'),
                path = dt.getData('text/path');
            // 向parent 发送 获取配置请求
            sendMessage({
                action: 'getConfig',
                name: name,
                path: path
            });
        },
        dragend: function(event) {
            var dt = event.originalEvent.dataTransfer;
            dt.clearData('text/name');
            dt.clearData('text/path');
        }
    });

    $dropArea.on('dragover', '.drop-module', function(event) {
        if (event.originalEvent.dataTransfer.types[0] !== 'text/name') {
            return false;
        }
        event.preventDefault();
        var $this = $(this),
            top = $this.offset().top,
            height = $this.outerHeight(true),
            add = $pl.data('add');
        // console.log(event.originalEvent.pageY - top + ' ' + height / 2);
        if (add === 'before' && event.originalEvent.pageY - top >= height / 2) {
            $this.data('add', 'after');
            $pl.data('add', 'after').insertAfter(this);
            return;
        }
        if (add === 'after' && event.originalEvent.pageY - top < height / 2) {
            $this.data('add', 'before');
            $pl.data('add', 'before').insertBefore(this);
        }
    });

    $dropArea.on('dragenter', '.drop-module', function(event) {
        if (event.originalEvent.dataTransfer.types[0] !== 'text/name') {
            return false;
        }
        event.preventDefault();
        event.stopPropagation();
        var $this = $(this),
            top = $this.offset().top,
            height = $this.outerHeight(true),
            add = $pl.data('add');
        if ($this.data('data')) {
            return;
        }
        if (event.originalEvent.clientY - top < height / 2) {
            $this.data('add', 'before');
            $pl.prev('.drop-module').removeData('add');
            $pl.data('add', 'before').insertBefore($this);
        } else {
            $this.data('add', 'after');
            $pl.next('.drop-module').removeData('add');
            $pl.data('add', 'after').insertAfter($this);
        }
    });

    $dropArea.on('dragenter', '.module-placeholder', function(event) {
        event.stopPropagation();
    });

    $dropArea.on('click', 'a', function(event) {
        event.preventDefault();
    });

    /* 模块生成函数 */
    function moduleMake(config, id) {
        // config [name, path, value]
        console.log(config);
        var name = config.name,
            path = config.path + 'theme' + config.value.theme;
        var $dropModule = $(template(path, config.value));
        $dropModule.data('name', name)
            .data('config', config)
            .addClass('drop-module');
        if (id) {
            $dropModule.attr('id', id);
        } else {
            $dropModule.attr('id', (new Date()).valueOf());
        }
        $dropModule.append(template('./common/module-control', {}));
        return $dropModule;
    }

    function drop(event) {
        var dt = event.originalEvent.dataTransfer;
        var name, path, add;
        if (dt.types[0] !== 'text/name') {
            return false;
        }
        event.stopPropagation();
        event.preventDefault();
        name = dt.getData('text/name');
        path = dt.getData('text/path');
        add = $pl.data('add');
        if (add === 'before') {
            $pl.next('.drop-module').removeData('add');
        } else if (add === 'after') {
            $pl.prev('.drop-module').removeData('add');
        }
        // 向parent 发送 获取配置请求
        sendMessage({
            action: 'getConfig',
            name: name,
            path: path
        });
    }

    $dropArea.on('drop', '.drop-module', function(event) {
        drop(event);
    });

    $dropArea.on('drop', '.module-placeholder', function(event) {
        drop(event);
    });

    /* 模块移动 */
    var $moveElem;
    var $doc = $(document);
    $dropArea.on('mousedown', '.module-move', function(event) {
        event.preventDefault();
        var $this = $(this);
        $moveElem = $this.closest('.drop-module').addClass('moving');
        $doc.data('moving', true);
        mouseBind();
    });

    function mouseBind() {
        $dropArea.on('mousemove', '.drop-module', function(event) {
            if (!$doc.data('moving')) {
                return;
            }
            var $this = $(this),
                top = $this.offset().top,
                height = $this.outerHeight(true);
            // if ($.hasData(this)) {
            //     return;
            // }
            if (event.originalEvent.clientY - top < height / 2) {
                $this.data('add', 'before');
                $pl.prev('.drop-module').removeData('add');
                $pl.data('add', 'before').insertBefore($this);
            } else {
                $this.data('add', 'after');
                $pl.next('.drop-module').removeData('add');
                $pl.data('add', 'after').insertAfter($this);
            }
        });

        $doc.on('mousemove', function(event) {
            //event.preventDefault();
            var $this = $(this);
            if (!$doc.data('droppable')) {
                $doc.data('droppable', true);
                $pl.data('add', 'before').insertBefore($moveElem);
            }
            if ($this.data('moving')) {
                var width = $moveElem.outerWidth();
                $moveElem.css({
                    position: 'absolute',
                    width: width,
                    zIndex: '100'
                });
                $moveElem.offset(function(index, currentCoordinates) {
                    var pos = {
                        top: event.originalEvent.pageY - 12.5,
                        left: 0
                    };
                    return pos;
                });
            }
        });
        $doc.on('mouseup', function(event) {
            event.preventDefault();
            if ($doc.data('droppable')) {
                $moveElem.removeClass('moving').attr('style', '');
                var add = $pl.data('add');
                if (add === 'before') {
                    $pl.next('.drop-module').removeData('add');
                } else if (add === 'after') {
                    $pl.prev('.drop-module').removeData('add');
                }
                $pl.replaceWith($moveElem);
            }
            $moveElem.removeClass('moving');
            $moveElem = undefined;
            $doc.data({
                moving: false,
                droppable: false
            }).off('mouseup').off('mousemove');
            $dropArea.off('mousemove');
        });
    }
    /* 模块设置组件 */
    /* 模块点击，开始配置 */
    $dropArea.on('click', '.drop-module', function() {
        var $this = $(this),
            postData = {};
        if ($this.hasClass('active')) {
            return;
        }
        $this.addClass('active').siblings('.active').removeClass('active');
        /* 获取模块action, name, id, 并发送到父窗口 */
        postData.action = 'setConfig';
        postData.id = $this.attr('id');
        postData.config = $this.data('config');
        sendMessage(postData);
    });

    function sendMessage(data) {
        window.parent.postMessage(data, '/');
    }
    // 接收模块配置
    $(window).on('message', function(event) {
        var e = event.originalEvent,
            data = e.data;
        if (e.origin !== location.origin) {
            return;
        }
        switch (data.action) {
            case 'getConfig':
                // 向parent发出获取配置请求的返回
                // 获得的的data有 action, config
                var $dropModule = moduleMake(data.config);
                $pl.replaceWith($dropModule);
                $dropModule.trigger('click');
                // $dropModule.siblings('.active').removeClass('active');
                firstDrop = true;
                break;
            case 'setConfig':
                // action id config
                console.log('setConfig');
                var $newModule = moduleMake(data.config, data.id);
                $newModule.addClass('active');
                $('#' + data.id).replaceWith($newModule);
                break;
            default:
                break;
        }
    })

    util.loading.stop();
};
