var $ = require('jquery'),
    template = require('../public/helper'),
    sortable = require('../public/sortable'),
    modal = require('../public/modal');

module.exports = {
    config: {
        name: 'photo-list',
        path: './components/photo-list/',
        value: {
            theme: 1,
            cols: 3, // 默认列数3
            ratio: '4t3', // 默认比例4:3
            list: [{
                pic: '/assets/mobile/imgs/iPhone5s.png'
            }, {
                pic: '/assets/mobile/imgs/ph_pic.png'
            }, {
                pic: '/assets/mobile/imgs/ph_pic.png'
            }]
        }
    },
    func: function(id, config) {
        console.log(id);

        function updateValue() {
            $('#browserFrame')[0].contentWindow.postMessage({
                action: 'setConfig',
                id: id,
                config: config
            }, '/');
        }

        function setValue(key) {
            config.value[key] = this.value;
            updateValue();
            /* //
             $('#optionContent').html(template('./components/' + config.name + '/content', config.value));*/
        }
        $('#theme').on('change', function() {
            setValue.call(this, 'theme');
        });
        $('#select').on('change', function() {
            setValue.call(this, 'cols');
        });
        $('#styleContent').find('input[name="size"]').on('change', function() {
            setValue.call(this, 'ratio');
        });
        var $picList = $('#picList');
        var st = new sortable($picList[0], {
            animation: 200,
            filter: '.del',
            onEnd: function(event) {
                var list = config.value.list,
                    newIdx = event.newIndex,
                    oldIdx = event.oldIndex,
                    newItem;
                if (newIdx !== null && newIdx !== oldIdx) {
                    newItem = list.splice(oldIdx, 1)[0];
                    list.splice(newIdx, 0, newItem);
                    updateValue();
                }

            }
        });
        $picList.on('click', '.del', function() {
            var $item = $(this).closest('li'),
                index = $item.index();
            $item.remove();
            config.value.list.splice(index, 1);
            updateValue();
        });
        $('#addPic').on('click', function() {
            modal.show({
                title: '修改图片',
                content: '加载图库中',
                type: 'confirm',
                before: function() {},
                after: function() {},
                cancel: function() {},
                confirm: function() {},
                hide: function() {}
            });
        });
    }
};
