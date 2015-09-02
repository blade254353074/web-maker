var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global');

module.exports = function() {
    if (global.userData.auth === 'admin') {
        var navData = {
            menu: [{
                title: '管理员',
                icon: 'icon-certificate',
                list: [{
                    title: '密码修改',
                    hash: '#/page/admin/password',
                    root: '#/page/admin/password'
                }]
            }, {
                title: '成员',
                icon: 'icon-user',
                list: [{
                    title: '添加',
                    hash: '#/page/member/add',
                    root: '#/page/member/add'
                }, {
                    title: '列表',
                    hash: '#/page/member/list/1',
                    root: '#/page/member/list'
                }]
            }, {
                title: '产品',
                icon: 'icon-th',
                list: [{
                    title: '添加',
                    hash: '#/page/product/add',
                    root: '#/page/product/add'
                }, {
                    title: '列表',
                    hash: '#/page/product/list/1',
                    root: '#/page/product/list'
                }]
            }, {
                title: '文章',
                icon: 'icon-file',
                list: [{
                    title: '列表',
                    hash: '#/page/article/list/1',
                    root: '#/page/article/list'
                }]
            }, {
                title: '界面配置',
                icon: 'icon-scale',
                list: [{
                    title: '设置',
                    hash: '#/page/option/setup',
                    root: '#/page/option/setup'
                }]
            }]
        };
    } else if (global.userData.auth === 'user') {
        var navData = {
            menu: [{
                title: '个人',
                icon: 'icon-user',
                list: [{
                    title: '资料',
                    hash: '#/page/user/profile',
                    root: '#/page/user/profile'
                }, {
                    title: '密码修改',
                    hash: '#/page/user/password',
                    root: '#/page/user/password'
                }]
            }, {
                title: '文章',
                icon: 'icon-file',
                list: [{
                    title: '发布',
                    hash: '#/page/article/add',
                    root: '#/page/article/add'
                }, {
                    title: '列表',
                    hash: '#/page/article/list/1',
                    root: '#/page/article/list'
                }]
            }]
        };
    }

    var $navigation = $(template('./navigation', navData));
    //navigation初始化
    var $subList = $navigation.find('li.sub-list');
    var hash = location.hash;
    if (hash !== '#/page') {
        var hashLink = hash.match(/^#\/page(\/[^\/]+){2}/)[0];
        $subList.find('a[data-root="' + hashLink + '"]').parent('li').addClass('active').closest('.nav-item').addClass('open');
    }
    //navigation事件绑定
    $navigation.on('click', 'a', function() {
        var $this = $(this),
            $li = $this.parent('li');
        if ($li.hasClass('nav-item')) {
            $li.toggleClass('open').siblings('.open').removeClass('open');
        } else {
            $subList.filter('.active').removeClass('active');
            $li.addClass('active');
        }
    });
    return $navigation;
}
