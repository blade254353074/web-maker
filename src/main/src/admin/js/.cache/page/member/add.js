/*TMODJS:{"version":38,"md5":"15ed8586bc9e5ce9dcbcbb9b59abe778"}*/
template('page/member/add',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,state=$data.state,$escape=$utils.$escape,id=$data.id,username=$data.username,name=$data.name,job=$data.job,jointime=$data.jointime,$out='';$out+='<div class="container"> <div class="row"> <fieldset> ';
if(!state){
$out+=' <legend>成员添加</legend> ';
}
$out+=' <form id="form" class="form-horizontal"> ';
if(state){
$out+=' <input value="';
$out+=$escape(id);
$out+='" name="id" type="hidden"> ';
}
$out+=' <div class="form-group"> <label for="username" class="col-sm-4 control-label">用户名</label> <div class="col-sm-7"> <input value="';
$out+=$escape(username);
$out+='" name="username" id="username" class="form-control" type="text"> </div> </div> <div class="form-group"> <label for="name" class="col-sm-4 control-label">姓名</label> <div class="col-sm-7"> <input value="';
$out+=$escape(name);
$out+='" name="name" id="name" class="form-control" type="text"> </div> </div> <div class="form-group"> <label for="job" class="col-sm-4 control-label">职位</label> <div class="col-sm-7"> <input value="';
$out+=$escape(job);
$out+='" name="job" id="job" class="form-control" type="text"> </div> </div> <div class="form-group"> <label for="jointime" class="col-sm-4 control-label">加入时间</label> <div class="col-sm-7"> <input value="';
$out+=$escape(jointime);
$out+='" name="jointime" id="jointime" class="form-control" type="date"> </div> </div> ';
if(!state){
$out+=' <p class="text-center"> <input id="submit" type="submit" class="btn btn-primary" value="添加成员"> </p> ';
}
$out+=' </form> </fieldset> </div> </div> ';
return new String($out);
});