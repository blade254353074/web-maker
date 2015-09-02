/*TMODJS:{"version":41,"md5":"597c1ada9a336bfd44b4ed6211acc292"}*/
template('page/member/detail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,photo=$data.photo,avatar=$data.avatar,name=$data.name,job=$data.job,jointime=$data.jointime,id=$data.id,username=$data.username,nickname=$data.nickname,birth=$data.birth,from=$data.from,ability=$data.ability,profile=$data.profile,$out='';$out+='<div class="user-profile"> <h4 class="title">QED团队成员</h4> <div class="row"> <p><img src="';
$out+=$escape(photo);
$out+='" class="photo"></p> <div class="simple"> <p> <span class="name">姓名：</span> <span><img src="';
$out+=$escape(avatar);
$out+='" class="avatar">';
$out+=$escape(name);
$out+='</span> </p> <p> <span class="name">职位：</span> <span>';
$out+=$escape(job);
$out+='</span> </p> <p> <span class="name">加入时间：</span> <span>';
$out+=$escape(jointime);
$out+='</span> </p> <p> <span class="name">ID：</span> <span>';
$out+=$escape(id);
$out+='</span> </p> </div> <p> <a id="more" class="btn btn-link">查看更多</a> </p> <div id="detail" class="detail"> ';
if(username){
$out+=' <div class="form-group"> <span class="name">用户名：</span> <span>';
$out+=$escape(username);
$out+='</span> </div> ';
}
$out+=' ';
if(nickname){
$out+=' <div class="form-group"> <span class="name">昵称：</span> <span>';
$out+=$escape(nickname);
$out+='</span> </div> ';
}
$out+=' ';
if(birth){
$out+=' <div class="form-group"> <span class="name">生日：</span> <span>';
$out+=$escape(birth);
$out+='</span> </div> ';
}
$out+=' ';
if(from){
$out+=' <div class="form-group"> <span class="name">家乡：</span> <span>';
$out+=$escape(from);
$out+='</span> </div> ';
}
$out+=' ';
if(ability){
$out+=' <div class="form-group"> <span class="name">擅长：</span> <span>';
$out+=$escape(ability);
$out+='</span> </div> ';
}
$out+=' ';
if(profile){
$out+=' <div class="form-group"> <label>成员信息：</label> <p>';
$out+=$escape(profile);
$out+='</p> </div> ';
}
$out+=' </div> </div> </div> ';
return new String($out);
});