/*TMODJS:{"version":8,"md5":"afe511c35d49d404aa78c870fa26a60d"}*/
template('components/photo-list/theme3',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,cols=$data.cols,list=$data.list,$each=$utils.$each,$value=$data.$value,$index=$data.$index,id=$data.id,ratio=$data.ratio,$out='';$out+='<div class="photo-list cols-';
$out+=$string(cols);
$out+=' clearfix"> <ul> ';
if(list.length > 0){
$out+=' ';
$each(list,function($value,$index){
$out+=' <li> <a href="/article/';
$out+=$string(id);
$out+='"> <div class="pic img-circle" style="background-image:url(';
$out+=$string($value.pic);
$out+=')"> <img src="/assets/mobile/imgs/ph_';
$out+=$string(ratio);
$out+='.png"> </div> </a> </li> ';
});
$out+=' ';
}else{
$out+=' <li class="ph"> 图集列表为空，请添加图片 </li> ';
}
$out+=' </ul> </div> ';
return new String($out);
});