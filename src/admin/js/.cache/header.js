/*TMODJS:{"version":13,"md5":"0f20b455251dec4cd41157446c8b134d"}*/
template('header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,avatar=$data.avatar,username=$data.username,$out='';$out+='<div class="header"> <div class="header-logo"> <a href="#/page"><h2><span>[ </span>QED<span> ]</span></h2></a> </div> <div class="header-nav"> <div class="nav-left"></div> <div class="nav-right"> <div class="user-menu"> <a href="#/user/home" class="bar"> <img src="';
$out+=$escape(avatar);
$out+='" class="avatar"> <div class="name"> <span>';
$out+=$escape(username);
$out+='</span> <span class="caret"></span> </div> </a> <ul class="list"> <li> <a href="#/page/user/profile" class="text-icon"> <span class="icon icon-user"></span> <span>我的资料</span> </a> </li> <li> <a href="#/page/user/task/unread" class="text-icon"> <span class="icon icon-tasks"></span><span>我的任务</span> </a> </li> <li> <a href="#/logout" class="text-icon"> <span class="icon icon-off"></span><span>退出</span> </a> </li> </ul> </div> </div> </div> </div> ';
return new String($out);
});