// JavaScript Document
$(document).ready(function(e) {
	var t=new Date().getTime();
	var id=getCookie('w_id');
//	var delu_name=$('.nav .delu_name');

		  
	if(window.XMLHttpRequest)
	{
		var xhr=new XMLHttpRequest();
	}
	else
	{
	 var xhr=new ActiveXObject('Microsoft.XMLHTTP');
	}

	xhr.open('GET','php/index.php?p='+t);
	xhr.send();
	xhr.onreadystatechange=function()
	{
		if(xhr.readyState==4)
		{
		  if(xhr.status==200)
		  {
			if(xhr.responseText=='' && id!='' && id!=0)
			{alert('请先登录')
			 window.location.href='delu.html';
			}
			else
			{
				$('.reg_user .delu_name').html(xhr.responseText);
			 }
		   }	
		}
	}
/*---------------验证是否登录-------------------------------*/	


    var kg=/^\s*$/;
	var type=$('.regContent .type').children('select');
	type.blur(function(){
		 $.ajax({
			 type:"GET", 
			 url:'php/tousu.php',
			 timeout:2000,
			 data:$.param({ val:type.val(),
				 		    type:'type',
					 }),
			 success:function(response,status,xhr){

				 //alert(xhr.status+''+xhr.statusText)//成功状态码+ 成功信息
				 //alert(status) 状态
				 if(response==1)
				 {
					 $('.regContent .type').children('font').remove();
					 $('.regContent .type').append('<font class="red">请选择一个类型</font>') 
				  }
				 if(response==2)
				 {$('.regContent .type font').remove();}

				 },
			 error:function(xhr,status,response){
				alert(xhr.status+''+xhr.statusText) //错误状态码+ 错误信息
				// alert(response) //错误信息
				//alert(status) 状态
				 }

			 });
			// alert($(this).val())
		/*$.get('php/tousu.php',{name:123},function(data,status,info){
			alert(status+''+info)
			})	*/
	});//反馈类型
	
	var name=$('.regContent .account input');
	var name_in=$('.regContent .account p');
	name.blur(function() {
        if(!kg.test(name.val()))
		{
			$.ajax({
				type:"POST",
				url:'php/pass.php',
				data:$.param({
					      type:'name',
						  name:name.val()
					         }),
				success:function(respones,status,xhr)
				    {
					  	 if(respones==1)
						 {
							name_in.find('img').attr('src','Images/no.gif');
							name_in.append('<span class="red">4-10个字母、数字组合，例如abcd,abc123等</span>');
						   return false;
						 }
						if(respones==2)
						 {
							name_in.find('img').attr('src','Images/no.gif');
							name_in.append('<font color="red">此用户不存在</font>');
							return false; 
						 }
				    },
				error:function(xhr,status,errorInfo)
				    {
					alert(xhr.status+''+xhr.statusText) //错误状态码+ 错误信息
					}
			  });
		}
    });//验证用户名是否存在
	
	var ver_in=$('.ver p');
	$('.ver input').blur(function()
	{
		 if(!kg.test($(this).val()))
	    {
			$.get('php/ver2.php',{ver:$(this).val()},function(response,status,xhr)
			{
				if(response==2)
				{
				  ver_in.css({display:'block !important'});
				  ver_in.html('<img src="Images/no.gif"/><span style="color:#FF6666">验证码不正确</span>');
			      return false; 
				}
			});
		}
	});//验证验证码
	
 	var top,timer=null;	

	var but=$('.regContent .submit2').children('input');
	var type2,name2,email,phone,qq,describe,ver;
    var id=getCookie('w_id');
	
	but.click(function(){
		type2=type.val();
		name2=name.val();
		email=$('.regContent .email2 input').val();
		phone=$('.regContent .phone input').val();
		qq=$('.regContent .qq input').val();
		describe=$('.regContent .describe textarea').val();
		ver=$('.regContent .ver input').val();

		if(type2==0)
		{ 
		   	 scr()
			 $('.regContent .type').children('font').remove();
			 $('.regContent .type').append('<font class="red">请选择一个类型</font>');
			 return false;
		}
		if(kg.test(name2))
		{
		 scr();
		$('.account p').html('<p style="display: block; color: rgb(255, 0, 0);"><img src="Images/warn.png"><span>请输入用户名</span><p>')
		 return false;
		}
		if(kg.test(email))
		{ 	 $('.email2 p').css('display','block');
			 $('.email2 p span').css('color','#F00'); 
		return false;}
		
		if(kg.test(ver))
		{  
			 $('.ver p').css('display','block');
			 $('.ver p span').css('color','#F00').text('请输入验证码'); 
			return false;
		}
		if(type!=0 && !kg.test(name2) && !kg.test(email) && !kg.test(ver) && !kg.test(describe))
		{
			$.ajax({
				type:"POST",
				url:'php/tousu.php',
				data:$('form').serialize()+'&tijiao=tijiao',
				success:function(response,status,xhr)
				{
					if(response==1)
					{
						$('.email2 p').html('<img src="Images/no.gif"/><span style="color:#FF6666">邮箱格式不正确</span>')
						return false;
					}
					if(response==2)
					{
						$('.phone p').css('display','block');
						$('.phone p span:first').text('请输入正确的电话号码或手机号');
						return false;
					}
					if(response==3)
					{
						$('.qq p').css('display','block');
						$('.qq p span:first').text('请输入正确的QQ号');
						return false;
					}
					if(response==4)
					{
						$('.describe p').css({display:'block',color:'#f30'});
						$('.describe p').html('<i>*</i><span>为了更好的解答您的问题,字符不得少于10个多于150个</span>')
						return false;
				    }
					
					if(response==5)
					{
						 alert('很遗憾，投诉失败，请重新投诉')	;
						 return false;
					}
					if(response==6)
					{
					   alert('投诉成功，我们会尽快给您答复，\n谢谢您对我们的支持');	
					        
					   window.self.location=document.referrer;
					}
					
				},
				error:function(xhr,status,errorInfo)
				{alert(errorInfo)},//错误信息
				timeout:5000
				});
      // window.location.href='index.html'
		}
	});//提交投诉

	function scr()
	{  
	   top=$(window).scrollTop();
	   timer=setInterval(function()
	   {
		 if( top>100)
			{
				$(window).scrollTop(top--)
				//console.log(now++);
			}
			else
			{clearInterval(timer);}
		 },1);	
	}//页面滚动

});
