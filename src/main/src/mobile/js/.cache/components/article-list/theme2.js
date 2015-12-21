/*TMODJS:{"version":6,"md5":"0c5a43d297459a9e47842100b540d412"}*/
template('components/article-list/theme2',function($data,$filename
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
$out+='"> <h4 class="title single-line">';
$out+=$string($value.title);
$out+='</h4> <div class="cover" style="background-image:url(';
$out+=$string($value.cover);
$out+=')"> <img src="/assets/mobile/imgs/ph_';
$out+=$string(ratio);
$out+='.png"> </div> <div class="content"> <div class="summary">';
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
$out+='"> <h4 class="title single-line">';
$out+=$string($value.title);
$out+='</h4> <div class="cover" style="background-image:url(';
$out+=$string($value.cover);
$out+=')"> <img src="/assets/mobile/imgs/ph_';
$out+=$string(ratio);
$out+='.png"> </div> <div class="content"> <div class="summary">';
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