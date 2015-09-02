/*TMODJS:{"version":41,"md5":"6bfc2326ff12e2b61d9f08c5dd2fa4c5"}*/
template('page/product/add',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,state=$data.state,$escape=$utils.$escape,name=$data.name,time=$data.time,type=$data.type,summary=$data.summary,cover=$data.cover,$string=$utils.$string,content=$data.content,$out='';$out+='<div class="container"> ';
if(!state){
$out+=' <legend>项目发布</legend> ';
}
$out+=' <fieldset id="field"> <div class="form-group"> <label for="name">项目名称</label> <input value="';
$out+=$escape(name);
$out+='" name="name" id="name" type="text" class="form-control data-upload"> </div> <div class="form-group"> <label for="time">创建时间</label> <input value="';
$out+=$escape(time);
$out+='" name="time" id="time" type="date" class="form-control data-upload"> </div> <div class="form-group"> <label for="type">项目类型</label> <input value="';
$out+=$escape(type);
$out+='" name="type" id="type" type="text" class="form-control data-upload"> </div> <div class="form-group"> <label for="summary">一句话简介</label> <input value="';
$out+=$escape(summary);
$out+='" name="summary" id="summary" type="text" class="form-control data-upload"> </div> <div class="form-group"> <label for="image">封面上传</label> <div class="file-wrap"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" id="image" type="file"> </a> </div> <img src="';
$out+=$escape(cover);
$out+='" name="cover" id="cover" class="img-upload img-thumbnail"> </div> <div class="form-group"> <label for="ueditor">项目内容</label> <script type="text/plain" id="ueditor" style="width:100%;min-height:400px;z-index:99;">';
$out+=$string(content);
$out+='</script> </div> ';
if(!state){
$out+=' <p class="text-right"> <button id="submit" class="btn btn-primary">提交</button> </p> ';
}
$out+=' </fieldset> </div> ';
return new String($out);
});