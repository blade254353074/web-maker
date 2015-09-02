var $ = require('jquery'),
    template = require('../helper'),
    global = require('../global');

module.exports = {
    on: function(id) {
        console.log(id);
        var $articleWrapper = $('#articleWrapper');
        $articleWrapper.html(template('./public/loading', {}));
        //class初始化
        global.$app.removeClass('article-pop');
        $('#articleCate').off('click').on('click', '.toggle', function(event) {
            event.preventDefault();
            $(this).show();
            if (global.$app.hasClass('article-pop')) {
                global.$app.removeClass('article-pop');
            } else {
                global.$app.addClass('article-pop');
            }
            // 列表隐藏显示
        }).find('li.active').removeClass('active');
        $.ajax({
            url: '/api/artAction!getArt.action',
            dataType: 'json',
            data: {
                id: id
            },
        }).done(function(data) {
            $articleWrapper.html(template('./articleDetail', data));
            global.$app.addClass('article-active');
            $('.artcle-tool').on('click', '.tool-like', function(event) {
                event.preventDefault();
                var $this = $(this);
                if ($this.hasClass('active')) {
                    return;
                }
                $this.addClass('active');
                $.ajax({
                    url: '/api/artAction!artLike.action',
                    dataType: 'json',
                    data: {
                        id: data.id
                    },
                });
            });
            $('.artcle-tool').on('click', '.tool-top', function(event) {
                event.preventDefault();
                global.$app.stop().animate({
                    scrollTop: 0
                }, 200);
            });
        }).fail(function() {
            console.log("error");
        });
        // 发送阅读 + 1
        $.ajax({
            url: '/api/artAction!artRead.action',
            data: {
                id: id
            }
        });
    },
    after: function() {
        global.$app.removeClass('article-active');
    }
};
