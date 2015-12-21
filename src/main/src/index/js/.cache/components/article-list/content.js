/*TMODJS:{"version":9,"md5":"aa107510bb3d96a040cd8da7056a7216"}*/
template('components/article-list/content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,limit=$data.limit,$out='';$out+='<div class="form-horizontal"> <div class="form-group"> <label class="col-xs-3 control-label" for="limit">条数</label> <div class="col-xs-9"> <select id="limit" class="form-control"> <option value="2" ';
if(limit===2){
$out+=' selected ';
}
$out+='>2条</option> <option value="5" ';
if(limit===5){
$out+=' selected ';
}
$out+='>5条</option> <option value="10" ';
if(limit===10){
$out+=' selected ';
}
$out+='>10条</option> <option value="20" ';
if(limit===20){
$out+=' selected ';
}
$out+='>20条</option> <option value="-1" ';
if(limit===-1){
$out+=' selected ';
}
$out+='>无限</option> </select> </div> </div> </div> ';
return new String($out);
});