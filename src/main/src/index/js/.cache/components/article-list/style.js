/*TMODJS:{"version":8,"md5":"bbe542fc897899681e0769f3d5d7abb7"}*/
template('components/article-list/style',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,theme=$data.theme,ratio=$data.ratio,$out='';$out+='<div class="form-horizontal"> <div class="form-group"> <label class="col-xs-3 control-label" for="theme">主题</label> <div class="col-xs-9"> <select id="theme" class="form-control"> <option value="1" ';
if(theme===1){
$out+=' selected ';
}
$out+='> 主题1（图 + 标题、简介）</option> <option value="2" ';
if(theme===2){
$out+=' selected ';
}
$out+='> 主题2（标题 + 图、简介）</option> <option value="3" ';
if(theme===3){
$out+=' selected ';
}
$out+='> 主题3（标题 + 时间）</option> </select> </div> </div> <div class="form-group"> <label class="col-xs-3 control-label" for="select">图片比例</label> <div class="col-xs-9"> <label class="radio-inline"> <input type="radio" name="size" value="4t3" ';
if(ratio==='4t3'){
$out+=' checked ';
}
$out+='> 4:3 </label> <label class="radio-inline"> <input type="radio" name="size" value="16t9" ';
if(ratio==='16t9'){
$out+=' checked ';
}
$out+='> 16:9 </label> <label class="radio-inline"> <input type="radio" name="size" value="1t1" ';
if(ratio==='1t1'){
$out+=' checked ';
}
$out+='> 1:1 </label> </div> </div> </div> ';
return new String($out);
});