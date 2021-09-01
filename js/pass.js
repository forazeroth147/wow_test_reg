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
   var name_in=$('.account p');

   $('.account input').blur(function()
   {
	  if(!kg.test($(this).val()))
	  {
		 $.post('php/pass.php',{type:'name',name:$(this).val()},function(data,status,xhr)
		 {
			 if(data==1)
			 {
				name_in.html('<img src="Images/warn.png"><span class="red">4-10个字母、数字组合，例如abcd,abc123等</span>'); 
			   return false;
			 }
			 if(data==2)
			 {
				name_in.find('img').attr('src','Images/no.gif');
				name_in.append('<font color="red">此用户不存在</font>');
			    return false; 
			 }
		  });
	  }
  }); //验证用户名
  
	$('.email input').blur(function()
   {
	   var name=$('.account input').val();
	   
	  if(!kg.test($(this).val()) && !kg.test(name))
	  {
		 $.post('php/pass.php',{type:'email',email:$(this).val(),name:name},function(data,status,xhr)
		 {
			 if(data==1)
			 {
				$('.email').find('p').css('display','block');
			      $('.email').find('p').html('<img src="Images/no.gif"/><span style="color:#FF6666">邮箱格式不正确</span>');
			   return false;
			 }
			 if(data==2)
			 {
				  $('.email').find('p').css('display','block');
			      $('.email').find('p').html('<img src="Images/no.gif"/><span style="color:#FF6666">邮箱错误或不存在此邮箱</span>');
			    return false; 
			 }
		  });
	  }
  }); //验证邮箱

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
		  $.post('php/pass.php',$('form').serialize()+'&'+'name_email=name_email',function(data,status,xhr)
		  {
			   if(data==1)
			   {
				  	$('.account').append('<p style="display: block; color: rgb(255, 0, 0);"><img src="Images/warn.png"><span>4-10个字母、数字组合，例如abcd,abc123等</span></p>'); 
			   return false;
			   }
			   if(data==2)
			   {
				  $('.email').find('p').css('display','block');
			      $('.email').find('p').html('<img src="Images/no.gif"/><span style="color:#FF6666">邮箱格式不正确</span>');
				  return false; 
			   }
			   if(data=='' || data==3)
			   {
				  alert('用户名或邮箱错误');
				  return false; 
			   }
			   if(data==5)
			   {alert('dfdf');}
			   if(data==4)
			   {
				 window.location.href='pass2.html';   
			  }
		 });
		}
	});
	
	
});
