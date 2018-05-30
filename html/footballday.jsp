<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="com.hzhl.client.config.HlConfig" %>
<%@ page import="com.hzhl.client.frame.utils.StringUtil" %>
<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>天鹰竞彩日</title>
    <meta name="keywords" content="your keywords" />
    <meta name="description" content="your description" />
    <meta name="author" content="author,email address" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit"/>
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta name="format-detection"content="telephone=no, email=no" />
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <script  type="text/javascript" src="/html/common.js?v=1.01"></script>
    <script type="text/javascript">
        requireCss('style/activity/index/jcr.css');
    </script>
</head>
<%
    String aid = request.getParameter("aid");
    if(!aid.equals("98239055264FD")){
        aid="91356JDKKK";
    }else{
        aid="98239055264FDJCZQ";
    }

    SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddHHmmss");
    String dateStr = dateformat.format(System.currentTimeMillis());

    String ss = HlConfig.get("jinmao_day_huodong");
        String [] split = ss.split("#");
            String[] split2 = split[1].split("\\|");
            String day=split2[1];
            String day1=split2[2];
            String leau=split2[3];
            String host=split2[4];
            String guest=split2[5];
            String time=split2[9];
            String sheng=split2[6];
            String ping=split2[7];
            String fu=split2[8];
            String yue=split[2];
            String yue1=split[3];
            long dtime =  Long.parseLong(dateStr);
            Integer isJieSu=0;
            if(dtime>Long.parseLong(split2[9].replaceAll("-","").replaceAll(" ","").replaceAll(":",""))){
                isJieSu=1;
            }
%>
<body>
<div class="jcr">
    <div class="topBj">
        <p class="topBj-china"></p>
        <p class="topBj-jic"></p>
    </div>
    <div class="time">
        <div class="timeBj">
            <div class="bac-ul">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div class="bac-ol">
                <ol>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ol>
            </div>
        </div>
        <div id="newsdata" class="timeTo">
            <!--<div class="cont">-->
            <span><%=dateStr.substring(4,5) %></span>
            <span class="toMax"><%=dateStr.substring(5,6) %></span>
            <span class="toMin">月</span>
            <span class="dataOff"><%=dateStr.substring(6,7) %></span>
            <span class="toMax"><%=dateStr.substring(7,8) %></span>
            <!--</div>-->
            <!--<span class="MinAge">日</span>-->
        </div>
    </div>
    <div class="nav">
        <!--指定赛事-->
        <% if(isJieSu==0){ %>
        <div class="zd">
            <div class="navLeft"></div>
            <div class="navCenter">
                <div class="made">
                    <div class="madeTop">
                        <span><%=day%><em><%=day1%></em><em> <%=leau%></em></span>
                        <span><%=time%></span>
                    </div>
                    <div class="madeCenter">
                        <span><%=host%></span>
                        <i>VS</i>
                        <span><%=guest%></span>
                    </div>
                    <div class="madeBottom">
                        <span>
                            <p>主胜</p>
                            <p><%=sheng%></p>
                        </span>
                        <span>
                            <p>平</p>
                            <p><%=ping%></p>
                        </span>
                        <span>
                            <p>负</p>
                            <p><%=fu%> </p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="navRight"></div>
        </div>
        <%} %>
        <!--暂无赛事-->
        <% if(isJieSu==1){ %>
        <div class="zw">
            <div class="navLeft"></div>
            <div class="navCenter">
                <h1>暂无指定赛事&nbsp;&nbsp;敬请期待下期</h1>
                <i class="wire">下期时间为<em><%=yue%></em>月<em><%=yue1%></em>日</i>
            </div>
            <div class="navRights"></div>
        </div>
        <%} %>
        <!---->
    </div>
    <div class="bet">
        <a href="/html/competitive.html?pt=a3&l=0&aid=<%=aid%>"></a>
        <div class="condition">
            <h3>参与条件</h3>
            <!--<p data-index="1">含有当天指定比赛;</p>-->
            <!--<p data-index="2">投注金额在100-1000元（含）之间；</p>-->
            <!--<p data-index="3">投注下单时不使用彩金券；</p>-->
            <p></p>
        </div>
    </div>
    <div class="barcode">
        <h3>客户端投注入口</h3>
        <ul>
            <li><span></span><p>天鹰彩票手机站</p></li>
            <li><span></span><p>天鹰彩票Android版</p></li>
            <li><span></span><p>天鹰彩票IOS版</p></li>
        </ul>
        <dic class="clear"></dic>
    </div>
    <div class="rule">
        <div class="overlay"></div>
        <div class="activity">
            <h4>活动规则</h4>
            <p>活动时间：2017年6月起，每月的5日、15日、25日</p>
            <p>活动说明：</p>
            <p>1. 2017年6月起，每月的5日、15日、25日将设定为“天鹰竞彩日”；</p>
            <p>2. 用户完成实名认证、手机绑定即可参与本活动；</p>
            <p>3. 当日在天鹰彩票网及客户端投注的所有用户，参与满足以下条件的首单投注：</p>
            <p>①含有当天指定比赛；</p>
            <p>②投注金额在100-1000元（含）之间；</p>
            <p>③投注下单时不使用彩金券；</p>
            <p>即可获得天鹰彩票网送出的投注额8%的彩金奖励！</p>
            <p>4. 首单投注特指满足3中三个条件的首单投注，不影响当日首单购买其他比赛或其他彩种；</p>
            <p>5. 当天指定比赛名单将会提前1天在天鹰彩票网公布，具体留意官方公告或咨询网站客服；</p>
            <p>6. 本活动最终解释权归天鹰彩票网所有，如有疑问，请联系客服：400-1012-968。</p>
        </div>
        <div class="clear"></div>
    </div>
</div>
</body>
</html>

