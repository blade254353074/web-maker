/*TMODJS:{"version":22,"md5":"15f1d302985f03b1abe202d927a7f760"}*/
template('productDetail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,cover=$data.cover,title=$data.title,summary=$data.summary,$string=$utils.$string,content=$data.content,$out='';$out+='<div class="product-article reader-text"> <div class="paper"> <div class="content"> <div class="close-wrapper"> <a id="close" class="close"></a> </div> <div class="paper-header" style="background-image: url(';
$out+=$escape(cover);
$out+=')"> <div class="bg"></div> <div class="text"> <h3 class="title">';
$out+=$escape(title);
$out+='</h3> <p class="summary">';
$out+=$escape(summary);
$out+='</p> </div> </div> <div class="paper-body"> <article> ';
$out+=$string(content);
$out+=' </article> </div> </div> </div> </div> ';
return new String($out);
});