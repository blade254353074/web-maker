var $ = require('jquery');

module.exports = {
    config: {
        name: 'article-list',
        path: './components/article-list/',
        value: {
            theme: 1,
            ratio: '1t1',   // 默认4:3
            limit: 2,    // 显示条数，默认两条
            list: [{
                id: 233333,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题长长长长长长长长长长长长长长长长长长长长长长长长',
                summary: '默认简介长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
                time: '2015-09-10'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
            }, {
                id: 66666,
                cover: '/assets/mobile/imgs/ph_pic.png',
                title: '默认标题',
                summary: '默认简介',
                time: '2015-09-16'
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
        }
        $('#theme').on('change', function() {
            setValue.call(this, 'theme');
        });
        $('#styleContent').find('input[name="size"]').on('change', function() {
            setValue.call(this, 'ratio');
        });
        $('#limit').on('change', function() {
            setValue.call(this, 'limit');
        });
    }
};
