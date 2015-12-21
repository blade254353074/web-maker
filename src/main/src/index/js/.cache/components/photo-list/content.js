/*TMODJS:{"version":23,"md5":"3516e70e300ffa383e11318b6f6ad4ea"}*/
template('components/photo-list/content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$string=$utils.$string,ratio=$data.ratio,$out='';$out+='<label>顺序调整</label> <ul id="picList" class="sort-list cols-4 clearfix"> ';
$each(list,function($value,$index){
$out+=' <li> <div class="pic" style="background-image:url(';
$out+=$string($value.pic);
$out+=')"> <img src="/assets/mobile/imgs/ph_';
$out+=$string(ratio);
$out+='.png"> <span class="index">';
$out+=$string($index);
$out+='</span> <a class="del icon icon-trash"></a> </div> </li> ';
});
$out+=' </ul> <button id="addPic" class="btn btn-info btn-block"><i class="icon icon-plus"></i> 添加图片</button> ';
return new String($out);
});