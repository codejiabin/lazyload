/**
 * @author xuzhizheng@gmail.com
 */
hzhl.closeBanner=function(){
  $("#banner").hide();
  sessionStorage.setItem('isShowBanner', 1);
};
hzhl.loadBanner=function(){
  $.ajax({
    // 在这里调用action里面的方法，地址后面带参数
    url:WebAppUrl.HOME_APP_URL+"/activity/getActivityList?first=1",
    success:function(data){
      if(data.flag==1){
        var i=0,len=data.list.length,html=[];
        html.push('<i onclick="hzhl.closeBanner();" id="closeBanner"></i>');
        html.push('<ul id="bannerWarp" ontouchstart="touch.touchStart(event)" ontouchmove="touch.touchMove(event);" ontouchend="touch.touchEnd();" >');
        for(i;i<len;i++){
          html.push('<li><a href="'+data.list[i].link +'" target="_blank"><img src="'+data.list[i].pictureindexUrl+'" /></a></li>');
        }
        html.push('</ul>');
        hzhl.banner.len=len;
        $('#banner').html(html.join(''));
        var bannerWarp=$("#bannerWarp");
        html=[];i=0;
        bannerWarp.css({width:len*100+"%"});
        bannerWarp.children().css({width:100/len+"%"});
        for(i;i<len;i++){
          html.push('<a></a>');
        }
        $('#banner').append('<nav id="bannerNav">'+html.join('')+'</nav>');
        hzhl.banner.init();
      }
    }
  });
};
var touch = {
  tX : [],
  touchStart : function(a) {
    this.tX.push(a.touches[0].pageX);
  },
  touchMove : function(c) {
    this.tX.push(c.touches[0].pageX);
    //c.preventDefault();
  },
  touchEnd : function() {
    if (this.tX[0] - this.tX[this.tX.length - 1] > 100) {
      hzhl.banner.left();
    }else if ( this.tX[this.tX.length - 1] - this.tX[0] > 100){
      hzhl.banner.right();
    }
    this.tX = [];
  }
};
hzhl.banner={
	len:1,
	setNav:function(i){
		var k=$('#bannerNav a.cur').index();
		k=k+i;
		//console.log(i,k);
		if(k<0){
			k=this.len-1;
		}else if(k>this.len-1){
			k=0;
		}
		$('#bannerNav a').removeClass('cur');
		$('#bannerNav a').eq(k).addClass('cur');
	},
	left:function(){
		var that=$("#bannerWarp").children("li").eq(0).clone();
		$("#bannerWarp").children("li").eq(0).remove();
		$("#bannerWarp").append(that);
		this.setNav(-1);
//		$("#bannerWarp").children("li").eq(0).animate({width:0},{duration:200,complete:function(){
//				$("#bannerWarp").children("li").eq(0).remove();
//				$("#bannerWarp").append(that);
//				hzhl.banner.setNav(-1);
//			}
//		});
	},
	right:function(){
		var that=$("#bannerWarp").children("li").eq(-1).clone();
		$("#bannerWarp").children("li").eq(-1).remove();
		$("#bannerWarp").prepend(that);
		this.setNav(1);
	},
	init:function(){
		$('#bannerNav a').eq(0).addClass('cur');
		setInterval('hzhl.banner.left()',3000);
	}
};
hzhl.util={
		
	setIssue:function(drawIssue){
      if(drawIssue){
    	  drawIssue = drawIssue.substring(2,drawIssue.length);
      }
      return drawIssue;
    },	
	setIssue1:function(drawIssue){
      if(drawIssue){
	     drawIssue = drawIssue.substring(drawIssue.length-2,drawIssue.length);
	  }
      return drawIssue;
	},	
	splitNumber:function(drawNumber){
		 var drawNumberStr = drawNumber.split("//");
		 var numberArray=[];
		 for(var i=0; i<drawNumberStr.length;i++){		 
			 var tempNumber = drawNumberStr[i].split("/");
			 for(var j=0;j<tempNumber.length;j++){
				 if(i==0){
					 numberArray.push("<em>"+tempNumber[j]+"</em>");
				 }else{
					 numberArray.push("<b>"+tempNumber[j]+"</b>");
				 }
			 }
		 }
		 return numberArray.join(" ");
	},
	splitNumber1:function(drawNumber){
		 var drawNumberStr = drawNumber.split("/");
		 var numberArray=[];
		 for(var i=0; i<drawNumberStr.length;i++){		 
				numberArray.push("<em>"+drawNumberStr[i]+"</em>");
		 }
		 return numberArray.join(" ");
	},
    filterArray:function(filterArray,checkItem){  
        var index = false; //　函数返回值用于布尔判断  
        for(var i=0; i<filterArray.length; ++i){  
            if(filterArray[i]==checkItem){  
                index = true;  
                break;  
               }  
            }  
        return index;  
    }  	
};

hzhl.mainPage=function(){
  $.ajax({
    url:WebAppUrl.HOME_APP_URL+"/lottery/lottery_list?version=1.0.0&requestType=2",
    beforeSend:function(){hzhl.dialog.loading();},
    success:function(data){
      hzhl.dialog.clearLoading();
      var html=[], processList=[],processListId=[],hot="a0",tmp='';
      for(var i=0;i<data.list.length;i++){
    	  if(!hzhl.util.filterArray(processListId,data.list[i].clientLotteryId)){
    		  processListId.push(data.list[i].clientLotteryId);
    		  processList.push(data.list[i]);
    	  }
      }
      if(sessionStorage.getItem('isShowBanner')!=1){
        html.push('<div class="banner" id="banner"></div>');
      }
      for(var i=0;i<processList.length;i++){
        tmp='';
        switch(processList[i].clientLotteryId){
          case 10000:
          case 10001:
              tmp='<p><span>'+hzhl.util.setIssue(processList[i].drawIssue)+'期奖号:</span>'+hzhl.util.splitNumber(processList[i].drawNumber)+'</p>';
              break;
          case 20000:
          case 20001:
          case 20002:
          case 20003:
            tmp='<p><span>'+hzhl.util.setIssue1(processList[i].drawIssue)+'期奖号:</span>'+hzhl.util.splitNumber1(processList[i].drawNumber)+'</p>';
            break;
          case 30005:
            tmp='<p>浮动奖金，2元可中500万</p>';
            break;
          case 30006:
            tmp='<p>竞彩篮球</p>';
            break;
          case 30000:
            tmp='<p>2串1，易中奖</p>';
            break;
        }
        switch(processList[i].clientLotteryId){
          case 10004:
          case 10005:
          case 10001:
          case 10000:
            hot='a0';
            break;
          case 20000:
            hot='a14';
            break;
          case 20001:
            hot='a14';
            break;
          case 20002:
          case 20003:
            hot='a11';//
            break;
          case 10060:
            hot='a14';
            break;
          case 10064:
            hot='a12';
            break;
          case 10065:
            hot='a3';
            break;
          case 30006:
          case 30000:
          case 30005:
            hot='a0';
            break;
          case 10082:
            hot='a0';
            break;
        }
        if(processList[i].status==1){
        	alert(processList[i].lotteryId);
          html.push('<a href='+WebAppUrl.HOME_APP_URL+'/lottery/'+processList[i].lotteryId+'?type='+hot+'"><div class="playType">');
          html.push('<div class="img2"><img src="'+WebAppUrl.Icon+processList[i].clientLotteryId+'.png" /><span>'+processList[i].lotteryName+'</span></div><div class="playTypeArea">');
          html.push('<p class="p11">'+processList[i].message);
          if(processList[i].tag){
            html.push('<i class="hot">'+processList[i].tag+'</i>');
          }
          html.push('</p>');
          html.push(tmp);
          html.push('</div></div></a>');
        }
      }
      $("#mainPage").html(html.join(''));
      window.scrollTo(0,0);
      if(sessionStorage.getItem('isShowBanner')!=1){
       // hzhl.loadBanner();
      }
    }
  });
  if(!WebAppUrl.isYZYH){
    $.get(WebAppUrl.HOME_APP_URL+"/user/checkLogin",function(isLogin){
      if(isLogin.flag==1){
        $("#indexNav").append('<p id="imLogin"><a href="/limit/user/index">'+isLogin.username+'</a></p>');
        localStorage.setItem('username', isLogin.username);
        //$.get(WebAppUrl.HOME_APP_URL+"/activity/userActivityCount",function(data){
          //if(data.myActivityCount>0){
            //if($("#unRead").size()==0){
              //$("#hasActive").append('<i class="unRead" id="unRead"></i>');
            //}
          //}
        //});//有无私有活动
      }else{
        $("#imLogin").remove();
        localStorage.removeItem("username");
      }
    });//用户状态
  }
  if(localStorage.getItem('has')!=1){
    $("#hasActive").append('<i class="unRead" id="unRead"></i>');
    $("#hasActive").click(function(){
      localStorage.setItem('has',1);
    });
  };
};
hzhl.mainPage();