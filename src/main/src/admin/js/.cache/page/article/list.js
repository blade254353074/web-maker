/*TMODJS:{"version":13,"md5":"b407e9a83fa2a0a5017673cb25884c25"}*/
template('page/article/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$string=$utils.$string,total=$data.total,page=$data.page,$out='';$out+='<section class="panel"> <header class="panel-heading">文章管理列表</header> <div class="panel-body"> <table class="table table-striped table-bordered"> <thead> <tr> <th class="id">ID</th> <th>标题</th> <th style="width:75px;">分类</th> <th>简介</th> <th style="width:45px;">阅读</th> <th style="width:45px;">喜欢</th> <th style="width:95px;">时间</th> <th style="width:190px;">操作</th> </tr> </thead> <tbody> ';
$each(list,function($value,$index){
$out+=' <tr data-id="';
$out+=$escape($value.id);
$out+='"> <th scope="row">';
$out+=$escape($value.id);
$out+='</th> <td>';
$out+=$escape($value.title);
$out+='</td> <!-- <td>';
$out+=$escape($value.type);
$out+='</td> --> <td> ';
if($value.type === 'front-end-development'){
$out+=' 前端开发 ';
}else if($value.type === 'back-end-development'){
$out+=' 后端开发 ';
}else if($value.type === 'visual-design'){
$out+=' 视觉设计 ';
}else if($value.type === 'team-life'){
$out+=' 团队生活 ';
}else{
$out+=' ';
$out+=$escape($value.type);
$out+=' ';
}
$out+=' </td> <td>';
$out+=$escape($value.summary);
$out+='</td> <td>';
$out+=$escape($value.read);
$out+='</td> <td>';
$out+=$escape($value.like);
$out+='</td> <td>';
$out+=$escape($value.time);
$out+='</td> <td> <a href="/#/article/detail/';
$out+=$escape($value.id);
$out+='" class="btn btn-link" target="_blank">查看</a> <button class="a-modify btn btn-warning">修改</button> <button class="a-delete btn btn-danger">删除</button> </td> </tr> ';
});
$out+=' </tbody> </table> <nav class="text-center"> <div class="pagination">';
$out+=$string($helpers. paging(total ,  page, '#/page/article/list/'));
$out+='</div> </nav> </div> </section> ';
return new String($out);
});