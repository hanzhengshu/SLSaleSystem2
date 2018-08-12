//jQuery选择器获取到loginBtn元素 通过id获得用#号   click事件:当触发时   
$("#loginBtn").click(function(){
	var user = new Object();
	user.loginCode = $.trim($("#loginCode").val());//trim 去空格
	user.password = $.trim($("#password").val());
	user.isStart = 1;
	
	//如果账号为空
	if(user.loginCode == "" || user.loginCode == null ){
		$("#loginCode").focus;	//获取焦点操作   ->把鼠标光标移到loginCode处
		$("#formtip").css("color","red");
		$("#formtip").html("对不起,登陆账号不能为空");
	//如果密码为空
	}else if (user.password == "" || user.password == null ){
		$("#password").focus;
		$("#formtip").css("color","red");
		$("#formtip").html("对不起,密码不能为空");
	//如果正确
	}else {
		$("#formtip").html("");
		//ajax异步提交
		$.ajax({
			type:'POST',
			url:'SLSaleSystem/login.html',
			data:{user:JSON.stringify(user)},//data:提交的数据    将js格式的user对象转换成字符串格式
			dataType:'html',		//ajax返回的格式			
			timeout:100000,		//超时设置时间
			error:function(){	//返回回来非200的状态码
				$("#formtip").css("color","red");
				$("#formtip").html("登陆失败,请重试!!!");
				
			},			
			success:function(result){
				//consol.log(result)
				if(result != "" && result == "success"){ //若登陆成功登陆到main.html页面
					
					window.location.href='/SLSaleSystem/main.html';
					
				}else if (result == "falled"){	//登陆失败
					$("#formtip").css("color","red");
					$("#formtip").html("登陆失败,请重试!!!");
					$("#loginCode").val('');
					$("#password").val('');
					
				}else if (result == "nologincode"){	//账号不存在
					$("#formtip").css("color","red");
					$("#formtip").html("您输入的账号不存在,请重试!");
				
				}else if(result == "pwderror"){  //密码有误
					$("#formtip").css("color","red");
					$("#formtip").html("您输入的密码有误,请重试!");
					
				}else if(result == "nodata"){
					$("#formtip").css("color","red");
					$("#formtip").html("对不起,没有任何数据需要处理!请重试");
				}
			}
			
		});
		
	} 
	
});

