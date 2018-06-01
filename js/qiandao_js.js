/**
 * Created by Administrator on 2018/6/1.
 */
$(function(){
    var signFun=function(){
        var dateArray=[1,4,5,7];
        var $dateBox=$("#js-qiandao-list"),
            $currentDate=$(".current-date"),
            $qiandaoBnt=$("#js-just-qiandao"),
            _html='',
            _handle=true,
            myDate=new Date();
        $currentDate.text(myDate.getFullYear()+'年'+(myDate.getMonth()+1)+'月'+myDate.getDate()+'日');
        var monthFirst=new Date(myDate.getFullYear(),(myDate.getMonth()),1).getDay();
        var d=new Date(myDate.getFullYear(),myDate.getMonth()+1,0);
        var totalDay=d.getDate();
        for(var i=0;i<42;i++){
            _html+='<li><div class="qiandao-icon"></div></li>';
        }
        $dateBox.html(_html);
        var $dateLi=$dateBox.find('li');
        for(var i=0;i<totalDay;i++){
            $dateLi.eq(i+monthFirst).addClass("date"+(i+1));
            for(var j=0;j<dateArray.length;j++){
                if(i==dateArray[j]){
                    $dateLi.eq(i-1+monthFirst).addClass("qiandao");
                }
            }
        }
        $dateBox.on("click","li",function(){
            if($(this).hasClass('able-qiandao')&&_handle){
                $(this).addClass('qiandao');
                qiandaoFun();
            }
        })
        $qiandaoBnt.on("click",function(){
            if(_handle){
                qiandaoFun();
            }
        });
        function qiandaoFun(){
            $qiandaoBnt.addClass('actived');
            openLayer("qiandao-active",qianDao);
            _handle=false;
        }
        function qianDao(){
            $(".date"+myDate.getDate()).addClass('qiandao');
        }
    }();
    function openLayer(a,Fun){
        $('.'+a).fadeIn(Fun)
    }
    var closeLayer=function(){
        $("body").on("click",".close-qiandao-layer",function(){
            $(this).parents(".qiandao-layer").fadeOut()
        })
    }()
    $("#js-qiandao-history").on("click",function(){
        openLayer("qiandao-history-layer",myFun);
        function myFun(){
            return
        }
    })
})