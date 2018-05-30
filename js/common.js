/**
 * Created by Administrator on 2018/5/23.
 */
var resVersion = "1.31";	//资源文件的版本号，每次发布或者升级都需改变此版本号
var resourcePath = "http://data.tianyingticai.com"
/**
 * 加了版本号码的js引用
 * url js的url
 */
function requireJs(url){
    document.writeln('<script type="text/javascript" src="' + resourcePath + '/' + url + '?v=' + resVersion + '" charset="utf-8"><\/script>');
}

/**
 * 加了版本号码的css引用
 * url css的url
 */
function requireCss(url){
    document.writeln('<link type="text/css" rel="stylesheet" href="' + resourcePath + '/' + url + '?v=' + resVersion + '" />');
}
/**
 * 加了版本号码的图片引用
 * url img的url
 */
function requireImg(url,alt,cs){
    document.writeln('<img src="' + resourcePath + '/' + url + '?v=' + resVersion + '"  alt="' + alt + '"   class="' + cs + '" />');
}