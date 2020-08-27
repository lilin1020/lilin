// 注册页面js
$('.btn-warning').click(function(){
  $.ajax({
      method:'post',
      url:'../../server/signup.php',
      data:{
          username:$('#input_login_name').val(),
          password:$('#input_login_password').val()
      },
      success:function(data){
          
          if(data.code==1){
              location.href = "./login.html"
          }else{
              //表示失败
              alert(data.msg)
          }
      },
      dataType:'json'
  })
})