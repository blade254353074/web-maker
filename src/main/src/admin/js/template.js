/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    /*v:13*/
    template("header", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), avatar = $data.avatar, username = $data.username, $out = "";
        return $out += '<div class="header"> <div class="header-logo"> <a href="#/page"><h2><span>[ </span>QED<span> ]</span></h2></a> </div> <div class="header-nav"> <div class="nav-left"></div> <div class="nav-right"> <div class="user-menu"> <a href="#/user/home" class="bar"> <img src="', 
        $out += $escape(avatar), $out += '" class="avatar"> <div class="name"> <span>', 
        $out += $escape(username), $out += '</span> <span class="caret"></span> </div> </a> <ul class="list"> <li> <a href="#/page/user/profile" class="text-icon"> <span class="icon icon-user"></span> <span>我的资料</span> </a> </li> <li> <a href="#/page/user/task/unread" class="text-icon"> <span class="icon icon-tasks"></span><span>我的任务</span> </a> </li> <li> <a href="#/logout" class="text-icon"> <span class="icon icon-off"></span><span>退出</span> </a> </li> </ul> </div> </div> </div> </div> ', 
        new String($out);
    }), /*v:14*/
    template("login", '<div class="login-form"> <form id="loginForm"> <div class="form-group"> <label for="username">用户名</label> <input id="username" name="username" class="form-control" type="text" autofocus> </div> <div class="form-group"> <label for="password">密码</label> <input id="password" name="password" class="form-control" type="password"> </div> <p id="tip" class="tips"></p> <p class="text-center"> <input type="submit" value="登录" id="login" class="btn btn-primary"></input> </p> </form> </div> '), 
    /*v:9*/
    template("navigation", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), menu = $data.menu, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = ($data.item, "");
        return $out += '<ul id="navigation" class="nav"> ', $each(menu, function($value) {
            $out += ' <li class="nav-item"> <a> <span class="icon ', $out += $escape($value.icon), 
            $out += '"></span> <span>', $out += $escape($value.title), $out += '</span> <span class="symbol"></span> </a> ', 
            0 !== $value.list.length && ($out += ' <ul class="sub-nav"> ', $each($value.list, function(item) {
                $out += ' <li class=\'sub-list\'> <a class="sub-item" href="', $out += $escape(item.hash), 
                $out += '" data-root="', $out += $escape(item.root), $out += '"> <span>', $out += $escape(item.title), 
                $out += "</span> </a> </li> ";
            }), $out += " </ul> "), $out += " </li> ";
        }), $out += " </ul> ", new String($out);
    }), /*v:9*/
    template("page", '<div class="page container-fluid"></div> '), /*v:6*/
    template("page/index", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), username = $data.username, $out = "";
        return $out += '<section class="panel container"> <header class="panel-heading"> <h3>欢迎回来「', 
        $out += $escape(username), $out += '」！</h3> </header> <div class="panel-body"> <blockquote class="callout-success"> <p> <label>老乞丐：</label> <span>小兄弟，老夫看你骨骼惊奇，根骨奇佳乃是百年不遇的练武奇才，</span> </p> <p> <label>老乞丐：</label> <span>我看与你有缘，收你十块钱，传授给你吧。</span> </p> <a href="/" class="btn btn-link">《武林秘籍》，点击获得</a> <p> <label>老乞丐：</label> <span>未来拯救世界的任务就要你来完成了！</span> </p> </blockquote> </div> </section> ', 
        new String($out);
    }), /*v:4*/
    template("public/loading", '<div class="loading"> <div class="loading-pacman"> <div></div> <div></div> <div></div> <div></div> <div></div> </div> </div> '), 
    /*v:6*/
    template("public/modal", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), title = $data.title, $string = $utils.$string, content = $data.content, $out = "";
        return $out += '<div class="modal" tabindex="-1"> <div class="modal-dialog modal-sm"> <div class="modal-content"> <div class="modal-header">', 
        $out += $escape(title), $out += '</div> <div class="modal-body">', $out += $string(content), 
        $out += "</div> </div> </div> </div> ", new String($out);
    }), /*v:1*/
    template("public/notfound", "notfound.html "), /*v:32*/
    template("page/article/add", function($data) {
        "use strict";
        var $utils = this, state = ($utils.$helpers, $data.state), id = $data.id, $escape = $utils.$escape, limit = $data.limit, title = $data.title, type = $data.type, summary = $data.summary, cover = $data.cover, banner = $data.banner, $string = $utils.$string, content = $data.content, $out = "";
        return $out += '<div class="container"> ', state || ($out += " <legend>文章发布</legend> "), 
        $out += ' <fieldset> <form id="form"> ', id && ($out += ' <input name="id" value="', 
        $out += $escape(id), $out += '" type="hidden"> '), $out += ' <div class="form-group"> <label>公开与否</label> <p> <label class="radio-inline"> ', 
        $out += limit ? ' <input name="limit" type="radio" value="true" checked> ' : ' <input name="limit" type="radio" value="true"> ', 
        $out += ' 公开 </label> <label class="radio-inline"> ', $out += limit ? ' <input name="limit" type="radio" value="false"> ' : ' <input name="limit" type="radio" value="false" checked> ', 
        $out += ' 私有 </label> </p> </div> <div class="form-group"> <label for="title">文章名称</label> <input value="', 
        $out += $escape(title), $out += '" name="title" id="title" type="text" class="form-control"> </div> <div class="form-group"> <label for="type">文章类别</label> <select name="type" class="form-control"> ', 
        type && ($out += " ", "front-end-development" === type ? ($out += ' <option value="', 
        $out += $escape(type), $out += '">前端开发</option> ') : "back-end-development" === type ? ($out += ' <option value="', 
        $out += $escape(type), $out += '">后端开发</option> ') : "visual-design" === type ? ($out += ' <option value="', 
        $out += $escape(type), $out += '">视觉设计</option> ') : "team-life" === type && ($out += ' <option value="', 
        $out += $escape(type), $out += '">团队生活</option> '), $out += " "), $out += ' <option value="front-end-development">前端开发</option> <option value="back-end-development">后端开发</option> <option value="visual-design">视觉设计</option> <option value="team-life">团队生活</option> </select> </div> <div class="form-group"> <label for="summary">文章简介</label> <input value="', 
        $out += $escape(summary), $out += '" name="summary" id="summary" type="text" class="form-control"> </div> <div class="form-group"> <label for="image">封面上传</label> <div class="file-wrapper"> ', 
        cover ? ($out += ' <img src="', $out += $escape(cover), $out += '" class="img-thumbnail"> ') : $out += ' <img src="/assets/admin/imgs/artCover.png" class="img-thumbnail"> ', 
        $out += ' <input value="', $out += $escape(cover), $out += '" name="cover" type="hidden"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" type="file"> </a> </div> </div> <div class="form-group"> <label for="image">Banner上传</label> <div class="file-wrapper"> ', 
        banner ? ($out += ' <img src="', $out += $escape(banner), $out += '" class="img-thumbnail"> ') : $out += ' <img src="/assets/admin/imgs/artBanner.png" class="img-thumbnail"> ', 
        $out += ' <input value="', $out += $escape(banner), $out += '" name="banner" type="hidden"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" type="file"> </a> </div> </div> <div class="form-group"> <label for="ueditor">文章内容</label> <script type="text/plain" id="ueditor" style="width:100%;min-height:400px;z-index:99;">', 
        $out += $string(content), $out += "</script> </div> ", state || ($out += ' <p class="text-right"> <button id="submit" class="btn btn-primary">提交</button> </p> '), 
        $out += " </form> </fieldset> </div> ", new String($out);
    }), /*v:13*/
    template("page/article/list", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, $each = $utils.$each, list = $data.list, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $string = $utils.$string, total = $data.total, page = $data.page, $out = "";
        return $out += '<section class="panel"> <header class="panel-heading">文章管理列表</header> <div class="panel-body"> <table class="table table-striped table-bordered"> <thead> <tr> <th class="id">ID</th> <th>标题</th> <th style="width:75px;">分类</th> <th>简介</th> <th style="width:45px;">阅读</th> <th style="width:45px;">喜欢</th> <th style="width:95px;">时间</th> <th style="width:190px;">操作</th> </tr> </thead> <tbody> ', 
        $each(list, function($value) {
            $out += ' <tr data-id="', $out += $escape($value.id), $out += '"> <th scope="row">', 
            $out += $escape($value.id), $out += "</th> <td>", $out += $escape($value.title), 
            $out += "</td> <!-- <td>", $out += $escape($value.type), $out += "</td> --> <td> ", 
            "front-end-development" === $value.type ? $out += " 前端开发 " : "back-end-development" === $value.type ? $out += " 后端开发 " : "visual-design" === $value.type ? $out += " 视觉设计 " : "team-life" === $value.type ? $out += " 团队生活 " : ($out += " ", 
            $out += $escape($value.type), $out += " "), $out += " </td> <td>", $out += $escape($value.summary), 
            $out += "</td> <td>", $out += $escape($value.read), $out += "</td> <td>", $out += $escape($value.like), 
            $out += "</td> <td>", $out += $escape($value.time), $out += '</td> <td> <a href="/#/article/detail/', 
            $out += $escape($value.id), $out += '" class="btn btn-link" target="_blank">查看</a> <button class="a-modify btn btn-warning">修改</button> <button class="a-delete btn btn-danger">删除</button> </td> </tr> ';
        }), $out += ' </tbody> </table> <nav class="text-center"> <div class="pagination">', 
        $out += $string($helpers.paging(total, page, "#/page/article/list/")), $out += "</div> </nav> </div> </section> ", 
        new String($out);
    }), /*v:38*/
    template("page/member/add", function($data) {
        "use strict";
        var $utils = this, state = ($utils.$helpers, $data.state), $escape = $utils.$escape, id = $data.id, username = $data.username, name = $data.name, job = $data.job, jointime = $data.jointime, $out = "";
        return $out += '<div class="container"> <div class="row"> <fieldset> ', state || ($out += " <legend>成员添加</legend> "), 
        $out += ' <form id="form" class="form-horizontal"> ', state && ($out += ' <input value="', 
        $out += $escape(id), $out += '" name="id" type="hidden"> '), $out += ' <div class="form-group"> <label for="username" class="col-sm-4 control-label">用户名</label> <div class="col-sm-7"> <input value="', 
        $out += $escape(username), $out += '" name="username" id="username" class="form-control" type="text"> </div> </div> <div class="form-group"> <label for="name" class="col-sm-4 control-label">姓名</label> <div class="col-sm-7"> <input value="', 
        $out += $escape(name), $out += '" name="name" id="name" class="form-control" type="text"> </div> </div> <div class="form-group"> <label for="job" class="col-sm-4 control-label">职位</label> <div class="col-sm-7"> <input value="', 
        $out += $escape(job), $out += '" name="job" id="job" class="form-control" type="text"> </div> </div> <div class="form-group"> <label for="jointime" class="col-sm-4 control-label">加入时间</label> <div class="col-sm-7"> <input value="', 
        $out += $escape(jointime), $out += '" name="jointime" id="jointime" class="form-control" type="date"> </div> </div> ', 
        state || ($out += ' <p class="text-center"> <input id="submit" type="submit" class="btn btn-primary" value="添加成员"> </p> '), 
        $out += " </form> </fieldset> </div> </div> ", new String($out);
    }), /*v:41*/
    template("page/member/detail", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), photo = $data.photo, avatar = $data.avatar, name = $data.name, job = $data.job, jointime = $data.jointime, id = $data.id, username = $data.username, nickname = $data.nickname, birth = $data.birth, from = $data.from, ability = $data.ability, profile = $data.profile, $out = "";
        return $out += '<div class="user-profile"> <h4 class="title">QED团队成员</h4> <div class="row"> <p><img src="', 
        $out += $escape(photo), $out += '" class="photo"></p> <div class="simple"> <p> <span class="name">姓名：</span> <span><img src="', 
        $out += $escape(avatar), $out += '" class="avatar">', $out += $escape(name), $out += '</span> </p> <p> <span class="name">职位：</span> <span>', 
        $out += $escape(job), $out += '</span> </p> <p> <span class="name">加入时间：</span> <span>', 
        $out += $escape(jointime), $out += '</span> </p> <p> <span class="name">ID：</span> <span>', 
        $out += $escape(id), $out += '</span> </p> </div> <p> <a id="more" class="btn btn-link">查看更多</a> </p> <div id="detail" class="detail"> ', 
        username && ($out += ' <div class="form-group"> <span class="name">用户名：</span> <span>', 
        $out += $escape(username), $out += "</span> </div> "), $out += " ", nickname && ($out += ' <div class="form-group"> <span class="name">昵称：</span> <span>', 
        $out += $escape(nickname), $out += "</span> </div> "), $out += " ", birth && ($out += ' <div class="form-group"> <span class="name">生日：</span> <span>', 
        $out += $escape(birth), $out += "</span> </div> "), $out += " ", from && ($out += ' <div class="form-group"> <span class="name">家乡：</span> <span>', 
        $out += $escape(from), $out += "</span> </div> "), $out += " ", ability && ($out += ' <div class="form-group"> <span class="name">擅长：</span> <span>', 
        $out += $escape(ability), $out += "</span> </div> "), $out += " ", profile && ($out += ' <div class="form-group"> <label>成员信息：</label> <p>', 
        $out += $escape(profile), $out += "</p> </div> "), $out += " </div> </div> </div> ", 
        new String($out);
    }), /*v:16*/
    template("page/member/list", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, $each = $utils.$each, list = $data.list, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $string = $utils.$string, total = $data.total, page = $data.page, $out = "";
        return $out += '<section class="panel"> <header class="panel-heading">成员管理列表</header> <div class="panel-body"> <table class="table table-striped table-bordered"> <thead> <tr> <th class="id">ID</th> <th class="avatar">头像</th> <th>用户名</th> <th>姓名</th> <th>昵称</th> <th>职位</th> <th style="width: 95px;">加入时间</th> <th style="width: 220px;">操作</th> </tr> </thead> <tbody> ', 
        $each(list, function($value) {
            $out += ' <tr data-id="', $out += $escape($value.id), $out += '"> <th scope="row">', 
            $out += $escape($value.id), $out += '</th> <td><img src="', $out += $escape($value.avatar), 
            $out += '" class="avatar"></td> <td>', $out += $escape($value.username), $out += "</td> <td>", 
            $out += $escape($value.name), $out += "</td> <td>", $out += $escape($value.nickname), 
            $out += "</td> <td>", $out += $escape($value.job), $out += "</td> <td>", $out += $escape($value.jointime), 
            $out += '</td> <td> <button class="a-detail btn btn-info">查看详细</button> <button class="a-modify btn btn-warning">修改</button> <button class="a-delete btn btn-danger">删除</button> </td> </tr> ';
        }), $out += ' </tbody> </table> <nav class="text-center"> <div class="pagination">', 
        $out += $string($helpers.paging(total, page, "#/page/member/list/")), $out += "</div> </nav> </div> </section> ", 
        new String($out);
    }), /*v:1*/
    template("page/option/setup", "//option setup "), /*v:41*/
    template("page/product/add", function($data) {
        "use strict";
        var $utils = this, state = ($utils.$helpers, $data.state), $escape = $utils.$escape, name = $data.name, time = $data.time, type = $data.type, summary = $data.summary, cover = $data.cover, $string = $utils.$string, content = $data.content, $out = "";
        return $out += '<div class="container"> ', state || ($out += " <legend>项目发布</legend> "), 
        $out += ' <fieldset id="field"> <div class="form-group"> <label for="name">项目名称</label> <input value="', 
        $out += $escape(name), $out += '" name="name" id="name" type="text" class="form-control data-upload"> </div> <div class="form-group"> <label for="time">创建时间</label> <input value="', 
        $out += $escape(time), $out += '" name="time" id="time" type="date" class="form-control data-upload"> </div> <div class="form-group"> <label for="type">项目类型</label> <input value="', 
        $out += $escape(type), $out += '" name="type" id="type" type="text" class="form-control data-upload"> </div> <div class="form-group"> <label for="summary">一句话简介</label> <input value="', 
        $out += $escape(summary), $out += '" name="summary" id="summary" type="text" class="form-control data-upload"> </div> <div class="form-group"> <label for="image">封面上传</label> <div class="file-wrap"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" id="image" type="file"> </a> </div> <img src="', 
        $out += $escape(cover), $out += '" name="cover" id="cover" class="img-upload img-thumbnail"> </div> <div class="form-group"> <label for="ueditor">项目内容</label> <script type="text/plain" id="ueditor" style="width:100%;min-height:400px;z-index:99;">', 
        $out += $string(content), $out += "</script> </div> ", state || ($out += ' <p class="text-right"> <button id="submit" class="btn btn-primary">提交</button> </p> '), 
        $out += " </fieldset> </div> ", new String($out);
    }), /*v:4*/
    template("page/product/list", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, $each = $utils.$each, list = $data.list, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $string = $utils.$string, total = $data.total, page = $data.page, $out = "";
        return $out += '<section class="panel"> <header class="panel-heading">产品管理列表</header> <div class="panel-body"> <table class="table table-striped table-bordered"> <thead> <tr> <th class="id">ID</th> <th>名称</th> <th>分类</th> <th>简介</th> <th style="width: 95px;">时间</th> <th style="width: 220px;">操作</th> </tr> </thead> <tbody> ', 
        $each(list, function($value) {
            $out += ' <tr data-id="', $out += $escape($value.id), $out += '"> <th scope="row">', 
            $out += $escape($value.id), $out += "</th> <td>", $out += $escape($value.name), 
            $out += "</td> <td>", $out += $escape($value.type), $out += "</td> <td>", $out += $escape($value.summary), 
            $out += "</td> <td>", $out += $escape($value.time), $out += '</td> <td> <a href="/#/product/detail/', 
            $out += $escape($value.id), $out += '" class="btn btn-link" target="_blank">查看详细</a> <button class="a-modify btn btn-warning">修改</button> <button class="a-delete btn btn-danger">删除</button> </td> </tr> ';
        }), $out += ' </tbody> </table> <nav class="text-center"> <div class="pagination">', 
        $out += $string($helpers.paging(total, page, "#/page/product/list/")), $out += "</div> </nav> </div> </section> ", 
        new String($out);
    }), /*v:20*/
    template("page/user/password", '<div class="container"> <legend>密码修改</legend> <fieldset> <form id="form"> <div class="col-sm-4"> <div class="form-group"> <label for="oldpass">旧密码</label> <input name="oldpass" id="oldpass" type="password" class="form-control"> </div> <div class="form-group"> <label for="password">新密码</label> <input name="password" id="password" type="password" class="form-control"> </div> <div class="form-group"> <label for="newPassword">再次输入新密码</label> <input id="newPassword" type="password" class="form-control"> </div> <p class="text-right"> <input id="submit" type="submit" class="btn btn-primary" value="提交"> </p> </div> <div class="col-sm-8"> <blockquote class="callout-info"> <ol> <li>密码不得包含全部或部分用户帐户名。部分帐户名是指三个或三个以上两端用“空白”（空格、制表符、回车符等）或任何以下字符分隔的连续字母数字字符：逗号 (,)、句点 (.)、连字符 (-)、下划线 (_) 或数字符号 (#)。</li> <li>密码长度(需要符合Default Domain Policy中密码策略要求的最小长度)。</li> <li>密码必须包含以下四类字符中的三类： <ol> <li>拉丁文大写字母 (A – Z)</li> <li>拉丁文小写字母 (a – z)</li> <li>10 个基本数字 (0 – 9)</li> <li>非字母数字字符，如感叹号 (!)、美元符号 ($)、数字符号 (#) 或百分号 (%)。</li> </ol> </li> </ol> </blockquote> </div> </form> </fieldset> </div> '), 
    /*v:36*/
    template("page/user/profile", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), avatar = $data.avatar, nickname = $data.nickname, from = $data.from, ability = $data.ability, birth = $data.birth, photo = $data.photo, profile = $data.profile, username = $data.username, job = $data.job, jointime = $data.jointime, $out = "";
        return $out += '<div class="container"> <fieldset> <legend>个人资料</legend> <form id="form" class="form-horizontal"> <div class="row"> <div class="col-sm-8"> <div class="form-group"> <label for="avatar" class="col-sm-2 control-label">头像</label> <div class="col-sm-3"> <div class="file-wrapper"> <img src="', 
        $out += $escape(avatar), $out += '" class="avatar-img img-thumbnail"> <input value="', 
        $out += $escape(avatar), $out += '" name="avatar" type="hidden"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" type="file"> </a> </div> </div> <div class="col-sm-7"> <label>要求</label> <ol> <li>头像比例1:1，尺寸80x80px</li> <li>照片比例5:7，尺寸150x210px</li> </ol> </div> </div> <div class="row"> <div class="col-sm-8"> <div class="form-group"> <label for="nickname" class="col-sm-3 control-label">昵称</label> <div class="col-sm-9"> <input value="', 
        $out += $escape(nickname), $out += '" name="nickname" id="nickname" class="form-control" type="text" maxlength="20"> </div> </div> <div class="form-group"> <label for="from" class="col-sm-3 control-label">家乡</label> <div class="col-sm-9"> <input value="', 
        $out += $escape(from), $out += '" name="from" id="from" class="form-control" type="text" maxlength="25"> </div> </div> <div class="form-group"> <label for="ability" class="col-sm-3 control-label">擅长</label> <div class="col-sm-9"> <input value="', 
        $out += $escape(ability), $out += '" name="ability" id="ability" class="form-control" type="text" maxlength="20"> </div> </div> <div class="form-group"> <label for="birth" class="col-sm-3 control-label">生日</label> <div class="col-sm-9"> <input value="', 
        $out += $escape(birth), $out += '" name="birth" id="birth" class="form-control" type="date"> </div> </div> </div> <div class="col-sm-4"> <div class="form-group"> <label for="photo" class="col-sm-3 control-label">照片</label> <div class="col-sm-9"> <div class="file-wrapper"> <img src="', 
        $out += $escape(photo), $out += '" class="photo-img img-thumbnail"> <input value="', 
        $out += $escape(photo), $out += '" name="photo" type="hidden"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" type="file"> </a> </div> </div> </div> </div> </div> <div class="form-group"> <label for="profile" class="col-sm-2 control-label">个人签名</label> <div class="col-sm-10"> <textarea name="profile" id="profile" class="form-control" maxlength="2000">', 
        $out += $escape(profile), $out += '</textarea> </div> </div> <p class="text-center"> <input id="submit" type="submit" class="btn btn-primary" value="保存"> </p> </div> <div class="col-sm-4"> <blockquote class="callout-info"> <label>用户名</label> <p>', 
        $out += $escape(username), $out += "</p> <label>职位</label> <p>", $out += $escape(job), 
        $out += "</p> <label>加入时间</label> <p>", $out += $escape(jointime), $out += "</p> </blockquote> </div> </div> </form> </fieldset> </div> ", 
        new String($out);
    });
}();