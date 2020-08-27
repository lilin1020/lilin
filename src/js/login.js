
// 登录页面的js
$('.btn-danger').click(function(){
    $.ajax({
        method:'post',
        url:'../../server/login.php',
        data:{
            username:$('#input_uname').val(),
            password:$('#input_password').val(),
        },
        success:function(data){   
            console.log(data);
 
            if(data.code==1){
                console.log(data.code)
                alert('登录成功')
                //表示成功
                //把用户名存入本地储存
                localStorage.setItem('input_uname',data.data.username)
                location.href = "http://localhost/code/kangjiashouye/kangjia/src/pages/commotidy.html"
            }else{
                //表示失败
                alert(data.msg)
            }
        },
        dataType:'json',
        error:function(){
            alert(222)
        }
    })
})
