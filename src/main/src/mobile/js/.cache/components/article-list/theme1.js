/*TMODJS:{"version":13,"md5":"48c206dac70e674c3867eb9931bfe877"}*/
template('components/article-list/theme1',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,theme=$data.theme,list=$data.list,limit=$data.limit,$each=$utils.$each,$value=$data.$value,$index=$data.$index,ratio=$data.ratio,$out='';$out+='<div class="article-list theme';
$out+=$string(theme);
$out+='"> <ul> ';
if(list.length > 0){
$out+=' ';
if(limit<0){
$out+=' ';
$each(list,function($value,$index){
$out+=' <li class="clearfix"> <a href="/article/';
$out+=$string($value.id);
$out+='"> <div class="cover" style="background-image:url(';
$out+=$string($value.cover);
$out+=')"> <img src="/assets/mobile/imgs/ph_';
$out+=$string(ratio);
$out+='.png"> </div> <div class="content"> <h5 class="title single-line">';
$out+=$string($value.title);
$out+='</h5> <div class="summary">';
$out+=$string($value.summary);
$out+='</div> </div> </a> </li> ';
});
$out+=' ';
}else{
$out+=' ';
$each(list,function($value,$index){
$out+=' ';
if($index<limit){
$out+=' <li class="clearfix"> <a href="/article/';
$out+=$string($value.id);
$out+='"> <div class="cover" style="background-image:url(';
$out+=$string($value.cover);
$out+=')"> <img src="/assets/mobile/imgs/ph_';
$out+=$string(ratio);
$out+='.png"> </div> <div class="content"> <h5 class="title single-line">';
$out+=$string($value.title);
$out+='</h5> <div class="summary">';
$out+=$string($value.summary);
$out+='</div> </div> </a> </li> ';
}
$out+=' ';
});
$out+=' ';
}
$out+=' ';
}else{
$out+=' <li class="ph"> 文章列表为空，请添加文章 </li> ';
}
$out+=' </ul> </div> ';
return new String($out);
});