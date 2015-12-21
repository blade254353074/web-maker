/*TMODJS:{"version":91,"md5":"1ed55e2dd5a14d828b76e2fdf0504e36"}*/
template('page/index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,name=$data.name,pageId=$data.pageId,siteId=$data.siteId,$each=$utils.$each,pages=$data.pages,$value=$data.$value,$index=$data.$index,modules=$data.modules,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="header"> <div class="header-left"> <a class="logo" href="/"><span>QED-M</span></a> <div class="project-name">项目：';
$out+=$string(name);
$out+='</div> </div> <div id="nav" class="header-right clearfix"> <ul class="nav pull-left clearfix"> <li data-link="pageui"><a href="/#/page/pageui/';
$out+=$string(pageId);
$out+='">站点</a></li> <li data-link="article"><a href="/#/page/article/';
$out+=$string(siteId);
$out+='">文章</a></li> <li data-link="photo"><a href="/#/page/photo/';
$out+=$string(siteId);
$out+='">相册</a></li> </ul> <div class="drop-down pull-right"> <div class="title icon icon-menu-hamburger"></div> <ul> <li><a href="/#/site/list"><span class="icon icon-th-list"></span>站点列表</a></li> <li><a href="/#/logout"><span class="icon icon-question-sign"></span>帮助中心</a></li> <li><a href="/#/logout"><span class="icon icon-off"></span>退出</a></li> </ul> </div> <ul class="nav pull-right clearfix"> <li data-link="user"> <a href="/#/page/user/';
$out+=$string(siteId);
$out+='"> <span class="icon icon-user"></span>用户 </a> </li> <li data-link="plugin"> <a href="/#/page/plugin/';
$out+=$string(siteId);
$out+='"> <span class="icon icon-gift"></span>插件 </a> </li> <li data-link="setting"> <a href="/#/page/setting/';
$out+=$string(siteId);
$out+='"> <span class="icon icon-th-large"></span>管理 </a> </li> </ul> </div> </div> <div class="work-bench"> <div class="tool-left"> <div class="page-area"> <div class="page-title"> <span>页面管理</span> <div class="page-tool"> <a class="icon icon-plus"></a> <a class="icon icon-chevron-up"></a> </div> </div> <ul id="pageBox" class="page-box"> ';
$each(pages,function($value,$index){
$out+=' <li data-id="';
$out+=$string($value.id);
$out+='" ';
if($value.active){
$out+='class="active" ';
}
$out+='> <a href="/#/page/pageui/';
$out+=$string($value.id);
$out+='">';
$out+=$string($value.name);
$out+='</a> <div class="page-control"> <span class="change icon icon-pencil" title="修改"></span> <span class="remove icon icon-remove" title="删除"></span> </div> </li> ';
});
$out+=' </ul> </div> <div class="drag-area"> <ul id="dragBar" class="drag-title"> ';
$each(modules,function($value,$index){
$out+=' <li ';
if($index===0){
$out+='class="active" ';
}
$out+='>';
$out+=$string($value.name);
$out+='</li> ';
});
$out+=' </ul> <div id="dragBox" class="drag-box"> ';
$each(modules,function($value,$index){
$out+=' <ul ';
if($index===0){
$out+='class="active" ';
}
$out+='> ';
include('../common/module',$value);
$out+=' </ul> ';
});
$out+=' </div> </div> </div> <div class="stage"> <div class="phone"> <div class="screen"> <div class="address-bar"> <input name="url" type="text" placeholder="搜索或输入网站名称"> </div> <div class="browser-area"> <iframe id="browserFrame" src="/mobile/index.html" frameborder="0" height="523" width="100%"></iframe> </div> </div> </div> </div> <div class="tool-right"> <div class="option-box"> <div class="tab-panel"> <input id="optPanel1" name="tabbar" checked type="radio" class="tab-radio"> <label for="optPanel1" class="tab-bar">内容</label> <div class="tab-content"> <div id="optionContent" class="tab-wrap"></div> </div> </div> <div class="tab-panel"> <input id="optPanel2" name="tabbar" type="radio" class="tab-radio"> <label for="optPanel2" class="tab-bar">样式</label> <div class="tab-content"> <div id="styleContent" class="tab-wrap"></div> </div> </div> </div> </div> </div> ';
return new String($out);
});