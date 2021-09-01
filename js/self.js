// JavaScript Document
function ajax(type,url,data,success)
{
	var xhr=null;
	if(window.XMLHttpRequest)
	{
	 xhr=new XMLHttpRequest();
	//ajax=new XMLHttpRequest();		
	}
	else
	{
	  xhr=new ActiveXObject("Mircosoft XMLHTTP");
	//  ajax=new ActiveXObject("Mircosoft XMLHTTP")
	}
	
	if(type=='GET' && data)
	{ url+='?'+data+new Date().getTime();}
	
	xhr.open(type,url,true);
	
	if(type=='GET')
	{
		xhr.send();
	}
	else
	{
	  xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
      xhr.send(data);
	}
	
	//xhr.onreadystatechange=function()
   xhr.onreadystatechange=function()
	{
		if(xhr.readyState==4)
		{
		   if(xhr.status==200)
		   {
			   success && success(xhr.responseText);
		    }	
			else
			{
			 alert('您请求的: \n'+xhr.responseURL +'\n'+ xhr.status +' '+xhr.statusText)	
			 // console.dir(xhr);
			}
		}
	}
}
window.onload=function(){

var user_name=$('.regCountLeft .red');
var user_name2=$('.reg_user').children('a').eq(0);
var user_info=$('.sugge_right .user_info').children('li');

var id=getCookie('w_id');
var  n_val=getCookie('name_val'); 

	if(id==undefined || id=='')
	{
		alert('请先登录');
		window.location.href='delu.html';
	}
	else
	{
		ajax('post','php/index.php','id='+id,function(data)
		{
			eval('var data='+data);
			user_name.text(data.name);
			user_name2.text(data.name);
			user_info.eq(0).find('span').text(data.name);
			user_info.eq(2).find('span').text(data.email);
			user_info.eq(3).find('span').text(data.jifen);
			user_info.eq(4).find('span').text(data.register);
			user_info.eq(5).find('span').text(data.wed);
		});
	}
	
}
