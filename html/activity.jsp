<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>活动中心</title>
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
        requireCss('style/activity/index/activity.css');
    </script>
</head>
<%
    String aid = request.getParameter("aid");
    String clientUserSession = request.getParameter("clientUserSession");
    if(aid==null||(aid!=null&&!aid.equals("98239055264FD"))){
        aid="91356JDKKK";
    }
    System.out.println("clientUserSession"+clientUserSession);
    if(clientUserSession==null){
        clientUserSession="";
    }
%>
<body>
<nav class="nav">
    <div class="content">
        <div class="act act_li">
            <a href="/html/jiajiang.html">
                <span class="Title">加奖10%闹元宵</span>
                <script>requireImg('image/b/4.jpg','','')</script>
                <p>
                    <span>活动时间：<em>3月1日-3月7日</em></span>
                </p>
            </a>
        </div>
        <div class="act act_li">
            <a href="/html/88red.html">
                <span class="Title">新用户注册送88</span>
                <script>requireImg('image/b/3.jpg','','')</script>
                <p>
                    <span>活动时间：<em>2月1日起</em></span>
                </p>
            </a>
        </div>
        <div class="act act_li">
            <a href="/html/awards.jsp?aid=<%=aid%>">
                <span class="Title">竞彩加奖5%</span>
                <script>requireImg('image/activity/index/benn5.png','','')</script>
                <p>
                    <span>活动时间：<em>1月17日起</em></span>
                </p>
            </a>
        </div>
        <div class="act act_li">
            <a href="/html/footballday.jsp?aid=<%=aid%>">
                <span class="Title">天鹰竞彩日</span>
                <script>requireImg('image/activity/index/benn2.png','','')</script>
                <p>
                    <span>活动时间：<em>每月5,15,25号</em></span>
                </p>
            </a>
        </div>
        <div class="act act_li">
            <%if(aid.equals("98239055264FD")){%>
            <a href="http://app.jinmaocp.com/h5/activity/bigwheel?clientUserSession=<%=clientUserSession%>&aid=<%=aid%>">
                <%}else{%>
                    <a href="${jinmao:web()}/h5/activity/bigwheel">
                <%}%>
                <span class="Title">幸运大转盘</span>
                <script>requireImg('image/activity/index/benn3.png','','')</script>
                <p>
                    <span>活动时间：<em>9.1-9.30</em></span>
                </p>
            </a>
        </div>
        <div class="act act_li">
            <a href="/html/fenxiang.jsp?aid=<%=aid%>">
                <span class="Title">分享红单 集赞送豪礼</span>
                <script>requireImg('image/activity/index/benn4.png','','')</script>
                <p>
                    <span>活动时间：<em>9.1-9.30</em></span>
                </p>
            </a>
        </div>
    </div>
</nav>
</body>
</html>

