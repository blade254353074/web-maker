/*TMODJS:{"version":10,"md5":"d4bdc6915e7281a0363b4e4b21b4c25d"}*/
template('components/article-list/theme3',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,theme=$data.theme,list=$data.list,limit=$data.limit,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$out='';$out+='<div class="article-list theme';
$out+=$string(theme);
$out+='"> <ul> ';
if(list.length > 0){
$out+=' ';
if(limit<0){
$out+=' ';
$each(list,function($value,$index){
$out+=' <li class="clearfix"> <a href="/article/';
$out+=$string($value.id);
$out+='"> <div> <span class="title single-line">';
$out+=$string($value.title);
$out+='</span> <span class="time">';
$out+=$string($value.time);
$out+='</span> </div> <div class="summary">';
$out+=$string($value.summary);
$out+='</div> </a> </li> ';
});
$out+=' ';
}else{
$out+=' ';
$each(list,function($value,$index){
$out+=' ';
if($index<limit){
$out+=' <li class="clearfix"> <a href="/article/';
$out+=$string($value.id);
$out+='"> <div> <span class="title single-line">';
$out+=$string($value.title);
$out+='</span> <span class="time">';
$out+=$string($value.time);
$out+='</span> </div> <div class="summary">';
$out+=$string($value.summary);
$out+='</div> </a> </li> ';
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