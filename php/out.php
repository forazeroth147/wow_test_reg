<?php
if(isset($_COOKIE))
{
	setcookie('cus_name',$_COOKIE['cus_name'],time()-1);
	header("Location:../delu.html");
}