/*TMODJS:{"version":16,"md5":"d73ac58d814d216130ec6fd6619cef52"}*/
template('page/member/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$string=$utils.$string,total=$data.total,page=$data.page,$out='';$out+='<section class="panel"> <header class="panel-heading">成员管理列表</header> <div class="panel-body"> <table class="table table-striped table-bordered"> <thead> <tr> <th class="id">ID</th> <th class="avatar">头像</th> <th>用户名</th> <th>姓名</th> <th>昵称</th> <th>职位</th> <th style="width: 95px;">加入时间</th> <th style="width: 220px;">操作</th> </tr> </thead> <tbody> ';
$each(list,function($value,$index){
$out+=' <tr data-id="';
$out+=$escape($value.id);
$out+='"> <th scope="row">';
$out+=$escape($value.id);
$out+='</th> <td><img src="';
$out+=$escape($value.avatar);
$out+='" class="avatar"></td> <td>';
$out+=$escape($value.username);
$out+='</td> <td>';
$out+=$escape($value.name);
$out+='</td> <td>';
$out+=$escape($value.nickname);
$out+='</td> <td>';
$out+=$escape($value.job);
$out+='</td> <td>';
$out+=$escape($value.jointime);
$out+='</td> <td> <button class="a-detail btn btn-info">查看详细</button> <button class="a-modify btn btn-warning">修改</button> <button class="a-delete btn btn-danger">删除</button> </td> </tr> ';
});
$out+=' </tbody> </table> <nav class="text-center"> <div class="pagination">';
$out+=$string($helpers. paging(total ,  page, '#/page/member/list/'));
$out+='</div> </nav> </div> </section> ';
return new String($out);
});