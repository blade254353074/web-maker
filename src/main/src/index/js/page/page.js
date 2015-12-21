var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global'),
    loading = require('../public/loading');

module.exports = function() {
/*    if (global.userData.username === '') {
        loading.stop();
        location.hash = '#/login';
        return;
    }*/
    /*if (!global.frameLoad) {
        // header
        var $header = require('./header');
        // navigation
        var $navigation = require('./navigation');
        // page
        var $page = $(template('./page', {}));
        if (location.hash === '#/page') {
            $page.html(template('./page/index', {
                username: global.userData.username
            }));
        }
        global.$app.html($header).append($navigation).append($page);
        // frame加载完成
        global.frameLoad = true;
        global.$page = $page;
        var modal = require('../public/modal');

    } else {
        var $navigation = $('#navigation'),
            hash = location.hash;
        if (hash !== '#/page') {
            var hashLink = hash.match(/^#\/page(\/[^\/]+){2}/)[0];
            $navigation.find('.sub-list').filter('.active').removeClass('active').closest('.nav-item').removeClass('open');
            $navigation.find('a[data-root="' + hashLink + '"]').parent('li').addClass('active').closest('.nav-item').addClass('open');
        } else {
            global.$page.html(template('./page/index', {
                username: global.userData.username
            }));
        }
    }

    loading.stop();*/
};
