<?php
require_once 'mysql.php';

if(isset($_GET['type']) && $_GET['type']=='type')
{
	if($_GET['val']==0)
	echo 1;
	if($_GET['val']==1)
	echo 2;
	exit;
}//反馈类型

if(isset($_POST['tijiao']) && $_POST['tijiao']=='tijiao')
{
	 $name=addstr($_POST['name']);
	 $email=addstr($_POST['email']);
	 $reg_email=regexp('/^\s*([a-zA-Z0-9]{2,10})+@([a-zA-Z0-9]{2,5}\.)+([a-zA-Z0-9]{2,5})\s*$/',$email);
	if(!$reg_email)
	{
		echo 1;
		exit;
	}
	$phone=null;
	if($_POST['phone']!='')
	{
	   $phone=addstr($_POST['phone']);
	   $reg_phone=regexp('/^[0-9\\-]{7,13}$/',$phone);	
	   if(!$reg_phone)
	   {echo 2; exit;}
	}
	$qq=null;
	if($_POST['qq']!='')
	{
	   $qq=addstr($_POST['qq']);
	   $reg_qq=regexp('/^[\d]{5,13}$/',$qq);	
	   if(!$reg_qq)
	   {echo 3; exit;}
	}
	$describe=addstr($_POST['describe']);
	$str=str_len($describe,10,150);
	if($str==10 || $str==150)
	{
	 echo 4;
	 exit;	
	};

   $num=insert('think_tousu','`tous_name`,`tous_email`,`tous_phone`,`tous_qq`,`tous_describe`',"'$name','$email','$phone','$qq','$describe'");
   if($num==1)
   {
	 echo 6;
	 exit;   
   }
   else
   {echo 5; exit;}
}