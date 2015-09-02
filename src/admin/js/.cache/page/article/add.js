/*TMODJS:{"version":32,"md5":"6f4d86a6a0e10d261f27275ff0f7928c"}*/
template('page/article/add',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,state=$data.state,id=$data.id,$escape=$utils.$escape,limit=$data.limit,title=$data.title,type=$data.type,summary=$data.summary,cover=$data.cover,banner=$data.banner,$string=$utils.$string,content=$data.content,$out='';$out+='<div class="container"> ';
if(!state){
$out+=' <legend>文章发布</legend> ';
}
$out+=' <fieldset> <form id="form"> ';
if(id){
$out+=' <input name="id" value="';
$out+=$escape(id);
$out+='" type="hidden"> ';
}
$out+=' <div class="form-group"> <label>公开与否</label> <p> <label class="radio-inline"> ';
if(limit){
$out+=' <input name="limit" type="radio" value="true" checked> ';
}else{
$out+=' <input name="limit" type="radio" value="true"> ';
}
$out+=' 公开 </label> <label class="radio-inline"> ';
if(!limit){
$out+=' <input name="limit" type="radio" value="false" checked> ';
}else{
$out+=' <input name="limit" type="radio" value="false"> ';
}
$out+=' 私有 </label> </p> </div> <div class="form-group"> <label for="title">文章名称</label> <input value="';
$out+=$escape(title);
$out+='" name="title" id="title" type="text" class="form-control"> </div> <div class="form-group"> <label for="type">文章类别</label> <select name="type" class="form-control"> ';
if(type){
$out+=' ';
if(type === 'front-end-development'){
$out+=' <option value="';
$out+=$escape(type);
$out+='">前端开发</option> ';
}else if(type === 'back-end-development'){
$out+=' <option value="';
$out+=$escape(type);
$out+='">后端开发</option> ';
}else if(type === 'visual-design'){
$out+=' <option value="';
$out+=$escape(type);
$out+='">视觉设计</option> ';
}else if(type === 'team-life'){
$out+=' <option value="';
$out+=$escape(type);
$out+='">团队生活</option> ';
}
$out+=' ';
}
$out+=' <option value="front-end-development">前端开发</option> <option value="back-end-development">后端开发</option> <option value="visual-design">视觉设计</option> <option value="team-life">团队生活</option> </select> </div> <div class="form-group"> <label for="summary">文章简介</label> <input value="';
$out+=$escape(summary);
$out+='" name="summary" id="summary" type="text" class="form-control"> </div> <div class="form-group"> <label for="image">封面上传</label> <div class="file-wrapper"> ';
if(cover){
$out+=' <img src="';
$out+=$escape(cover);
$out+='" class="img-thumbnail"> ';
}else{
$out+=' <img src="/assets/admin/imgs/artCover.png" class="img-thumbnail"> ';
}
$out+=' <input value="';
$out+=$escape(cover);
$out+='" name="cover" type="hidden"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" type="file"> </a> </div> </div> <div class="form-group"> <label for="image">Banner上传</label> <div class="file-wrapper"> ';
if(banner){
$out+=' <img src="';
$out+=$escape(banner);
$out+='" class="img-thumbnail"> ';
}else{
$out+=' <img src="/assets/admin/imgs/artBanner.png" class="img-thumbnail"> ';
}
$out+=' <input value="';
$out+=$escape(banner);
$out+='" name="banner" type="hidden"> <a class="btn btn-success file-btn"> <span>上传文件</span> <input name="image" type="file"> </a> </div> </div> <div class="form-group"> <label for="ueditor">文章内容</label> <script type="text/plain" id="ueditor" style="width:100%;min-height:400px;z-index:99;">';
$out+=$string(content);
$out+='</script> </div> ';
if(!state){
$out+=' <p class="text-right"> <button id="submit" class="btn btn-primary">提交</button> </p> ';
}
$out+=' </form> </fieldset> </div> ';
return new String($out);
});