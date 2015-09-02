/*TMODJS:{"version":4,"md5":"1150f24429abe49100999e108a8a85bb"}*/
template('page/product/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$string=$utils.$string,total=$data.total,page=$data.page,$out='';$out+='<section class="panel"> <header class="panel-heading">产品管理列表</header> <div class="panel-body"> <table class="table table-striped table-bordered"> <thead> <tr> <th class="id">ID</th> <th>名称</th> <th>分类</th> <th>简介</th> <th style="width: 95px;">时间</th> <th style="width: 220px;">操作</th> </tr> </thead> <tbody> ';
$each(list,function($value,$index){
$out+=' <tr data-id="';
$out+=$escape($value.id);
$out+='"> <th scope="row">';
$out+=$escape($value.id);
$out+='</th> <td>';
$out+=$escape($value.name);
$out+='</td> <td>';
$out+=$escape($value.type);
$out+='</td> <td>';
$out+=$escape($value.summary);
$out+='</td> <td>';
$out+=$escape($value.time);
$out+='</td> <td> <a href="/#/product/detail/';
$out+=$escape($value.id);
$out+='" class="btn btn-link" target="_blank">查看详细</a> <button class="a-modify btn btn-warning">修改</button> <button class="a-delete btn btn-danger">删除</button> </td> </tr> ';
});
$out+=' </tbody> </table> <nav class="text-center"> <div class="pagination">';
$out+=$string($helpers. paging(total ,  page, '#/page/product/list/'));
$out+='</div> </nav> </div> </section> ';
return new String($out);
});