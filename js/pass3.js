// JavaScript Document
$(document).ready(function(e) {

	var id=getCookie('w_id');
	var n_val=getCookie('name_val'); 
	 if(id!=undefined　&&　 n_val!=undefined) 
     {
	   alert('您已经登录');
	   window.location='self.html';
	 }	
   var kg=/^\s*$/;

	var ver_in=$('.ver p');
	$('.ver input').blur(function()
	{
		 if(!kg.test($(this).val()))
	    {
			$.get('php/ver2.php',{ver:$(this).val()},function(response,status,xhr)
			{
				if(response==2)
				{
				 ver_in.css('display','block');
				  ver_in.html('<img src="Images/no.gif"/><span style="color:#FF6666">验证码不正确</span>');
			      return false; 
				}
			});
		}
	});//验证验证吗
	
	var text=$('form input[type!=button]');
	var len=text.length;
	
    $('.submit input').click(function(){
		var now=0;
		for(var i=0;i<len;i++)
		{
			if(kg.test(text.eq(i).val()))
			{now+=1;}
		}	
			
		if(now!=0)
		{
			alert('请把资料填写完整');
			return false;
		}
        if(now==0)
		{
		  $.post('php/pass.php',$('form').serialize()+'&newpass=newpass',function(data,status,xhr)
		  {
			   if(data==1)
			   {
				   $('.pass').find('p').css('display','block');
			       $('.pass').find('p').html('<img src="Images/no.gif"/><span style="color:#FF6666">密码格式不正确</span>');
				  return false;
			   }
			  if(data==2)
			   {
				  $('.pass2').find('p').css('display','block');
			      $('.pass2').find('p').html('<img src="Images/no.gif"/><span style="color:#FF6666">两次密码不一致</span>');
				  return false;
			   }	
			   if(data==3)
			   {
				  $('.ver').find('p').css('display','block');
			      $('.ver').find('p').html('<img src="Images/no.gif"/><span style="color:#FF6666">验证码不正确</span>');
				  return false; 
			   }
			   if(data==4)
			   {
				  alert('密码创建失败');
				  return false; 
			   }
			   if(data==5)
			   {
				  alert('恭喜你！密码创建成功')
				  window.location.href='delu.html'; 
			   }
		
		 });
		}
	});
	
	
});