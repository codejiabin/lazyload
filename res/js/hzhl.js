try{document.domain='zjcp888.com';}catch(e){};
var errorTimes = 0;//密码错误次数
var wait = 60;
var hzhl={
	getParam : function(){
		var name = arguments[0];
		var url = arguments.length>1 ? arguments[1] : document.location.search;
		url = url.substring(url.indexOf('?')+1);
		var items = url.split("&"),value=null;
		$(items).each(function(i,v){
			var n = v.split('=');
			if(name==n[0]){
				value = n[1];
				return;
			}
		});
		return value;
	},
	bodyCancel : function(source,div,other){
		var source = $(source),div = $(div),obj = div.position();
		var pos = source.position();
		var area = [[
				pos.top,
				pos.top + source.outerHeight(),
				pos.left,
				pos.left + source.outerWidth()
		],[
				obj.top,
				obj.top + div.outerHeight(),
				obj.left,
				obj.left + div.outerWidth()
		]];
		if(other){
			$(other).each(function(i,v){
				v=$(v);
				pos=v.position();
				area.push([
					pos.top,
					pos.top + v.outerHeight(),
					pos.left,
					pos.left + v.outerWidth()
				]);
			});
		}
		var can = function(x,y){
			var bool = true;
			for(var i=0;i<area.length;i++){
				if(y>=area[i][0] && y<=area[i][1] && x>=area[i][2] && x<=area[i][3]){
					bool = false;
					break;
				}
			}
			return bool;
		}
		var e = this.getEvent();
		if(can(e.clientX,e.clientY))div.hide();
	},
	getEvent : function(){var e;if(/msie/i.test(navigator.userAgent)){e = window.event;if(!e.target){e.target = e.srcElement;}e.preventDefault=function(){e.cancelBubble=true;e.returnValue=false;};}else{var f=arguments.callee;while(f=f.caller){if((e=f.arguments[0])&&/Event/.test(e.constructor.toString())){e = e;}}}return e;	},
	ce : function(parent,tag,args){
		var obj = $(document.createElement(tag));
		if(args){
			for(var key in args){
				if(key=="style")
					obj.css(args[key]);
				else if(key=='html')
					obj.html(args[key]);
				else if(key=='class')
					obj.addClass(args[key]);
				else
					obj.attr(key,args[key]);
			}
		}
		obj.appendTo(parent);
		return obj;
	},
	$number : function(v){
		var i = function(val){
			val = String(val).toInt();
			return val<10 ? '0'+val : val;
		}
		if($.isArray(v)){
			var na = [];
			$(v).each(function(j,v){na.push(i(v));});
			return na;
		}
		return i(v);
	},
	selectText : function(source,sp,ep){
		source = $(source).ele();
		sp = parseInt(sp);
		ep = parseInt(ep);
		if(isNaN(sp)||isNaN(ep))return;
		if(!source.createTextRange)return;
		var rng = source.createTextRange();
		rng.moveEnd("character",source.value);
 		rng.moveStart("character",source.value);
		rng.collapse(true);
		rng.moveEnd("character",ep);
		rng.moveStart("character",sp);
		rng.select();
	},
	singleKeyup : function(obj,reg,rep){
		obj = $(obj),val=obj.val();
		var e = this.getEvent(),a=['０','１','２','３','４','５','６','７','８','９'];
		if([8,37,38,39,40].indexOf(e.keyCode)!=-1)return;
		if(e.keyCode>=48 && e.keyCode<=57 && !val.hasChinese())return;
		obj.val(val.repChinese().replace(reg,rep||''));
	},
	toPage : function(total,formName){
		var p = $('#toPage').val();
		if(p.empty())return hzhl.dialog.alert({lock:true,content:'请输入您想跳转的页码。',ok:function(){$('#toPage').focus();}});
		p = p.toInt(-1);
		if(p<=0 || p>total)return hzhl.dialog.alert({lock:true,content:'您输入的页码不正确，最大可以输入'+total+' 页。',ok:function(){$('#toPage').focus();}});
		$('#'+formName).find("input:first-child").val(p);
		$('#'+formName).submit();
	},
	copy : function(txt){
		//var window.netscape=1;
	    if(window.clipboardData){
			window.clipboardData.clearData();
			window.clipboardData.setData("Text", txt);
		}else if(navigator.userAgent.indexOf("Opera") != -1){
			window.location = txt;
		}else if (window.netscape){
			console.log(window.netscape);
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch (e){
				alert("您的当前浏览器设置已关闭此功能！请按以下步骤开启此功能！\n新开一个浏览器，在浏览器地址栏输入'about:config'并回车。\n然后找到'signed.applets.codebase_principal_support'项，双击后设置为'true'。\n声明：本功能不会危极您计算机或数据的安全！");
			}
		    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		    if (!clip) return;
		    var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		    if (!trans) return;
		    trans.addDataFlavor('text/unicode');
		    var str = new Object();
		    var len = new Object();
		    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		    var copytext = txt;
		    str.data = copytext;
		    trans.setTransferData("text/unicode",str,copytext.length*2);
		    var clipid = Components.interfaces.nsIClipboard;
		    if (!clip) return false;
		    clip.setData(trans,null,clipid.kGlobalClipboard);
	   }else
	   {
		   hzhl.dialog.alert({content:'<input id="copytext" value="'+location.href+'" style="width:265px;border:none;" /><br/>请按下ctrl+C进行复制!',width:360});
		   setTimeout(function() {
				$('#copytext').select();
			},10);
		   return false;
	   }
	   return true;
	},
	openUserScheme : function(t,lid,uid){
		hzhl.dialog.simple({
			type    : 'userDialog',
			lock    : true,
			move    : true,
			title   : '加载中...',
			content : '<iframe id="userIFrame" src="'+this.webRoot+'/buy/openUserScheme.htm?history='+t+'&lotteryId='+lid+'&userId='+uid+'&t='+new Date().getTime()+'" width="100%" height="100%" scrolling="no" frameborder="0"></iframe>',
			width   : 700,
			height  : 446
		});
	},
	userSchemeAlt : function(title){
		var o=hzhl.dialog.boxs['userDialog'];
		if(!o)return;
		o.title.html(title);
	},
	showMap : function(o){
		var map=$('#map');
		if(map.emp())
		{
			map=hzhl.ce(document.body,'div',{
				id  : 'map',
				html: '<h1 onclick="$(\'#map\').hide(\'fast\');" class="cursor"><span>网站地图</span><i></i></h1><div class="body"><b><a href="'+this.webRoot+'/buy/index.htm">购彩大厅</a></b><div class="content"><a href="'+this.webRoot+'/buy/dcball.htm">双色球</a> <a href="'+this.webRoot+'/buy/threed.htm">福彩3D</a> <a href="'+this.webRoot+'/buy/lotto.htm">大乐透</a> <a href="'+this.webRoot+'/buy/pl.htm">排列3/5</a><br/><a href="'+this.webRoot+'/buy/ssl.htm">时时乐</a> <a href="'+this.webRoot+'/buy/sd115.htm">11运夺金</a> <a href="'+this.webRoot+'/buy/jx115.htm">11选5</a><br/><a href="'+this.webRoot+'/buy/jcFootball.htm">竞彩足球</a> <a href="'+this.webRoot+'/buy/basketball.htm">竞彩篮球</a> <a href="'+this.webRoot+'/buy/bjc.htm">足球单场</a> <a href="'+this.webRoot+'/buy/index.htm">更多</a></div><b><a href="http://fx.hzhl.com" target="_blank">图表分析</a></b><div class="content"><a href="http://fx.hzhl.com/xssq/" target="_blank">双色球</a> <a href="http://fx.hzhl.com/x3d/" target="_blank">福彩3D</a> <a href="http://fx.hzhl.com/xdlt/" target="_blank">大乐透</a> <a href="http://fx.hzhl.com/xpl/" target="_blank">排列3/5</a><br/><a href="http://fx.hzhl.com/xssl/" target="_blank">时时乐</a> <a href="http://fx.hzhl.com/xssc/" target="_blank">时时彩</a> <a href="http://fx.hzhl.com/xsd115/" target="_blank">11运夺金</a> <a href="http://fx.hzhl.com/xjx115/" target="_blank">11选5</a> <a href="http://fx.hzhl.com/" target="_blank">更多</a></div><b><a href="http://zq.hzhl.com/info/season.jsp" target="_blank">足球数据</a></b><div class="content"><a href="http://zq.hzhl.com/info/season.jsp" target="_blank">联赛资料</a> <a href="http://zq.hzhl.com/zsCenter/" target="_blank">即时赔率</a> <a href="http://zq.hzhl.com/live/" target="_blank">比分直播</a></div><b>综合频道</b><div class="content"><a href="'+this.webRoot+'/buy/index.htm">购彩大厅</a> <a href="'+this.webRoot+'/hemai/index.htm">合买中心</a> <a href="'+this.webRoot+'/draw/index.htm">开奖公告</a><br/><a href="'+this.webRoot+'/passcount/index.htm">过关统计</a> <a href="'+this.webRoot+'/won/index.htm">中奖查询</a> <a href="'+this.webRoot+'/wap.htm">手机购彩</a><br/><a href="http://news.hzhl.com/" target="_blank">彩票资讯</a> <a href="http://fx.hzhl.com/" target="_blank">图表分析</a> <a href="http://fx.hzhl.com/filter.jsp">选号过滤</a><br/><a href="'+this.webRoot+'/soft/index.htm" target="_blank">彩票软件</a> <a href="http://bbs.hzhl.com/" target="_blank">彩票论坛</a> <a href="'+this.webRoot+'/help/index.htm" target="_blank">帮助中心</a></div></div>'
			});
			map.bind({
				mouseover : function(){map.show();},
				mouseout  : function(){map.hide();}
			});
			map.hide();
		}
		var pos=$(o).position();
		map.css({
			left : pos.left-map.width()+766,
			top  : pos.top-4
		});
		map[map.isVisible()?'hide':'show']();
	},
	openRole : function(){
		hzhl.dialog.simple({
			title   : '用户合买代购协议',
			content : '<div class="main_container"><div class="u0" id="u0"><div id="u0_rtf"><p style="TEXT-ALIGN: center"><span style="FONT-WEIGHT: bold; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">彩票2元网用户合买代购协议</span><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 用户使用彩票2元网提供的互联网彩票委托投注服务即意味着接受本协议，使用前请认真阅读。</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 1、本站根据彩票行业相关主管部门的政策法规，合法给用户提供互联网彩票在线投注业务，任一彩种的游戏规则以发行机构所公布的官方规则为准。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 2、根据国家规定，禁止未满18周岁(未成年)者利用本网站购买彩票。同时，我们不提倡在校学生购买彩票。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 3、单式代购或合买用户提交的单式文本格式必须是本站规定的标准格式。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 4、用户应妥善保管自己的本站账户，投注方案一旦产生，认购列表是证明方案归属并依此按参与者派发奖金的重要凭证。如用户对方案存在异议，应在官方开奖之前与本站沟通解决。若开奖后再申诉，本站不予受理且不承担责任。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 5、本站努力使用户的每一次投注委托成功，但是并不能保证一定成功。成功与否的标志是方案状态，“成功”、“中奖”、“未中奖”表明用户的投注委托成功，“撤单”表明由于一些原因导致用户的委托失败。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 由于以下情形未能成功出票的，本站不承担责任：&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; (1)不可抗力因素，如地震、台风、海啸、区域性停电等造成无法出票。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; (2)官方出票终端系统故障、机器维护提前停售等造成无法出票。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; (3)本站出票系统故障导致无法出票。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; (4)因比赛延期提前停售导致无法出票</span><span style="font-weight: normal; font-size: 13px; color: #333333; font-style: normal; font-family: 宋体; text-decoration: none">。</span><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; (5)因官方赛程调整无法出票。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; (6)数字彩因限号无法出票。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; (7)方案发起人申请撤单。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 6、由于彩票网购的特殊性，本站并不为代购合买委托失败承担任何责任，但是委托失败后的购买资金必定足额返还给用户，并发公告通知或电话联系相关用户。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 7、代购方案正在出票中或已出票不能撤单；进度大于等于50%的合买方案，发起人及参与者均不能撤单。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 8、进度+保底大于等于90%的合买方案，本站将无条件保底。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 9、对于截止认购时进度+保底未达到90%的方案(不满足本站保底条件)，将做自动撤单处理，认购资金全额返回给相关用户。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 10、彩票发行机构官方开奖后，本站将代为办理兑奖事宜，并即时将税后奖金派发到用户的本站账户，本站不收取任何费用。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 11、对于竞彩所有彩种和玩法，网站尽量保证过关赔率奖金、让球信息、让分值和大小分界限值等数据的及时更新，但在实际出票之前，依然会存在发生变化的可能。出票后以方案详情的数据(已对照官方数据)为准，请用户及时查看。由此发生的出票时相关数据与投注时不一致的情况，本站不负任何责任。&nbsp;</span></p><p style="TEXT-ALIGN: left"><span style="FONT-WEIGHT: normal; FONT-SIZE: 13px; COLOR: #333333; FONT-STYLE: normal; FONT-FAMILY: 宋体; TEXT-DECORATION: none">&nbsp; &nbsp; 同意以上协议条款的用户，方有资格享受本站提供的相关服务，并受本协议的约束。</span></div></div></div>' ,
			width   : 600,
			height  : 300,
			lock    : true,
			move    : true,
			buttons : [{
				value : '关闭' ,
				handle:function(o){
					hzhl.dialog.close(o);
				}
			}]
		});
	}
};
(function(){var ss=document.getElementsByTagName('script');var src=ss[ss.length - 1].src;hzhl.webRoot=src.indexOf('webRoot=')==-1 ?'':src.substring(src.indexOf('webRoot=')+8);})();
$.extend($.browser,{
	screen : function(){
		var s = $.browser.msie ?
			{w:document.documentElement.clientWidth,h:document.documentElement.clientHeight} : ($.browser.opera ?
			{w:Math.min(window.innerWidth, document.body.clientWidth),h:Math.min(window.innerHeight, document.body.clientHeight)} :
			{w:Math.min(window.innerWidth, document.documentElement.clientWidth),h:Math.min(window.innerHeight, document.documentElement.clientHeight)});
		s.left = document.documentElement.scrollLeft || document.body.scrollLeft;
		s.top = document.documentElement.scrollTop || document.body.scrollTop;
		s.sw = document.documentElement.scrollWidth || document.body.scrollWidth;
		s.sh = document.documentElement.scrollHeight || document.body.scrollHeight;
		return s;
	}
});
$.extend($.fn,{
	emp  : function(){
		return this[0]==null;
	},
	isVisible : function(){
		return this.css('display')!='none';
	},
	center : function(){
		var oh=this.outerHeight(),ow=this.outerWidth(), s = $.browser.screen();
		var c = {top:(s.h -oh)/2+s.top,left:(s.w -ow)/2 + s.left};
		this.css(c)
		return c;
	},
	ele : function(){
		return this[0];
	},
	revClass : function(c1,c2){var remCls = c1.split(',');var obj = this;$(remCls).each(function(i,v){obj.removeClass(v);});obj.addClass(c2);return this;},
	hasClass : function(cls){return $(this).attr('class').indexOf(cls)!=-1;return this;},
	ajaxForm : function(semantic){
		var a=[];
		if(this.length===0){return a;}
		var form=this[0];
		var els = semantic ? form.getElementsByTagName('*') : form.elements;
		if(!els){return a;}
		var i,j,n,v,el,max,jmax;
		for(i=0, max=els.length; i < max; i++) {
			el = els[i];
			n = el.name;
			if (!n){
				continue;
			}
			if (semantic && form.clk && el.type == "image") {
				// handle image inputs on the fly when semantic == true
				if(!el.disabled && form.clk == el) {
					a.push({name: n, value: $(el).val()});
					a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
				}
				continue;
			}

			v = $.fieldValue(el, true);
			if (v && v.constructor == Array) {
				for(j=0, jmax=v.length; j < jmax; j++) {
					a.push({name: n, value: v[j]});
				}
			}
			else if (v !== null && typeof v != 'undefined') {
				a.push({name: n, value: v});
			}
		}

		if (!semantic && form.clk) {
			// input type=='image' are not found in elements array! handle it here
			var $input = $(form.clk), input = $input[0];
			n = input.name;
			if (n && !input.disabled && input.type == 'image') {
				a.push({name: n, value: $input.val()});
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
		}
		return a;

	}
});
$.extend(String.prototype,{
	empty          :    function(){return this==null || this=='' || this.length==0;},
	encode         :    function(){return encodeURIComponent(this);},
	decode         :    function(){return decodeURIComponent(this);},
	stripTags      :    function(){return this.replace(/<\/?[^>]+>/gi, '');},
    extractScripts :    function(){return (this.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img')) || []);},
    evalScripts    :    function(){$(this.extractScripts()).each(function(i,v){eval(v.substring(v.indexOf('>')+1,v.lastIndexOf('<')));});},
	strip: function() { return this.replace(/^\s+/, '').replace(/\s+$/, ''); },
    stripScripts   :    function(){return this.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), '');},
	trim           :    function(){return $.trim(this);},
	replaceAll     :    function(rgExp,replaceText){var tmpStr=this;while(tmpStr.indexOf(rgExp)!=-1)tmpStr=tmpStr.replace(rgExp,replaceText);return tmpStr;},
	toArray        :    function(s){if(s)return this.split(s);var arr=[];for(var i=0;i<this.length;i++)arr.push(this.substring(i,i+1));return arr;},
	toInt		   :    function(val){if(arguments.length==0)val=0;if(!this.isNumber()){return val;}return Number(this);},
	toFloat        :    function(val){var a=this;if(arguments.length==0)val=0;if(!a.replace('.','').isNumber()){return val;}return parseFloat(this);},
	isNumber       :    function(){return /^[0-9]+$/.test(this);},
	hasChinese     :    function(){return escape(this).indexOf("%u")!=-1;},
	repChinese     :    function(){var a=this;$(['０','１','２','３','４','５','６','７','８','９']).each(function(i,v){a=a.replaceAll(v,i);});return a;},
	isIDCard       :    function(){return /^(\d{15}|\d{18}|\d{17}(X|x))$/.test(this);},
	isEmail        :    function(){if(this==null || this.length==0)return false;var  pattern=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;return pattern.test(this);}  ,
	len			   :    function(){return this.replace(/[^\x00-\xff]/g, "**").length;},
    cnLength       :    function () {
                            var escStr = escape(this);
                            var numI = 0;
                            var escStrlen = escStr.length;
                            for (i = 0; i < escStrlen; i++){
                                if (escStr.charAt(i) == '%'){
                                    if (escStr.charAt(++i) == 'u'){
                                        numI++;
                                    }
                                }
                            }
                            return this.length + numI;
                            }
});
$.extend(Array.prototype,{
	indexOf   : function(val){var pos=-1;$(this).each(function(i,v){if(v==val){pos=i;return;}});return pos;},
	del       : function(value){var pos = this.indexOf(value);if(pos==-1)return;this.splice(pos,1);return this;},
	max       : function(){var max;$(this).each(function(i,v){v = Number(v);max = i==0?v:(v>max?v:max);});	return max;},
	min       : function(){var min;$(this).each(function(i,v){v = Number(v);min = i==0?v:(v<min?v:min);});	return min;},
	hasRepeat : function(){var b = {};var a = this;for(var i=0,l=a.length; i<l&&!b[a[i]];b[a[i++]]=1);return i<l;	},
	clone     : function(){var a=[];for(var i=0;i<this.length;i++)a[i] = this[i];return a;},
	del       : function(value,isPos){var pos=!isPos?this.indexOf(value):value;if(pos==-1)return;this.splice(pos,1);return this;},
	random : function(o){
		o = $.extend({
		   	len    : 1,//号码长度
			repeat : false,//是否可以重复
			sort   : false,//是否需要排序
			zero   : false//是否需要补0
	    },o);
		var s=this,a=[],no;
		var r = function(){return s[Math.round(Math.random()*(s.length-1))];}
		while(a.length!=o.len){
			no = r();
			if(!o.repeat && a.indexOf(no)!=-1)continue;
			a.push(no);
		}
		if(o.sort)
			a = a.sort(function(a,b){return a-b;});
		if(o.zero)
			a = hzhl.$number(a);
		return a;
	}
});
Function.prototype.bind = function(){
	var __method = this;
	var args = Array.prototype.slice.call(arguments);
	var object=args.shift();
	return function() {
		return  __method.apply(object,args.concat(Array.prototype.slice.call(arguments)));
	}
}

/**
* 对Date的扩展，将 Date 转化为指定格式的String
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
* eg:
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
*/
$.extend(Date.prototype,{
	pattern : function(fmt){
		var o = {
		"M+" : this.getMonth()+1, //月份
		"d+" : this.getDate(), //日
		"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
		"H+" : this.getHours(), //小时
		"m+" : this.getMinutes(), //分
		"s+" : this.getSeconds(), //秒
		"q+" : Math.floor((this.getMonth()+3)/3), //季度
		"S" : this.getMilliseconds() //毫秒
		};
		var week = {
		"0" : "\u65e5",
		"1" : "\u4e00",
		"2" : "\u4e8c",
		"3" : "\u4e09",
		"4" : "\u56db",
		"5" : "\u4e94",
		"6" : "\u516d"
		};
		if(/(y+)/.test(fmt)){
			fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
		if(/(E+)/.test(fmt)){
			fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
		}
		for(var k in o){
			if(new RegExp("("+ k +")").test(fmt)){
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			}
		}
		return fmt;
	}
});
$.extend(Math.prototype, {
    c: function(len, m) {
        return (function(n1, n2, j, i, n) {
            for (; j <= m;) {
                n2 *= j++;
                n1 *= i--
            }
            return n1 / n2
        })(1, 1, 1, len, len)
    }
});
/* 对话框 */
hzhl.dialog={
	boxs      : {},
	create   : function(op){
		op = $.extend({
			type    :   'box',
			buttons :   []
		},op);
		if(this.boxs[op.type])return this.boxs[op.type];
		var config=this.boxs[op.type]={};
		var t1 = $('<label></label>');
		var t2 = $('<span></span>');
		var t = $('<h1></h1>').append(t1).append(t2);
        t = $('<td class="titm"></td>').append(t);
        t = $('<tr></tr>').append($('<td class="w10 titl"></td>')).append(t).append($('<td class="w10 titr"></td>'));
        t = $('<table cellspacing="0" cellpadding="0" border="0" width="100%"></table>').append(t);


		var c = $('<div class="tc_box_con"></div>');
		var body = $('<td style="background: none repeat scroll 0 0 #FFFFFF"></td>').append(t).append(c);

        if(op.buttons.length>0){
			var b = $('<div class="bottom"></div>');
			var buttons = [];
			$(op.buttons).each(function(i,v){
				buttons[i] = $('<input type="button" class="button" value="'+v+'">');
				b.append(buttons[i]);
				b.append(' ');
			});
			body.append(b);
			this.boxs[op.type]['buttons'] = buttons;
		}
//		var o = $('<div class="dialog"></div>').append(body);
//        var boxMidr = $('<div class="tc_box_mid"><div class="tc_box_midl"></div></div>').append(body).append($('<div class="tc_box_midr"></div>'));
        var boxMidr = $('<table cellspacing="0" cellpadding="0" border="0" width="100%"></table>').append(
            $('<tr><td class="w8"></td></tr>').append(body).append($('<td class="w8"></td>'))
        );
        var o = $('<div class="tc_box"><div class="tc_box_top"></div></div>').append(boxMidr).append($('<div class="tc_box_bot"></div>'));
		o.appendTo(document.body);
		this.boxs[op.type].obj = $(o);
		this.boxs[op.type].title = t1;
		this.boxs[op.type].content = c;
		this.boxs[op.type].close = t2;
		return this.boxs[op.type];
		/*
		<div id="dialog">
			<div class="body" style="width:350px;">
				<h1><label>网页对话框...</label><span></span></h1>
				<div style="height:100px;"></div>
				<div class="bottom">
					<input type="button" class="button" value="确定"/> <input type="button" class="button" value="取消"/>
				</div>
			</div>
		</div>*/
	},
	/*自定义提示信息box
	 *@param type    提示框类型alert|confirm
	 *@param title   提示框标题
	 *@param content 提示内容
	 *@param width   提示框宽度
	 *@param move    是否可以拖动true|false
	 *@param lock    是否锁屏true|false
	 *@param scroll  内容超出滚动
	 *@param before  加载之前事件回调
	 *@param load    加载中事件回调
	 *@param enterFunc    回车事件回调
	 *@param buttons array[
	 	@value   按钮文字
		@handle  当点击处理function]
	 */
	simple : function(op){
		var self = this;
		op = $.extend({
			type    : 'BOX',
			title   : '提示信息',
			content : '',
			width   : 400,
			move    : false,
			lock    : false,
			scroll  : true,
			before  : $.noop,
			load    : $.noop,
			enterFunc : function(){hzhl.dialog.close(op.type);	},
			escFunc : function(){hzhl.dialog.close(op.type);}
		},op);
		//call before function
		op.before();

		//create base box HTML
		var buttons = [],butFunc = [];
		$(op.buttons).each(function(i,n){
			buttons.push(n.value);
			butFunc.push(n.handle||$.noop);
		});
		var o = this.create({type:op.type,buttons:buttons});
		o.lock = op.lock;

		//update Info
		o.title.html(op.title);
		if(typeof(op.content)=='object'||op.content.indexOf('#')==0)
		{
			op.content=$(op.content);
			o.restore=op.content.clone(true);
			o.content.html(op.content.html());
			op.content.remove();
		}
		else
			o.content.html(op.content);
		o.obj.css('width',op.width);
		if(op.height){
			var mh = op.height - 65;
			if(!op.scroll){
				o.content.css({
					height    : mh,
					overflow  : 'hidden'
				});
			}else{
				o.content.css({
					height    : mh,
					maxHeight : mh+1,
					overflow  : 'auto'
				});
			}
		}

		//bind Event
		o.close.unbind('click');
		o.close.bind({
			click : function(){
				hzhl.dialog.close(op.type);
			}
		});
		$(o.buttons).each(function(i,n){
			n.unbind('click');
			n.click(function(){butFunc[i](o);});
		});
		if(o.buttons&&o.buttons.length>0){
			$(document.body).unbind('keydown');
			$(document.body).bind('keydown',function(event){
				if(event.keyCode==27){op.escFunc();hzhl.dialog.close(op.type);}
				if(event.keyCode==13){op.enterFunc();hzhl.dialog.close(op.type);}
			});
		}

		//align center
		o.obj.center();
		if(op.move){if(!hzhl.draggable)return alert('hzhl.draggable 插件未加载');hzhl.draggable(o.obj.find('h1'),o.obj);}
		if(op.lock){if(!hzhl.lock)return alert('hzhl.lock 插件未加载');hzhl.lock.show();}
		o.obj.show();
		o.obj.focus();

		//call loaded function
		op.load(o);

		if(hzhl.needLock1==true){
			$(".tc_box").eq(0).css({"z-index":1000});
		}
	},
	close : function(op){
		var c = 0,op=typeof(op)=='string' ? this.boxs[op] : op;
		for(var k in this.boxs){
			if(this.boxs[k].lock){
				if(this.boxs[k].obj.isVisible())
					c++;
			}
		}
		if(op){op.obj.hide();}
		if(c<=1){hzhl.lock.hide();}
		if(op.restore){op.restore.appendTo(document.body);}
		if(hzhl.needLock1==true){
			$(".tc_box").eq(0).css({"z-index":10000});
			hzhl.needLock1=false;
		}
	},
	alert : function(op){
		if(op.buttons){
			$(op.buttons).each(function(i,v){
				if(!v.handle){
					v.handle=function(o){hzhl.dialog.close(o);}
				}
			});
		}
		if(typeof(op)=='string'){
			this.simple({
				type      : 'alert',
				title     : '提示信息',
				content   : '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td align="center" style="padding: 25px 0px;"><table cellspacing="0" cellpadding="0" border="0"><tr><td><div class="tc_box_conl"></div></td><td><div class="tc_box_conr">'+op+'</div></td></tr></table></td></tr></table>',
				lock      : true,
				move	  : true,
				enterFunc : op.ok,
				escFunc   : op.ok,
				buttons   : op.buttons || [{
					value    :   '确定',
					handle   :    function(o){
						hzhl.dialog.close(o);
					}
				}]
			});
		}else{
			this.simple({
				type      : 'alert',
				title     : op.title || '提示信息',
//                content   : '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td><div class="tc_box_conl"></div></td><td><div class="tc_box_conr">'+op.content+'</div></td></tr></table>',
                content   : '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td align="center" style="padding: 25px 0px;"><table cellspacing="0" cellpadding="0" border="0"><tr><td><div class="tc_box_conl"></div></td><td><div class="tc_box_conr">'+op.content+'</div></td></tr></table></td></tr></table>',

				width     : op.width,
				lock      : op.lock||true,
				move	  : op.move||true,
				load      : op.load,
				enterFunc : op.ok,
				escFunc   : op.ok,
				buttons   : op.buttons || [{
					value    :  '确定',
					handle   :    function(o){
						op.ok&&op.ok(o);
						hzhl.dialog.close(o);
					}
				}]
			});
		}
	},
	confirm : function(op){
		if(op.buttons){
			$(op.buttons).each(function(i,v){
				if(!v.handle){
					v.handle=function(o){hzhl.dialog.close(o);}
				}
			});
		}
		this.simple({
			type      : 'confirm',
			title     : op.title || '确认提示',
//            content   : '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td><div class="tc_box_conl"></div></td><td><div class="tc_box_conr">'+op.content+'</div></td></tr></table>',
            content   : '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td align="center" style="padding: 25px 0px;"><table cellspacing="0" cellpadding="0" border="0"><tr><td><div class="tc_box_conl"></div></td><td><div class="tc_box_conr">'+op.content+'</div></td></tr></table></td></tr></table>',

			width     : op.width,
			lock      : op.lock||true,
			move	  : op.move||true,
			load      : op.load,
			enterFunc : op.ok,
			escFunc   : op.cancel,
			buttons   : op.buttons || [{
				value    :   '确定',
				handle   :    function(o){
					op.ok&&op.ok(o);
					hzhl.dialog.close(o);
				}
			},{
				value    :   '取消',
				handle   :    function(o){
					op.cancel&&op.cancel(o);
					hzhl.dialog.close(o);
				}
			}]
		});
	},
	loading:function(){
		
		$("#loading").show();
	},
	clearLoading:function(){
		$("#loading").hide();
	}
};

/* 拖动 */
hzhl.draggable=function(obj,dragObj){
	dragObj = dragObj || obj;
	var obj = $(obj);
	var dragObj = $(dragObj);
	if(!dragObj)return;
	obj.css('cursor','move');
	var pos,h=this,o=$(document);
	var oh = dragObj.outerHeight();
	var ow = dragObj.outerWidth();
	obj.mousedown(function(event){
		if(h.setCapture)h.setCapture();
		pos = {
			top  : dragObj.position().top,
			left : dragObj.position().left
		};
		pos = {
			top   :	 event.clientY  - pos.top,
			left  :  event.clientX  - pos.left
		};
		o.mousemove(function(event){
			try{
				if (window.getSelection) {
					window.getSelection().removeAllRanges();
				} else {
					document.selection.empty();
				}
			}catch(e){}
			var s = $.browser.screen();
			var maxTop = s.sh;
			var maxLeft = s.sw;
			var top = Math.max(event.clientY-pos.top,0);
			var left = Math.max(event.clientX-pos.left,0);
			dragObj.css({top:Math.min(top,maxTop-oh),left:Math.min(left,maxLeft-ow)});
		});
		o.mouseup(function(event){
			if(h.releaseCapture)h.releaseCapture();
			o.unbind('mousemove');
			o.unbind('mouseup');
		});
	});
};

/* cookie */
hzhl.cookie={
	get : function(name){if(document.cookie==null){alert("没有document.cookie无法操作Cookie");return;}var tmpDate=document.cookie;var tmpStart=tmpDate.indexOf(name+"=");if(tmpStart==-1){return null;}tmpStart+=name.length+1;var tmpEnd=tmpDate.indexOf(";",tmpStart);if(tmpEnd==-1){return decodeURI(tmpDate.substring(tmpStart))};return decodeURI(tmpDate.substring(tmpStart,tmpEnd));},
	set : function(name,value,expires,path,domain,secure){if(document.cookie==null){alert("没有document.cookie无法操作Cookie");return;}var tmpCookie=name+"="+encodeURI(value);if(expires!=null){tmpCookie+=";expires="+expires.toGMTString();}if(path!=null){tmpCookie+=";path="+path;}if(domain!=null){tmpCookie+=";domain="+domain;}if(secure!=null){tmpCookie+=";secure="+secure;}document.cookie=tmpCookie;},
	remove : function(name,path,domain){if(document.cookie==null){alert("没有document.cookie无法操作Cookie");return;}var tmpCookie=name+"=null;expires="+new Date(new Date().getTime()-1000000000000).toGMTString();if(path!=null){tmpCookie+=";path="+path;}if(domain!=null){tmpCookie+=";domain="+domain;}document.cookie=tmpCookie;},
	clear : function(path,domain){if(document.cookie==null){alert("没有document.cookie无法操作Cookie");return;}var tmpCookie=document.cookie.split(";");var tmpName;for(var i=0;i<tmpCookie.length;i++){tmpName=tmpCookie[i].split("=")[0].strip();Cookie.remove(tmpName,path,domain);}}
};

/* 滚动 */
hzhl.marquee={
	text : function(options){
		this.options = $.extend({
			direction : 'marginTop',
			speed     : 500,
			amount    : 20,
			interval  : 3000,
			mouse     : true,
			object    : null
		},options);
	}
};
$.extend(hzhl.marquee.text.prototype,{
	start : function(){
		this.options.object = $(this.options.object);
		this.options.id = setInterval($.proxy(function(){this.doStart()},this),this.options.interval);
		if(this.options.mouse){
			this.options.object.bind({
				mouseover : $.proxy(function(){clearInterval(this.options.id);},this),
				mouseout  : $.proxy(function(){
					this.options.id = setInterval($.proxy(function(){this.doStart()},this),this.options.interval);
				},this)
			});
		}
	},
	doStart : function(){
		var c1 = {},c2={},op=this.options;
		c1[op.direction] =  '-'+op.amount+'px';
		c2[op.direction] =  '0px';
		op.object.find("*:first").animate(c1,op.speed,function(){$(this).css(c2).appendTo(op.object);});
	},
	stop   : function(){
		clearInterval(this.options.id);
	}
});

/* 锁屏 */
hzhl.lock={
	source     : null,
	initialize : function(op){
		var s = $.browser.screen();
		op = op || {w : s.sw,h : s.sh,t : 0,l : 0};
		if(!this.o){
			this.o = $(document.createElement("div"));
			this.o.attr('id','hzhl.lock');
			var userAgent = navigator.userAgent.toLowerCase(),
				browserId = userAgent.match(/(firefox|chrome|safari|opera|msie)/)[1],
				browserVersion = (userAgent.match(new RegExp('.+(?:version)[\/: ]([\\d.]+)')) || userAgent.match(new RegExp('(?:'+browserId+')[\/: ]([\\d.]+)')) || [0,'0'])[1],
				isIe6 = (browserId + browserVersion == "msie6.0");
			if (isIe6) { 
				this.o.css({
					'width'      : op.w,
					'height'     : op.h,
					'position'   : 'absolute',
					'top'	       : op.t,
					'left'       : op.l,
					'zIndex'     : 1000,
					'display'    : 'none'
				});
			}else{
				this.o.css({
					'background' : '#000',
					'width'      : op.w,
					'height'     : op.h,
					'position'   : 'absolute',
					'top'	       : op.t,
					'left'       : op.l,
					'zIndex'     : 1000,
					'opacity'    : 0.3,
					'filter'     : 'Alpha(opacity=30)',
					'display'    : 'none'
				});
			}
			this.o.appendTo(document.body);
			$(window).resize(function(){if(this.o.isVisible())	{this.show(this.source);}}.bind(this));
		}else{
			this.o.css({
				width      : op.w,
				height     : op.h,
				top	       : op.t,
				left       : op.l
			});
		}
	},
	show : function(obj){
		this.source=obj;
		var op = !obj ? null : {
			w : $(obj).outerWidth(),
			h : $(obj).outerHeight(),
			t : $(obj).position().top,
			l : $(obj).position().left
		};
		this.initialize(op);
		this.o.fadeIn(300);
	},
	hide : function(){
		if(this.o)this.o.hide();
	}
};

/* 提示 */
hzhl.tips={
	box      :  {},
	isCreate : false,
	create   : function(){
		if(!this.isCreate){
			var tip = $('<div class="tips"></div>');
			var t = $('<b></b>');
			var tbox = $('<h1></h1>').append('<span></span>').append(t);
			tip.append(tbox);
			var content = $('<div class="content"></div>');
			tip.append(content);
			var shadow = $('<div class="tips-shadow"></div>');
			this.box.tip = tip;
			this.box.title = t;
			this.box.content = content;
			this.box.shadow = shadow;
			tip.appendTo(document.body);
			shadow.appendTo(document.body);
			this.isCreate = true;
		}
	},
	show   : function(obj,op){
		op = $.extend({
			title   : '提示信息',
			content : '',
			width   : 'auto',
			top     : 0,
			left    : 0
		},op);
		this.create();
		this.box.title.html(op.title);
		this.box.content.html(op.content);

		var pos = $(obj).position();
		var w=op.width=='auto'?this.box.tip.width():op.width,h=this.box.tip.height();
		var left=pos.left+op.left,top=pos.top+op.top;
		if(w+left>$.browser.screen().w)
			left = $.browser.screen().w-w-4;
		this.box.tip.css({
			width : w+'px',
			top   : top,
			left  : left
		});
		this.box.shadow.css({
			width : w+'px',
			height: h+'px',
			top   : top+2,
			left  : left+2
		});
		this.box.tip.show();
		this.box.shadow.show();
		if(op.time)
			window.setTimeout(function(){this.hide('fadeOut');}.bind(this),op.time);

	},
	hide : function(t){
		t=t||'hide';
		this.box.tip[t]();
		this.box.shadow[t]();
	},
    timeOut : function(callback){
		hzhl.user.dlCallback = callback;
		hzhl.dialog.simple({
			type    : 'dialog-timeOut',
			lock    : true,
			move    : true,
			width   : 440,
			title   : '提示信息',
			/*content : '<div class="tc_box_con tc_box_con1">' +
                    '<div class="tcxtip_top">很抱歉，该彩种暂停销售</div>' +
                '<div class="tcxtip_bot"><h2>您可以购买</h2><p>' +
                '<a href="/buy/dcball.htm">双色球</a>' +
                '<a href="/buy/threed.htm">3D福彩</a>' +
                '<a href="/buy/happy7.htm">七乐彩</a>' +
                '<a href="/buy/zj155.htm">福彩15选5</a></p></div>'+
                '</div>'*/
            content : '<div class="tc_box_con1" style="padding-bottom: 30px;padding-top: 30px;text-align: left;"> '+
                	'<div class="tcxtip_top"><h1>很抱歉，该彩种暂停销售</h1> '+
                   	 '<p><span>您可以购买</span><a href="http://www.hzhl.com/buy/dcball.htm">双色球</a><a href="http://www.hzhl.com/buy/threed.htm">福彩3D</a><a href="http://www.hzhl.com/buy/happy7.htm">七乐彩</a><a href="http://www.hzhl.com/buy/zj155.htm">福彩15选5</a></p></div>'+
                	'<div class="tcxtip_bot"><h2>试试彩票2元手机网，惊喜不断!</h2><p class="wz"><a href="http://3g.hzhl.com">http://3g.hzhl.com</a></p>'+
                    '<p><input type="text" id="tip_mobile" value="输入手机号码" class="txt" onfocus="if(this.value==\'输入手机号码\'){this.value=\'\';$(this).css(\'color\',\'#363636\');}$(\'#tipMobileError\').text(\'\');">' +
                    '<input type="image" id="smsBtn" class="btn" src="http://res.hzhl.com/images/tc/sendsms.gif" onclick="hzhl.tips.sendWebUrl();"></p>' +
                '<p class="fs_tip"><span id="tipMobileError" style="color: #333;font-size:14px;"></span></p>' +
                	'</div></div>'

		});
	},
    sendWebUrl : function(){
        var closeHtml = '<a href="#" style="margin-left: 15px;font-size:14px;" onclick="hzhl.dialog.close(\'dialog-timeOut\')">[关闭]</a>';
        var mobile = $("#tip_mobile").val();
        if(mobile=="输入手机号码"){
           $("#tipMobileError").text("请输入手机号码！").append(closeHtml); return;
        }
        //todo 手机验证
        if(!hzhl.user.checkMobile("tip_mobile","tipMobileError")){
            $("#tipMobileError").append(closeHtml);
           return;
        }
        //发送信息
        $.ajax({
                url     : '/wapUrl.htm?t=' + new Date().getTime(),
                data    : {mobile : mobile,yzm : "yzm"},
                cache   : false,
                context : this,
                success : function(result) {
                    if(result.result){
                        $('#tipMobileError').text(result.msgs).append(closeHtml);
                        $('#smsBtn').attr('src','http://res.hzhl.com/images/tc/huibtn.gif');
                    }else{
                        //hzhl.dialog.alert(result.msgs);
                        $('#tipMobileError').text(result.msgs).append(closeHtml);
                    }
                }.bind(this),
                error   : function(result) {
                    hzhl.dialog.alert('注册失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');
                }
            });
    }
}

/* 号码检查 */
hzhl.format={
	repChinese : function(content){
		$(['０','１','２','３','４','５','６','７','８','９']).each(function(i,v){content=content.replaceAll(v,i)});
		return content;
	},
	$number : function(v){
		var s = function(v){
			v = Number(v);
			return v<10 ? '0'+v : v;
		}
		if(!v||v.length==0)return '';
		if($.isArray(v)){
			var a = [];
			$(v).each(function(i,val){a.push(s(val));});
			return a;
		}
		return s(v);
	},
	check : function(content,basic,special,basicLen,specialLen,isLotto,ss){
		content = (content || '').trim();
		if(content.length==0)return 'error:您还没有输入号码。';
		var bet = this.repChinese(content).replaceAll("\r\n","<,>").replaceAll("\n","<,>").split("<,>");
		if(bet.length==0)return 'error:您还没有输入号码。';
		var no,count=0,b,s,result=[];
		for(var i=0;i<bet.length;i++){
			bet[i] = bet[i].trim();
			if(bet[i].length==0)continue;
			no = isLotto ? bet[i].split(/[^0-9]+/) : bet[i].replaceAll(' ','').replaceAll(',','').toArray();
			if(no.length!=basicLen+specialLen)
				return 'error:第'+(i+1)+'行的号码 “'+bet[i]+'” 号码个数不正确。';
			b = [];s = [];
			for(var j=0;j<basicLen;j++)b.push(no[j]);
			for(var j=basicLen;j<basicLen+specialLen;j++)s.push(no[j]);

			for(var j=0;j<b.length;j++){
				if(!this.inArray(b[j],basic))
					return 'error:第'+(i+1)+'行的号码 “'+bet[i]+'”中的第'+(j+1)+'个字符“'+b[j]+'”超出允许范围，<a href="#" onclick="$(\'#base_1\').toggle();return false;" class="fb fb-u">查看允许的字符</a><div style="padding-top:6px;display:none;" id="base_1">'+basic.join(' ')+'</div>';
			}
			if(special&&specialLen>0){
				for(var j=0;j<s.length;j++){
					if(!this.inArray(s[j],special))
						return 'error:第'+(i+1)+'行的号码 “'+bet[i]+'”中的第'+(basicLen+j+1)+'个字符“'+s[j]+'”超出允许范围，<a href="#" onclick="$(\'#base_2\').toggle();return false;" class="fb fb-u">查看允许的字符</a><div style="padding-top:6px;display:none;" id="base_2">'+special.join(' ')+'</div>';
				}
			}
			if(isLotto){
				if(ss!=false){
					b.sort(function(a,b){return a-b;});
					s.sort(function(a,b){return a-b;});
				}
				for(var j=0;j<b.length;j++){
					for(var c=j+1;c<b.length;c++){
						if(Number(b[j])==Number(b[c]))
							return 'error:第'+(i+1)+'行的号码 “'+bet[i]+'”中的号码“'+b[j]+'”存在重复。';
					}
				}
				for(var j=0;j<s.length;j++){
					for(var c=j+1;c<s.length;c++){
						if(Number(s[j])==Number(s[c]))
							return 'error:第'+(i+1)+'行的号码 “'+bet[i]+'”中的号码“'+s[j]+'”存在重复。';
					}
				}
				result.push(this.$number(b).join(' ')+(specialLen>0 ? ' + '+this.$number(s).join(' ') : ''));
			}else{
				result.push(b.join('')+s.join(''));
			}
			count++;
		}
		return {units:count,content:result};
	},
	inArray : function(a,arr){
		for(var i=0;i<arr.length;i++)
			if(a==arr[i])
				return true;
		return false;
	}
};
hzhl.format.role={
	a    : {
		'双色球单式'      : ['08 09 10 12 13 14 15','08,09,10,12,13,14,15','08 09 10 12 13 14+15','08,09,10,12,13,14+15'],
		'双色球复式'      : ['08 09 10 12 13 14 15+16','08,09,10,12,13,14,15+16'],
		'福彩3D单选单式'  : ['123','2,2,3','7 8 9','8-8-7'],
		'福彩3D组选单式'  : ['123','2,2,3','7 8 9','8-8-7'],
		'七乐彩单式'      : ['08 09 10 12 13 14 15','08,09,10,12,13,14,15'],
		'福彩15选5单式'   : ['08 09 10 12 13','08,09,10,12,13'],
		'东方6+1单式'     : ['123456虎','1 2 3 4 5 6 虎','1-2-3-4-5-6-虎'],
		'排列3直选单式'   : ['123','2,2,3','7 8 9','8-8-7'],
		'排列3组选单式'   : ['123','2,2,3','7 8 9','8-8-7'],
		'排列5单式'       : ['12345','2,2,3,4,5','7 8 9 5 6','8-8-7-4-2'],
		'超级大乐透单式'   : ['08 09 10 12 13 11 12','08,09,10,12,13,11,12','08 09 10 12 13+11 12','08,09,10,12,13+11,12'],
		'生肖乐单式'       : ['08 09','08,09','08-09'],
		'七星彩单式'       : ['1234567','1 2 3 4 5 6 7','1-2-3-4-5-6-7'],
		'全国22选5单式'    : ['08 09 10 12 13','08,09,10,12,13'],
		'体彩6+1单式'      : ['1234567','1 2 3 4 5 6 7','1-2-3-4-5-6-7'],
		'体彩20选5单式'    : ['08 09 10 12 13','08,09,10,12,13'],
		'时时乐直选单式'   : ['123','2,2,3','7 8 9','8-8-7'],
		'时时乐组选单式'   : ['123','2,2,3','7 8 9','8-8-7'],
		'时时乐前二单式'   : ['12','1,2','1 2','1,2,-'],
		'时时乐后二单式'   : ['12','1,2','1 2','-,1,2'],
		'时时彩五星通选单式': ['12345','2,2,3,4,5','7 8 9 5 6','8-8-7-4-2'],
		'时时彩五星单式': ['12345','2,2,3,4,5','7 8 9 5 6','8-8-7-4-2'],
		'时时彩三星直选单式'   : ['123','2,2,3','7 8 9','8-8-7'],
		'时时彩三星组选单式'   : ['123','2,2,3','7 8 9','8-8-7'],
		'时时彩二星直选单式'   : ['12','1,2','1 2','1-2'],
		'时时彩二星组选单式'   : ['12','1,2','1 2','1-2'],
		'十一运夺金任选前一单式': ['01','02','04','06'],
		'十一运夺金任选二单式': ['01 02','01,02','01-02'],
		'十一运夺金任选二直选单式': ['01 02','01,02','01-02'],
		'十一运夺金任选二组选单式': ['01 02','01,02','01-02'],
		'十一运夺金任选三单式': ['01 02 03','01,02,03','01-02-03'],
		'十一运夺金任选三直选单式': ['01 02 03','01,02,03','01-02-03'],
		'十一运夺金任选三组选单式': ['01 02 03','01,02,03','01-02-03'],
		'十一运夺金任选四单式': ['01 02 03 04','01,02,03,04','01-02-03-04'],
		'十一运夺金任选五单式': ['01 02 03 04 05','01,02,03,04,05','01-02-03-04-05'],
		'十一运夺金任选六单式': ['01 02 03 04 05 06','01,02,03,04,05,06','01-02-03-04-05-06'],
		'十一运夺金任选七单式': ['01 02 03 04 05 06 07','01,02,03,04,05,06,07','01-02-03-04-05-06-07'],
		'十一运夺金任选八单式': ['01 02 03 04 05 06 07 08','01,02,03,04,05,06,07,08','01-02-03-04-05-06-07-08'],
		'14场单式' : ['31031031031033','31031031031033','31031031031033','31031031031033'],
		'9场单式' : ['310310310*****','310310310*****','310310310*****','310310310*****'],
		'6场单式' : ['310310310310','310310310310','310310310310','310310310310'],
		'4场单式' : ['32103210','32103210','32103210','32103210']
	},
	open : function(ti){
		hzhl.dialog.simple({
			type    : 'formatBox',
			title   : ti+'支持格式说明',
			width   : 300,
			height  : 180,
			lock    : true,
			move    : true,
			content : '<div style="line-height:22px;text-align:left;padding:10px;">'+this.a[ti].join('<br/>')+'</div>',
			buttons : [{
				value  : '知道了',
				handle : function(){
					hzhl.dialog.close('formatBox');
				}
			}]
		});
	}
};

hzhl.user={
	config     : {},
	moneyCount : 0,
    parseLoginResult : function(data) {
        if (data.match("^-1")) {
            return loginResult = {
                state : -1,
                error : data.substring(3, data.length).split("|")[0],
                errorTimes :data.substring(3, data.length).split("|")[1]
            };
        }
        if (data.match("^-2")) {
            return loginResult = {
                state : -2,
                error : data.substring(3, data.length).split("|")[0],
                errorTimes :data.substring(3, data.length).split("|")[1]
            };
        }
        return  {
            state : 0,
            returnUrl : data.split("|")[0],
            loginname : data.split("|")[1]
        }
    } ,

    login : function(rUrl){
		var name = $('#userName').val();
		var password = $('#password').val();
		if(name.empty() || name.len()<2)return (this.config.parent?parent.hzhl.dialog:hzhl.dialog).alert({lock:false,content:'账号填写错误，账号长度为2～16个字符。',ok:function(){}});
		if(password.empty() || password.length<6)return (this.config.parent?parent.hzhl.dialog:hzhl.dialog).alert({lock:false,content:'密码填写错误，密码长度必须为6～16之间。',ok:function(){}});
		/*$.getScript('http://www.hzhl.com/2011/user1/login_script!.jsp?userName='+name+'&password='+password+'&ajax=true',function(){});*/
//        var url = WebAppUrl.SSO_APP_URL+'/doLogin.htm?userName='+name+'&password='+password;
//        var script = document.createElement("script");
//        script.type = "text/javascript";
//        script.src = url;
//        document.body.appendChild(script);

        $.ajax({
			url     : WebAppUrl.CUR_APP_URL+'/login?t='+new Date().getTime(),
			data    : {userName : name,password : password},
			cache   : false,
			success : function(result){
                var res = hzhl.user.parseLoginResult(result);
                if (res.state == '-1') {
                    hzhl.dialog.alert(res.error);
                } else {
                    hzhl.user.isLogin=true;
                    if(rUrl!= undefined && rUrl == '1'){
                       hzhl.user.showIframeLoginHTML(true,name);
                    }else{
                       hzhl.user.showLoginHTML(true,name);
                    }
                    window.location.reload();
                }
			}.bind(this),
			error   : function(result){hzhl.dialog.alert('登录失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');}
		});
	},
    isValidUserName:function(name){
		var tmpLen=name.len();
		if(tmpLen<3 || tmpLen>16)
			return '用户长度必须在3-16之间';
		if(name.indexOf('hzhl')>=0 || name.indexOf('彩票2元')>=0 || name.indexOf('妈的')>=0 || name.indexOf('qq')>=0 || name.indexOf('QQ')>=0 || name.indexOf('两元')>=0 || name.indexOf('二元')>=0 || name.indexOf('网站')>=0 || name.indexOf('客服')>=0 || name.indexOf('保底')>=0 || name.indexOf('2元')>=0)
			return '用户名中包含非法字符';
		if(name.indexOf("0x")>=0)
			return '用户名中包含非法字符';
		var pattern=/^[A-Za-z0-9\u4e00-\u9fa5]+$/;
		if(!pattern.test(name.replaceAll('_','')))
			return '用户名中包含非法字符';
		return null;
	   },
	   checkUserName: function(nameId, promptId) {
	    	var nameValue = $("#" + nameId).val();
	        $("#" + nameId).removeClass('txt_act').removeClass('red');
	        $("#" + nameId).prev('.newrgPicon').removeClass('newrgPiconact').removeClass('newrgPiconerror');
	        if (nameValue.empty()) {
	        	$("#" + nameId).val('用户名/手机号码').addClass('newrggray');
	        	$('.newrgcode').hide();
	            $('#'+promptId).addClass('error').text("请输入用户名");
	            $("#" + nameId).addClass('red');
	            $("#" + nameId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + nameId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            return false;
	        }
	        var lent = nameValue.cnLength();
	        if(lent<3 || lent>16){
	        	$('.newrgcode').hide();
	            $('#'+promptId).addClass('error').text("用户名长度应为3-16位字符");
	            $("#" + nameId).addClass('red');
	            $("#" + nameId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + nameId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            return false;
	        }
			var nameReg = new RegExp("^([a-z|A-Z]+|[ \u4e00-\u9fa5]+|[0-9]+|[_|_]+)+$");
	        if (!nameReg.test(nameValue)) {
	        	$('.newrgcode').hide();
	            $('#'+promptId).addClass('error').text("用户名只能由汉字、数字、字母或下划线组成");
	            $("#" + nameId).addClass('red');
	            $("#" + nameId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + nameId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            return false;
	        }
	        var tmpText = hzhl.user.isValidUserName(nameValue);
	        if (tmpText) {
	        	$('.newrgcode').hide();
	            $('#'+promptId).addClass('error').text("用户名中含有禁止使用的字符");
	            $("#" + nameId).addClass('red');
	            $("#" + nameId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + nameId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            return false;
	        }
	        var reg=/^[1-9]\d*$|^0$/; 
	        //var regmoble= /^[1][358]\d{9}$/; //验证手机号码  
	        if(reg.test(nameValue)==true&&lent!=11){
	        	$('.newrgcode').hide();
	        	$("#Judgemobile").val('0');
	        	$('#'+promptId).addClass('error').text("用户名不能为除手机号码以外的纯数字");
	            $("#" + nameId).addClass('red');
	            $("#" + nameId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + nameId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	           	return false;
	         }
	        if(reg.test(nameValue)==true&&lent==11){
	        	$('.newrgcode').show();
	        	$("#Judgemobile").val('1');
	            var url = WebAppUrl.SSO_APP_URL + "/existUserName.htm?mobile=" + encodeURI(nameValue) + "&t=" + new Date().getTime();
	        }else{
	        	$('.newrgcode').hide();
	            var url = WebAppUrl.SSO_APP_URL + "/existUserName.htm?userName=" + encodeURI(nameValue) + "&t=" + new Date().getTime();
	        }
	        
	        $.get(url, function(data) {
	            if (data != "1") {
	                $('#'+promptId).addClass('error').html(data);
	                $("#" + nameId).addClass('red');
	                $("#" + nameId).prev('.newrgPicon').addClass('newrgPiconerror');
	                $("#" + nameId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            } else {
	            	$("#" + nameId).next('.newrgprompt').removeClass('newrgerror').addClass('newrgsu');
	                return true;
	            }
	        });
	    },
	    checkPwd: function (passId, promptId) {
	        var pwd1 = $("#"+passId).val();
	        $("#" + passId).removeClass('txt_act').removeClass('red');
	        $("#" + passId).prev('.newrgPicon').removeClass('newrgPiconact').removeClass('newrgPiconerror');
	        if (pwd1.length==0) {
	            $('#'+promptId).addClass('error').text("请输入密码");
	            $("#" + passId).addClass('red');
	            $("#" + passId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + passId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            return false;
	        }
			var checkReg = new RegExp("[\u4e00-\u9fa5]+");
	        if (checkReg.test(pwd1)) {
	            $('#'+promptId).addClass('error').text("密码请勿包含中文");
	            $("#" + passId).addClass('red');
	            $("#" + passId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + passId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	        }
	        if (pwd1.length < 6) {
	            $('#'+promptId).addClass('error').text("您输入的密码不足6位");
	            $("#" + passId).addClass('red');
	            $("#" + passId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + passId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            return false;
	        }
	        if (pwd1.length > 20) {
	            $('#'+promptId).addClass('error').text("您输入的密码超过20位");
	            $("#" + passId).addClass('red');
	            $("#" + passId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + passId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            return false;
	        }
	        if(pwd1=='123123'||pwd1=='112233'||pwd1=='111222'||pwd1=='abcabc'||pwd1=='aabbcc'||pwd1=='aaabbb'){
	            $('#'+promptId).addClass('error').text("您输入的密码太简单，请重新输入");
	            $("#" + passId).addClass('red');
	            $("#" + passId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + passId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
				return false;
			}
			if(pwd1.replaceAll(pwd1.charAt(0),'')==''){
	            $('#'+promptId).addClass('error').text("您输入的密码太简单，请重新输入");
	            $("#" + passId).addClass('red');
	            $("#" + passId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + passId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
				return false;
			}
			if(isNaN(pwd1)){
				$("#" + passId).next('.newrgprompt').removeClass('newrgerror').addClass('newrgsu');
				return true;
			}
			var array=pwd1.split("");
			var sortDirection=1;//默认升序
			var len=array.length;
		    var n0=parseInt(array[0]);
		    if(parseInt(array[0])>parseInt(array[len-1])){
		        //降序
		        sortDirection=-1;
		    }
		    var isnotContinuation=false;
		    for(var i=0;i<len;i++){
		        if(parseInt(array[i])!==(n0+i*sortDirection)){
		        	isnotContinuation=true;
		            break;
		        }
		    }
			if (!isnotContinuation){
	            $('#'+promptId).addClass('error').text("您输入的密码太简单，请重新输入");
	            $("#" + passId).addClass('red');
	            $("#" + passId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + passId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            return false;
			};
			
	    },
	    checkConfirmPwd: function (confirmPassId, passId, promptId) {
	        var pwd1 = $("#"+confirmPassId).val();
	        var pwd = $("#"+passId).val();
	        $("#" + confirmPassId).removeClass('txt_act').removeClass('red');
	        $("#" + confirmPassId).prev('.newrgPicon').removeClass('newrgPiconact').removeClass('newrgPiconerror');
	        if (pwd1.empty() || pwd != pwd1) {
	            $('#'+promptId).addClass('error').text("您两次输入的密码不一致");
	            $("#" + confirmPassId).addClass('red');
	            $("#" + confirmPassId).prev('.newrgPicon').addClass('newrgPiconerror');
	            $("#" + confirmPassId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
	            return false;
	        }
	        $("#" + confirmPassId).next('.newrgprompt').removeClass('newrgerror').addClass('newrgsu');
	        return true;
	    },
    removeProm: function (confirmPassId, promptId) {
        $("#"+confirmPassId).addClass('txt_act');
        $('#'+promptId).detach();
        return true;
    },
    checkEmail: function(emailId, promptId) {
        var email = $("#" + emailId);
        $("#" + emailId).removeClass('txt_act').removeClass('red');
        if (email.val().length > 0) {
            /*if(email.val().length==0){
                register.warn(promptId, '请输入常用邮箱');
                return false;
            }*/
            if (!email.val().isEmail()) {
                $('#' + promptId).addClass('error').text("请输入正确的邮箱地址");
                $("#" + emailId).addClass('red');
                return false;
            }
            return true;
        }
        return true;
    },
    checkMobile: function(mobileId, promptId) {
        var val = $("#"+mobileId).val().repChinese();
        $("#" + mobileId).removeClass('txt_act').removeClass('red');
        if (val.length > 0) {
            //检查手机号码的格式是否正确
            if (val.length != 11) {
                $('#' + promptId).addClass('error').text("手机号格式输入错误");
                $("#" + mobileId).addClass('red');
                return;
            }
            var mobilePattern = new RegExp("1(2|3|4|5|6|7|8)[0-9]{9}");
            if (!mobilePattern.test(val)) {
                $('#' + promptId).addClass('error').text("手机号格式输入错误");
                $("#" + mobileId).addClass('red');
                return;
            }
            $("#"+mobileId).val(val);
            return true;
        }
        $("#"+mobileId).val(val);
        return true;
    },
    quicklyRegister: function() {
        var isname = hzhl.user.checkUserName('r_userName','r_userName_prom');
        if(isname == false){
            return;
        }
        
        $("#zc_btn").val("正在注册").attr("disabled","disabled").addClass("dis");
        var name = $('#r_userName').val();
        var regway = 0;
        if(user.isMobilePhone(name)){
        	var url = WebAppUrl.SSO_APP_URL + "/existUserName.htm?mobile=" + encodeURI(name) + "&t=" + new Date().getTime();
        	regway = 1;
        }else{
        	var url = WebAppUrl.SSO_APP_URL + "/existUserName.htm?userName=" + encodeURI(name) + "&t=" + new Date().getTime();
        }
        
        $.get(url, function(data) {
            if (data != "1") {
                $('#r_userName_prom').addClass('error').html(data);
                $("#r_userName").addClass('red');
                $("#zc_btn").val("提交注册").removeAttr("disabled").removeClass("dis");
                return;
            } else {
                var isPwd = hzhl.user.checkPwd('r_password', 'r_password_prom');
                var isConfirmPwd = hzhl.user.checkConfirmPwd('r_confirmPassword', 'r_password', 'r_confirmPassword_prom');
                //var isEmail = hzhl.user.checkEmail('r_email', 'r_email_prom');
//                var isMobile = hzhl.user.checkMobile('r_mobile', 'r_mobile_prom');
                if (isPwd && isConfirmPwd) {
                    var protocol = $("#protocol").attr("checked");
                    if (!protocol) {
                        /*hzhl.dialog.alert({
									content:'您必须年满18岁并接受“彩票2元网服务条款”才能注册!',
									ok:function(o){
										hzhl.dialog.close(o);
										$("#zc_btn").val("提交注册").removeAttr("disabled").removeClass("dis");
									}
								});*/
                    	hzhl.dialog.alert("您必须年满18岁并接受“彩票2元网服务条款”才能注册!");
                        $("#zc_btn").val("提交注册").removeAttr("disabled").removeClass("dis");
                        return;
                    }
                    var password = $('#r_password').val();
                    //var mobile = $('#r_mobile').val();
                    //var email = $('#r_email').val();
                    var verificationCode = $('#r_verificationCode').val();
                    // 执行注册
                    $.ajax({
                        url     : WebAppUrl.SSO_APP_URL + '/quecklyRegister.htm?t=' + new Date().getTime(),
                        data    : {userName : name,password : password,regway : regway,verificationCode:verificationCode},
                        cache   : false,
                        success : function(result) {
                            if (result.result) {
                                // 执行登录
                            	$('#newrgtype').val('1');
                            	//$("#dialog-name").val(name);
                                $("#dialog-name").val(result.msgs).removeClass('newrggray');
                                $("#dialog-password").val(password);
                                hzhl.user.dialogLogin(true);
                            } else {
                            	hzhl.needLock1=true;
                                $("#zc_btn").val("提交注册").removeAttr("disabled").removeClass("dis");
                                hzhl.dialog.alert(result.msgs);
                            }
                        },
                        error   : function(result) {
                            hzhl.dialog.alert('注册失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');
                            $("#zc_btn").val("提交注册").removeAttr("disabled").removeClass("dis");
                        }
                    });
                }else{
                    $("#zc_btn").val("提交注册").removeAttr("disabled").removeClass("dis");
                }
            }
        });
    },
    afterLoginProcess : function(response) {
        res = hzhl.user.parseLoginResult(response);
        if (res.state == '-1') {
            hzhl.dialog.alert(res.error);
        } else {
            window.location.reload();
        }
    },

    //跳转url(如果没有登录,弹出窗登录。登录后跳转到指定的url)
    login0penUrl:function(url) {
        $.ajax({
            url: WebAppUrl.HOME_APP_URL + "/checkLogin?booleanValue=true&t=" + new Date().getTime(),
            success: function(response) {
                if (response!='false') {
                    window.location = url.indexOf("?")==-1?url+"?t="+new Date().getTime():url+"&t="+new Date().getTime();
                } else {
                    hzhl.user.dlCallback = function(){
                       window.location = url.indexOf("?")==-1?url+"?t="+new Date().getTime():url+"&t="+new Date().getTime();
                    }
                    hzhl.user.showWwwLoginBox();
                }
            }
        });
    },
  //打开在线客服页面(如果没有登录,到登录窗口，登录后打开在线客服)
    login0penUrlNew:function(id) {
        var flag = true;
        $.ajax({
            url: WebAppUrl.HOME_APP_URL + "/checkLogin?booleanValue=true&t=" + new Date().getTime(),
            async:false,
            success: function(response) {
                if (response!='false') {
                    $('#'+id).attr('href','http://chat.looyu.com/chat/chat/p.do?c=25783&f=51805&g=20022')
                } else {
                    hzhl.user.dlCallback = function(){
                        $('#'+id).attr('href','http://chat.looyu.com/chat/chat/p.do?c=25783&f=51805&g=20022')
                    }
                    $('#'+id).attr('href',WebAppUrl.HOME_APP_URL +'/sso/signOn.htm?entrance=http://chat.looyu.com/chat/chat/p.do?c=25783&f=51805&g=20022')
                }
            }
        });
        return true;
    },

   //主站页头登入导航（目前使用）
    showWWWLoginHtml : function(f, username) {
        var h = {
                a: '<strong>欢迎您</strong><a href= "' + WebAppUrl.HOME_APP_USER_URL + '/index.htm" id="n_welcome_user_nick">' + username + '</a><div class="n_welcome_account" id="yue"><a id="n_welcome_account">账户余额</a></div><a id="n_welcome_signout" href="javascript:hzhl.user.ajaxWWWLogout()">退出</a><div id="curBalanceId" style="position:absolute;border:1px solid #ccc;color:#666;padding:5px;top:28px;background:#fff;" class="yell yue-div dis-none"></div>',
                b: '<span>欢迎您，请</span><a id="n_welcome_signin" onclick="hzhl.user.showWwwLoginBox()">登录</a><a id="n_welcome_signup" target="_blank" href= "' + WebAppUrl.SSO_APP_URL + '/register.htm">免费注册</a><a id="n_welcome_signup_other">第三方登录</a><div id="n_welcome_signup_others"><b>第三方登录</b><a class="n_wechat_icon" href="http://www.hzhl.com/sso/weChat.htm">微信</a><a class="n_qq_icon" href="' + WebAppUrl.SSO_APP_URL + '/qqLogin.htm">腾讯QQ</a><a class="n_alipay_icon" href="' + WebAppUrl.SSO_APP_URL + '/alipayLogin.htm">支付宝</a><a class="n_weibo_icon" href="' + WebAppUrl.SSO_APP_URL + '/sinaLogin.htm">新浪微博</a></div>'
            };

        if (!this.divl)this.divl = $('#n_welcome');
        this.divl.html(h[f ? 'a' : 'b']);
        
        this.isLogin = f;
        if (!this.isLogin) {
            $("a.mzc").hover(function () {
                var left = $(this).offset().left - 7;
                $("div.mzc-div").show().css("left", left).css("z-index", "999");
            }, function () {
                $("div.mzc-div").hide();
            });
            
            $("#n_welcome_signup_other").mouseover(function(){
            	$('#n_welcome_signup_other').hide();
        	    $("#n_welcome_signup_others").show();
        	    return false;
        	}); 
            $("#n_welcome_signup_others").mouseleave(function(){
        	    $("#n_welcome_signup_others").hide(); 
        	    $('#n_welcome_signup_other').show();
        	    return false;
        	});
            
            $("div.mzc-div").hover(function () {
                $(this).show();
            }, function () {
                $(this).hide();
            });
        } else {
            hzhl.user.moneyBalance("curBalanceId");
            $("#yue").hover(
                function () {
                    var left = $("#yue").position().left;
                    $(this).addClass("zhje-hov");
                    $("#curBalanceId").find("b").css({"color": "#BA2C20","margin": "0"});
                    $("#curBalanceId").show().css("left", left);
                },
                function () {
                    $(this).removeClass("zhje-hov");
                    $("#curBalanceId").hide();
                });
       }
        /*中奖一键分享 start*/
        if(f){
        	if(hzhl.cookie.get('shareMark')!=null){
        		hzhl.user.WinnersShare();
        	}
        }
//        if(f){
//        	if(hzhl.cookie.get('shareMark')!=null){
//        		hzhl.user.WinnersShare();
//        	}
//        }
        /*中奖一键分享 end*/ 
    },
    moneyBalance : function(divId){
        $.ajax({
            url     : WebAppUrl.HOME_APP_USER_URL+'/ajaxGetAvailableMoney.htm?ajax=true&t='+new Date().getTime(),
            cache   : false,
            context : this,
            success : function(result){
                if(result == "-1"){  //未登录
                   // window.location = window.location;
                    return;
                }

              $('#' + divId).html('余额: <b>'+result.trim()+'</b>元');                

            }.bind(this)
        });
    },
    moneyBalanceOut : function(divId){
    	$.getJSON(WebAppUrl.HOME_APP_USER_URL+'/ajaxGetAvailableMoney.htm?ajax=true&t='+new Date().getTime() + '&jsoncallback=?',
    		function(result){
    			if(result == "-1"){  //未登录
    				return;
    			}
    			$('#' + divId).html('余额: <strong>'+result.trim()+'</strong>元');
    		});
    },
    tyxysc : function(divId) {
    	$.ajax({
    		url:WebAppUrl.HOME_APP_USER_URL+'/ajaxGetTyXysc.htm?ajax=true&t='+new Date().getTime(),
    		cache : false,
    		context : this,
    		success : function(result) {
    			if (result == "1") {
    				$("#" + divId).css("display", "inline-block");
    			}
    		}
    	});
    },
    registerUrl : function(){
        window.location = WebAppUrl.SSO_APP_URL + "/register.htm";
    },
    //弹出层登录头
	showWwwLoginBox : function(){
		var tmp=[];
		tmp.push('<div class="dl_box_con">');
		tmp.push('<div id="dl_box"><ul class="tab"><li class="dl act">登录</li><li class="zc" onclick="$(this).parent().parent().hide();$(\'#zc_box\').show();$(\'div.tc_box\').css(\'top\',$(\'div.tc_box\').offset().top);">注册</li></ul>');
		tmp.push('');
		tmp.push('<p><label for="dialog-name">&nbsp;&nbsp;账号:</label><span class="newrgPbox"><i class="newrgPicon newrgPname newrgPiconerror"></i><input type="text" id="dialog-name" onfocus="if($(this).val()==\'用户名/手机号码\'){$(this).val(\'\').removeClass(\'newrggray\')}" onblur="if($(this).val()==\'\'){$(this).val(\'用户名/手机号码\').addClass(\'newrggray\')}" class="txt" value=""></span></p>');
		tmp.push('<p><label for="dialog-password">&nbsp;&nbsp;密码:</label><span class="newrgPbox"><i class="newrgPicon newrgPpassword"></i><input type="password" id="dialog-password" class="txt" onkeyup="if(hzhl.getEvent().keyCode==13){hzhl.user.dialogLoginWww();}"><a class="a1" href="'+WebAppUrl.SSO_APP_URL+'/forget_password.htm" target="_blank">忘记密码？</a></p>');
		tmp.push('<p id="tr_verificationCode" style="display: none;"><label for="verificationCode">验证码</label><input type="text" id="verificationCode" class="txt" />&nbsp;<img src="'+WebAppUrl.SSO_APP_URL+'/servlet/verifyImage" alt="验证码" id="verification_img" style="vertical-align: middle;"/></span></p>');
		tmp.push('<p><input id="dl_btn" type="button" class="dl_btn" value="安全登录" onclick="hzhl.user.dialogLoginWww();"></p>');
		tmp.push('<div id="dialog_message" class="fr" style="display:none;padding-right: 55px; padding-left:70px; padding-bottom:10px;">账号或密码错误</div><div class="hzwz"><ul><li class="hzwzwz">合作网站登录</li><li class="weixin"><a href="http://www.hzhl.com/sso/weChat.htm" target="_blank">微信</a></li><li class="qq"><a href="'+WebAppUrl.SSO_APP_URL+'/qqLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'QQ账号登录 \');">QQ</a></li><li class="zfb"><a href="'+WebAppUrl.SSO_APP_URL+'/alipayLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'支付宝登录\');">支付宝</a></li><li class="xl"><a href="'+WebAppUrl.SSO_APP_URL+'/sinaLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'新浪微博登录\');">新浪微博</a></li></ul></div>');
		tmp.push('</div>');
		tmp.push('<div id="zc_box" class="zc_box_con" style="display: none;"><ul class="tab"><li class="dl" onclick="$(this).parent().parent().hide();$(\'#dl_box\').show();$(\'div.tc_box\').css(\'top\',$(\'div.tc_box\').offset().top);">登录</li><li class="zc act">注册</li></ul>');
		tmp.push('<div class="newrgstart"><p><label for="r_userName">帐号注册:</label><span class="newrgPbox"><i class="newrgPicon newrgPname"></i><input type="text" value="用户名/手机号码" onfocus="hzhl.user.checkfoucusname(this)" onblur="hzhl.user.checkUserName(\'r_userName\',\'r_userName_prom\');" id="r_userName" class="txt newrggray" maxlength="30"><i class="newrgprompt"></i></span></p><span id="r_userName_prom"></span><p><label for="r_password">密码:</label><span class="newrgPbox"><i class="newrgPicon newrgPpassword"></i><input onfocus="hzhl.user.checkpassword(this)" onkeyup="hzhl.user.newrgkeyup(this)" onblur="hzhl.user.checkPwd(\'r_password\',\'r_password_prom\');" type="password" id="r_password" class="txt"><i class="newrgprompt"></i></span></p><span id="r_password_prom"></span><p><label for="r_confirmPassword">确认密码:</label><span class="newrgPbox"><i class="newrgPicon newrgPconfirm"></i><input onfocus="hzhl.user.checkconfirm(this)" onblur="hzhl.user.checkConfirmPwd(\'r_confirmPassword\',\'r_password\',\'r_confirmPassword_prom\');" type="password" id="r_confirmPassword" class="txt"><i class="newrgprompt"></i></span></p><span id="r_confirmPassword_prom"></span>');
		tmp.push('<p style="position:relative" class="newrgcode"><label for="r_verificationCode">手机验证</label><span class="newrgPbox"><i class="newrgPicon newrgPphone"></i><input type="text" onfocus="$(this).addClass(\'txt_act\');" onblur="$(this).removeClass(\'txt_act\')" id="r_verificationCode" class="txt" maxlength="30"><a href="javascript:void(0)" class="newrgPsend" id="newrgsend" onclick="hzhl.user.sendcode()"></a></span><span></span></p>');
		tmp.push('<p><input type="button" id="zc_btn" class="dl_btn" value="提交注册" onclick="hzhl.user.quicklyRegister();"><a href="http://www.hzhl.com/activity/5050.htm" target="_blank" class="newrgactivity"></a></p><div class="tyzc"><input type="checkbox" class="zc_chkbox" checked="checked" id="protocol" name="protocol"><span>我已经年满18岁并同意<a target="_blank" href="/company/serviceRole.htm">《用户服务条款》</a></span></div>');
		tmp.push('<div class="hzwz"><ul><li class="hzwzwz">合作网站登录</li><li class="weixin"><a href="http://www.hzhl.com/sso/weChat.htm" target="_blank">微信</a></li><li class="qq"><a href="'+WebAppUrl.SSO_APP_URL+'/qqLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'QQ账号登录\');">QQ</a></li><li class="zfb"><a href="'+WebAppUrl.SSO_APP_URL+'/alipayLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'支付宝登录\');">支付宝</a></li><li class="xl"><a href="'+WebAppUrl.SSO_APP_URL+'/sinaLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'新浪微博登录\');">新浪微博</a></li></ul></div>');
		tmp.push('</div>');
		tmp.push('<div class="newrgsud"><p class="newrgtitle"><font id="newrgsudname"></font>,恭喜您注册成功</p><p class="newrgconrz newrgconrzAct"><a href="http://www.hzhl.com/user/mobileVerify.htm?reUrl=4" title="">验证手机</a>并<a href="javascript:void(0)" id="newrgrzbtn" onclick="hzhl.user.newrgruth()">实名认证</a>，<em class="ActIcon_5050">新手充<a href="http://www.hzhl.com/activity/5050.htm" title="充50送50">充50送50</a></em></p><p><input type="button" onclick="hzhl.user.chongzhi()" class="dl_btn" value="立即充值"></p></div>');
		tmp.push('<div class="newrgrz">');
		tmp.push('<p><label for="name">真实姓名:</label><span class="newrgPbox"><i class="newrgPicon newrgPname"></i><input type="text" maxlength="16" onfocus="$(this).addClass(\'txt_act\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(this).next(\'.newrgprompt  \').removeClass(\'newrgerror\').removeClass(\'newrgsu\');$(\'#name_prom\').removeClass(\'error\');$(\'#name_prom\').html(\'\');" onblur="hzhl.user.newrgrzblurname(\'name\',\'name_prom\')" id="name" class="txt" maxlength="30"><i class="newrgprompt"></i></span></p><span id="name_prom"></span>');
		tmp.push('<p><label for="identityNumber" id="idenName">身份证号码:</label><span class="newrgPbox newrgPboxzindex"><i class="newrgPicon newrgPid"></i><input onfocus="$(this).addClass(\'txt_act\');$(\'#identityNumber_prom\').html(\'\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(this).next(\'.newrgprompt\').removeClass(\'newrgerror\').removeClass(\'newrgsu\');$(\'#identityNumber_prom\').removeClass(\'error\');" onblur="hzhl.user.bluridentityNumber(\'identityNumber\',\'identityNumber_prom\')" type="text" maxlength="18" id="identityNumber" class="txt"><i class="newrgprompt"></i></span></p><span id="identityNumber_prom"></span>');
		tmp.push('<p><label for="identityNumber2" id="idenReName">确认身份证号码:</label><span class="newrgPbox"><i class="newrgPicon newrgPconfirm"></i><input maxlength="18" onfocus="$(this).addClass(\'txt_act\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(\'#r_confirmid_prom\').removeClass(\'error\')" onblur="hzhl.user.bluridentityNumber2(\'identityNumber\',\'identityNumber2\',\'identityNumber2_prom\')" type="text" id="identityNumber2" class="txt"><i class="newrgprompt"></i></span></p><span id="identityNumber2_prom"></span><input type="hidden" name="identityType" id="identityType" value="1">');
		tmp.push('<p><input type="button" onclick="hzhl.user.checkrzValue()" class="dl_btn" value="立即绑定"></p>');
		tmp.push('</div>');
		//tmp.push('<div class="newrgrz"><p><label for="name">真实姓名：</label><span class="newrgPbox"><i class="newrgPicon newrgPname"></i><input type="text" maxlength="16" onfocus="$(this).addClass(\'txt_act\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(\'#name_prom\').removeClass(\'error\');" onblur="hzhl.user.newrgrzblurname(\'name\',\'name_prom\')" id="name" class="txt" maxlength="30"><i class="newrgprompt"></i></span></p><span id="name_prom"></span><p><label for="identityNumber">身份证号码：</label><span class="newrgPbox"><i class="newrgPicon newrgPid"></i><input onfocus="$(this).addClass(\'txt_act\');$("#identityNumber_prom").html("");$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(\'#identityNumber_prom\').removeClass(\'error\');" onblur="hzhl.user.bluridentityNumber(\'identityNumber\',\'identityNumber_prom\')" type="text" id="identityNumber" class="txt"><i class="newrgprompt"></i></span></p><span id="identityNumber_prom"></span><p><label for="identityNumber2">确认身份证号码：</label><span class="newrgPbox"><i class="newrgPicon newrgPconfirm"></i><input onfocus="$(this).addClass(\'txt_act\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(\'#r_confirmid_prom\').removeClass(\'error\')" onblur="hzhl.user.bluridentityNumber2(\'identityNumber\',\'identityNumber2\',\'identityNumber2_prom\')" type="text" id="identityNumber2" class="txt"></span></p><span id="identityNumber2_prom"></span><input type="hidden" name="identityType" id="identityType" value="1"><p><input type="button" onclick="hzhl.user.checkrzValue()" class="dl_btn" value="立即绑定"></p></div>');  
		tmp.push('<div class="newrgrzsu"><p class="newrgtitle"><font id="newrgsudnames"></font>,恭喜您实名认证成功！</p><p><input type="button" onclick="hzhl.user.chongzhi()" class="dl_btn" value="立即充值"></p></div>');
		tmp.push('</div>');
		tmp.push('</div>');
        errorTimes==0;//验证码错误次数为0
		hzhl.dialog.simple({
			type    : 'dialog-login',
			lock    : true,
			move    : true,
			width   : 450,
			title   : '会员登录',
			//content : '<div style="padding: 25px 0px;"><p><label for="user">账号</label><input type="text" id="dialog-name" class="txt"><a class="a1" href="'+WebAppUrl.SSO_APP_URL+'/register.htm" target="_blank">免费注册</a></p><p><label for="pass">密码</label><input type="password" id="dialog-password" class="txt"><a class="a1" href="'+WebAppUrl.SSO_APP_URL+'/forget_password.htm" target="_blank">忘记密码</a></p><p><input type="button" class="dl_btn" value="安全登录" onclick="hzhl.user.dialogLogin();"><a class="a2" href="'+WebAppUrl.SSO_APP_URL+'/qqLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'QQ账号登录\');">QQ账号登录</a>&#12288;<a class="a2" href="'+WebAppUrl.SSO_APP_URL+'/alipayLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'支付宝登录\');">支付宝登录</a></p><div id="dialog_message" class="fr" style="display:none;">账号或密码错误</div></div>' ,
			content : tmp.join('') ,
			load    : function(){
                //清理验证码错误次数
                errorTimes = 0;
				var userName=hzhl.cookie.get("username");
				if(userName!=null){
					$("#dialog-name").val(userName.split('|')[0]).removeClass('newrggray');
					$('#dialog-password').focus();
				}else{
					//$('#dialog-name').focus();
					$('#dialog-name').val('用户名/手机号码').addClass('newrggray');
				}
			}
		});
		
	},
	newrgrzblurname:function(nameId, promptId){
		var nameVal = user.checkName(nameId) ;
        if(nameVal){
        	$('#'+promptId).addClass('error').html(nameVal);
            $("#" + nameId).addClass('red');
            $("#" + nameId).next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
            $("#" + nameId).prev('.newrgPicon').addClass('newrgPiconerror');
            //$("#" + nameId).focus();
            return false;
        }else
        {
        	$('#'+promptId).removeClass('error').text('');
        	$("#" + nameId).removeClass('red');
            $("#" + nameId).next('.newrgprompt').addClass('newrgsu').removeClass('newrgerror');
            $("#" + nameId).prev('.newrgPicon').removeClass('newrgPiconerror');
        }
	},
	bluridentityNumber:function(identityId, promptId){
		var identityType=$("#identifyType").val();
        if(identityType==undefined || identityType==1){
        	var res = user.checkIdentityDesc(identityId);
            if(res!=null){
            	$('#'+promptId).addClass('error').html(res);
            	$('#'+identityId).next('.newrgprompt').addClass('newrgerror').removeClass('newrgsu');
                return false;
            }
        }
        var identity = $("#"+identityId);
        if(identity.val()=="" || identity.val().empty()){
        	$('#'+promptId).addClass('error').html('请输入正确定的身份证件号码！');
        	identity.addClass('red');
        	identity.next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
        	identity.prev('.newrgPicon').addClass('newrgPiconerror');
        	//identity.focus();
            return false;
        }else{
        	$('#'+promptId).removeClass('error').html('');
        	identity.removeClass('red');
        	identity.next('.newrgprompt').addClass('newrgsu').removeClass('newrgerror');
        	identity.prev('.newrgPicon').removeClass('newrgPiconerror');
        	return true;
        }
	},
	bluridentityNumber2:function(identityId,identity2Id, promptId){
		var identityType=$('#identityType').val();
		var identity=$("#"+identityId);
		var identity2=$("#"+identity2Id);
		if(identityType==1){
			var html="两次输入的身份证号码不一致！";
			identity2.next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
		}
		if(identity.val()!=identity2.val()){
			$('#'+promptId).addClass('error').html(html);
			identity2.addClass('red');
			identity2.next('.newrgprompt').removeClass('newrgsu').addClass('newrgerror');
			identity2.prev('.newrgPicon').addClass('newrgPiconerror');
			//identity2.focus();
			return false;
		}
		else
		{
			$('#'+promptId).removeClass('error').html('');
			identity2.removeClass('red');
			identity2.next('.newrgprompt').addClass('newrgsu').removeClass('newrgerror');
			identity2.prev('.newrgPicon').removeClass('newrgPiconerror');
			//identity2.focus();
			return true;
		}
		identity2.next('.newrgprompt').removeClass('newrgerror').addClass('newrgsu');
		
	},
//	changeIdentityType:function(type){
//		 if(type == 1){
//			
//          $("#idenName").html("身份证号码：");
//          $("#idenReName").html("确认身份证号码：");
//          $("#idenInId").html('<input type="text" class="txt txt_act" id="identityNumber" name="identityNumber" value="" maxlength="30"/>');
//          $('#changeIdenLinkId').html('<a href="javascript:void(0)" onclick="hzhl.user.changeIdentityType(2);return false;" class="blue">使用其它证件</a>');
//      }else{
//   	   $("#identityNumber_prom").html('');
//          $("#idenName").html("证件信息：");
//          $("#idenReName").html("证件号码：");
//          $("#idenInId").html('<span id="regselect"><span class="regselecttitle" ><input type="text"  value="护照" id="idenSeletext"/></span><span class="regselectcon"><a href="javascript:void(0)"  onClick="hzhl.user.regselected(2)">护照</a><a href="javascript:void(0)" onClick="hzhl.user.regselected(3)">军官证</a><a href="javascript:void(0)"  onClick="hzhl.user.regselected(4)">台胞证</a></span><input type="hidden" id="identityNumber" value="" name="identityNumber"  maxlength="20"/></span>');
//           $('#changeIdenLinkId').html('<a href="javascript:void(0)" onclick="hzhl.user.changeIdentityType(1);return false;" class="blue">使用身份证</a>');
//      }
//		 $('#regselect').hover(function(){
//			$(this).find('.regselectcon').show();
//			},function(){
//				$(this).find('.regselectcon').hide();
//		})
//    hzhl.user.changeOtherIdenType(type);
//	},
	regselected:function(type){
		$('.regselectcon a').click(function(event){
			event.stopPropagation();
			var value=$(this).text();
			$('#idenSeletext').val(value)
			$('#identityType').val(type)
			$('.regselectcon').hide();
			})
	},
//	changeOtherIdenType:function(type){
//       // var type= $("#idenSeleId").val();
//        if(type==undefined){
//                type="1";
//        }
//        $("#identityType").val(type);
//    },
	chongzhi:function(){
		window.location.href='http://www.hzhl.com/user/fastPayView.htm';
	},
	checkrzValue:function(){
		var newrgrzname=hzhl.user.newrgrzblurname('name','name_prom');
		if(newrgrzname==false){
			return false;
		};
		var identityType=$("#identityType").val();
        if(identityType==undefined || identityType==1){
        	var res = user.checkIdentityDesc("identityNumber");
            if(res!=null){
            	hzhl.needLock1=true;
                hzhl.dialog.alert({lock:true,content: res,ok:function() {
                    $('#identityNumber').focus();
                }});
                return false;
            }
        }
        var identity = $("#identityNumber");
        var identityNumber2 = $("#identityNumber2");
        if(identity.val()=="" || identity.val().empty()){
        	  hzhl.needLock1=true;
              hzhl.dialog.alert({lock:true,content: "请正确输入证件号码",ok:function() {
                $('#identityNumber').focus();
            }});
            return false;
        }
		var bluridentityNumber=hzhl.user.bluridentityNumber('identityNumber','identityNumber_prom');
		if(bluridentityNumber==false){
			return false;
		}
		
		var bluridentityNumber2=hzhl.user.bluridentityNumber2('identityNumber','identityNumber2','identityNumber2_prom');
		if(bluridentityNumber2==false){
			return false;
		}
		hzhl.needLock1=true;
        hzhl.dialog.simple({
			title   : '确认',
			content : '<div style="text-align:left;padding:15px;line-height:22px;">证件绑定信息只能填写一次，一旦绑定后将无法修改，您确定要提交吗？</div>' ,
			width   : 460,
			height  : 120,
			lock    : true,
			move    : true,
			buttons : [{
				value    :   '确定',
				handle   :    function(o){
					var grzname=$('#name').val(),identityNumber=$("#identityNumber").val(),identityNumber2=$("#identityNumber2").val(),identityType=$("#identityType").val();;
					$.ajax( {
				        type: "POST",
				        url: "http://www.hzhl.com/user/bindIdentity.htm",
				        dataType:"json",
				        data: "name="+grzname+"&identityNumber="+identityNumber+"&identityNumber2="+identityNumber2+"&identityType="+identityType,
				        success : function(result) {
				            $(".newrgrzsu").show();
				            $(".newrgrz").hide();
				            hzhl.dialog.close(o);
				        },
				        error : function(result) {
				        	 $(".newrgrzsu").show();
					         $(".newrgrz").hide();
					         hzhl.dialog.close(o);
				            //hzhl.dialog.alert({lock:true,content: "认证失败!"});
				        }
				    });
                    //document.identityFrm.submit();
				}
			},{
				value    :   '取消',
				handle   :    function(o){
					hzhl.dialog.close(o);
                    return false;
				}
			}]
		});
        return false;
	},
	checkfoucusname:function(obj){
		$(obj).next('.newrgprompt').removeClass('newrgsu').removeClass('newrgerror');
		if($(obj).val()=="用户名/手机号码"){$(obj).val('');};
		$(obj).addClass('txt_act').removeClass('newrggray');
		$(obj).prev('.newrgPicon').addClass('newrgPiconact');
		$('#r_userName_prom').removeClass('error').text('');
		
	},
	newrgruth:function(){
		$('.newrgsud').hide();
		$('.newrgrz').show();
	},
	sendcode:function(){
		if(wait <60){
			return false;
		}
		var phone = $("#r_userName").val();
	    var cause = "用户注册验证码";
	    if(phone=='' || phone=='输入手机号码'){
	        hzhl.dialog.alert({lock:true,content: "请输入正确的手机号码！",ok:function() {
	            $('#phone').focus();
	        }});
	        return;
	    }
        $.ajax( {
            type: "POST",
            url: WebAppUrl.SSO_APP_URL + "/sendMobileCode.htm",
            dataType:"text",
            data: "mobile="+phone+"&cause="+cause,
            success : function(result) {
            	hzhl.needLock1=true;
            	if(result.indexOf('1|')>-1){
                    hzhl.dialog.alert({lock:true,content: result.split('|')[1],ok:function() {
                        $('#verificationCode').focus();
                    }});
                }else{
                	hzhl.dialog.alert({lock:true,content: "手机验证码发送成功，请查收！",ok:function() {
                		if(wait==60) { $(this).bind("click");hzhl.user.time();}
            	        else{ $(this).unbind("click");return;}
                    }});
                }
            },
            error : function(result) {
            	hzhl.needLock1=true;
                hzhl.dialog.alert('发送失败，请稍后重试。');
            }
        });
	},
	time:function(){
		if (wait == 0) {
	       $("#newrgsend").html("");//改变对象中的内容
	       $("#newrgsend").removeClass("newrgsendtime");
	        wait = 60;
	    }
	    else {
	        wait--;
	        setTimeout(function() {
	            hzhl.user.time();//循环调用
	        },  1000)
	        $("#newrgsend").html(wait + "秒后重新获取验证码");//改变对象中的内容
	        $("#newrgsend").addClass("newrgsendtime");
	    }
	},
	checkpassword:function(obj){
		$(obj).next('.newrgprompt').removeClass('newrgsu').removeClass('newrgerror');
		$(obj).prev('.newrgPicon').addClass('newrgPiconact');
		$(obj).addClass('txt_act');
		if($('#passSecId').size()<1){
			$('#r_password_prom').removeClass('error').text('');
		}
	},
	checkconfirm:function(obj){
		$(obj).next('.newrgprompt').removeClass('newrgsu').removeClass('newrgerror');
		$(obj).addClass('txt_act');
		$(obj).prev('.newrgPicon').addClass('newrgPiconact');
		$('#r_confirmPassword_prom').removeClass('error').text('');
		
	},
	newrgkeyup:function(obj){
		var len = $(obj).val().length;
        if(len > 0){
        	$('#r_password_prom').removeClass('error').html('<div id="passSecId" style="display: block;">安全程度：<span class="hq" id="sec_1">弱</span><span class="hr" id="sec_2">中</span><span class="hr" id="sec_3">强</span></div>');
        	user.changeSecurity($(obj).val(), "sec");
        }else{
        	$('#r_password_prom').removeClass('error').text('');
        }
        
		
	},
    //登录验证
	dialogLoginWww : function(){
		var name = $('#dialog-name');
		var password = $('#dialog-password');
        var enterCode = $('#verificationCode');
		if(name.val().empty() || name.val().len()<3){
			$('#dialog_message').html('账号填写错误，账号长度为3～16个字符。').show();
            name.focus();
			return;
		}
		if(password.val().empty() || password.val().length<6){
			$('#dialog_message').html('密码填写错误，密码长度必须为6～20之间。').show();
			$('#dialog-password').focus();
			return;
		}
        if (errorTimes >= 3) {
            $("#tr_verificationCode").show();
            if(enterCode.val()==''){
                $('#dialog_message').html('× 请输入验证码').show();
                return false;
            }
        }
		$('#dialog_message').html('正在登录，请稍后...').show();
		$.ajax({
			url     : WebAppUrl.SSO_APP_URL+'/login?t='+new Date().getTime()+'&entrance=http://+WebAppUrl.CUR_APP_URL',
			data    : {userName : name.val(),password : password.val(),enterCode:enterCode.val()},
			cache   : false,
			context : this,
			type    : "post",
			success : function(result){
				var res = hzhl.user.parseLoginResult(result);
				if(res.state == "-1"){
					$('#dialog_message').html("× "+res.error).show();
                    errorTimes = res.errorTimes;
				}else if(res.state == "-2"){
                    $('#dialog_message').html("× "+res.error).show();
                    errorTimes = res.errorTimes;
                    enterCode.val('');
                    if(res.error=='用户名或密码错误'){
                        password.select();
                    } else if (res.error == '请输入验证码') {
                        $('#verificationCode').focus();
                        $("#tr_verificationCode").show();
                    } else {
                        enterCode.focus();
                    }

                    var append = '?' + new Date().getTime() + 'a' + Math.random();
                    $('#verification_img').attr('src',$("#verification_img").attr('src') + append);//刷新验证码
                }else{
					hzhl.dialog.close('dialog-login');
					hzhl.user.dlCallback&&hzhl.user.dlCallback();
					hzhl.user.isLogin=true;
					if(this.config.refresh){
						if(this.loginConfig&&this.loginConfig.refreshURL)
							window.location=this.config.refreshURL;
						else
							window.location.reload();
					}
                    hzhl.user.showWWWLoginHtml(true,res.loginname);
                    errorTimes=0;
				}
			}.bind(this),
			error   : function(result){
                hzhl.dialog.alert('登录失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');
            }
		});
	},
    WinnersShare:function(){
    	//var w=($(window).width()-551)/2,h=($(window).height()-906)/2;
    	var w=($(window).width()-551)/2,h=($(window).height()-495)/2;
		var tem=[],tmpjd=[];
		tem.push('<div class="shareboxbg" id="shareboxbg" style="height:'+$(document.body).height()+'px;width:'+$(document.body).width()+'px"></div><div class="sharebox" id="sharebox" style="top:'+h+'px;left:'+w+'px"><div class="shareCon">');
		tem.push('<div class="shareCon">');
		tem.push('<a class="shareclose" href="javascript:void(0)" title=""></a>');
		tem.push('<span class="shareMoney">总奖金<span class="moneyNum">5000</span>元</span>');
		tem.push('<a href="http://www.hzhl.com/user/myInitialWon.htm" title="" class="shareBtnlianjie"></a>');
		tem.push('<div class="shareBtnBox">');
		tem.push('<a href="http://www.hzhl.com/user/myInitialWon.htm" target="_blank" title="" class="shareSelect"></a>');
		tem.push('<div class="shareSList">');
		tem.push('<div class="shareSListInput">竞彩足球   2串1  奖金3000元 </div>');
		tem.push('<div class="bdsharebuttonbox shareWeblist" data-tag="share_1">');
		tem.push('<a class="bds_tsina" data-cmd="tsina"></a>');
		tem.push('<a class="bds_weixin" data-cmd="weixin"></a>');
		tem.push('<a class="bds_qzone" data-cmd="qzone"></a>');
		tem.push('<a class="bds_douban" data-cmd="douban"></a>');
		tem.push('<a class="bds_renren" data-cmd="renren"></a>');
		tem.push('<a class="bds_sqq" data-cmd="sqq"></a>');
		tem.push('</div>');
		tem.push('</div>');
		tem.push('</div>');
		tem.push('</div>');

		tmpjd.push('<div class="shareboxbg" id="shareboxbg" style="height:'+$(document.body).height()+'px;width:'+$(document.body).width()+'px"></div><div class="sharebox" id="sharebox" style="top:'+h+'px;left:'+w+'px"><div class="shareCon">');
		tmpjd.push('<a class="shareclose" href="javascript:void(0)" title=""></a>');
		tmpjd.push('<a href="http://www.hzhl.com/user/myInitialWon.htm" target="_blank" title="" class="shareBtnlianjie"></a><a href="http://www.hzhl.com/user/myInitialWon.htm" title="" target="_blank" class="shareBtn"></a>');
		tmpjd.push('</div></div>');
		var div=document.createElement('div');
		div.innerHTML=tmpjd.join('');
		document.body.appendChild(div);
		$('.shareBtnBox').hover(function(){
			$('.shareBtnBox .shareSelect').addClass('selected');
			$('.shareBtnBox .shareSList').show();
		},function(){
			$('.shareBtnBox .shareSelect').removeClass('selected');
			$('.shareBtnBox .shareSList').hide();
		})
		$(".shareclose").click(function(){
			hzhl.cookie.remove("shareMark", "/", ".hzhl.com");
			//hzhl.lock.hide();
			$("#sharebox").hide();
			$("#shareboxbg").hide();
		});
		$(".shareBtn").click(function(){
			hzhl.cookie.remove("shareMark", "/", ".hzhl.com");
			//hzhl.lock.hide();
			$("#sharebox").hide();
			$("#shareboxbg").hide();
		});
		$(".shareBtnlianjie").click(function(){
			hzhl.cookie.remove("shareMark", "/", ".hzhl.com");
			//hzhl.lock.hide();
			$("#sharebox").hide();
			$("#shareboxbg").hide();
		});
		
		//$('#sharebox').css({"left":w,"top":h});
        
    },
    ajaxWWWLogout: function(){
        $.ajax({
			url     : WebAppUrl.SSO_APP_URL+'/signOut.htm?ajax=true&t='+new Date().getTime(),
            //url     : 'http://www.hzhl.com/sso/'+'/signOut.htm?ajax=true&t='+new Date().getTime(),
			cache   : false,
			success : function(result){
                if(result == "true" || result == "userCenter"){
                    window.location = WebAppUrl.HOME_APP_URL;
                    hzhl.user.showWWWLoginHtml(false,"");
                }
			},
			error   : function(result){hzhl.dialog.alert('登录失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');}
		});
    },
    ajaxLogoutOut: function(){
    	$.getJSON('hzhl.com/sso/signOut.htm?ajax=true&t='+new Date().getTime() + '&jsoncallback=?',
    		function(result){
    			if(result == "true" || result == "userCenter"){
    				hzhl.user.showLoginHTMLOut(false,"");
    			}
    		});
    },    //购彩时登录验证
	dialogLogin : function(type){
        var name = $('#dialog-name');
        var password = $('#dialog-password');
        var enterCode = $('#verificationCode');
		if(name.val().empty() || name.val().len()<3){
			$('#dialog_message').html('账号填写错误，账号长度为3～16个字符。').show();
			$('#dialog-name').focus();
			return;
		}
		if(password.val().empty() || password.val().length<6){
			$('#dialog_message').html('密码填写错误，密码长度必须为6～20之间。').show();
			$('#dialog-password').focus();
			return;
		}
        if (errorTimes >= 3) {
            $("#tr_verificationCode").show();
            if(enterCode.val()==''){
                $('#dialog_message').html('× 请输入验证码').show();
                return false;
            }
        }
		$('#dialog_message').html('正在登录，请稍后...').show();
		$.ajax({
			url     : WebAppUrl.SSO_APP_URL + '/login?t='+new Date().getTime(),
			data    : {userName : name.val(),password : password.val(),enterCode:enterCode.val()},
			cache   : false,
			context : this,
			success : function(result){
				var res = hzhl.user.parseLoginResult(result);
				if(res.state == "-1"){
					$('#dialog_message').html("× "+res.error).show();
                    errorTimes = res.errorTimes;
				}else if(res.state == "-2"){
                    $('#dialog_message').html("× "+res.error).show();
                    errorTimes = res.errorTimes;
                    enterCode.val('');
                    if(res.error=='用户名或密码错误'){
                        password.select();
                    } else if (res.error == '请输入验证码') {
                        $('#verificationCode').focus();
                        $("#tr_verificationCode").show();
                    } else {
                        enterCode.focus();
                    }

                    var append = '?' + new Date().getTime() + 'a' + Math.random();
                    $('#verification_img').attr('src',$("#verification_img").attr('src') + append);//刷新验证码
                }else{
                	if(!type){
                		hzhl.dialog.close('dialog-login');
                	}else{
                		$('.newrgstart').hide();
                		$('.newrgsud').show();
                		$('#newrgsudname').text(name.val());
                		$('#newrgsudnames').text(name.val());
                	}
					hzhl.user.dlCallback&&hzhl.user.dlCallback();
					hzhl.user.isLogin=true;
					if(this.config.refresh){
						if(this.loginConfig&&this.loginConfig.refreshURL)
							window.location=this.config.refreshURL;
						else
							window.location.reload();
					}
                    hzhl.user.showLoginHTMLNew(true,name.val());
                    errorTimes=0;
				}
//                else{
//					result.trim().evalScripts();
//				}
			}.bind(this),
			error   : function(result){
                hzhl.dialog.alert('登录失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');
            }
		});
	},
	qqLogin      : function(name){
		hzhl.dialog.close('dialog-login');
		hzhl.dialog.simple({
			type : 'qq_tip',
			lock    : true,
			move    : true,
			width   : 450,
			height  : 175,
			content : '<div style="font-size:14px;text-align:center;padding-top:30px;">您的'+name+'是否成功？</div>',
			buttons : [{
				value:'成功登录',
				handle:function(o){
					hzhl.dialog.close(o);
					$.ajax({
						url     : WebAppUrl.CUR_APP_URL+'/checkLogin.htm?booleanValue=true&t=' + new Date().getTime(),
						cache   : false,
						success : function(result){
							if(result.trim()=='false'){
								hzhl.dialog.alert({
									content:'系统检测到您还是未登录状态。',
									ok:function(o){
										hzhl.dialog.close(o);
										setTimeout(function(){
											hzhl.user.showLoginBox(hzhl.user.dlCallback);
										},100);
									}
								});
							}else{
								hzhl.user.showLoginHTMLNew(true,result);
								hzhl.user.dlCallback&&hzhl.user.dlCallback();
							}
						}
					});
				}
			},{
				value:'重新登录',
				handle:function(o){
					hzhl.dialog.close(o);
					hzhl.user.showLoginBox(hzhl.user.dlCallback);
				}
			}]
		});
	},
    //购彩时未登录时弹出层登录
	showLoginBox : function(callback){
		var tmp=[];
		tmp.push('<div class="dl_box_con">');
		tmp.push('<div id="dl_box"><ul class="tab"><li class="dl act">登录</li><li class="zc" onclick="$(this).parent().parent().hide();$(\'#zc_box\').show();$(\'div.tc_box\').css(\'top\',$(\'div.tc_box\').offset().top);">注册</li></ul>');
		tmp.push('');
		tmp.push('<p><label for="dialog-name">&nbsp;&nbsp;账号:</label><span class="newrgPbox"><i class="newrgPicon newrgPname newrgPiconerror"></i><input type="text" id="dialog-name" onfocus="if($(this).val()==\'用户名/手机号码\'){$(this).val(\'\').removeClass(\'newrggray\')}" onblur="if($(this).val()==\'\'){$(this).val(\'用户名/手机号码\').addClass(\'newrggray\')}" class="txt" value=""></span></p>');
		tmp.push('<p><label for="dialog-password">&nbsp;&nbsp;密码:</label><span class="newrgPbox"><i class="newrgPicon newrgPpassword"></i><input type="password" id="dialog-password" class="txt" onkeyup="if(hzhl.getEvent().keyCode==13){hzhl.user.dialogLoginWww();}"><a class="a1" href="'+WebAppUrl.SSO_APP_URL+'/forget_password.htm" target="_blank">忘记密码？</a></p>');
		tmp.push('<p id="tr_verificationCode" style="display: none;"><label for="verificationCode">验证码</label><input type="text" id="verificationCode" class="txt" />&nbsp;<img src="'+WebAppUrl.SSO_APP_URL+'/servlet/verifyImage" alt="验证码" id="verification_img" style="vertical-align: middle;"/></span></p>');
		tmp.push('<p><input id="dl_btn" type="button" class="dl_btn" value="安全登录" onclick="hzhl.user.dialogLoginWww();"></p>');
		tmp.push('<div id="dialog_message" class="fr" style="display:none;padding-right: 55px; padding-left:70px; padding-bottom:10px;">账号或密码错误</div><div class="hzwz"><ul><li class="hzwzwz">合作网站登录</li><li class="weixin"><a href="http://www.hzhl.com/sso/weChat.htm" target="_blank">微信</a></li><li class="qq"><a href="'+WebAppUrl.SSO_APP_URL+'/qqLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'QQ账号登录 \');">QQ</a></li><li class="zfb"><a href="'+WebAppUrl.SSO_APP_URL+'/alipayLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'支付宝登录\');">支付宝</a></li><li class="xl"><a href="'+WebAppUrl.SSO_APP_URL+'/sinaLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'新浪微博登录\');">新浪微博</a></li></ul></div>');
		tmp.push('</div>');
		tmp.push('<div id="zc_box" class="zc_box_con" style="display: none;"><ul class="tab"><li class="dl" onclick="$(this).parent().parent().hide();$(\'#dl_box\').show();$(\'div.tc_box\').css(\'top\',$(\'div.tc_box\').offset().top);">登录</li><li class="zc act">注册</li></ul>');
		tmp.push('<div class="newrgstart"><p><label for="r_userName">帐号注册:</label><span class="newrgPbox"><i class="newrgPicon newrgPname"></i><input type="text" value="用户名/手机号码" onfocus="hzhl.user.checkfoucusname(this)" onblur="hzhl.user.checkUserName(\'r_userName\',\'r_userName_prom\');" id="r_userName" class="txt newrggray" maxlength="30"><i class="newrgprompt"></i></span></p><span id="r_userName_prom"></span><p><label for="r_password">密码:</label><span class="newrgPbox"><i class="newrgPicon newrgPpassword"></i><input onfocus="hzhl.user.checkpassword(this)" onkeyup="hzhl.user.newrgkeyup(this)" onblur="hzhl.user.checkPwd(\'r_password\',\'r_password_prom\');" type="password" id="r_password" class="txt"><i class="newrgprompt"></i></span></p><span id="r_password_prom"></span><p><label for="r_confirmPassword">确认密码:</label><span class="newrgPbox"><i class="newrgPicon newrgPconfirm"></i><input onfocus="hzhl.user.checkconfirm(this)" onblur="hzhl.user.checkConfirmPwd(\'r_confirmPassword\',\'r_password\',\'r_confirmPassword_prom\');" type="password" id="r_confirmPassword" class="txt"><i class="newrgprompt"></i></span></p><span id="r_confirmPassword_prom"></span>');
		tmp.push('<p style="position:relative" class="newrgcode"><label for="r_verificationCode">手机验证</label><span class="newrgPbox"><i class="newrgPicon newrgPphone"></i><input type="text" onfocus="$(this).addClass(\'txt_act\');" onblur="$(this).removeClass(\'txt_act\')" id="r_verificationCode" class="txt" maxlength="30"><a href="javascript:void(0)" class="newrgPsend" id="newrgsend" onclick="hzhl.user.sendcode()"></a></span><span></span></p>');
		tmp.push('<p><input type="button" id="zc_btn" class="dl_btn" value="提交注册" onclick="hzhl.user.quicklyRegister();"><a href="http://www.hzhl.com/activity/5050.htm" target="_blank" class="newrgactivity"></a></p><div class="tyzc"><input type="checkbox" class="zc_chkbox" checked="checked" id="protocol" name="protocol"><span>我已经年满18岁并同意<a target="_blank" href="/company/serviceRole.htm">《用户服务条款》</a></span></div>');
		tmp.push('<div class="hzwz"><ul><li class="hzwzwz">合作网站登录</li><li class="weixin"><a href="http://www.hzhl.com/sso/weChat.htm" target="_blank">微信</a></li><li class="qq"><a href="'+WebAppUrl.SSO_APP_URL+'/qqLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'QQ账号登录\');">QQ</a></li><li class="zfb"><a href="'+WebAppUrl.SSO_APP_URL+'/alipayLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'支付宝登录\');">支付宝</a></li><li class="xl"><a href="'+WebAppUrl.SSO_APP_URL+'/sinaLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'新浪微博登录\');">新浪微博</a></li></ul></div>');
		tmp.push('</div>');
		tmp.push('<div class="newrgsud"><p class="newrgtitle"><font id="newrgsudname"></font>,恭喜您注册成功</p><p class="newrgconrz newrgconrzAct"><a href="http://www.hzhl.com/user/mobileVerify.htm?reUrl=4" title="">验证手机</a>并<a href="javascript:void(0)" id="newrgrzbtn" onclick="hzhl.user.newrgruth()">实名认证</a>，<em class="ActIcon_5050">新手<a href="http://www.hzhl.com/activity/5050.htm" title="充50送50">充50送50</a></em></p><p><input type="button" onclick="hzhl.user.chongzhi()" class="dl_btn" value="立即充值"></p></div>');
		tmp.push('<div class="newrgrz">');
		tmp.push('<p><label for="name">真实姓名:</label><span class="newrgPbox"><i class="newrgPicon newrgPname"></i><input type="text" maxlength="16" onfocus="$(this).addClass(\'txt_act\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(this).next(\'.newrgprompt  \').removeClass(\'newrgerror\').removeClass(\'newrgsu\');$(\'#name_prom\').removeClass(\'error\');$(\'#name_prom\').html(\'\');" onblur="hzhl.user.newrgrzblurname(\'name\',\'name_prom\')" id="name" class="txt" maxlength="30"><i class="newrgprompt"></i></span></p><span id="name_prom"></span>');
		tmp.push('<p><label for="identityNumber" id="idenName">身份证号码:</label><span class="newrgPbox newrgPboxzindex"><i class="newrgPicon newrgPid"></i><input onfocus="$(this).addClass(\'txt_act\');$(\'#identityNumber_prom\').html(\'\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(this).next(\'.newrgprompt\').removeClass(\'newrgerror\').removeClass(\'newrgsu\');$(\'#identityNumber_prom\').removeClass(\'error\');" onblur="hzhl.user.bluridentityNumber(\'identityNumber\',\'identityNumber_prom\')" type="text" maxlength="18" id="identityNumber" class="txt"><i class="newrgprompt"></i></span></p><span id="identityNumber_prom"></span>');
		tmp.push('<p><label for="identityNumber2" id="idenReName">确认身份证号码:</label><span class="newrgPbox"><i class="newrgPicon newrgPconfirm"></i><input maxlength="18" onfocus="$(this).addClass(\'txt_act\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(\'#r_confirmid_prom\').removeClass(\'error\')" onblur="hzhl.user.bluridentityNumber2(\'identityNumber\',\'identityNumber2\',\'identityNumber2_prom\')" type="text" id="identityNumber2" class="txt"><i class="newrgprompt"></i></span></p><span id="identityNumber2_prom"></span><input type="hidden" name="identityType" id="identityType" value="1">');
		tmp.push('<p><input type="button" onclick="hzhl.user.checkrzValue()" class="dl_btn" value="立即绑定"></p>');
		tmp.push('</div>');
		//tmp.push('<div class="newrgrz"><p><label for="name">真实姓名：</label><span class="newrgPbox"><i class="newrgPicon newrgPname"></i><input type="text" maxlength="16" onfocus="$(this).addClass(\'txt_act\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(\'#name_prom\').removeClass(\'error\');" onblur="hzhl.user.newrgrzblurname(\'name\',\'name_prom\')" id="name" class="txt" maxlength="30"><i class="newrgprompt"></i></span></p><span id="name_prom"></span><p><label for="identityNumber">身份证号码：</label><span class="newrgPbox"><i class="newrgPicon newrgPid"></i><input onfocus="$(this).addClass(\'txt_act\');$("#identityNumber_prom").html("");$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(\'#identityNumber_prom\').removeClass(\'error\');" onblur="hzhl.user.bluridentityNumber(\'identityNumber\',\'identityNumber_prom\')" type="text" id="identityNumber" class="txt"><i class="newrgprompt"></i></span></p><span id="identityNumber_prom"></span><p><label for="identityNumber2">确认身份证号码：</label><span class="newrgPbox"><i class="newrgPicon newrgPconfirm"></i><input onfocus="$(this).addClass(\'txt_act\');$(this).prev(\'.newrgPicon \').addClass(\'newrgPiconact\');$(\'#r_confirmid_prom\').removeClass(\'error\')" onblur="hzhl.user.bluridentityNumber2(\'identityNumber\',\'identityNumber2\',\'identityNumber2_prom\')" type="text" id="identityNumber2" class="txt"></span></p><span id="identityNumber2_prom"></span><input type="hidden" name="identityType" id="identityType" value="1"><p><input type="button" onclick="hzhl.user.checkrzValue()" class="dl_btn" value="立即绑定"></p></div>');  
		tmp.push('<div class="newrgrzsu"><p class="newrgtitle"><font id="newrgsudnames"></font>,恭喜您实名认证成功！</p><p><input type="button" onclick="hzhl.user.chongzhi()" class="dl_btn" value="立即充值"></p></div>');
		tmp.push('</div>');
		tmp.push('</div>');

        errorTimes==0;//验证码错误次数为0
		hzhl.user.dlCallback = callback;
		hzhl.dialog.simple({
			type    : 'dialog-login',
			lock    : true,
			move    : true,
			width   : 450,
			title   : '会员登录',
//			content : '<div style="padding: 25px 0px;"><p><label for="user">账号</label><input type="text" id="dialog-name" class="txt"><a class="a1" href="'+WebAppUrl.SSO_APP_URL+'/register.htm" target="_blank">免费注册</a></p><p><label for="pass">密码</label><input type="password" id="dialog-password" class="txt"><a class="a1" href="'+WebAppUrl.SSO_APP_URL+'/forget_password.htm" target="_blank">忘记密码</a></p><p><input type="button" class="dl_btn" value="安全登录" onclick="hzhl.user.dialogLogin();"><a class="a2" href="'+WebAppUrl.SSO_APP_URL+'/qqLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'QQ账号登录\');">QQ账号登录</a>&#12288;<a class="a2" href="'+WebAppUrl.SSO_APP_URL+'/alipayLogin.htm" target="_blank" onclick="hzhl.user.qqLogin(\'支付宝登录\');">支付宝登录</a></p><div id="dialog_message" class="fr" style="display:none;">账号或密码错误</div></div>' ,
			content : tmp.join('') ,
			load    : function(){
                //清理验证码错误次数
                errorTimes = 0;
				var userName=hzhl.cookie.get("username");
				if(userName!=null){
					$("#dialog-name").val(userName.split('|')[0]).removeClass('newrggray');
					$('#dialog-password').focus();
				}else{
					//$('#dialog-name').focus();
					$("#dialog-name").val('用户名/手机号码').addClass('newrggray');
				}
			}
		});
	},
	showLoginForExt:function(){
		$.getScript(WebAppUrl.CUR_APP_URL+'/checkLogindo.htm?booleanValue=true&t=' + new Date().getTime(),function(data){
			if(data == 'false')
				return hzhl.dialog.alert('登录检查失败。');
			hzhl.user.showLoginHTML(true, data);
		});
	},
	showLoginHTML : function(f,username){
		var h={
			a : '<div style="padding-top:2px;">欢迎您，'+username+' <span id="money" title="点击显示/隐藏可用余额"><span style="color:#C2C2C3;">余额已隐藏</span> <a class="cursor fb" href="javascript:hzhl.user.money();">显示</a></span> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/index.htm" class="fbl">我的账户</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/fastPayView.htm" class="fbl">账户充值</a> | <a href="'+WebAppUrl.CUR_APP_URL+'/buy/index.htm" class="fbl">购买彩票</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/myInitialScheme.htm" class="fbl">购彩记录</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/myPlan.htm" class="fbl">追号记录</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/myInitialWon.htm" class="fbl">中奖记录</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/myFollow.htm" class="fbl">自动跟单</a> | <a href="javascript:hzhl.user.ajaxLogout();" class="fbl">安全退出</a>　<a href="http://wpa.qq.com/msgrd?v=3&uin=619334324&site=qq&menu=yes" class="kfqq" target="_blank" title="点击与在线客服QQ交流"></a></div>',
			b : '<label>账号</label><input type="text" class="input" id="userName" name="userName" onFocus="hzhl.selectText($(this),0,this.value.length);" onMouseOver="if(this.value.length>0){hzhl.user.showClearName(this);}" onMouseOut="hzhl.user.hideClearName();"/><label>密码</label><input id="password" type="password" class="input" onkeyup="if(hzhl.getEvent().keyCode==13){hzhl.user.login();}"/><input type="button" class="submit" id="loginAction" onClick="hzhl.user.login();"/><a href="'+WebAppUrl.SSO_APP_URL+'/qqLogin.htm" class="qqlogin" target="_blank"></a>　<a href="'+WebAppUrl.SSO_APP_URL+'/alipayLogin.htm" class="hr fbl" target="_blank">支付宝登录</a>　<a href="'+WebAppUrl.SSO_APP_URL+'/sinaLogin.htm" class="hr fbl" target="_blank">新浪微博登录</a>　<a href="'+WebAppUrl.SSO_APP_URL+'/forget_password.htm" class="hr fbl">忘记密码</a>　<a href="'+WebAppUrl.SSO_APP_URL+'/register.htm" class="hr fbl">免费注册</a>　<a href="http://wpa.qq.com/msgrd?v=3&uin=619334324&site=qq&menu=yes" target="_blank" title="点击与在线客服QQ交流" class="fbl">QQ客服</a>'
		};
		if(!this.lb)this.lb = $('#loginAct');
		this.lb.html(h[f?'a':'b']);
		if(!f){var userName=hzhl.cookie.get("cp_username");if(userName!=null){$("#userName").val(userName.split('|')[0]);};}
		this.isLogin = f;
	},
    //新改版的登入导航
    showLoginHTMLNew:function (f, username) {
        var h = {
            //a:  ' <span>欢迎您，</span> <a href= "'+ WebAppUrl.HOME_APP_USER_URL +'/index.htm" target="_top">'+username+'</a> <span id = "yue" class="zhje yell">账户金额<i class="jt1"></i></span> <a href="javascript:hzhl.user.ajaxLogoutNew()">退出</a><div id="curBalanceId" class="yell yue-div dis-none"></div>',
        	   a: '<strong>欢迎您</strong><a href= "' + WebAppUrl.HOME_APP_USER_URL + '/index.htm" id="n_welcome_user_nick">' + username + '</a><div class="n_welcome_account" id="yue"><a id="n_welcome_account">账户余额</a></div><a id="n_welcome_signout" href="javascript:hzhl.user.ajaxWWWLogout()">退出</a><div id="curBalanceId" style="position:absolute;border:1px solid #ccc;color:#666;padding:5px;top:28px;background:#fff;" class="yell yue-div dis-none"></div>',
               b:  '<span>欢迎您，请</span> <a href=""  target="_top" style=" margin-left:0;" class="yhdl">登录</a>|<a href= "'+WebAppUrl.SSO_APP_URL +'/register.htm" target="_top" class="yhzc">注册</a>|<a class="mzc">免注册登录<em class="zfc-weixin"></em><em class="qq-ico"></em><em class="zfb-ico"></em><em class="xl-ico"></em><i class="jt1"></i></a>'
        };

        if (!this.divl)this.divl = $('.login-bar-top');
        this.divl.html(h[f ? 'a' : 'b']);

        //副站
        var tt = "http://fx.hzhl.com/";
        if(WebAppUrl.CUR_APP_URL && WebAppUrl.CUR_APP_URL.indexOf("www.hzhl.com" )== -1){
            tt =   WebAppUrl.CUR_APP_URL;
        }
        var link = WebAppUrl.SSO_APP_URL + "/signOn.htm?entrance=" +tt;
        $("a.yhdl").attr("href",link);

        this.isLogin = f;
        if (!this.isLogin) {
            $("a.mzc").hover(function () {
                var left = $(this).offset().left - 7;

                $("div.mzc-div").show().css("left", left).css("z-index", "999");
            }, function () {
                $("div.mzc-div").hide();
            });

            $("div.mzc-div").hover(function () {
                $(this).show();
            }, function () {
                $(this).hide();
            });
        } else {
            hzhl.user.moneyBalance("curBalanceId");
            $("#yue").hover(
                function () {
                    var left = $("#yue").position().left;
                    $(this).addClass("zhje-hov");
                    $("#curBalanceId").show().css("left", left);
                },
                function () {
                    $(this).removeClass("zhje-hov");
                    $("#curBalanceId").hide();
                });
       }
		//window.location.reload();
    },
    //新改版的外域登入导航
    showLoginHTMLOut:function (f, username) {
    	var h = {
                a: '<strong>欢迎您</strong><a href= "' + WebAppUrl.HOME_APP_USER_URL + '/index.htm" id="n_welcome_user_nick">' + username + '</a><div class="n_welcome_account" id="yue"><a id="n_welcome_account">账户余额</a></div><a id="n_welcome_signout" href="javascript:hzhl.user.ajaxWWWLogout()">退出</a><div id="curBalanceId" style="position:absolute;border:1px solid #ccc;color:#666;padding:5px;top:28px;background:#fff;" class="yell yue-div dis-none"></div>',
                b: '<span>欢迎您，请</span><a id="n_welcome_signin" onclick="hzhl.user.showWwwLoginBox()">登录</a><a id="n_welcome_signup" target="_blank" href= "' + WebAppUrl.SSO_APP_URL + '/register.htm">免费注册</a><a id="n_welcome_signup_other">第三方登录</a><div id="n_welcome_signup_others"><b>第三方登录</b><a class="n_alipay_icon" href="' + WebAppUrl.SSO_APP_URL + '/alipayLogin.htm">支付宝</a><a class="n_qq_icon" href="' + WebAppUrl.SSO_APP_URL + '/qqLogin.htm">腾讯QQ</a><a class="n_weibo_icon" href="' + WebAppUrl.SSO_APP_URL + '/sinaLogin.htm">新浪微博</a></div>'
    	};
    	
    	if (!this.divl)this.divl = $('#n_welcome');
    	this.divl.html(h[f ? 'a' : 'b']);
    	
    	//副站
    	var tt = "http://fx.hzhl.com/";
    	if(WebAppUrl.CUR_APP_URL && WebAppUrl.CUR_APP_URL.indexOf("www.hzhl.com" )== -1){
    		tt = WebAppUrl.CUR_APP_URL;
    	}
    	var link = WebAppUrl.SSO_APP_URL + "/signOn.htm?entrance=" +tt;
    	$("a.yhdl").attr("href",link);
    	
    	this.isLogin = f;
    	if (!this.isLogin) {
    		$("a.mzc").hover(function () {
    			var left = $(this).offset().left - 7;
    			
    			$("div.mzc-div").show().css("left", left).css("z-index", "999");
    		}, function () {
    			$("div.mzc-div").hide();
    		});
    		
    		$("div.mzc-div").hover(function () {
    			$(this).show();
    		}, function () {
    			$(this).hide();
    		});
    	} else {
    		hzhl.user.moneyBalanceOut("curBalanceId");
    		$("#yue").hover(
    				function () {
    					var left = $("#yue").position().left;
    					$(this).addClass("zhje-hov");
    					$("#curBalanceId").show().css("left", left);
    				},
    				function () {
    					$(this).removeClass("zhje-hov");
    					$("#curBalanceId").hide();
    				});
    	}
    	//window.location.reload();
    	
    },
    discussClose : function(){
		hzhl.dialog.simple({
			type    : 'discusss',
			lock    : true,
			move    : true,
			title   : '公告',
			content : '<div style="text-align:center;font-size:18px;font-weight:bold;color:#7d7d7d;padding-top:40px;">用户您好，论坛正在升级中...</div>',
			width   : 350,
			height  : 180
		});
	},
    ajaxLogout: function(){
        $.ajax({
			url     : WebAppUrl.SSO_APP_URL+'/signOut.htm?ajax=true&t='+new Date().getTime(),
			cache   : false,
			success : function(result){
                if(result == "true" || result == "userCenter"){
                    hzhl.user.showLoginHTML(false,"");
					  window.location.reload();
                }
				
			},
			error   : function(result){hzhl.dialog.alert('登录失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');}
		});
    },
    //新版登出
    ajaxLogoutNew: function(){
        $.ajax({
            url     : WebAppUrl.SSO_APP_URL+'/signOut.htm?ajax=true&t='+new Date().getTime(),
            cache   : false,
            success : function(result){
                if(result == "true" || result == "userCenter"){
                    hzhl.user.showLoginHTMLNew(false,"");
                }
            },
            error   : function(result){hzhl.dialog.alert('登录失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');}
        });
    },
    //新版外域登出
    ajaxLogoutOut: function(){
    	$.getJSON(WebAppUrl.SSO_APP_URL+'/signOut.htm?ajax=true&t='+new Date().getTime() + '&jsoncallback=?',
    		function(result){
    			if(result == "true" || result == "userCenter"){
    				hzhl.user.showLoginHTMLOut(false,"");
    			}
    		});
    },

	showIframeLoginHTML : function(f,username){
		var h={
			a : '<div style="padding-top:2px;">欢迎您，'+username+' <span id="money" title="点击显示/隐藏可用余额"><span style="color:#C2C2C3;">余额已隐藏</span> <a class="cursor fb" href="javascript:hzhl.user.money();">显示</a></span> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/index.htm" class="fbl" target="_top">我的账户</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/fastPayView.htm" class="fbl" target="_top">账户充值</a> | <a href="'+WebAppUrl.CUR_APP_URL+'/buy/index.htm" class="fbl"  target="_top">购买彩票</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/myInitialScheme.htm" class="fbl"  target="_top">购彩记录</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/myPlan.htm" class="fbl" target="_top">追号记录</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/myInitialWon.htm" class="fbl" target="_top">中奖记录</a> | <a href="'+WebAppUrl.HOME_APP_USER_URL+'/myFollow.htm" class="fbl" target="_top">自动跟单</a> | <a href="javascript:hzhl.user.ajaxIframeLogout();" class="fbl">安全退出</a>　<a href="http://wpa.qq.com/msgrd?v=3&uin=619334324&site=qq&menu=yes" class="kfqq" target="_blank" title="点击与在线客服QQ交流"></a></div>',
			b : '<label>账号</label><input type="text" class="input" id="userName" name="userName" onFocus="hzhl.selectText($(this),0,this.value.length);" onMouseOver="if(this.value.length>0){hzhl.user.showClearName(this);}" onMouseOut="hzhl.user.hideClearName();"/><label>密码</label><input id="password" type="password" class="input" onkeyup="if(hzhl.getEvent().keyCode==13){hzhl.user.login();}"/><input type="button" class="submit" id="loginAction" onClick="hzhl.user.login(1);"/><a href="'+WebAppUrl.SSO_APP_URL+'/qqLogin.htm" class="qqlogin" target="_blank"></a>　<a href="'+WebAppUrl.SSO_APP_URL+'/alipayLogin.htm" class="hr fbl" target="_blank">支付宝登录</a>　<a href="'+WebAppUrl.SSO_APP_URL+'/sinaLogin.htm" class="hr fbl" target="_blank">新浪微博登录</a>　<a href="'+WebAppUrl.SSO_APP_URL+'/forget_password.htm" class="hr fbl" target="_top">忘记密码</a>　<a href="'+WebAppUrl.SSO_APP_URL+'/register.htm" class="hr fbl" target="_top">免费注册</a>　<a href="http://wpa.qq.com/msgrd?v=3&uin=619334324&site=qq&menu=yes" target="_blank" title="点击与在线客服QQ交流" class="fbl">QQ客服</a>'
		};
		if(!this.lb)this.lb = $('#loginAct');
		this.lb.html(h[f?'a':'b']);
		if(!f){var userName=hzhl.cookie.get("cp_username");if(userName!=null){$("#userName").val(userName.split('|')[0]);};}
		this.isLogin = f;
	},
    ajaxIframeLogout: function(){
        $.ajax({
			url     : WebAppUrl.SSO_APP_URL+'/signOut.htm?ajax=true&t='+new Date().getTime(),
			cache   : false,
			success : function(result){
                if(result == "true"){
                    hzhl.user.showIframeLoginHTML(false,"");
                }
			},
			error   : function(result){hzhl.dialog.alert('登录失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');}
		});
    },
	money : function(){
        if(this.moneyCount%2==1){
            $('#money').html('<span style="color:#C2C2C3;">余额已隐藏</span> <a class="cursor fb" href="javascript:hzhl.user.money();">显示</a>');
            this.moneyCount++;
            return;
        }
		$.ajax({
			url     : WebAppUrl.HOME_APP_USER_URL+'/ajaxGetAvailableMoney.htm',
			cache   : false,
			context : this,
			success : function(result){
                if(result == "-1"){  //未登录
                    window.location = window.location;
                    return;
                }
				$('#money').html('<span style="color:#CC0000;font-weight: bold;">'+result.trim()+' 元</span> <a class="cursor fb" href="javascript:hzhl.user.money();">隐藏</a>');
				this.moneyCount++;
			}.bind(this)
		});
	},

    currentmoney : function(){
        $.ajax({
            url     : WebAppUrl.HOME_APP_USER_URL+'/ajaxGetAvailableMoney.htm?ajax=true&t='+new Date().getTime(),
            cache   : false,
            context : this,
            success : function(result){
                if(result == "-1"){  //未登录
                   // window.location = window.location;
                    return;
                }

              $('div.yue-div').html('余额: <strong>'+result.trim()+'</strong>元');

            }.bind(this)
            });

    },
    schemes : function(){
        $.ajax({
            url     : WebAppUrl.HOME_APP_USER_URL+'/ajaxGetUserScheme.htm?ajax=true&t='+new Date().getTime(),
            cache   : false,
            context : this,
            success : function(result){
                if(result == "-1"){  //未登录
                   // window.location = window.location;
                    return;
                }
                var res1 = result.split(',');
                if(res1.length == 3){
                    $('#buyTotal').text("购彩记录("+res1[0]+")");
                    $('#planTotal').text("追号记录("+res1[2]+")");
                    $('#prizeTotal').text("中奖记录("+res1[1]+")");
                }

            }.bind(this)
        });
    },
    bbsScore:function(scoreId) {
		$.ajax({
			url     : WebAppUrl.CUR_APP_URL +'/user/queryBbsScore.htm?t='+new Date().getTime(),
			cache   : false,
			context : this,
			success : function(result){
                $('#'+scoreId).html(result);
			}
		});
    },

	showClearName : function(obj){
		if(!this.nameDiv){
			this.nameDiv = hzhl.ce(document.body,'div',{
				id    : 'cl_name',
				style : {
					height     : '12px',
					paddingTop : '5px',
					width      : '19px',
					position   : 'absolute',
					cursor     : 'pointer'
				},
				html  : '<img  alt="img" src="'+WebAppUrl.RESOURCE_URL+'/images/cl_name_clear.gif"/>',
				title : '清除账号，下次打开网页将不自动输入账号'
			});
			this.nameDiv.bind({
				mouseover: function(){hzhl.user.nameDiv.show();},
				mouseout : function(){hzhl.user.nameDiv.hide();},
				click    : function(){hzhl.cookie.remove('cp_username','/','hzhl.com');var n=$('#userName');if(!n.emp()){n.val('');}}
			});
		}
		var pos = $(obj).position();
		this.nameDiv.css({top:pos.top,left:pos.left+92});
		this.nameDiv.show();
	},
	hideClearName : function(){if(hzhl.user.nameDiv)hzhl.user.nameDiv.hide();}
};
/*------------------------简版用 START------------------------*/
hzhl.simpleImage=function(picCtrl,numCtrl,amount,speed,actTime){
	this.ctrl=$(picCtrl);
	this.totalCount=this.ctrl.children().length;
	this.numCtrl=$(numCtrl);

	this.amount=amount;
	this.speed=speed;
	this.actTime=actTime;
	var s=this;

	this.numCtrl.find('li').bind({
		click : function(){s.cur=$(this).html().toInt()-1;s.effect(s.cur);},
		mouseover : function(){s.stop();},
		mouseout  : function(){s.start();}
	});
	this.ctrl.bind({
		mouseover : function(){s.stop();},
		mouseout  : function(){s.start();}
	})
}
hzhl.simpleImage.prototype={
	start : function(){this.cur=0;this.interval=setInterval(this.doStart.bind(this),this.speed);},
	stop : function(){clearInterval(this.interval);},
	doStart : function(){
		if(this.cur<this.totalCount-1){this.cur++;}else{this.cur=0;}
		this.effect(this.cur);
	},
	effect : function(cur){
		var o=this.numCtrl.find('*');
		o.revClass('act','');
		$(o[cur]).revClass('','act');
		this.ctrl.animate({marginTop:this.amount*cur*-1},this.actTime);
	}
};
/*------------------------简版用 END------------------------*/
hzhl.image=function(picCtrl,numCtrl,amount,speed,actTime){
	this.ctrl=$(picCtrl);
	this.totalCount=this.ctrl.children().length;
	this.numCtrl=$(numCtrl);
	this.amount=amount;
	this.speed=speed;
	this.actTime=actTime;
	var s=this;
	this.numCtrl.find('a').bind({
		click : function(){s.cur=$(this).html().toInt()-1;s.effect(s.cur);},
		mouseover : function(){s.stop();},
		mouseout  : function(){s.start();}
	});
	this.ctrl.bind({
		mouseover : function(){s.stop();},
		mouseout  : function(){s.start();}
	})
}
hzhl.image.prototype={
	start : function(){this.cur=0;this.interval=setInterval(this.doStart.bind(this),this.speed);},
	stop : function(){clearInterval(this.interval);},
	doStart : function(){
		if(this.cur<this.totalCount-1){this.cur++;}else{this.cur=0;}
		this.effect(this.cur);
	},
	effect : function(cur){
		var o=this.numCtrl.find('*');
		o.revClass('sel','nor');
		$(o[cur]).revClass('nor','sel');
		this.ctrl.animate({marginTop:this.amount*cur*-1},this.actTime);
	}
};
hzhl.pcd={
	selector     : function(op){
		op = $.extend({
			provinces                 : null,
			defaultProvinces          : '',
			provincesCallback         : $.noop,
			defaultProvincesText      : null,

			city                      : null,
			defaultCity               : '',
			cityCallback              : $.noop,
			defaultCityText           : null,

			districts                 : null,
			defaultDistricts          : '',
			districtsCallback         : $.noop,
			defaultDistrictsText           : null
		},op);
		var self=this,addOption=function(se,text,value){
			var theOption=new Option(text,value);
			if($.browser.msie)
				se.ele().add(theOption);
			else
				se.append(theOption);
		};
		var loadCity=function(pid){
			if(!op.city)return;
			var se=$(op.city);se.empty();
			self.getCities(pid,function(a){
				var so,cid=1,dt=op.defaultCityText;
				if(dt){addOption(se,dt[1],dt[0]);}
				$(a).each(function(i,v){
					addOption(se,v[1],v[0]);
					if(op.defaultCity==v[1]||op.defaultCity==v[0]){so=i;cid=v[0];}
				});
				if(so){$(se.find('option')[so]).attr('selected','selected');}
				loadDistricts(cid);
				se.unbind('change');
				se.change(function(){
					if(op.cityCallback)op.cityCallback(se);
					loadDistricts(se.val());
				});
			});
		},loadDistricts =function(cid){
			if(!op.districts)return;
			var se=$(op.districts);se.empty();
			self.getDistricts(cid,function(a){
				var so,cid=1,dt=op.defaultDistrictsText;
				if(dt){addOption(se,dt[1],dt[0]);}
				$(a).each(function(i,v){
					addOption(se,v[1],v[0]);
					if(op.defaultDistricts==v[1]||op.defaultDistricts==v[0]){so=i;cid=v[0];}
				});
				if(so){$(se.find('option')[so]).attr('selected','selected');}
			});
		};
		if(op.provinces!=null)
		{
			var se=$(op.provinces);
			this.getProvinces(function(a){
				var so,pid=1,dt=op.defaultProvincesText;
				if(dt){addOption(se,dt[1],dt[0]);}
				$(a).each(function(i,v){
					addOption(se,v[1],v[0]);
					if(op.defaultProvinces==v[1]||op.defaultProvinces==v[0]){so=i;pid=v[0];}
				});
				if(so){$(se.find('option')[so]).attr('selected','selected');}
				loadCity(pid);
				se.unbind('change');
				se.change(function(){
					if(op.provincesCallback)op.provincesCallback(se);
					loadCity(se.val());
				});
			});
		}
	},
	getProvinces : function(callback){
		$.ajax({
			url      : hzhl.webRoot+'/PCD_Data/Provinces.xml',
			dataType : 'xml',
			success  : function(doc){
				var a=[];
				$(doc).find('Province').each(function(i,v){
					v=$(v);
					a.push([v.attr('ID'),v.attr('ProvinceName')]);
				});
				callback(a);
			}
		});
	},
	getCities   : function(pid,callback){
		$.ajax({
			url      : hzhl.webRoot+'/PCD_Data/Cities.xml',
			dataType : 'xml',
			success  : function(doc){
				var a=[];
				$(doc).find('City[PID="'+pid+'"]').each(function(i,v){
					v=$(v);
					a.push([v.attr('ID'),v.attr('CityName'),v.attr('ZipCode')]);
				});
				callback(a);
			}
		});
	},
	getDistricts : function(cid,callback){
		$.ajax({
			url      : hzhl.webRoot+'/PCD_Data/Districts.xml',
			dataType : 'xml',
			success  : function(doc){
				var a=[];
				$(doc).find('District[CID="'+cid+'"]').each(function(i,v){
					v=$(v);
					a.push([v.attr('ID'),v.attr('DistrictName')]);
				});
				callback(a);
			}
		});
	}
};



$(function(){
//	var html='<div style="width: 150px;height: 60px;line-height: 25px;font-weight: bold;text-decoration: underline;position: absolute;right: 80px;top: 0;text-align: right;"></br><a style="color: red;"  target="_blank" href="/new.html">&gt;&gt;体验新版首页</a></div>';
//	$("#header .login-bar").append(html);
	//弹窗
	if(getCookie("user_source")!=null && getCookie("user_source")!="undefined"){
		var user_source = getCookie("user_source");
		var windowClose = getCookie("activityUser");
		if(window.location.pathname.indexOf("_header.jsp")==-1 && window.location.pathname.indexOf("zq_bottom.jsp")==-1 && window.location.pathname.indexOf("openUserScheme.htm")==-1 && window.location.pathname.indexOf("viewContent.htm")==-1){
			if(windowClose!="true"){
				if(user_source.indexOf("google.com") > 0 || user_source.indexOf("so.com") > 0 || user_source.indexOf("sogou.com") > 0 ||user_source.indexOf("baidu.com") > 0){
					var array=[];
					array.push("<div id='eMeng_ss' style=' Z-INDEX:99999; display:none;  WIDTH: 180px; POSITION:fixed;_positon:absolute; bottom: 10px; right:10px; HEIGHT: 168px; >");
					array.push("<div id='rbboxs' vAlign='center' align=right width=19>");
					array.push("<a style='display:inline;float:right;font-size:12px;cursor:pointer;'  vAlign='left' onclick='closeDiv()' ><font size='2'>[关闭]</font></a>");
					array.push("<div style='{display:inline;float:right;font-size:12px;cursor:pointer}'  cellSpacing=0 cellPadding=0 width='100%' bgColor=#cfdef4 border=0 class='ke-zeroborder'>");
					array.push("<a href='http://www.hzhl.com/activity/5050.htm'><img width='200' height='150' border='0' src='http://res.hzhl.com/images/chongzhisong/activitypic.jpg'></a></div>");
					array.push("</div></div>");
					var div=document.createElement('div');
					div.innerHTML=array.join('');
					document.body.appendChild(div);
					$('#eMeng_ss').slideDown(3000);
				}
			}
		}
	}
});
function closeDiv()
{
	document.getElementById('eMeng_ss').style.visibility='hidden';
	var exp = new Date();    
	exp.setTime(exp.getTime() + 365*24*60*60*1000); 
	document.cookie="activityUser=true;expires="+exp.toGMTString()+";path=/";
}

function getCookie(cookie_name){  
	var allcookies = document.cookie;  
	var cookie_pos = allcookies.indexOf(cookie_name);   
	if (cookie_pos != -1){  
		cookie_pos += cookie_name.length + 1;        
		var cookie_end = allcookies.indexOf(";", cookie_pos);  
		if (cookie_end == -1)  {  cookie_end = allcookies.length;  }  
		var value = unescape(allcookies.substring(cookie_pos, cookie_end));  
	}  
	return value;  
}