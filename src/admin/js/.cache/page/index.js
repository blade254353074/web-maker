/*TMODJS:{"version":6,"md5":"e794775476ffedcdeb41b155e18d5b80"}*/
template('page/index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,username=$data.username,$out='';$out+='<section class="panel container"> <header class="panel-heading"> <h3>欢迎回来「';
$out+=$escape(username);
$out+='」！</h3> </header> <div class="panel-body"> <blockquote class="callout-success"> <p> <label>老乞丐：</label> <span>小兄弟，老夫看你骨骼惊奇，根骨奇佳乃是百年不遇的练武奇才，</span> </p> <p> <label>老乞丐：</label> <span>我看与你有缘，收你十块钱，传授给你吧。</span> </p> <a href="/" class="btn btn-link">《武林秘籍》，点击获得</a> <p> <label>老乞丐：</label> <span>未来拯救世界的任务就要你来完成了！</span> </p> </blockquote> </div> </section> ';
return new String($out);
});