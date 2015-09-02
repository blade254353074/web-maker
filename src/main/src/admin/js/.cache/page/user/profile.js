/*TMODJS:{"version":36,"md5":"55d28da86d0c11ca77b3e3b080fcb5bc"}*/
template('page/user/profile',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,avatar=$data.avatar,nickname=$data.nickname,from=$data.from,ability=$data.ability,birth=$data.birth,photo=$data.photo,profile=$data.profile,username=$data.username,job=$data.job,jointime=$data.jointime,$out='';$out+='<div class="container"> <fieldset> <legend>个人资料</legend> <form id="form" class="form-horizontal"> <div class="row"> <div class="col-sm-8"> <div class="form-group"> <label for="avatar" class="col-sm-2 control-label">头像</label> <div class="col-sm-3"> <div class="file-wrapper"> <img src="';
$out+=$escape(avatar);
$out+='" class="avatar-img img-thumbnail"> <input value="';
$out+=$escape(avatar);
$out+='" name="avatar" type="hidden"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" type="file"> </a> </div> </div> <div class="col-sm-7"> <label>要求</label> <ol> <li>头像比例1:1，尺寸80x80px</li> <li>照片比例5:7，尺寸150x210px</li> </ol> </div> </div> <div class="row"> <div class="col-sm-8"> <div class="form-group"> <label for="nickname" class="col-sm-3 control-label">昵称</label> <div class="col-sm-9"> <input value="';
$out+=$escape(nickname);
$out+='" name="nickname" id="nickname" class="form-control" type="text" maxlength="20"> </div> </div> <div class="form-group"> <label for="from" class="col-sm-3 control-label">家乡</label> <div class="col-sm-9"> <input value="';
$out+=$escape(from);
$out+='" name="from" id="from" class="form-control" type="text" maxlength="25"> </div> </div> <div class="form-group"> <label for="ability" class="col-sm-3 control-label">擅长</label> <div class="col-sm-9"> <input value="';
$out+=$escape(ability);
$out+='" name="ability" id="ability" class="form-control" type="text" maxlength="20"> </div> </div> <div class="form-group"> <label for="birth" class="col-sm-3 control-label">生日</label> <div class="col-sm-9"> <input value="';
$out+=$escape(birth);
$out+='" name="birth" id="birth" class="form-control" type="date"> </div> </div> </div> <div class="col-sm-4"> <div class="form-group"> <label for="photo" class="col-sm-3 control-label">照片</label> <div class="col-sm-9"> <div class="file-wrapper"> <img src="';
$out+=$escape(photo);
$out+='" class="photo-img img-thumbnail"> <input value="';
$out+=$escape(photo);
$out+='" name="photo" type="hidden"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" type="file"> </a> </div> </div> </div> </div> </div> <div class="form-group"> <label for="profile" class="col-sm-2 control-label">个人签名</label> <div class="col-sm-10"> <textarea name="profile" id="profile" class="form-control" maxlength="2000">';
$out+=$escape(profile);
$out+='</textarea> </div> </div> <p class="text-center"> <input id="submit" type="submit" class="btn btn-primary" value="保存"> </p> </div> <div class="col-sm-4"> <blockquote class="callout-info"> <label>用户名</label> <p>';
$out+=$escape(username);
$out+='</p> <label>职位</label> <p>';
$out+=$escape(job);
$out+='</p> <label>加入时间</label> <p>';
$out+=$escape(jointime);
$out+='</p> </blockquote> </div> </div> </form> </fieldset> </div> ';
return new String($out);
});