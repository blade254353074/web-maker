/*TMODJS:{"version":5,"md5":"ff46523bd1a0ddf9f5116e694f6db9ec"}*/
template('components/module',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$string=$utils.$string,$out='';$each(list,function($value,$index){
$out+=' <li class="drag-item" data-path="';
$out+=$string($value.path);
$out+='" draggable="true"> <div class="drag-icon drag-icon-';
$out+=$string($value.icon);
$out+='" style="background-position:0 -';
$out+=$string($value.offset);
$out+='px;"></div> <div class="drag-text">';
$out+=$string($value.name);
$out+='</div> </li> ';
});
$out+=' ';
return new String($out);
});