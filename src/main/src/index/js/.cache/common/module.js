/*TMODJS:{"version":6,"md5":"5cc6e1a2ae42c0c1efc82c6343b098ff"}*/
template('common/module',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$string=$utils.$string,$out='';$each(list,function($value,$index){
$out+=' <li class="drag-item" data-path="';
$out+=$string($value.path);
$out+='" data-name="';
$out+=$string($value.name);
$out+='" draggable="true"> <div class="drag-icon drag-icon-';
$out+=$string($value.name);
$out+='" style="background-position:0 -';
$out+=$string($index*65);
$out+='px;"></div> <div class="drag-text">';
$out+=$string($value.cname);
$out+='</div> </li> ';
});
$out+=' ';
return new String($out);
});