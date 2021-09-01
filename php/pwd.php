<?php

require_once 'mysql.php';
if((isset($_POST['user']) && !empty($_POST['user'])) && (isset($_POST['pwd']) && !empty($_POST['pwd'])))
{   //$ti=0;
	$name=addstr($_POST['user']);
	$reg_name=regexp('/^[\w]{4,10}$/',$name);
	if(!$reg_name)
	{
		echo 1;
		exit;	
	}
	$pwd=addstr($_POST['pwd']);
	$reg_pwd=regexp('/^[a-zA-Z0-9]{6,9}$/',$pwd);
	if(!$reg_pwd)
	{
		echo 2;
		exit;
	}
	$pwd=sha1($pwd);
	$result=select('think_customer','cus_name,cus_pwd,ask,answer',"cus_name='$name' and cus_pwd='$pwd'");
    $num=mysql_num_rows($result);
	if($num!=1)
	{
		echo 3;
		exit;
	}
    if($num==1)
	{
		$arr=array();
		$ask_ans=mysql_fetch_assoc($result);
		
		$arr['ask']=$ask_ans['ask'];
		$arr['answere']=$ask_ans['answer'];
      
		if(empty($arr['ask']) || empty($arr['answere']))
		{
		 echo 4;exit; 
		}
		else
		{echo json_encode($arr);exit;}
	}
    mysql_free_result($result);
	
}
else
{
	echo '页面错误';
}
//echo json_encode($_POST);