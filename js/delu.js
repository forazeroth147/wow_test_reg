// JavaScript Document

	function setCookie(name,value,expires)
	{
	   var date=new Date();
	   if(expires)
	   {
		  date.setHours(date.getHours()+expires);
		  document.cookie=name+'='+value+';expires='+date.toGMTString();
		}
		else
		{
		 document.cookie=name+'='+value;	
		}	
	}
	
$(document).ready(function(e) {
	
	var id=getCookie('w_id');
	var n_val=getCookie('name_val'); 
	  if(id!=undefined　&&　 n_val!=undefined) 
     {
	   alert('您已经登录');
	   window.location='self.html';
	 }
		
var timer=3600;

var user=$('.account input');
var text=$('.account p');

user.blur(function(){
	if($(this).val()!='')
	{
	$.ajax({
		type:'POST',
		url:'php/name.php',
		data:'user='+user.val(),
		success:function(data){
			eval('var data='+data);
			if(data.n==1)
			{
				text.css('display','block');
				text.html('<img src="Images/no.gif"/><span style="color:#FF6666">此用户名/账号不存在</span>');
				return false;
				//event.preventDefault()
			 }
			 if(data.n==0)
			 {
				text.css({display:'block',color:'red'})
				return false;
			 }

			},
	    error: function(xhr,textstatus,errorText)
	    { 
		  alert(xhr.status+':'+ errorText)
	    }
		});
	 }
   });//判断用户名是否注册


var pwd=$('.pass input');
var pwd_text=$('.regContent .pass p');

//pwd_text.css('display','block !important');
pwd.blur(function(){
	if($(this).val()!='' && user.val()!='')
	{
		$.post('php/pwd.php',{user:user.val(),pwd:pwd.val()},function(data){
			if(data==1)
			{
				pwd_text.css({display:'block'});
				pwd_text.html('<img src="Images/no.gif"/><span style="color:#FF6666">此用户名/账号格式不正确</span>');
               return false;
			}
			if(data==2)
			{
				pwd_text.css({display:'block'});
				pwd_text.html('<img src="Images/no.gif"/><span style="color:#FF6666">密码格式不正确</span>');
				return false;
			}
			if(data==3)
			{
				pwd_text.css({display:'block'});
				pwd_text.html('<img src="Images/no.gif"/><span style="color:#FF6666">用户名/账号或密码不正确</span>');
				return false;
			}
			if(data!=4)
			{
				ask_answer.slideDown('fast','swing');
				var data=JSON.parse(data);
				ask_answer.find('input').eq(0).val(data.ask);
			}
		});
		
	}
});//验证用户是否存在
var ask_answer=$('.regContent .problem3');//问题区
   var answer=ask_answer.find('input').eq(1);//答案
   answer.blur(function(){
	   
	   $.post('php/name.php',{name:user.val(),ask:$(this).val()},function(data,status,xhr)
	   {
		  // alert(xhr.status+' '+xhr.statusText)// 200 OK 
		   if(data==1)
		   { 
		       ask_answer.find('p').css({color:'red'});
			  // ask_answer.find('p').css('color','#F00');
			   ask_answer.find('p span').text('答案不得少于5个或超过30个字符');
			   return false;
		   }
		   if(data==2)
		   {
			   ask_answer.find('p').css('color','#F00');
			   ask_answer.find('p').html('请填写正确的答案');
			   return false;
		   }
		 //  alert(data)
		   
	});
	   
 });//如果有问题验证回答是否正确



var ver=$('.ver input');
var ver_text=$('.ver p');

ver.blur(function()
{
	if($(this).val()!='')
	{
	   $.get('php/ver2.php',{ver:$(this).val()},function(data){
        
		   if(data==2)
		   {
			   ver_text.css({display:'block !important'});
			   ver_text.html('<img src="Images/no.gif"/><span style="color:#FF6666">验证码不正确</span>');
			   return false;
		   }
		});	
	}
});//验证验证码是否正确

var arr_input=$('.regContent').find('input');
var input_len=arr_input.length-2;

$('.submit input').click(function(){
var n=0;

  if($('.regContent .problem3').is(':hidden')==true)
  {
	  input_len=input_len-2;
  }
  for(var i=0;i<input_len;i++)
  {
	  if(arr_input.eq(i).val()=='')
	  { ++n;}
  }
  if(n!=0 && ver.val()!='')
  {
	 alert('请填写资料不正确或者不完整'); 
	  return false;
  }
  if(n==0)
  {                        
                             //$('form').serializeArray()
		$.post('php/delu.php',$('form').serialize(),function(response,status,xhr)
		{	
			if(response==1)
			 {
			   ver_text.css({display:'block'});
			   ver_text.html('<img src="Images/no.gif"/><span style="color:#FF6666">验证码不正确</span>');
			   /*ver.val('');*/
			   ver.focus();
			   return false;
			 }
			if(response==2)
			{
				pwd_text.css({display:'block'});
				pwd_text.html('<img src="Images/no.gif"/><span style="color:#FF6666">用户名/账号或密码不正确</span>');
				return false;
			 }
			 if(response==3)
			 {
			   ask_answer.find('p').css({color:'red'});
			  // ask_answer.find('p').css('color','#F00');
			   ask_answer.find('p span').text('答案不得少于5个或超过30个字符');
			   return false;
			 }
			 if(response==4)
			 {
			   ask_answer.find('p').css('color','#F00');
			   return false;
			 }
			 else
			 {	
			 //  alert('每天登录加一分');
			   var id=JSON.parse(response);
			    if(id.jf)
				{
				  alert('每天登录加一分');	
				}
               setCookie('w_id',id.id,1);
			   setCookie('name_val',id.n,1);
			   window.location.href='index.html';
			 }
		})
	}

});//提交表单

});