var $ = require('jquery');
var director = require('director'),
    template = require('./public/helper'),
    cookie = require('./public/cookie');

var global = require('./public/global'),
    loading = require('./public/loading'),
    modal = require('./public/modal');

module.exports = function() {
    (function() {
        if (!window.console) {
            console = {};
            console.log = function() {};
        }
        $.ajaxSetup({
            error: function() {
                modal.show({
                    title: '警告',
                    content: '网络请求失败',
                    type: 'info'
                });
            },
            complete: function(xhr, status) {
                if (xhr.status == '401') {
                    cookie.delCookie('un');
                    location.hash = '#/login';
                }
            }
        });
        var notfound = function() {

        };

        var routes = {
            '/': 'welcome',
            '/login': 'login',
            '/logout': 'logout',
            '/page': {
                on: 'page',
                '/member': {
                    '/add': 'mbAdd',
                    '/list/:page': 'mbList'
                },
                '/product': {
                    '/add': 'pdAdd',
                    '/list/:page': 'pdList'
                },
                '/article': {
                    '/add': 'artAdd',
                    '/list/:page': 'artList'
                },
                '/option': {
                    '/setup': 'optSetup'
                },
                '/user': {
                    '/profile': 'usrProfile',
                    '/password': 'usrPass'
                },
                '/admin': {
                    '/password': 'adminPass'
                }
            }
        };

        var container = {
            welcome: function() {
                var hash = location.hash;
                if (cookie.getCookie('un') === '') {
                    window.location.hash = '#/login';
                    return;
                }
                if (hash === '#/login' || hash === '#/logout') {
                    global.$header.empty();
                    return;
                }
                if (hash === '#/' || hash === '') {
                    window.location.hash = '#/page';
                    return;
                }
            },
            login: require('./page/login'),
            logout: require('./page/logout'),
            page: require('./page/page'),
            mbAdd: require('./page/member/add'),
            mbList: require('./page/member/list'),
            pdAdd: require('./page/product/add'),
            pdList: require('./page/product/list'),
            artAdd: require('./page/article/add'),
            artList: require('./page/article/list'),
            optSetup: require('./page/option/setup'),
            usrProfile: require('./page/user/profile'),
            usrPass: require('./page/user/password'),
            // adminPass和userPass相同，共用
            adminPass: require('./page/user/password')
        };

        var routerBefore = function() {
                console.log('routerBefore');
            },
            routerOn = function() {
                console.log('routerOn');
            },
            routerAfter = function() {
                console.log('routerAfter');
            }

        var router = director.Router(routes).configure({
            recurse: 'forward',
            strict: true, //当值为"false"时，路径允许以"/"结尾（也可以是其他自定义的分隔符）；默认值是"true"，说明默认不允许路径以"/"结尾
            resource: container,
            notfound: notfound,
            before: routerBefore,
            on: routerOn,
            after: routerAfter
        });
        if (location.hash !== '#/login' && location.hash !== '') {
            loading.start();
            //页面不为login，检测登录
            $.ajax({
                url: '/api/memberAction!memCheckLog.action',
                dataType: 'json'
            }).done(function(data) {
                if (data.state == true) {
                    //已登录，跳转页面
                    $.extend(global.userData, data);
                    global.namespace = '/api/' + data.auth;
                    cookie.setCookie('un', 'admin');
                } else {
                    //未登录，跳转登录hash
                    cookie.delCookie('un');
                    window.location.hash = '#/login';
                }
                router.init('/');
            }).always(function(xhr, status) {
                if (xhr.status === 401) {
                    cookie.delCookie('un');
                    router.init('/login');
                    window.location.hash = '#/login';
                }
            });
            // global.userData = {
            //     avatar: '/assets/imgs/avatar.png',
            //     auth: 'user',
            //     username: 'admin'
            // };
            // cookie.setCookie('un', 'admin');
            // router.init('/');
        } else {
            //页面为login
            //router初始化
            router.init('/');
        }
    }());
}
