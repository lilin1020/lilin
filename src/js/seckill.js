            //秒杀样式
            // getDiff();
            // function getDiff()//{
                var timeid =setInterval(function ge(){
                var day_show =document.querySelector('.day-show');
                var hour_show =document.querySelector('.hour-show');
                var minute_show =document.querySelector('.minute-show');
                var second_show =document.querySelector('.second-show');
                var date1 = new Date();
                var date2 = new Date(2020,8,31);
                date2 = date2.getTime();//转换成格林威治时间
                date1 = date1.getTime();
                var diff = date2-date1;
            var day = Math.floor(diff/(1000*60*60*24));//天数
                diff = diff-day*1000*60*60*24;
            var hour = parseInt(diff/(1000*60*60));//小时
                diff = diff-hour*1000*60*60;
            var minute = Math.floor(diff/(1000*60));//分钟
                diff=diff-minute*1000*60;
            var second = parseInt(diff/1000);//秒
            day_show.innerHTML=day+"天";
            hour_show.innerHTML=hour+"时";
            minute_show.innerHTML=minute+"分";
            second_show.innerHTML=second+"秒&nbsp;后结束";       
            if(day<0){
                clearInterval(timeid)
                 }

            },1000)
            
            // if(second<0){
            //     setTimeout("ge()",1000)
            // }

            // var timeid = setInterval(getDiff,1000);//倒计时定时设置为一秒


//放大镜的样式
var mousele = document.getElementById('mousele');
var big = mousele.children[0];
var small = mousele.children[1];
var smallImg = small.children[1].children[0].children;
var mask = document.getElementById('mask')


$('.box li').mouseover(function(){
    $(this).addClass('current').siblings('li').removeClass('current');
    $('.product-main-image img').eq($(this).index()).show().attr("src",newSrc).siblings('img').hide();
    // console.log($(this).find('img').attr('src').slice(0,-4)+ "big.jpg");
    
    var newSrc = $(this).find('img').attr('src').slice(0,-4) + "big.jpg";
    $('.product-main-image img').attr("src",newSrc);
})
$('.product-main-image').mousemove(function( e ){
    $(this).find('img').addClass('on');
    var startX = $(e)[0].pageX;
    var startY = $(e)[0].pageY;
    var boxWidth = $(this).find('img').width() / 2;
    var boxHeight = $(this).find('img').height() / 2;
    var left = startX - $(this).offset().left -boxWidth;
    var top = startY - $(this).offset().top - boxHeight;
    $('.product-main-image img').css({
        left:-left ,
        top: -top,
    })
})
$('.product-main-image').mouseout(function(){
    $(this).find('img').css({
        top:-40,
        left:0
    }).removeClass("on")
})
$('.box li').mouseout(function(){
    $('#mask').hide();
    $(".product-main-image").find('img').removeClass('on');
})
// 图片放大
// $('.product-main-image').mouseover(function(){
//     console.log($('.box li').index());
//     // $('.product-main-image img').eq($('.box li').index()).show().addClass('on').siblings('img').removeClass('on')

// })
// 商品添加特效
$('.jia').click(function(){
    var num = parseInt($('#numBer').val());
    num++;
    $('#numBer').val(num);
    // console.log( $('strong'))
})
$('.jian').click(function(){
    var num = parseInt($('#numBer').val());
    if(num==1){
        $('#numBer').val(1)
    }else{
        num--;
        $('#numBer').val(num)
    } 
})
