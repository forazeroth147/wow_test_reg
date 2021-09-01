// JavaScript Document

$(document).ready(function(e) {
    var But=$('.submit input');
	var text=$('.regContent div').find('input[type!=radio]');
   	var now=0;
    var name_in=$('.account p');
	
	$('.account input').blur(function(){
		if($(this).val()!='')
		{
			  var name=$('.account input').val();
			  $.ajax({
			   type:'POST',
			   url:"php/name.php",
			   data:"user="+name,
			   timeout:3000,
			   success:function(data){
				  
				  // var	data=JSON.parse(data);
				  eval('var data='+data);
					if(data.n==1)
					{
					 name_in.append(data.t);
					}
					if(data.n==2)
					{
					   name_in.find('img').attr('src','Images/no.gif');
					   name_in.append(data.t);
                       return false;
					}
					if(data.n==0)
					{
					   name_in.find('img').attr('src','Images/no.gif');
					   name_in.append(data.t);
                       return false;
					 }
				},
			   error: function(xhr,textstatus,errorText)
			   { 
				alert(xhr.status+':'+ errorText)
			   }
			 })
		}
		
	 });
	
  But.click(function()
  {  
 
  	 for(var i=0;i<text.length-1;i++)
		{
		   if(text.eq(i).val()=='')
		   {  now++;}	
		}
	
	if(now!=0)
	{
		alert('请把资料填写完整');
		window.location.reload();
		return false;
	}
	else
	{
	
		  var name=$('.account input').val();
		  $.ajax({
		   type:'POST',
		   url:"php/zhuce.php",
		   data:$('form').serialize(),
		   timeout:3000,
		   success:function(data){
			   eval('var data='+data);
			   if(data.ti==1)
			   {
				 alert('用户名格式不正确'); 
				 $('.account input').val('');
				 $('.account input').focus();
				 return false;  
				}
				if(data.ti==7)
			   {
				 alert('用户名已存在'); 
				 $('.account input').val('');
				 $('.account input').focus();
				 return false;  
				}
			   if(data.ti==2)
			   {
				  alert('密码格式不正确'); 
				 $('.pass input').val('');
				 $('.pass input').focus();
				 return false;    
				}
			    if(data.ti==3)
			   {
				  alert('确认密码与密码不一致'); 
				 $('.pass2 input').val('');
				 $('.pass2 input').focus();
				 return false;    
				}
			    if(data.ti==4)
			   {
				  alert('邮箱格式不正确'); 
				 $('.email input').val('');
				 $('.email input').focus();
				 return false;    
				}
				if(data.ti==5)
			   {
				  alert('恭喜你，注册成功'); 
			      window.location.href='delu.html'; 
				}
				if(data.ti==6)
			    {
				  alert('很遗憾注册失败'); 
			      return false;  
				}
			   
			   },
		   error: function(xhr,textstatus,errorText)
		   { 
			alert(xhr.status+':'+ errorText)
		   }
		 })
	
	  $(document).ajaxSend(function() {
		$('.load').fadeIn('fast');
		});//请求开始
		$(document).ajaxStop(function() {
		  $('.load').fadeOut('fast');
		}); //请求结束
 }
		
})
 
     
});