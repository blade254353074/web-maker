/*TMODJS:{"version":20,"md5":"fdd90d6877b754a95809fee713b58ed2"}*/
template('components/photo-list/style',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,theme=$data.theme,cols=$data.cols,ratio=$data.ratio,$out='';$out+='<div class="form-horizontal"> <div class="form-group"> <label class="col-xs-3 control-label" for="theme">主题</label> <div class="col-xs-9"> <select id="theme" class="form-control"> <option value="1" ';
if(theme===1){
$out+=' selected ';
}
$out+='> 主题1（矩形）</option> <option value="2" ';
if(theme===2){
$out+=' selected ';
}
$out+='> 主题2（圆角矩形）</option> <option value="3" ';
if(theme===3){
$out+=' selected ';
}
$out+='> 主题3（圆形）</option> </select> </div> </div> <div class="form-group"> <label class="col-xs-3 control-label" for="select">显示列数</label> <div class="col-xs-9"> <select id="select" class="form-control"> <option value="4" ';
if(cols===4){
$out+=' selected ';
}
$out+='> 4</option> <option value="3" ';
if(cols===3){
$out+=' selected ';
}
$out+='> 3</option> <option value="2" ';
if(cols===2){
$out+=' selected ';
}
$out+='> 2</option> <option value="1" ';
if(cols===1){
$out+=' selected ';
}
$out+='> 1</option> </select> </div> </div> <div class="form-group"> <label class="col-xs-3 control-label" for="select">图片比例</label> <div class="col-xs-9"> <label class="radio-inline"> <input type="radio" name="size" value="4t3" ';
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