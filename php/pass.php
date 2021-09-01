<?php
require_once 'mysql.php';
if(isset($_POST['type']) && $_POST['type']=='name' && !empty($_POST['name']))
{
	$name=addstr($_POST['name']);
	$reg_name=regexp('/^[\w\s*]{4,10}$/',$name);
	if(!$reg_name)
	{
	  echo  1;
	  exit;
	}
	$result=select('think_customer','cus_name',"`cus_name`='$name'");
	$num=mysql_num_rows($result);
	mysql_free_result($result);
	if($num!=1)
	{
	 echo  2;
	 exit;
	}
}//验证用户名
if(isset($_POST['type']) && $_POST['type']=='email' && !empty($_POST['email']))
{
	$email=addstr($_POST['email']);
	$reg_email=regexp('/^\s*([a-zA-Z0-9]{2,10})+@([a-zA-Z0-9]{2,5}\.)+([a-zA-Z0-9]{2,5})\s*$/',$email);
    if(!$reg_email)
    {
	  echo 1;
	  exit;
    }
	$name=addstr($_POST['name']);
	$result=select('think_customer','cus_email',"`cus_email`='$email' and `cus_name`='$name'");
	$num=mysql_num_rows($result);
	mysql_free_result($result);
	if($num!=1)
	{
	 echo  2;
	 exit;
	}
}//验证邮箱

if(isset($_POST['name_email']))
{
	$name=addstr($_POST['name']);
	$email=addstr($_POST['email']);
	$reg_name=regexp('/^[\w]{4,10}$/',$name);
	if(!$reg_name)
	{
	  echo  1;
	  exit;
	}
	$reg_email=regexp('/^\s*([a-zA-Z0-9]{2,10})+@([a-zA-Z0-9]{2,5}\.)+([a-zA-Z0-9]{2,5})\s*$/',$email);
    if(!$reg_email)
    {
	  echo 2;
	  exit;
    }
	$result=select('think_customer','cus_name',"`cus_email`='$email' and `cus_name`='$name'");
	//$sql="select cus_name from think_customer where `cus_email`='$email' and `cus_name`='$name'";
	if(!$result)
	{
	 echo  3;
	 exit;
	}
	if($result)
	{
		$num=mysql_num_rows($result);
		mysql_free_result($result);
		if($num==1)
		{
		  echo 4;
		  $_SESSION['name']=$name;
		  $_SESSION['email']=$email;
		  exit;
		}
		else
		{ echo  3; exit;}
	}
}//第一步

if(isset($_POST['verification']) && $_POST['verification']=='code')
{
  $code=substr(uniqid(mt_rand()),rand(1,10),rand(10,23));
  $_SESSION['code']=$code;
  echo $code;
  exit;
}//获取验证码

if(isset($_POST['code']) && !empty($_POST['code']))
{
	if($_POST['code']!==$_SESSION['code'])
	{echo 1;exit;}
    if($_POST['code']===$_SESSION['code'])
	{
		$name=$_SESSION['name'];
	    $email=$_SESSION['email'];
		 $num=update('think_customer',"cus_jihuo=1","cus_name='$name' and cus_email='$email'");
		if($num==1)
		{
		echo 2; exit;
		}
		else
		{echo 1; exit;}
	}
	//session_destroy();
	unset($_SESSION['code']);
}//判断验证码 ②

if(isset($_POST['newpass']) && $_POST['newpass']=='newpass')
{
       $pass=addstr($_POST['pass']);
	   $reg_pass=regexp('/^[0-9a-zA-Z]{6,9}$/',$pass);
	   if(!$reg_pass)
	   {
		   echo 1;
		   exit;
	   }
	  $pass2=addstr($_POST['pass2']);
	  if($pass!=$pass2)
	  {
		  echo 2;
		  exit;
	  }
	 if(addstr($_POST['ver'])!== $_SESSION['ver'])
	 {
		 echo 3;
		 exit;
	 }
	 
	 if(!isset($_SESSION['name']) || !isset($_SESSION['email']))
	 {
		 echo 4;
		 exit;
	 }
	 
	 $name=$_SESSION['name'];
	 $email=$_SESSION['email'];
	 
	 $pass=sha1($pass);
	 $num=update('think_customer',"cus_pwd='$pass'","cus_name='$name' and cus_email='$email' and cus_jihuo=1");
	 if($num==1)
	 {
		  $num2=update('think_customer',"cus_jihuo=0","cus_name='$name' and cus_email='$email' and cus_pwd='$pass'");
		  if($num2==1)
		  {
			 echo 5; 
			 session_destroy();
			 exit; 
			}
		  else
		  {
			 echo 4;
			 session_destroy();
			 exit; 
		  }
	 }
	 else
	 {
	   echo 4;
	   session_destroy();
	   exit;	 
	 }
}//第三步
