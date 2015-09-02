/*TMODJS:{"version":6,"md5":"42985f1dae083715e63b28474d92afe0"}*/
template('public/modal',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,$string=$utils.$string,content=$data.content,$out='';$out+='<div class="modal" tabindex="-1"> <div class="modal-dialog modal-sm"> <div class="modal-content"> <div class="modal-header">';
$out+=$escape(title);
$out+='</div> <div class="modal-body">';
$out+=$string(content);
$out+='</div> </div> </div> </div> ';
return new String($out);
});