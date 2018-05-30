<%@page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>分享红单-集赞送好礼</title>
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
        requireCss('style/activity/index/fenx_h5.css');
    </script>
</head>
<%
    String aid = request.getParameter("aid");
    if(!aid.equals("98239055264FD")){
        aid="91356JDKKK";
    }else{
        aid="98239055264FDJCZQ";
    }
    %>
<body>
<div class="jmcp-h5">
    <div class="logo">
        <script>requireImg('image/activity/index/logo.png','','')</script>
    </div>
    <div class="one">
        <script>requireImg('image/activity/index/h5_one.png','','')</script>
        <span class="code"></span>
    </div>
    <div class="two">
        <script>requireImg('image/activity/index/h5_two.png','','')</script>
    </div>
    <div class="three">
        <script>requireImg('image/activity/index/h5_three.png','','')</script>
    </div>
    <div class="four">
        <span class="btn_jian"></span>
        <a href="/html/competitive.html?pt=a3&l=0&aid=<%=aid%>"></a>
    </div>
    <div class="five">
        <script>requireImg('image/activity/index/h5_five.png','','')</script>
    </div>
</div>
<div class="jmcp">
    <div class="logo">
        <span></span>
    </div>
    <div class="one">
        <script>requireImg('image/activity/index/pc_one.png','','')</script>
    </div>
    <div class="two">
        <script>requireImg('image/activity/index/pc_two.png','','')</script>
    </div>
    <div class="three">
        <script>requireImg('image/activity/index/pc_three.png','','')</script>
    </div>
    <div class="four">
        <span class="btn_jian"></span>
        <a href=""></a>
    </div>
    <div class="five">
        <script>requireImg('image/activity/index/pc_five.png','','')</script>
    </div>
</div>
</body>
</html>

