/*TMODJS:{"version":9,"md5":"14915bebf5f7d22186089ff4a6c4db81"}*/
template('navigation',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,menu=$data.menu,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,item=$data.item,$out='';$out+='<ul id="navigation" class="nav"> ';
$each(menu,function($value,$index){
$out+=' <li class="nav-item"> <a> <span class="icon ';
$out+=$escape($value.icon);
$out+='"></span> <span>';
$out+=$escape($value.title);
$out+='</span> <span class="symbol"></span> </a> ';
if($value.list.length !== 0){
$out+=' <ul class="sub-nav"> ';
$each($value.list,function(item,$index){
$out+=' <li class=\'sub-list\'> <a class="sub-item" href="';
$out+=$escape(item.hash);
$out+='" data-root="';
$out+=$escape(item.root);
$out+='"> <span>';
$out+=$escape(item.title);
$out+='</span> </a> </li> ';
});
$out+=' </ul> ';
}
$out+=' </li> ';
});
$out+=' </ul> ';
return new String($out);
});