/*TMODJS:{"version":14,"md5":"3af5692c05ea86768699a630232440e8"}*/
template('articleDetail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,title=$data.title,avatar=$data.avatar,author=$data.author,time=$data.time,banner=$data.banner,$string=$utils.$string,content=$data.content,like=$data.like,$out='';$out+='<div class="article-detail" data-id="';
$out+=$escape(id);
$out+='"> <div class="paper reader-text"> <div class="article-header"> <h3 class="title">';
$out+=$escape(title);
$out+='</h3> <div class="meta"> <a href="javascript:;"><img src="';
$out+=$escape(avatar);
$out+='" class="avatar"></a> <div class="meta-main"> <p>';
$out+=$escape(author);
$out+='</p> <p>';
$out+=$escape(time);
$out+='</p> </div> </div> <div class="thumbnail"> <img src="';
$out+=$escape(banner);
$out+='"> </div> </div> <div class="article-body">';
$out+=$string(content);
$out+='</div> </div> <div class="artcle-tool"> ';
if(like){
$out+=' <a class="tool-like active"> ';
}else{
$out+=' <a class="tool-like"> ';
}
$out+=' <span class="icon icon-heart"></span> </a> <a class="tool-top"> <span class="icon icon-arrow-up"></span> </a> </div> </div> ';
return new String($out);
});