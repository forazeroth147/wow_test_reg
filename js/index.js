// JavaScript Document
window.onload=function()
{
	var b_h=document.body.scrollHeight-177;
	var box=document.getElementsByClassName('box')[0];
	box.style.height=b_h+'px';

	
	var id=getCookie('w_id');
	var n_val=getCookie('name_val'); 
	//alert(getCookie('id')) //js 获取cookie
	var t=new Date();
	var t=t.getTime();

	 if(id!=undefined　&&　 n_val!=undefined) 
     {
	var reg_log=document.getElementsByClassName('reg_log')[0];
	var reg_user=document.getElementsByClassName('reg_user')[0];
	    reg_log.style.display='none';
		reg_user.style.display='block';
		
        if(window.XMLHttpRequest)
	   {
		   var xhr=new XMLHttpRequest();
	   }
	   else
	   {
		 var xhr=new ActiveXObject('Mircosoft.XMLHTTP');   
		}
/*  xhr.open('GET','php/index.php?p='+t);
  xhr.send();*/
	  xhr.open('POST','php/index.php',true);
	  xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
	  xhr.send('id='+id); //-----------只验证ID，也可见用户名一起验证
  
      xhr.onreadystatechange=function()
	  {  
		if(xhr.readyState==4)	  
		{
			if(xhr.status==200)
			{
				if(xhr.responseText!='null')
				{
			      eval('var data='+xhr.responseText)	
				  document.getElementsByTagName('font')[0].innerHTML=data.name;
				  reg_user.getElementsByTagName('a')[0].innerHTML=data.name;
				}
			}
			else
			{ alert(xhr.status)}
		}  
	 } 
   }
   
    reg_user.getElementsByTagName('a')[1].onclick=function()
	{
	   clearCookie('w_id');
	   clearCookie('n_val');
	   window.location='index.html';
	}//-退出
   
}