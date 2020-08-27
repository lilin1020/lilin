
 //头部菜单栏电视动画js
// $('.signin-btn').hover(function(){
//     $('.signin-btn').css('background','red')
// },function(){
//     $('.signin-btn').css('background','green')
    
// })

// console.log('2222')
 $('.col-xs-1').mouseover(function(){
    $(this).children('.item').css('display','block')
    $(this).css('background','white')
    $(this).children("a").css('color','red')
    // $(this).first().css('color','red')
    // $(this).find("a").css('color','red')

    // $('.col-xs-1>a').css('color','red')

   
    // $(this).eq().css('color','red')
    
})
$('.col-xs-1').mouseout(function(){
    $(this).children('.item').css('display','none')
    $(this).css('background','#f4f4f4')
    $(this).children("a").css('color','#767676')

//     console.log('huaguo')
// },function(){
//     $('.item').css('display','none')
//     console.log('zoule')

})
