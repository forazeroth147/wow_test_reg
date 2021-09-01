// JavaScript Document

 function ajax2(method,url, data, succeed,fail)
{
	var ajax=null;
	if(window.XMLHttpRequest)
	{
	   ajax=new XMLHttpRequest();	
	}
	else
	{
		ajax=new ActiveXObject("Mircosoft XMLHTTP")
	}
	if( method=='GET' && data)
	{
		url+='?'+data;  //传数据时 后面加时间戳不起作用
	}
	ajax.open(method,url,true );
	if( method=='GET')
	{
	 ajax.send();
	 }
	else
	{
	ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
	ajax.send(data);
   }
	ajax.onreadystatechange=function()
	{
		if(ajax.readyState==4)
		{
		  if(ajax.status==200)
		  {
			  succeed&&succeed(ajax.responseText);
		  }	
		  else
		  {
			 if(fail)
			 { fail(ajax.status);}  
		  }
		}
	}
}  /*------------------------ajax函数-----------------------------*/
   
$(document).ready(function(e) {
   var kg=/^\s*$/;
  	var id=getCookie('id');
	var n_val=getCookie('name_val'); 

	if(id==undefined || id=='')
	{
		alert('请先登录');
		window.location.href='delu.html'; 
		return; 
	}
	var email=$('.regContent .email input')
	var wed=$('.regContent .wed').find('input'); 
	var user_name=$('.reg_user').children('a').eq(0);
	var sys_ask=$('.regContent .problem option');
	var sys_answer=$('.regContent .problem input');
	var self_ask=$('.regContent .problem2 input').eq(0);
	var self_answer=$('.regContent .problem2 input').eq(1);	
	var now=true;
	user_name.text(n_val);
	//--------------------------只验证了ID
    ajax2('POST','php/index.php','id='+id,function(data){
	var	data=JSON.parse(data);
	
		if(kg.test(data))
		{
		alert('请先登录');
		window.location.href='delu.html';  
		}
		else
		{
			sys_ask.each(function(index)
			 {
                if($(this).val()==data.ask)
				{
				 $(this).attr('selected',true);
				 sys_answer.val(data.answer);
				 now=false;
				}
            });
			if(now==true)
			{
				self_ask.val(data.ask);
				self_answer.val(data.answer);
			}
			email.val(data.email);
			wed.each(function(index)
			 {
				if($(this).val()==data.wed)
				{ 
				  $(this).attr('checked',true);
				}
			});
		}
	  })//验证是否存在此用户并获取信息
	
   $('form .id').val(id);//隐藏域传值
	  
   var old_pass=$('.regContent .old_pass input');
   var pwd_text=$('.old_pass p');
   var pwd_1=$('.regContent .pass p');
   var pwd_2=$('.regContent .pass2 p');
  
   var  name_v=getCookie('name_val');//取到名字值
   old_pass.blur(function()
   {
	   if(!kg.test($(this).val()))
	   {
		   $.ajax({
			   type:"POST",
			   url:'php/pwd.php',
			   data:{user:name_v,pwd:$(this).val()},
			   timeout:1000,
			   success:function(response,status,xhr)
			   {
					  　// alert(xhr.status+'  '+xhr.statusText)// 200 ＯＫ
					  if(response==1)
					  {
						  alert('页面错误，请重新登录');
						  window.location.href='delu.html';  
					  }
					  if(response==2)
					  {
						 pwd_text.css('display','block');
						 pwd_text.html('<img src="Images/no.gif"/><span style="color:#FF6666">密码格式不正确</span>');
				         return false; 
					  }
						if(response==3)
						{
							 pwd_text.css('display','block');
							pwd_text.html('<img src="Images/no.gif"/><span style="color:#FF6666">原密码错误</span>');
							return false;
						}
			
					},
				error:function(xhr,status,response)
				{
					 alert(xhr.status+'  '+xhr.statusText)
				}
			   });
		
	   }
	  
   }) //验证原密码是否正确
   
   
  var but=$('.regContent .submit input'); 
  var problem=$('.regContent .problem');
  var problem2=$('.regContent .problem2');
  var email_text=$('.regContent .email p');
  
      problem.children('select').focus(function()
       {
	  $(this).css('border','');
	  problem.children('.gray').css('color','');
	  });
	  
     problem.children('input').blur(function(){
	  	if(!kg.test($(this).val())) 
		{
			problem.children('.gray').css('color','');
		}
	});
      problem2.children('input').eq(1).blur(function(){
	  	if(!kg.test($(this).val())) 
		{
			problem2.children('.gray').css('color','');
		}
	});
	//------------------------------------------------------问题设置
	
	var aInput=$('.regContent').find('input[type!=radio]');
	var aRadio=$('.regContent').find('input[type=radio]');
	var val_len=$('.regContent').find('input').length;
	var n=0;
 
	var len=aInput.length; // 8
	
	  but.click(function()
	  {
		  if(problem.children('select').val()!=1)
		  {
			if(kg.test(problem.children('input').val()))
			{
				problem.children('.gray').css('color','#F00');
				problem.children('input').focus();
				return false;
			}
			if(!kg.test(problem2.children('input').eq(0).val()))
			{
				alert('只能设置一个问题');
				return false;
			}
		  }//系统设置问题
		  
		  if(!kg.test(problem.children('input').val()))
		  {
			   if(problem.children('select').val()==0)
			   {
				   problem.children('select').css('border','1px solid #f30');
			   }
			  
		  }//系统回答问题
		  
		  
	     if(!kg.test(problem2.children('input').eq(0).val()))
		 {
			 if(kg.test(problem2.children('input').eq(1).val()))
			 {
				 
				problem2.children('.gray').css('color','#F00');
				problem2.children('input').focus();
				return false;
			}
		 }//自定义问题
	     
		if(!kg.test(problem2.children('input').eq(1).val()))
		 {
			 if(kg.test(problem2.children('input').eq(0).val()))
			 {
				problem2.children('.gray').css('color','#F00');
				problem2.children('input').focus();
				return false; 
			 }
		 }//自定义回答
		
		aInput.each(function(i) 
		{
			if(kg.test(aInput.eq(i).val()))
			{
				n++;
			}
		});
		aRadio.each(function(i)
		 {
			 if(aRadio.eq(i).attr('checked')!='checked')
			{
				n++;
			}
		});//验证是否有值
		
	   if(n==val_len)
	   {
		 alert('您没有写入任何值');
		 return false;
	   }
	   else
	   {
		   $.ajax(
		   {
			  type:"POST",
			  url:'php/xuigai.php',
			  timeout:4000,
			  data:$('form').serialize()+'&xui=gai',
			  success:function(response,status,xhr)
			  {
				 if(response==1)
				 {
					 pwd_text.css('display','block');
					 pwd_text.html('<img src="Images/no.gif"/><span style="color:#FF6666">原密码错误</span>');
					 return false; 
				 }
				 if(response==2)
				 {
					 pwd_text.css('display','block');
					 pwd_text.html('<img src="Images/warn.png"/><span style="color:#FF6666">原密码不得为空</span>');
					 return false; 
				 }
				  if(response==3)
				 {
					 pwd_2.css('display','block');
					 pwd_2.html('<img src="Images/warn.png"/><span style="color:#FF6666">确认密码不得为空</span>');
					 return false; 
				 }
				 if(response==4)
				 {
					 pwd_2.css('display','block');
					 pwd_2.html('<img src="Images/no.gif"/><span style="color:#FF6666">两次密码不一致</span>');
					 return false; 
				 }
				 if(response==5)
				 {
					 pwd_1.css('display','block');
					 pwd_1.html('<img src="Images/warn.png"/><span style="color:#FF6666">6-9个字符，区分大小写</span>');
					 return false; 
				 }
				 if(response==7)
				 {
					 pwd_1.css('display','block');
					 pwd_1.html('<img src="Images/warn.png"/><span style="color:#FF6666">新密码不的为空</span>');
					 return false; 
				 }
				 if(response==8)
				 {
					 alert('只能设置一个问题');
				     return false;
				 }
				 if(response==9)
				 {
					problem.children('.gray').css('color','#F00');
					problem.children('input').focus();
					return false;
				 }
				  if(response==10)
				  {
					 problem.find('span.red').text('答案不得少于5个或超过30个字符');
					 return false;
				  }
			     if(response==11)
				  {
				    problem.children('select').css('border','1px solid #f30');
				  }
				 if(response==13)
				  {
					problem2.children('.gray').css('color','#F00');
					 return false;
				  }
				  if(response==12)
				  {
					 problem2.find('span.red').text('请回答你提出的问题');
					 return false;
				  }
				  if(response==14)
				  {
					 problem2.find('span.red').text('请设置你的问题');
					 return false;
				  }
				   if(response==15)
				   {
					   email_text.css({display:'block',color:'red'});
					   email_text.text('邮箱格式不正确');
					    return false; 
				   }
				   if(response==6)
				   {
					 alert('您没有修改任何数据'); 
					 return false;  
				   }
				   if(response==16)
				   {
					   alert('修改个人资料失败')
					   return false; 
				   }
				   	if(response==17)
				   {
					   alert('修改个人资料成功,返回原浏览页面')
					  // window.history.back();
					 // window.self.location=document.referrer;
					    window.history.go(-1);
				   }
				 
			  },
			  error:function(xhr,status,response)
			  {
				 alert(xhr.status+'  '+xhr.statusText)  
			  }  
			   
		 });
		   
	  }//表单提交条件判断
    });
});
