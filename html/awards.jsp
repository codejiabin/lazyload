<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>天鹰体彩新用户活动</title>
    <link rel="stylesheet" href="../res/js/initial.js">
    <style>
        body,div{
            margin:0;
            padding:0;
        }
        .huodong {
            width:100%;
        }
        .huodong img{
            width:100%;
            /*height:132.6rem;*/
        }
    </style>
</head>
<script>
    (function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                /*docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';*/
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
</script>
<body>
<div class="huodong">
    <img src="../res/images/huodong_bg2.png" alt="">
</div>
</body>
</html>

