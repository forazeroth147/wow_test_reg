<?php
session_start();

if(isset($_GET['ver']) && !empty($_GET['ver']))
{
	if($_GET['ver']===$_SESSION['ver'])
	{
		echo 1;
		exit;
	}
	else
	{
		echo 2;
		exit;
	}
	//session_destroy();
	unset($_SESSION['ver']);
}
else
{
	echo '页面错误';
}
//echo json_encode($_SESSION['ver']);