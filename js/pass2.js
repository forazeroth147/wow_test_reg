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
	var code=$('.regContent .code');
    $.post('php/pass.php','verification=code',function(data)
	 {
		code.text(data);
	})//获取验证码
	
	var yanz=$('.regContent .jihuo').find('input');
	function yy(val)
	{
		if(!kg.test(val))
		{
		$.post('php/pass.php',{code:val},function(data)
		  {
		    if(data==1)
			{
				$('.regContent .jihuo').find('p').html('<img src="Images/no.gif"><font color="red">验证码不正确</font>')
			    return false;
			}
		  })
		}
	}
	yanz.blur(function(){yy($(this).val());});//验证码
	
	$('.submit input').click(function(){
		if(kg.test(yanz.val()))
		{
			$('.regContent .jihuo').find('p').css('display','block');
			$('.regContent .jihuo').find('p').html('<i>*</i><img src="Images/warn.png"><span class="red">验证码必填</span>');
			return false;
		}
		else
		{
		 $.post('php/pass.php',{code:yanz.val()},function(data)
		  {
		    if(data==1)
			{
				$('.regContent .jihuo').find('p').html('<img src="Images/no.gif"><font color="red">验证码不正确</font>')
			    return false;
			}
			else
			{window.location.href='pass3.html';	}
		  })
		}
	});//下一步
	
	
});