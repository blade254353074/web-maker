/*TMODJS:{"version":6,"md5":"469bd02950f08b2883547ecd4e17c778"}*/
template('components/photo-list/theme2',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,cols=$data.cols,list=$data.list,$each=$utils.$each,$value=$data.$value,$index=$data.$index,id=$data.id,ratio=$data.ratio,$out='';$out+='<div class="photo-list cols-';
$out+=$string(cols);
$out+=' clearfix"> <ul> ';
if(list.length > 0){
$out+=' ';
$each(list,function($value,$index){
$out+=' <li> <a href="/article/';
$out+=$string(id);
$out+='"> <div class="pic img-rounded" style="background-image:url(';
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