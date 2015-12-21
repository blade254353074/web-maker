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
    /*v:1*/
    template("common/module-drag", ""), /*v:6*/
    template("common/module", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), list = $data.list, $string = ($data.$value, 
        $data.$index, $utils.$string), $out = "";
        return $each(list, function($value, $index) {
            $out += ' <li class="drag-item" data-path="', $out += $string($value.path), $out += '" data-name="', 
            $out += $string($value.name), $out += '" draggable="true"> <div class="drag-icon drag-icon-', 
            $out += $string($value.name), $out += '" style="background-position:0 -', $out += $string(65 * $index), 
            $out += 'px;"></div> <div class="drag-text">', $out += $string($value.cname), $out += "</div> </li> ";
        }), $out += " ", new String($out);
    }), /*v:91*/
    template("page/index", function($data, $filename) {
        "use strict";
        var $utils = this, $string = ($utils.$helpers, $utils.$string), name = $data.name, pageId = $data.pageId, siteId = $data.siteId, $each = $utils.$each, pages = $data.pages, modules = ($data.$value, 
        $data.$index, $data.modules), include = function(filename, data) {
            data = data || $data;
            var text = $utils.$include(filename, data, $filename);
            return $out += text;
        }, $out = "";
        return $out += '<div class="header"> <div class="header-left"> <a class="logo" href="/"><span>QED-M</span></a> <div class="project-name">项目：', 
        $out += $string(name), $out += '</div> </div> <div id="nav" class="header-right clearfix"> <ul class="nav pull-left clearfix"> <li data-link="pageui"><a href="/#/page/pageui/', 
        $out += $string(pageId), $out += '">站点</a></li> <li data-link="article"><a href="/#/page/article/', 
        $out += $string(siteId), $out += '">文章</a></li> <li data-link="photo"><a href="/#/page/photo/', 
        $out += $string(siteId), $out += '">相册</a></li> </ul> <div class="drop-down pull-right"> <div class="title icon icon-menu-hamburger"></div> <ul> <li><a href="/#/site/list"><span class="icon icon-th-list"></span>站点列表</a></li> <li><a href="/#/logout"><span class="icon icon-question-sign"></span>帮助中心</a></li> <li><a href="/#/logout"><span class="icon icon-off"></span>退出</a></li> </ul> </div> <ul class="nav pull-right clearfix"> <li data-link="user"> <a href="/#/page/user/', 
        $out += $string(siteId), $out += '"> <span class="icon icon-user"></span>用户 </a> </li> <li data-link="plugin"> <a href="/#/page/plugin/', 
        $out += $string(siteId), $out += '"> <span class="icon icon-gift"></span>插件 </a> </li> <li data-link="setting"> <a href="/#/page/setting/', 
        $out += $string(siteId), $out += '"> <span class="icon icon-th-large"></span>管理 </a> </li> </ul> </div> </div> <div class="work-bench"> <div class="tool-left"> <div class="page-area"> <div class="page-title"> <span>页面管理</span> <div class="page-tool"> <a class="icon icon-plus"></a> <a class="icon icon-chevron-up"></a> </div> </div> <ul id="pageBox" class="page-box"> ', 
        $each(pages, function($value) {
            $out += ' <li data-id="', $out += $string($value.id), $out += '" ', $value.active && ($out += 'class="active" '), 
            $out += '> <a href="/#/page/pageui/', $out += $string($value.id), $out += '">', 
            $out += $string($value.name), $out += '</a> <div class="page-control"> <span class="change icon icon-pencil" title="修改"></span> <span class="remove icon icon-remove" title="删除"></span> </div> </li> ';
        }), $out += ' </ul> </div> <div class="drag-area"> <ul id="dragBar" class="drag-title"> ', 
        $each(modules, function($value, $index) {
            $out += " <li ", 0 === $index && ($out += 'class="active" '), $out += ">", $out += $string($value.name), 
            $out += "</li> ";
        }), $out += ' </ul> <div id="dragBox" class="drag-box"> ', $each(modules, function($value, $index) {
            $out += " <ul ", 0 === $index && ($out += 'class="active" '), $out += "> ", include("../common/module", $value), 
            $out += " </ul> ";
        }), $out += ' </div> </div> </div> <div class="stage"> <div class="phone"> <div class="screen"> <div class="address-bar"> <input name="url" type="text" placeholder="搜索或输入网站名称"> </div> <div class="browser-area"> <iframe id="browserFrame" src="/mobile/index.html" frameborder="0" height="523" width="100%"></iframe> </div> </div> </div> </div> <div class="tool-right"> <div class="option-box"> <div class="tab-panel"> <input id="optPanel1" name="tabbar" checked type="radio" class="tab-radio"> <label for="optPanel1" class="tab-bar">内容</label> <div class="tab-content"> <div id="optionContent" class="tab-wrap"></div> </div> </div> <div class="tab-panel"> <input id="optPanel2" name="tabbar" type="radio" class="tab-radio"> <label for="optPanel2" class="tab-bar">样式</label> <div class="tab-content"> <div id="styleContent" class="tab-wrap"></div> </div> </div> </div> </div> </div> ', 
        new String($out);
    }), /*v:3*/
    template("public/loading", '<div class="loading"> <div class="loading-pacman"> <div></div> <div></div> <div></div> <div></div> <div></div> </div> </div> '), 
    /*v:2*/
    template("public/modal", function($data) {
        "use strict";
        var $utils = this, $string = ($utils.$helpers, $utils.$string), title = $data.title, content = $data.content, $out = "";
        return $out += '<div class="modal" tabindex="-1"> <div class="modal-dialog modal-sm"> <div class="modal-content"> <div class="modal-header">', 
        $out += $string(title), $out += '</div> <div class="modal-body">', $out += $string(content), 
        $out += "</div> </div> </div> </div> ", new String($out);
    }), /*v:9*/
    template("components/article-list/content", function($data) {
        "use strict";
        var $utils = this, limit = ($utils.$helpers, $data.limit), $out = "";
        return $out += '<div class="form-horizontal"> <div class="form-group"> <label class="col-xs-3 control-label" for="limit">条数</label> <div class="col-xs-9"> <select id="limit" class="form-control"> <option value="2" ', 
        2 === limit && ($out += " selected "), $out += '>2条</option> <option value="5" ', 
        5 === limit && ($out += " selected "), $out += '>5条</option> <option value="10" ', 
        10 === limit && ($out += " selected "), $out += '>10条</option> <option value="20" ', 
        20 === limit && ($out += " selected "), $out += '>20条</option> <option value="-1" ', 
        -1 === limit && ($out += " selected "), $out += ">无限</option> </select> </div> </div> </div> ", 
        new String($out);
    }), /*v:8*/
    template("components/article-list/style", function($data) {
        "use strict";
        var $utils = this, theme = ($utils.$helpers, $data.theme), ratio = $data.ratio, $out = "";
        return $out += '<div class="form-horizontal"> <div class="form-group"> <label class="col-xs-3 control-label" for="theme">主题</label> <div class="col-xs-9"> <select id="theme" class="form-control"> <option value="1" ', 
        1 === theme && ($out += " selected "), $out += '> 主题1（图 + 标题、简介）</option> <option value="2" ', 
        2 === theme && ($out += " selected "), $out += '> 主题2（标题 + 图、简介）</option> <option value="3" ', 
        3 === theme && ($out += " selected "), $out += '> 主题3（标题 + 时间）</option> </select> </div> </div> <div class="form-group"> <label class="col-xs-3 control-label" for="select">图片比例</label> <div class="col-xs-9"> <label class="radio-inline"> <input type="radio" name="size" value="4t3" ', 
        "4t3" === ratio && ($out += " checked "), $out += '> 4:3 </label> <label class="radio-inline"> <input type="radio" name="size" value="16t9" ', 
        "16t9" === ratio && ($out += " checked "), $out += '> 16:9 </label> <label class="radio-inline"> <input type="radio" name="size" value="1t1" ', 
        "1t1" === ratio && ($out += " checked "), $out += "> 1:1 </label> </div> </div> </div> ", 
        new String($out);
    }), /*v:23*/
    template("components/photo-list/content", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), list = $data.list, $string = ($data.$value, 
        $data.$index, $utils.$string), ratio = $data.ratio, $out = "";
        return $out += '<label>顺序调整</label> <ul id="picList" class="sort-list cols-4 clearfix"> ', 
        $each(list, function($value, $index) {
            $out += ' <li> <div class="pic" style="background-image:url(', $out += $string($value.pic), 
            $out += ')"> <img src="/assets/mobile/imgs/ph_', $out += $string(ratio), $out += '.png"> <span class="index">', 
            $out += $string($index), $out += '</span> <a class="del icon icon-trash"></a> </div> </li> ';
        }), $out += ' </ul> <button id="addPic" class="btn btn-info btn-block"><i class="icon icon-plus"></i> 添加图片</button> ', 
        new String($out);
    }), /*v:20*/
    template("components/photo-list/style", function($data) {
        "use strict";
        var $utils = this, theme = ($utils.$helpers, $data.theme), cols = $data.cols, ratio = $data.ratio, $out = "";
        return $out += '<div class="form-horizontal"> <div class="form-group"> <label class="col-xs-3 control-label" for="theme">主题</label> <div class="col-xs-9"> <select id="theme" class="form-control"> <option value="1" ', 
        1 === theme && ($out += " selected "), $out += '> 主题1（矩形）</option> <option value="2" ', 
        2 === theme && ($out += " selected "), $out += '> 主题2（圆角矩形）</option> <option value="3" ', 
        3 === theme && ($out += " selected "), $out += '> 主题3（圆形）</option> </select> </div> </div> <div class="form-group"> <label class="col-xs-3 control-label" for="select">显示列数</label> <div class="col-xs-9"> <select id="select" class="form-control"> <option value="4" ', 
        4 === cols && ($out += " selected "), $out += '> 4</option> <option value="3" ', 
        3 === cols && ($out += " selected "), $out += '> 3</option> <option value="2" ', 
        2 === cols && ($out += " selected "), $out += '> 2</option> <option value="1" ', 
        1 === cols && ($out += " selected "), $out += '> 1</option> </select> </div> </div> <div class="form-group"> <label class="col-xs-3 control-label" for="select">图片比例</label> <div class="col-xs-9"> <label class="radio-inline"> <input type="radio" name="size" value="4t3" ', 
        "4t3" === ratio && ($out += " checked "), $out += '> 4:3 </label> <label class="radio-inline"> <input type="radio" name="size" value="16t9" ', 
        "16t9" === ratio && ($out += " checked "), $out += '> 16:9 </label> <label class="radio-inline"> <input type="radio" name="size" value="1t1" ', 
        "1t1" === ratio && ($out += " checked "), $out += "> 1:1 </label> </div> </div> </div> ", 
        new String($out);
    });
}();